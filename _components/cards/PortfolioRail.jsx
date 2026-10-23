"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PortfolioCard from "./PortfolioCard";
import ProjectModal from "../ProjectModal";

// every card kind shares the Figma width
const CARD_WIDTH = "w-[85vw] max-w-[410px]";

const FADE = 96; // px of edge fade when more cards are hidden that way
const DRAG_THRESHOLD = 6; // px before a press counts as a drag, not a click

function RailButton({ dir, show, onClick }) {
  const Icon = dir === "left" ? FiChevronLeft : FiChevronRight;
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label={dir === "left" ? "Previous projects" : "Next projects"}
          onClick={onClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-[calc(50%-20px)] z-70 hidden md:flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-[#a2be9c] bg-[#1a1e1a]/95 text-[#c1dab6] shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-colors hover:bg-[#262d26] hover:text-white ${dir === "left" ? "-left-5" : "-right-5"}`}
        >
          <Icon size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Horizontal, snap-scrolling row of portfolio cards; clicking one opens the
// project popup. Scroll with the arrow buttons, by dragging with the mouse,
// with a trackpad, or with the keyboard.
export default function PortfolioRail({ items }) {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  // document.body only exists after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const railRef = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const updateEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    updateEdges();
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateEdges]);

  const step = (dir) => {
    const el = railRef.current;
    const card = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  // mouse drag-to-scroll (touch already scrolls natively)
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = {
      x: e.clientX,
      left: railRef.current.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.suppressClick) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(true);
      railRef.current.setPointerCapture(e.pointerId);
    }
    railRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current) return;
    drag.current = drag.current.moved ? { suppressClick: true } : null;
    setDragging(false);
  };
  // swallow the click that ends a drag so it doesn't open a project
  const onClickCapture = (e) => {
    if (drag.current?.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current = null;
  };

  // fade whichever edge still has cards hidden past it
  const mask = `linear-gradient(to right, ${
    edges.left ? "transparent 0" : "#000 0"
  }, #000 ${FADE}px, #000 calc(100% - ${FADE}px), ${
    edges.right ? "transparent 100%" : "#000 100%"
  })`;

  return (
    <>
      <div className="relative">
        <div
          ref={railRef}
          onScroll={updateEdges}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          className={[
            "flex items-stretch gap-6 md:gap-12 overflow-x-auto pt-1 pb-10",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            // stop the browser's native image drag from hijacking a mouse drag
            "[&_img]:[-webkit-user-drag:none] [&_img]:select-none",
            // snapping fights a manual drag, so pause it mid-drag
            dragging
              ? "cursor-grabbing select-none"
              : "snap-x snap-mandatory",
          ].join(" ")}
        >
          {items.map((item) => (
            <PortfolioCard
              key={`${item.kind}-${item.slug}`}
              item={item}
              onClick={() => setSelected(item)}
              className={`snap-start ${CARD_WIDTH}`}
            />
          ))}
        </div>

        <RailButton dir="left" show={edges.left} onClick={() => step(-1)} />
        <RailButton dir="right" show={edges.right} onClick={() => step(1)} />
      </div>

      {/* portal: animated/transformed ancestors would otherwise trap the
          fixed-position popup inside the rail */}
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
