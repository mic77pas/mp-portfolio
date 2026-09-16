"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import images from "../../../../data/galleryImages";
import { useReducedMotionSafe } from "../../../lib/motion/useReducedMotionSafe";

// The subset of gallery photos that aren't specifically Waterloo moments
// (those live on /about/waterloo instead) — cottage weekends, hiking,
// fishing, skiing, and other life-outside-the-screen photos.
const INTEREST_SLUGS = [
  "campfire.jpg",
  "hiking.jpg",
  "fishing.jpg",
  "skiing.jpg",
  "helmet.jpg",
  "guitar.jpg",
];

export default function InterestsPage() {
  const { sectionVariants, staggerContainer, staggerItem } =
    useReducedMotionSafe();
  const photos = images.filter((img) =>
    INTEREST_SLUGS.some((slug) => img.src.endsWith(slug)),
  );

  return (
    <motion.div
      className="flex w-full flex-col gap-10 pb-16"
      initial="initial"
      animate="animate"
      variants={sectionVariants}
    >
      <h1 className="text-center font-minecraft text-3xl font-bold text-accent md:text-4xl">
        Other Interests
      </h1>
      <p className="mx-auto max-w-xl text-center text-sm text-text-secondary">
        A few things I enjoy outside of software and design.
      </p>

      <motion.div
        variants={staggerContainer(0.06)}
        initial="initial"
        animate="animate"
        className="mx-auto columns-2 gap-3 sm:columns-3 [&>*]:mb-3"
      >
        {photos.map((img) => (
          <motion.div
            key={img.src}
            variants={staggerItem(12, 0.98)}
            className="group relative overflow-hidden rounded-lg border border-border-subtle"
          >
            <Image
              src={img.src}
              alt={img.caption || "Photo"}
              width={400}
              height={400}
              className="w-full object-cover transition duration-500 group-hover:scale-105"
            />
            {img.caption && (
              <p className="absolute inset-x-0 bottom-0 bg-surface-0/80 px-2 py-1 text-[11px] text-text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {img.caption}
              </p>
            )}
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
