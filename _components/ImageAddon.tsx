"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function InteractiveAvatar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const rotateX = useSpring(rx, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 18 });

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const dx = px - 0.5;
    const dy = py - 0.5;

    const maxTilt = 10;
    rx.set(-dy * maxTilt);
    ry.set(dx * maxTilt);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        reset();
      }}
      onPointerMove={handleMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="
        relative
        w-[280px] h-[358px]
        sm:w-[300px] sm:h-[385px]
        cursor-pointer
        rounded-md
        will-change-transform
        transition-transform duration-300
        hover:scale-[1.02]
      "
    >
      {/* IMAGE */}
      <div className="absolute inset-0 overflow-hidden rounded-md">
        <Image
          src="/profile3.png"
          alt="Profile"
          fill
          priority
          className="
            object-cover
            transition-all duration-300
            group-hover:brightness-105
          "
        />

        {/* scanlines */}
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-[0.08]
            bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)]
            bg-[length:100%_6px]
          "
        />

        {/* shimmer sweep */}
        {hovered && (
          <div
            className="
              pointer-events-none absolute inset-0
              bg-[linear-gradient(120deg,transparent_0%,rgba(152,180,147,0.18)_40%,rgba(152,180,147,0.28)_50%,rgba(152,180,147,0.18)_60%,transparent_100%)]
              animate-[shimmer_1.1s_ease-out_forwards]
            "
          />
        )}

        {/* glow */}
        <div
          className={`
            pointer-events-none absolute inset-0 rounded-md
            transition-opacity duration-200
            ${hovered ? "opacity-100" : "opacity-0"}
            shadow-[0_0_0_2px_rgba(152,180,147,0.35)]
          `}
        />
      </div>

      {/* PRESS E HUD */}
      <div
        className={`
    pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2
    transition-all duration-200
    ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
  `}
        style={{ transform: "translate(-50%, 0) translateZ(30px)" }}
      >
        <div
          className="
            flex items-center gap-2
            px-3 py-1.5
            bg-[#0f130f]/85
            border-2 border-[#2a342a]
            rounded-md
            shadow-[0_6px_0_#0f120f]
            text-xs text-[#cfe0c9]
          "
        >
          <span
            className="
              inline-flex items-center justify-center
              w-6 h-6
              bg-[#101310]
              border border-[#2a342a]
              rounded
              font-minecraft
              text-[#98B493]
            "
          >
            E
          </span>
          <span className="uppercase tracking-[0.22em] text-[#a6b2a3]">
            to inspect
          </span>
        </div>
      </div>
    </motion.div>
  );
}
