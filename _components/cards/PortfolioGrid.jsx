"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import PortfolioCard from "./PortfolioCard";
import ProjectModal from "../ProjectModal";

// Every card in a group laid out at once (the home page uses the scrolling
// PortfolioRail instead); clicking one opens the project popup.
export default function PortfolioGrid({ items }) {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  // document.body only exists after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* two up at every size (the cards go compact on phones, see
          SoftwareCard); equal rows, so a card that outgrows the rest
          stretches them all; the row gap leaves room for each card's title
          plaque, which hangs off its bottom edge */}
      <div className="grid grid-cols-2 auto-rows-fr gap-x-3 gap-y-10 md:gap-x-8 md:gap-y-14 pt-1 pb-10">
        {items.map((item) => (
          <PortfolioCard
            key={`${item.kind}-${item.slug}`}
            item={item}
            onClick={() => setSelected(item)}
            className="w-full"
          />
        ))}
      </div>

      {/* portal: animated/transformed ancestors would otherwise trap the
          fixed-position popup inside the grid */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selected && <ProjectModal item={selected} onClose={close} />}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
