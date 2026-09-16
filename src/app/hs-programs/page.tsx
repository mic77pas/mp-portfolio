"use client";

import { motion } from "motion/react";
import TerminalShell from "../../../_components/terminal/TerminalShell";
import { useReducedMotionSafe } from "../../lib/motion/useReducedMotionSafe";

export default function HsProgramsPage() {
  const { sectionVariants } = useReducedMotionSafe();

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-6 pb-16"
      initial="initial"
      animate="animate"
      variants={sectionVariants}
    >
      <div className="text-center">
        <h1 className="font-minecraft text-3xl font-bold text-accent md:text-4xl">
          High School Programs
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-text-secondary">
          Two small programs I wrote in high school, recreated here as an
          interactive file explorer + terminal.
        </p>
      </div>

      <TerminalShell />
    </motion.div>
  );
}
