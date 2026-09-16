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

- **`_components/` (repo root, *not* under `src/`)** — the older/primary shared component library: `Header`, `Footer`, `MobileHeader`, `ClientLayout`, `Skills`, `SkillBadge`, `ThemeToggle`, plus a `_components/portfolio/` subfolder (`ProjectSection`, `AnimatedProjectSection`, `CollapsibleProjectText`, `ProjectHeroDrawer`, `ProjectPageNav`, `ProjectSubGrid`, `ProjectCard`, `ProjectGrid`, `CategoryTaskbar`, `PortfolioShowcase`) with a barrel file at `_components/portfolio/index.ts`, plus `_components/about/AboutCards.tsx`, `_components/waterloo/WaterlooTimeline.tsx`, and `_components/terminal/*` (the `/hs-programs` file explorer + simulated terminal). Nothing under `src/` re-exports this directory, so it is always imported via **relative paths** (e.g. `../../_components/Header`), never via the `@/` alias.
- **`src/components/`** — newer components (`ModelView.tsx`, `Dock.jsx`, `CircularGallery.jsx`, `ScrollReveal.jsx`, `SplitText.jsx`, `LogoLoop.jsx`), importable via the `@/components/*` path alias.

When adding a new shared component, check whether similar components already exist in `_components/` before creating one in `src/components/` — the split is historical, not deliberate, so match whichever directory the surrounding feature already pulls from.

### Path aliases

`tsconfig.json` only maps `@/*` → `./src/*`. Anything in root-level `_components/` or `data/` must be imported with relative paths (`../../data/projects`, `../../../_components/Skills`), since they fall outside `src/`.

### Content-as-data pattern

Page content is centralized in `data/*.js` and imported into page/components — pages generally contain no hardcoded copy for lists of things:

- `data/projects.js` — exports `projects`, `reactApps`, `cs50Apps`, and a `getSubItems(project)` helper. Each top-level `projects` entry has `title`, `slug`, `category` (`"software"` | `"design"` | `"3d"` | `"other"`, drives the `/portfolio` taskbar), `year`, `description`, `image`, `gif` (sometimes an `.mp4` path, not a literal gif), `github`, `skills[]`, and the text-template fields `toolsUsed`/`whatIsIt`/`why`/`learnings` consumed by `/portfolio/[slug]`'s collapsible sections (a field is simply omitted from that page if absent — don't force empty sections). Optional `demoUrl`/`figmaUrl`/`otherUrl` render extra link buttons when present. `subItemsKey` (`"reactApps"` | `"cs50Apps"`) tells `getSubItems` which sub-array to hand to `ProjectSubGrid`.
- `data/models.js` — the 3D models shown in `/portfolio`'s "3d" category and rendered by `src/components/ModelView.tsx`'s `ModelGrid`.
- `data/career.js` — exports the `careers` array driving `/about/[companyName]` and `/about/work`. Each entry's `name` is matched case-insensitively against the `companyName` route param. Optional `location`/`tech[]` fields exist for the Work-experience overview; populate them for real, don't invent details.
- `data/skills.js`, `data/skillIcons.js` — skill badges/icons shown across pages (`SkillBadge.jsx` reads `skillIcons.js`; the third, unused `skillData.js` source was removed).
- `data/galleryImages.js` — real personal photos, split across `/about/waterloo` (campus-specific shots) and `/about/interests` (everything else) by filename.
- `data/figmaDesigns.js` — Figma showcase content; `category: "design"` matches the shared taxonomy in `src/lib/projects/categories.ts`.
- `data/waterloo.js` — Waterloo-era milestones for `/about/waterloo`'s timeline.
- `data/hsPrograms.js` / `data/hsProgramScripts.js` — placeholder source + canned input/output playback for `/hs-programs`'s simulated terminal (no real code execution — see `_components/terminal/useTerminalSession.ts`).

### Portfolio project pages ARE a dynamic route

`src/app/portfolio/[slug]/page.tsx` (+ `ClientProjectPage.tsx`) replaced the four hand-duplicated static folders that used to exist here. `generateStaticParams` prerenders one page per `data/projects.js` entry; `notFound()` fires on an unknown slug. **Adding a new project now only requires a `data/projects.js` entry** — no new route folder needed. The hub projects with a `subItemsKey` (React Apps, CS50 Web) render their sub-app grid via the shared `_components/portfolio/ProjectSubGrid.tsx`.

`/about/[companyName]` (`src/app/about/[companyName]/page.jsx` + `ClientPage.jsx`) is the same kind of dynamic route, driven by `data/career.js`, and calls `notFound()` when no career entry matches.

### Styling & theming

Tailwind v4 via `@import "tailwindcss"` in `src/app/globals.css` (no separate `tailwind.config`). The palette is a semantic design-token system, not hardcoded hex: raw values live in `:root`/`:root[data-theme="light"]` CSS variables (`--surface-0/1/2`, `--border-subtle/strong`, `--text-primary/secondary/muted`, `--accent(-hover|-contrast|-muted)`, `--status-available/busy`, `--focus-ring`, `--shadow-sm/md/lg`), and `@theme inline` re-exposes each as a Tailwind utility (`bg-surface-1`, `text-text-secondary`, `border-accent`, etc.) that resolves through `var()` at runtime — **use these utilities instead of new hardcoded hex when styling anything touched by the redesign.** A handful of older, not-yet-migrated components still use literal hex; match the surrounding component's existing convention rather than mixing both in one file.

Theming is hand-rolled (no `next-themes`): `src/lib/theme/ThemeScript.tsx` is a blocking inline `<script>` in `layout.jsx`'s `<head>` that sets `document.documentElement.dataset.theme` before paint (reads `localStorage.theme`, falls back to `prefers-color-scheme`), and `src/lib/theme/ThemeProvider.tsx` + its `useTheme()` hook back the `<ThemeToggle/>` in the header/mobile nav. `src/lib/motion/variants.ts` and `useReducedMotionSafe.ts` are the shared, reduced-motion-aware animation primitives — prefer them over ad hoc `motion/react` variant objects in new code.

Custom fonts are loaded via `next/font`: Montserrat (Google) as the body font and a local "Minecraft" font family (`public/fonts/minecraft/*`) used for the pixel-art heading style (`.font-minecraft`) throughout the portfolio section. The pixel-UI chrome (`public/comps/*.png`) is still used for some decorative backgrounds (header, mobile nav) alongside the token system.

`components.json` configures shadcn/ui (`new-york` style, neutral base, `lucide` icons, aliases pointing at `@/components`, `@/lib`, `@/hooks`) — this repo also has access to the `@react-bits` component registry (`https://reactbits.dev/r/{name}.json`), which is where components like `ScrollReveal`, `SplitText`, `CircularGallery`, and `LogoLoop` originate from.

### 3D models

`src/components/ModelView.tsx` renders `.glb`/model assets (paths + metadata from `data/models.js`) using `@react-three/fiber` + `@react-three/drei`. `next.config.ts` adds an SVG-as-React-component webpack rule via `@svgr/webpack`; there is no special webpack handling for 3D model files.

### Client-side state

There's no global state library. `/portfolio` and the landing page share `_components/portfolio/PortfolioShowcase.tsx`, which holds the active category (`software`/`design`/`3d`/`other`) in `useState` and mirrors it to a `?category=` URL param via plain `URLSearchParams`/`history.replaceState` (not Next's `useSearchParams`, to avoid a Suspense-boundary requirement on a fully client page). The old `sessionStorage`-persisted "mode" dock was replaced by this taskbar.

### Retired

`/posts` and `data/posts.js` were removed — their real content (TEDxUW, Velocity Ambassador, Geomatics→SYDE) was migrated into `data/waterloo.js` and now lives on `/about/waterloo`.
