"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CategoryTaskbar from "./CategoryTaskbar";
import ProjectGrid from "./ProjectGrid";
import Skills from "../Skills";
import { useReducedMotionSafe } from "../../src/lib/motion/useReducedMotionSafe";
import { CATEGORIES, type CategoryId } from "../../src/lib/projects/categories";

const VALID_IDS = CATEGORIES.map((c) => c.id);
const DEFAULT_CATEGORY: CategoryId = "software";

function readCategoryFromUrl(): CategoryId {
  if (typeof window === "undefined") return DEFAULT_CATEGORY;
  const value = new URLSearchParams(window.location.search).get("category");
  return (VALID_IDS as string[]).includes(value ?? "")
    ? (value as CategoryId)
    : DEFAULT_CATEGORY;
}

// Shared by /portfolio and the landing page's project section, so both stay
// in sync instead of maintaining two copies of the taskbar/grid logic.
export default function PortfolioShowcase({
  syncUrl = true,
  heading = "Projects",
}: {
  syncUrl?: boolean;
  heading?: string;
}) {
  const [category, setCategory] = useState<CategoryId>(DEFAULT_CATEGORY);
  const { sectionVariants } = useReducedMotionSafe();

  useEffect(() => {
    if (syncUrl) setCategory(readCategoryFromUrl());
  }, [syncUrl]);

  const handleChange = (next: CategoryId) => {
    setCategory(next);
    if (!syncUrl) return;
    const url = new URL(window.location.href);
    url.searchParams.set("category", next);
    window.history.replaceState({}, "", url);
  };

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {heading && (
        <h2 className="[text-shadow:var(--shadow-text-strong)] text-center font-minecraft text-3xl font-bold text-accent md:text-4xl">
          {heading}
        </h2>
      )}

      <CategoryTaskbar active={category} onChange={handleChange} />

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full"
        >
          <ProjectGrid category={category} />
        </motion.div>
      </AnimatePresence>

      {category === "software" && <Skills />}
    </div>
  );
}
