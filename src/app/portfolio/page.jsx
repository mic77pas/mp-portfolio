"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PortfolioGrid from "../../../_components/cards/PortfolioGrid";
import PortfolioDock from "../../../_components/portfolio/PortfolioDock";
import { portfolioGroups } from "../../../data/portfolioGroups";

const STORAGE_KEY = "portfolioMode";

// Tints the whole site palette (see globals.css) for the group being shown.
// Rendered inside the group's section, so with AnimatePresence's "wait" mode
// the swap only starts once the previous group has fully faded out.
function Palette({ kind }) {
  useEffect(() => {
    document.documentElement.dataset.palette = kind;
  }, [kind]);
  return null;
}

export default function Page() {
  // null until the saved category is read, so a returning visitor doesn't
  // see the default flash before their pick swaps in
  const [mode, setMode] = useState(null);

  // keep the picked category across navigation within the session
  useEffect(() => {
    let saved = null;
    try {
      saved = sessionStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable: use the default */
    }
    setMode(
      portfolioGroups.some((g) => g.kind === saved)
        ? saved
        : portfolioGroups[0].kind,
    );
  }, []);

  // back to the usual green once you leave the page
  useEffect(() => () => delete document.documentElement.dataset.palette, []);

  const selectMode = (kind) => {
    setMode(kind);
    try {
      sessionStorage.setItem(STORAGE_KEY, kind);
    } catch {
      /* ignore */
    }
  };

  const group = portfolioGroups.find((g) => g.kind === mode);

  return (
    <div className="page-container pt-8 md:pt-28 pb-16">
      <PortfolioDock
        groups={portfolioGroups}
        active={mode}
        onSelect={selectMode}
      />

      {/* the outgoing group fades and drops slightly before the next one
          rises in, so switching never feels like a jump cut */}
      <AnimatePresence mode="wait">
        {group && (
          <motion.section
            key={group.kind}
            // pinned to its own palette, so the cards are already in their
            // final colours as they fade in (and the outgoing ones keep
            // theirs) while the rest of the page fades across
            data-palette={group.kind}
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              // held back a beat so most of the palette fade happens
              // while the space is empty
              transition: { duration: 0.4, delay: 0.25, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -12,
              transition: { duration: 0.25, ease: "easeIn" },
            }}
            className="flex flex-col gap-8"
          >
            <Palette kind={group.kind} />
            <h2 className="font-minecraft font-bold text-center text-[28px] md:text-[36px] text-(--pal-heading)">
              {group.title}
            </h2>
            <PortfolioGrid items={group.items} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
