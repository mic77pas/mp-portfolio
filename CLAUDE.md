# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is Michael Pasyechnyk's personal portfolio site, built with Next.js 15 (App Router, React 19, Turbopack) and Tailwind CSS v4. It's a single-tenant marketing/portfolio site — no backend, no database, no auth. Content (projects, career history, skills, gallery images) lives in plain JS data files and is rendered by client components with heavy use of `motion` (Framer Motion) animations and a 3D model viewer (`three` / `@react-three/fiber`).

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build with Turbopack
npm run start    # Serve the production build
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

There is no test suite configured in this repo.

## Architecture

### Two component directories — this is the trickiest part of the layout

- **`_components/` (repo root, *not* under `src/`)** — the older/primary shared component library: `Header`, `Footer`, `MobileHeader`, `ClientLayout`, `Skills`, `SkillBadge`, `CareerTimeline`, `ProjectCard`, etc., plus a `_components/portfolio/` subfolder (`ProjectSection`, `AnimatedProjectSection`, `CollapsibleProjectText`, `ProjectHeroDrawer`, `LaptopFrame`) with a barrel file at `_components/portfolio/index.ts`. Nothing under `src/` re-exports this directory, so it is always imported via **relative paths** (e.g. `../../_components/Header`), never via the `@/` alias.
- **`src/components/`** — newer components (`ModelView.tsx`, `Dock.jsx`, `CircularGallery.jsx`, `ScrollReveal.jsx`, `SplitText.jsx`, `LogoLoop.jsx`), importable via the `@/components/*` path alias.

When adding a new shared component, check whether similar components already exist in `_components/` before creating one in `src/components/` — the split is historical, not deliberate, so match whichever directory the surrounding feature already pulls from.

### Path aliases

`tsconfig.json` only maps `@/*` → `./src/*`. Anything in root-level `_components/` or `data/` must be imported with relative paths (`../../data/projects`, `../../../_components/Skills`), since they fall outside `src/`.

### Content-as-data pattern

Page content is centralized in `data/*.js` and imported into page/components — pages generally contain no hardcoded copy for lists of things:

- `data/projects.js` — exports `projects` and `reactApps` arrays. Each project has `title`, `slug`, `description`, `image`, `gif`, `github`, `skills[]`.
- `data/career.js` — exports the `careers` array driving `/about/[companyName]`. Each entry's `name` is matched case-insensitively against the `companyName` route param.
- `data/skills.js`, `data/skillIcons.js`, `data/skillData.js` — skill badges/icons shown across pages.
- `data/galleryImages.js`, `data/figmaDesigns.js` — image gallery / Figma showcase content.
- `data/posts.js` — content for `/posts`.

### Portfolio project pages are NOT a dynamic route

Even though `data/projects.js` entries have a `slug` and links point to `/portfolio/${project.slug}`, there is no `src/app/portfolio/[slug]` catch-all. Each project gets its own **static folder** under `src/app/portfolio/` (e.g. `portfolio-website/`, `react-apps/`, `cs50-web/`, `client-sites/`), each with its own `page.jsx`/`page.tsx`. **Adding a new project requires two changes**: an entry in `data/projects.js` AND a new matching route folder with its own page component — otherwise the card links to a 404.

`/about/[companyName]` (`src/app/about/[companyName]/page.jsx` + `ClientPage.jsx`) *is* a real dynamic route, driven by `data/career.js`, and calls `notFound()` when no career entry matches.

### Styling

Tailwind v4 via `@import "tailwindcss"` in `src/app/globals.css` (no separate `tailwind.config`), with `@theme inline` CSS variables for `--color-background`/`--color-foreground`. Custom fonts are loaded via `next/font`: Montserrat (Google) as the body font and a local "Minecraft" font family (`public/fonts/minecraft/*`) used for the pixel-art heading style (`.font-minecraft`) throughout the portfolio section. The site's dark forest-green palette (`#242524`, `#8dad8c`, `#6a8366`, etc.) and pixel-UI chrome (`public/comps/*.png` used as `bg-[url('/comps/pixeldock.png')]`-style frames/docks) are hardcoded per-component rather than centralized as design tokens — match existing hex values when styling new UI rather than introducing new ones.

`components.json` configures shadcn/ui (`new-york` style, neutral base, `lucide` icons, aliases pointing at `@/components`, `@/lib`, `@/hooks`) — this repo also has access to the `@react-bits` component registry (`https://reactbits.dev/r/{name}.json`), which is where components like `ScrollReveal`, `SplitText`, `CircularGallery`, and `LogoLoop` originate from.

### 3D models

`src/components/ModelView.tsx` renders `.glb`/model assets from `public/models/` using `@react-three/fiber` + `@react-three/drei`. `next.config.ts` adds an SVG-as-React-component webpack rule via `@svgr/webpack`; there is no special webpack handling for 3D model files.

### Client-side state

There's no global state library. Local UI state (portfolio mode: code/figma/models, selected project/design modal) is plain `useState`, with `sessionStorage` used to persist the selected portfolio "mode" tab across navigation (see `src/app/portfolio/page.jsx`).
