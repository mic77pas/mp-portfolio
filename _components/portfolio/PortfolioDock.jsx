"use client";

import Image from "next/image";
import { LuBox, LuPalette, LuSquareTerminal } from "react-icons/lu";

// true: generic line icons tinted with the palette; false: the tool logos
const GENERIC_ICONS = true;

// line icon per portfolio group `kind` (see data/portfolioGroups.js)
const GLYPHS = {
  software: LuSquareTerminal,
  design: LuPalette,
  model: LuBox,
};

// tool logo per portfolio group `kind`
const LOGOS = {
  software: { src: "/logos/vscode.png", width: 26, height: 26 },
  design: { src: "/logos/figma.svg", width: 18, height: 20 },
  model: { src: "/logos/solidworks.png", width: 32, height: 32 },
};

// Dock pinned to the right edge of the screen, like a folder tab poking out
// from behind it (rounded on the left, open on the right); picks which
// portfolio group is shown. The hover label slides out to its left.
// On phones the same tab drops to the bottom of the right edge, within thumb
// reach; no hover labels there, since touch has no real hover.
export default function PortfolioDock({ groups, active, onSelect }) {
  return (
    <nav
      aria-label="Portfolio categories"
      data-portfolio-dock
      className={[
        "fixed z-80 right-0 flex flex-col items-center justify-center rounded-l-4xl border-2 border-r-0 border-(--pal-border) bg-(--pal-surface)/90 backdrop-blur-sm shadow-[-4px_4px_14px_rgba(0,0,0,0.4)]",
        // phones: a slimmer tab low on the edge, clear of the home indicator
        // (and narrow enough to leave the centred footer text uncovered);
        // md up: centred on the edge
        "bottom-[calc(1.5rem+env(safe-area-inset-bottom))] gap-3 py-4 pl-3 pr-2",
        "md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:gap-5 md:py-7 md:pl-5 md:pr-4",
      ].join(" ")}
    >
      {groups.map(({ kind, title }) => {
        const Glyph = GLYPHS[kind];
        const logo = LOGOS[kind];
        const selected = active === kind;

        return (
          <button
            key={kind}
            type="button"
            onClick={() => onSelect(kind)}
            aria-label={title}
            aria-pressed={selected}
            className={`group relative size-11 md:size-13 flex items-center justify-center rounded-full border-2 border-(--pal-accent) transition cursor-pointer ${
              selected
                ? "bg-(--pal-accent)"
                : "bg-(--pal-deep) hover:bg-(--pal-accent)"
            }`}
          >
            {GENERIC_ICONS && Glyph ? (
              <Glyph
                aria-hidden
                size={24}
                className={`size-5 md:size-6 transition-colors duration-150 ${
                  selected
                    ? "text-(--pal-deep)"
                    : "text-(--pal-heading) group-hover:text-(--pal-deep)"
                }`}
              />
            ) : (
              logo && (
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  className={`transition-all duration-150 ${
                    selected
                      ? "grayscale brightness-0"
                      : "group-hover:grayscale group-hover:brightness-0"
                  }`}
                />
              )
            )}

            <span className="hidden md:block pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-md border-2 border-(--pal-accent) bg-(--pal-deep) px-2 py-1 font-minecraft text-[14px] leading-none text-(--pal-heading) opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
              {title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
