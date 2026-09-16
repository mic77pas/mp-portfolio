"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaMountain,
  FaEnvelope,
  FaUser,
} from "react-icons/fa6";
import { useReducedMotionSafe } from "../../src/lib/motion/useReducedMotionSafe";

const CARDS = [
  {
    href: "/about",
    label: "About Me",
    icon: FaUser,
    description: "Who I am, beyond the code",
  },
  {
    href: "/about/waterloo",
    label: "Waterloo",
    icon: FaGraduationCap,
    description: "My university story",
  },
  {
    href: "/about/work",
    label: "Work Experience",
    icon: FaBriefcase,
    description: "Where I've worked",
  },
  {
    href: "/portfolio",
    label: "Projects",
    icon: FaCode,
    description: "Everything I've built",
  },
  {
    href: "/about/interests",
    label: "Other Interests",
    icon: FaMountain,
    description: "Life outside the screen",
  },
  {
    href: "mailto:mic77p@gmail.com",
    label: "Contact",
    icon: FaEnvelope,
    description: "Say hello",
    external: true,
  },
];

// "Windows" into the rest of the site — a slightly playful spin on a plain
// nav grid (spec section 6), styled after the site's pixel-UI chrome without
// leaning on the metaphor so hard it stops reading as ordinary navigation.
export default function AboutCards() {
  const { staggerContainer, staggerItem } = useReducedMotionSafe();

  return (
    <motion.div
      variants={staggerContainer(0.06)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3"
    >
      {CARDS.map(({ href, label, icon: Icon, description, external }) => (
        <motion.div key={href} variants={staggerItem(16, 0.97)}>
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group flex h-full flex-col overflow-hidden rounded-lg border-2 border-border-subtle bg-surface-1 shadow-md transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <div className="flex items-center gap-1.5 border-b border-border-subtle bg-surface-2 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-border-strong/70" />
              <span className="h-2 w-2 rounded-full bg-text-muted/70" />
              <span className="h-2 w-2 rounded-full bg-accent/70" />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-2 p-5 text-center">
              <Icon
                size={26}
                className="text-accent transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="font-minecraft text-sm font-bold text-text-primary md:text-base">
                {label}
              </h3>
              <p className="text-xs text-text-muted">{description}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
