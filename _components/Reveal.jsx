"use client";

import { motion, useReducedMotion } from "motion/react";

// Fades + lifts its children in the first time they scroll into view.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
}
