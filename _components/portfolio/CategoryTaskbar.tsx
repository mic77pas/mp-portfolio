"use client";

import { motion } from "motion/react";
import { CATEGORIES, type CategoryId } from "../../src/lib/projects/categories";

export default function CategoryTaskbar({
  active,
  onChange,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none">
      <div
        role="tablist"
        aria-label="Project category"
        className="mx-auto flex w-max min-w-full items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface-1 p-1.5"
      >
        {CATEGORIES.map(({ id, label, icon: Icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(id)}
              className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 font-minecraft text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring md:text-sm ${
                isActive
                  ? "text-accent-contrast"
                  : "text-text-secondary hover:text-accent"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="taskbar-active-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon size={16} className="relative z-10" />
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
