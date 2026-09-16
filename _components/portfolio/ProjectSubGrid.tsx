"use client";

import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "motion/react";
import { Square } from "ldrs/react";
import "ldrs/react/Square.css";

type SubItem = {
  title: string;
  description: string;
  image: string;
  gif?: string;
  github?: string;
  tech?: string[];
};

// Replaces the two near-identical react-apps/ProjectGrid.jsx and
// cs50-web/ProjectGrid.jsx (same hover-scale card + modal preview, differing
// only in which data array they read from).
export function ProjectSubGrid({ items }: { items: SubItem[] }) {
  const [selected, setSelected] = useState<SubItem | null>(null);
  const [loadingGif, setLoadingGif] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex w-full flex-col justify-start"
    >
      <div className="grid w-full grid-cols-1 gap-8 gap-y-16 my-8 lg:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="group relative cursor-pointer overflow-visible rounded-xl shadow-lg"
            onClick={() => {
              setSelected(item);
              setLoadingGif(true);
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={300}
              className="aspect-4/2 w-full rounded-xl object-cover ring-0 ring-transparent transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:ring-4 group-hover:ring-accent"
            />
            <div className="absolute bottom-0 left-1/2 h-14 w-4/5 -translate-x-1/2 translate-y-6 rounded-xl border-3 border-transparent bg-surface-1/90 backdrop-blur-sm flex items-center justify-center text-text-primary shadow-md transition-all duration-300 ease-out group-hover:border-accent group-hover:bg-surface-2/90">
              <h2 className="mb-1 text-center font-minecraft text-[22px] font-black">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/70"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-surface-1 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-50 text-text-muted hover:text-accent"
            >
              <div className="relative inline-flex items-center justify-center cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-surface-2" />
                <IoIosCloseCircle
                  size={32}
                  className="absolute text-text-primary"
                />
              </div>
            </button>

            <div className="relative w-full">
              {loadingGif && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                  <Square
                    size="35"
                    stroke="5"
                    strokeLength="0.25"
                    bgOpacity="0.1"
                    speed="1.2"
                    color="var(--accent)"
                  />
                </div>
              )}

              <Image
                src={selected.gif || selected.image}
                alt={selected.title}
                className="mb-2 w-full rounded-lg object-cover"
                width={800}
                height={400}
                unoptimized
                onLoad={() => setLoadingGif(false)}
              />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-text-primary">
              {selected.title}
            </h2>
            <p className="mb-4 text-text-secondary">{selected.description}</p>

            {selected.github && (
              <a
                href={selected.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button-hover font-minecraft"
              >
                <FaGithub size={20} /> View on GitHub
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
