"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { IoIosCloseCircle } from "react-icons/io";
import { IoLogoFigma } from "react-icons/io5";
import ProjectCard, { type ProjectCardData } from "./ProjectCard";
import ModelGrid from "../../src/components/ModelView";
import { projects } from "../../data/projects";
import { figmaDesigns } from "../../data/figmaDesigns";
import { useReducedMotionSafe } from "../../src/lib/motion/useReducedMotionSafe";
import type { CategoryId } from "../../src/lib/projects/categories";

type FigmaDesign = (typeof figmaDesigns)[number];

function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-4">
      <Image
        src="/wip.png"
        width={260}
        height={90}
        alt="Coming soon"
        className="mx-auto saturate-150 brightness-150"
      />
      <h2 className="font-minecraft text-xl text-center font-bold text-accent">
        {label}
      </h2>
    </div>
  );
}

export default function ProjectGrid({ category }: { category: CategoryId }) {
  const [selectedFigma, setSelectedFigma] = useState<FigmaDesign | null>(
    null,
  );
  const { staggerContainer } = useReducedMotionSafe();

  if (category === "software") {
    const items: ProjectCardData[] = projects.map((project) => ({
      key: project.slug,
      title: project.title,
      description: project.description,
      image: project.image,
      href: `/portfolio/${project.slug}`,
      tags: project.skills,
      year: project.year,
    }));

    return (
      <motion.div
        variants={staggerContainer()}
        initial="initial"
        animate="animate"
        className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
      >
        {items.map((item) => (
          <ProjectCard key={item.key} item={item} />
        ))}
      </motion.div>
    );
  }

  if (category === "design") {
    if (figmaDesigns.length === 0) {
      return <EmptyState label="Coming soon!" />;
    }

    const items: ProjectCardData[] = figmaDesigns.map((design) => ({
      key: design.slug,
      title: design.title,
      description: design.description,
      image: design.image,
      onClick: () => setSelectedFigma(design),
      badge: design.tag,
    }));

    return (
      <>
        <motion.div
          variants={staggerContainer()}
          initial="initial"
          animate="animate"
          className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <ProjectCard key={item.key} item={item} />
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedFigma && (
            <motion.div
              className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 p-4"
              onClick={() => setSelectedFigma(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="relative w-full max-w-4xl rounded-2xl border-2 border-border-subtle bg-surface-1 p-4 shadow-lg"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <button
                  onClick={() => setSelectedFigma(null)}
                  className="absolute top-3 right-3 z-10 text-text-muted hover:text-accent"
                  aria-label="Close"
                >
                  <div className="relative inline-flex items-center justify-center cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-surface-2" />
                    <IoIosCloseCircle
                      size={32}
                      className="absolute text-text-primary"
                    />
                  </div>
                </button>

                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border-subtle">
                  <Image
                    src={selectedFigma.image}
                    alt={selectedFigma.title}
                    fill
                    className="bg-black object-cover"
                  />
                </div>

                <h2 className="mt-4 font-minecraft text-xl font-bold text-text-primary">
                  {selectedFigma.title}
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  {selectedFigma.description}
                </p>

                {selectedFigma.figmaUrl && (
                  <a
                    href={selectedFigma.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-hover mt-4 inline-flex items-center gap-2"
                  >
                    <IoLogoFigma size={18} /> View in Figma
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (category === "3d") {
    return <ModelGrid />;
  }

  return <EmptyState label="More categories coming soon!" />;
}
