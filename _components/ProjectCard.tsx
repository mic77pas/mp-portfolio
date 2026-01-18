"use client";

import Image from "next/image";
import React from "react";

type Project = {
  id: number;
  title: string;
  description?: string;
  image: string;
};

type ProjectCardProps = {
  project: Project;
  onClick?: () => void;

  // Optional tweakables
  className?: string;
  bannerTextClassName?: string;

  // If you want the pixel banner as an image like your sentence.png
  // put it in /public/comps/project-banner.png (or any path) and pass it here.
  bannerImageSrc?: string;
};

export default function ProjectCard({
  project,
  onClick,
  className = "",
  bannerTextClassName = "",
  bannerImageSrc,
}: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative w-full text-left",
        "rounded-2xl",
        // give some breathing room so the hover border doesn’t clip
        "p-2",
        className,
      ].join(" ")}
    >
      {/* Outer hover frame */}
      <div
        className={[
          "relative rounded-2xl",
          "transition-all duration-200",
          // base: no visible border (just subtle)
          "ring-1 ring-white/10",
          // hover: green-ish frame + glow
          "group-hover:ring-4 group-hover:ring-[#AABF9F]/70",
          "group-hover:shadow-[0px_14px_50px_rgba(0,0,0,0.65)]",
        ].join(" ")}
      >
        {/* Card image area */}
        <div className="relative overflow-clip rounded-2xl">
          {/* Aspect ratio like your screenshot */}
          <div className="relative w-full aspect-[16/10]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={[
                "object-cover",
                "transition-transform duration-300",
                "group-hover:scale-[1.02]",
              ].join(" ")}
              priority={false}
            />
          </div>

          {/* Optional dark overlay for readability (subtle) */}
          <div className="pointer-events-none absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-200" />

          {/* Pixel banner */}
          <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 w-[92%]">
            <div className="relative">
              {bannerImageSrc ? (
                // If you supply an image banner, it will match your Framer look best
                <div
                  className="h-[74px] w-full bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url('${bannerImageSrc}')`,
                    backgroundSize: "100% 100%",
                  }}
                />
              ) : (
                // CSS banner (no asset needed) with pixel notches
                <div className="pixel-banner h-[74px] w-full bg-[#AABF9F]" />
              )}

              {/* Banner text */}
              <div
                className={[
                  "absolute inset-0 flex items-center justify-center",
                  "font-minecraft tracking-widest",
                  "text-[22px] sm:text-[24px]",
                  // Base/hover text color like your screenshot
                  "text-[#2A2F2A] group-hover:text-white",
                  "transition-colors duration-200",
                  bannerTextClassName,
                ].join(" ")}
              >
                {project.title.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

/**
 * Add this CSS somewhere global (globals.css) if you use the CSS banner
 * (the `pixel-banner` class).
 *
 * If you use an image banner instead, you can skip the CSS.
 */
