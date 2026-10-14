"use client";

import { motion } from "motion/react";

// Pure-CSS space-grey MacBook-style laptop (crisp at any size). When `animateOpen` is
// set, the base rises in and the lid then swings open on its hinge.
export default function LaptopMockup({
  children,
  animateOpen = true,
  className = "",
}) {
  return (
    <div className={`relative mx-auto [perspective:2200px] ${className}`}>
      {/* lid */}
      <motion.div
        className="relative mx-auto w-[86%] origin-bottom [transform-style:preserve-3d]"
        initial={animateOpen ? { rotateX: -88, opacity: 0.6 } : false}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{
          rotateX: { delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          opacity: { delay: 0.25, duration: 0.3 },
        }}
      >
        {/* aluminium rim */}
        <div className="rounded-t-[clamp(10px,2.2vw,22px)] bg-[linear-gradient(180deg,#6b6e75,#3a3c41)] p-[0.45%] shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]">
          {/* bezel */}
          <div className="relative rounded-t-[clamp(9px,2vw,20px)] bg-[#060606] px-[2.4%] pt-[2.6%] pb-[3.2%]">
            {/* camera notch */}
            <div className="absolute left-1/2 top-0 z-10 flex h-[3.4%] w-[12%] -translate-x-1/2 items-center justify-center rounded-b-[clamp(4px,0.8vw,9px)] bg-[#060606]">
              <span className="size-[clamp(3px,0.45vw,6px)] rounded-full bg-[#1d2430] ring-1 ring-[#2c3644]" />
            </div>

            {/* screen */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-black">
              {children}
              {/* faint glass reflection */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_40%)]" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* hinge */}
      <div className="mx-auto h-[clamp(3px,0.5vw,6px)] w-[84%] bg-[linear-gradient(180deg,#1c1d20,#303236)]" />

      {/* base */}
      <motion.div
        className="relative mx-auto w-full"
        initial={animateOpen ? { y: 24, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative h-[clamp(10px,1.9vw,22px)] rounded-b-[45%_100%] rounded-t-[3px] bg-[linear-gradient(180deg,#9a9da3_0%,#6c6f75_45%,#45474c_100%)] shadow-[0_18px_30px_-10px_rgba(0,0,0,0.8)]">
          {/* thumb notch */}
          <div className="absolute left-1/2 top-0 h-[38%] w-[15%] -translate-x-1/2 rounded-b-[clamp(4px,0.7vw,8px)] bg-[linear-gradient(180deg,#505257,#74777d)]" />
        </div>
      </motion.div>
    </div>
  );
}
