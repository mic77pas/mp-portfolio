"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import careers from "../../../../data/career";
import SkillBadge from "../../../../_components/SkillBadge";
import { useReducedMotionSafe } from "../../../lib/motion/useReducedMotionSafe";

export default function WorkPage() {
  const { sectionVariants, staggerContainer, staggerItem } =
    useReducedMotionSafe();

  return (
    <motion.div
      className="flex w-full flex-col gap-10 pb-16"
      initial="initial"
      animate="animate"
      variants={sectionVariants}
    >
      <h1 className="text-center font-minecraft text-3xl font-bold text-accent md:text-4xl">
        Work Experience
      </h1>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="initial"
        animate="animate"
        className="mx-auto flex w-full max-w-3xl flex-col gap-6"
      >
        {careers.map((entry) => (
          <motion.div key={entry.name} variants={staggerItem(16, 0.98)}>
            <Link
              href={`/about/${entry.name.toLowerCase()}`}
              className="group flex flex-col gap-4 rounded-xl border-2 border-border-subtle bg-surface-1 p-5 transition-colors hover:border-accent sm:flex-row sm:items-center"
            >
              <Image
                src={entry.logo}
                alt={entry.title}
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h2 className="font-minecraft text-lg font-bold text-text-primary">
                    {entry.title}
                  </h2>
                  <span className="text-xs text-text-muted">
                    {entry.date}
                  </span>
                </div>

                {entry.location && (
                  <p className="mt-0.5 text-xs italic text-text-muted">
                    {entry.location}
                  </p>
                )}

                <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                  {entry.about}
                </p>

                {entry.tech && entry.tech.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.tech.map((t) => (
                      <SkillBadge key={t} name={t} size="sm" />
                    ))}
                  </div>
                )}
              </div>

              <span className="hidden shrink-0 font-minecraft text-sm text-accent group-hover:text-accent-hover sm:block">
                Read more →
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <Link
        href="/about"
        className="mx-auto text-sm text-accent hover:text-accent-hover"
      >
        ↩ Return to About Me
      </Link>
    </motion.div>
  );
}
