"use client";

import { useReducedMotion, type Variants } from "motion/react";
import { sectionVariants, staggerContainer, staggerItem } from "./variants";

const INSTANT: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const INSTANT_CONTAINER: Variants = {
  animate: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

// Wraps motion/react's own (currently unused-anywhere) useReducedMotion so
// every shared animation in the redesign automatically respects
// prefers-reduced-motion instead of relying on component-by-component guards.
export function useReducedMotionSafe() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    sectionVariants: prefersReducedMotion ? INSTANT : sectionVariants,
    staggerContainer: (staggerChildren?: number, delayChildren?: number) =>
      prefersReducedMotion
        ? INSTANT_CONTAINER
        : staggerContainer(staggerChildren, delayChildren),
    staggerItem: (distance?: number, scale?: number) =>
      prefersReducedMotion ? INSTANT : staggerItem(distance, scale),
  };
}
