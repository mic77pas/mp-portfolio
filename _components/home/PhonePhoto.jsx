"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { IoBatteryFull, IoCellular, IoWifi } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

// iOS-style banner drop: a soft, near-critically-damped spring in (no
// bounce), and a quicker eased tween back out
const bannerIn = { type: "spring", stiffness: 200, damping: 27, mass: 1 };
const bannerOut = { duration: 0.35, ease: [0.4, 0, 0.6, 1] };

// Phone-framed photo: on hover a notification banner slides down from the
// top of the screen carrying the caption, while the photo stays put.
export default function PhonePhoto({
  src,
  alt,
  caption,
  timezone,
  imageClassName = "object-cover",
  className = "",
}) {
  const [open, setOpen] = useState(false);

  // status-bar clock in the profile's timezone (client-only, avoids hydration drift)
  const [time, setTime] = useState(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    });
    const tick = () => setTime(fmt.format(new Date()).replace(/\s?[AP]M$/, ""));
    tick();
    const id = setInterval(tick, 30 * 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      tabIndex={0}
      aria-label={`${alt}. ${caption}`}
    >
      {/* side buttons */}
      <span className="absolute -left-[4px] top-[18%] h-[6%] w-[4px] rounded-l-[2px] bg-[#a2be9c]/70" />
      <span className="absolute -left-[4px] top-[27%] h-[10%] w-[4px] rounded-l-[2px] bg-[#a2be9c]/70" />
      <span className="absolute -left-[4px] top-[39%] h-[10%] w-[4px] rounded-l-[2px] bg-[#a2be9c]/70" />
      <span className="absolute -right-[4px] top-[30%] h-[14%] w-[4px] rounded-r-[2px] bg-[#a2be9c]/70" />

      {/* body + bezel */}
      <div className="h-full rounded-[44px] border-2 border-[#a2be9c] bg-[#1b1d1b] p-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
        {/* screen */}
        <div className="relative h-full overflow-hidden rounded-[35px] bg-black">
          {/* the photo is zoomed ~1.6x inside a ~250px screen: 430px (x2 on
              retina) lands on the ~1080px source, enough to stay sharp */}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 430px, 100vw"
            quality={85}
            className={imageClassName}
          />

          {/* legibility gradients for the status bar + home indicator */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />

          {/* status bar */}
          <div className="absolute inset-x-0 top-0 flex h-[44px] items-center justify-between px-[22px] text-white">
            <span className="w-[52px] text-center text-[13px] font-semibold leading-none tracking-tight">
              {time ?? " "}
            </span>
            <span className="flex w-[52px] items-center justify-center gap-[3px]">
              <IoCellular size={12} />
              <IoWifi size={13} />
              <IoBatteryFull size={18} />
            </span>
          </div>

          {/* notification banner (slides down from above the screen edge) */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute inset-x-[7px] top-[44px] z-10 flex items-center gap-3 rounded-[22px] bg-[#1e211e]/85 px-3 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md"
                initial={{ y: -120, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: bannerIn }}
                exit={{ y: -120, opacity: 0, transition: bannerOut }}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#a2be9c] text-[#121412]">
                  <FaMapMarkerAlt size={16} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-center justify-between gap-2 text-[10px] leading-none text-[#b6c2b4]">
                    <span className="font-semibold uppercase tracking-wide">
                      Photos
                    </span>
                    <span>now</span>
                  </span>
                  <span className="font-minecraft text-[12px] leading-tight text-white">
                    {caption}
                  </span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic Island with front camera (sits above the banner) */}
          <div className="absolute left-1/2 top-[11px] z-20 flex h-[24px] w-[84px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[7px]">
            <span className="relative size-[10px] rounded-full bg-[#0d1220] ring-1 ring-[#1f2633]">
              <span className="absolute left-[2px] top-[2px] size-[3px] rounded-full bg-[#3b4f7a]/80" />
            </span>
          </div>

          {/* home indicator */}
          <span className="absolute bottom-[8px] left-1/2 h-[4px] w-[34%] -translate-x-1/2 rounded-full bg-white/80" />
        </div>
      </div>
    </div>
  );
}
