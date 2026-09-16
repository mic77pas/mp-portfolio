import type { Variants } from "motion/react";

// Shared fade+lift transition for swapping whole sections (tabs, categories,
// route-level content) in and out. Extracted from the pattern already used
// in src/app/portfolio/page.jsx (modeVariants).
export const sectionVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

// Parent wrapper that staggers its children's entrance.
export function staggerContainer(
  staggerChildren = 0.06,
  delayChildren = 0.1,
): Variants {
  return {
    animate: { transition: { staggerChildren, delayChildren } },
  };
}

// Individual grid/list item entrance, paired with staggerContainer.
export function staggerItem(distance = 20, scale = 0.97): Variants {
  return {
    initial: { opacity: 0, y: distance, scale },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
}
