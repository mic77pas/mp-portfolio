"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import careers from "../../../../data/career";
import images from "../../../../data/galleryImages";
import { milestones } from "../../../../data/waterloo";
import WaterlooTimeline from "../../../../_components/waterloo/WaterlooTimeline";
import { useReducedMotionSafe } from "../../../lib/motion/useReducedMotionSafe";

export default function WaterlooPage() {
  const { sectionVariants, staggerContainer, staggerItem } =
    useReducedMotionSafe();
  const syde = careers.find((c) => c.name === "SYDE");
  const geomatics = careers.find((c) => c.name === "geomatics");
  // Only the Waterloo-specific shots — general life photos live on
  // /about/interests instead.
  const campusPhotos = images.filter((img) =>
    ["climbing.jpg", "tedxuw.jpg", "velocity.jpg"].some((slug) =>
      img.src.endsWith(slug),
    ),
  );

  return (
    <motion.div
      className="flex w-full flex-col gap-12 pb-16"
      initial="initial"
      animate="animate"
      variants={sectionVariants}
    >
      <section className="flex flex-col items-center gap-4 text-center">
        <Image
          src="/logos/uwaterloo.png"
          alt="University of Waterloo"
          width={72}
          height={72}
          className="rounded-full"
        />
        <h1 className="font-minecraft text-3xl font-bold text-accent md:text-4xl">
          University of Waterloo
        </h1>
        {syde && (
          <p className="max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
            {syde.about}
          </p>
        )}
      </section>

      {geomatics && (
        <section className="mx-auto w-full max-w-3xl rounded-xl border-2 border-border-subtle bg-surface-1 p-6">
          <h2 className="font-minecraft text-xl font-bold text-text-primary">
            Program
          </h2>
          <p className="mt-2 text-sm leading-7 text-text-secondary">
            Currently in Systems Design Engineering (SYDE), after starting my
            first year in Geomatics — see the timeline below for how that
            transition happened.
          </p>
        </section>
      )}

      <section className="mx-auto w-full max-w-3xl">
        <h2 className="mb-6 text-center font-minecraft text-2xl font-bold text-text-primary">
          Milestones
        </h2>
        <WaterlooTimeline milestones={milestones} />
      </section>

      <section className="mx-auto w-full max-w-4xl">
        <h2 className="mb-6 text-center font-minecraft text-2xl font-bold text-text-primary">
          Campus Life
        </h2>
        <motion.div
          variants={staggerContainer(0.05)}
          initial="initial"
          animate="animate"
          className="columns-2 gap-3 sm:columns-3 [&>*]:mb-3"
        >
          {campusPhotos.map((img) => (
            <motion.div
              key={img.src}
              variants={staggerItem(12, 0.98)}
              className="group relative overflow-hidden rounded-lg border border-border-subtle"
            >
              <Image
                src={img.src}
                alt={img.caption || "University of Waterloo"}
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
      </section>

      <Link
        href="/about"
        className="mx-auto text-sm text-accent hover:text-accent-hover"
      >
        ↩ Return to About Me
      </Link>
    </motion.div>
  );
}
