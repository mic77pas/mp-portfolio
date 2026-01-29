"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { MapPin, Shield, Sparkles, Sword, Zap } from "lucide-react";

type StatRow = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

const quickStats: StatRow[] = [
  { label: "Base", value: "Toronto ↔ California", icon: <MapPin size={16} /> },
  { label: "Class", value: "SYDE @ UWaterloo", icon: <Shield size={16} /> },
  { label: "Guild", value: "ParkUsher", icon: <Sword size={16} /> },
  { label: "Build", value: "Frontend • UX • AI", icon: <Sparkles size={16} /> },
];

const StatChip = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <div
    className="
      flex items-start gap-3
      p-3
      bg-[#0f130f]/55
      border-2 border-[#2a342a]
      rounded-lg
      shadow-[0_8px_0_#0b0d0b]
    "
  >
    <div
      className="
        mt-0.5
        w-8 h-8
        flex items-center justify-center
        bg-[#98B493]/10
        border-2 border-[#98B493]/40
        rounded-md
        text-[#cfe0c9]
        shrink-0
      "
    >
      {icon ?? <Zap size={16} />}
    </div>

    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#a6b2a3]/90">
        {label}
      </p>
      <p className="text-[#cfe0c9] leading-snug break-words">{value}</p>
    </div>
  </div>
);

const PixelPanel = ({ children }: { children: React.ReactNode }) => (
  <div
    className="
      w-full
      bg-[#121612]/55
      border-2 border-[#2a342a]
      shadow-[0_10px_0_#0b0d0b]
      rounded-xl
      backdrop-blur-sm
      overflow-hidden
      relative
    "
  >
    {/* scanlines */}
    <div
      className="
        pointer-events-none absolute inset-0
        opacity-[0.10]
        bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        bg-[length:100%_6px]
      "
    />
    {children}
  </div>
);

const PixelButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <Link
    href={href}
    className="
      inline-flex items-center justify-center gap-2
      px-3 py-2
      bg-[#98B493]/15
      border-2 border-[#98B493]/60
      text-[#cfe0c9]
      rounded-md
      shadow-[0_6px_0_#0f120f]
      hover:bg-[#98B493]/25
      hover:-translate-y-[1px]
      active:translate-y-[2px]
      active:shadow-[0_4px_0_#0f120f]
      transition
      text-sm
      w-full
    "
  >
    {children}
  </Link>
);

const SocialButtons = ({ className = "" }: { className?: string }) => (
  <div className={`grid grid-cols-2 gap-3 ${className}`}>
    <PixelButton href="https://www.linkedin.com">
      <FaLinkedin />
      LinkedIn
    </PixelButton>
    <PixelButton href="https://github.com">
      <FaGithub />
      GitHub
    </PixelButton>
    <PixelButton href="https://www.instagram.com">
      <FaInstagram />
      Instagram
    </PixelButton>
    <PixelButton href="/resume">
      <span className="font-minecraft">▣</span> Resume
    </PixelButton>
  </div>
);

const Bar = ({
  label,
  valueText,
  pct,
}: {
  label: string;
  valueText: string;
  pct: number; // 0-100
}) => (
  <div className="w-full">
    <div className="flex items-center justify-between gap-3">
      <p className="font-minecraft text-sm text-[#cfe0c9]">{label}</p>
      <p className="text-xs text-[#a6b2a3] tracking-wide">{valueText}</p>
    </div>
    <div className="mt-2 h-2.5 w-full bg-[#101310] border border-[#2a342a] rounded">
      <div
        className="h-full bg-[#98B493]/60 rounded"
        style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
      />
    </div>
  </div>
);

export default function AboutHeader() {
  const [isOfflineHours, setIsOfflineHours] = useState(false);

  useEffect(() => {
    const computeStatus = () => {
      // === CALIFORNIA TIME (ACTIVE) ===
      const laHour = Number(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          hour12: false,
          timeZone: "America/Los_Angeles",
        }).format(new Date()),
      );

      setIsOfflineHours(laHour >= 0 && laHour < 6);

      // === TORONTO TIME (COMMENTED — swap if needed) ===
      /*
      const torontoHour = Number(
        new Intl.DateTimeFormat("en-CA", {
          hour: "numeric",
          hour12: false,
          timeZone: "America/Toronto",
        }).format(new Date())
      );

      setIsOfflineHours(torontoHour >= 0 && torontoHour < 6);
      */
    };

    // 🔧 FORCE MODE FOR TESTING
    // setIsOfflineHours(true); // FORCE OFFLINE
    // setIsOfflineHours(false); // FORCE ONLINE
    // return;

    computeStatus();

    // Update every minute so it flips exactly at 6:00am
    const interval = window.setInterval(computeStatus, 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <PixelPanel>
        {/* TOP HUD BANNER */}
        <div
          className="
            px-5 sm:px-6 py-4
            bg-[#0f130f]/70
            border-b-2 border-[#2a342a]
            flex items-center justify-between gap-4
          "
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-3 h-3 bg-[#98B493]/70 border border-[#2a342a] shrink-0" />
            <p className="text-xs uppercase tracking-[0.28em] text-[#a6b2a3] truncate">
              PLAYER PROFILE // MP-001
            </p>
          </div>

          {/* ONLINE PING */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span
                className={[
                  "absolute inline-flex h-full w-full rounded-full animate-ping opacity-75",
                  isOfflineHours ? "bg-red-500/70" : "bg-[#98B493]/70",
                ].join(" ")}
              />
              <span
                className={[
                  "relative inline-flex h-2 w-2 rounded-full",
                  isOfflineHours ? "bg-red-500" : "bg-[#98B493]",
                ].join(" ")}
              />
            </span>

            <p
              className={[
                "text-xs tracking-wide font-minecraft",
                isOfflineHours ? "text-red-300" : "text-[#cfe0c9]",
              ].join(" ")}
            >
              {isOfflineHours ? "OFFLINE" : "ONLINE"}
            </p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* LEFT: Avatar + socials (desktop) */}
            <div className="w-full lg:w-[320px] shrink-0">
              <div className="flex flex-col items-center lg:items-start">
                {/* IMAGE ONLY (no frame items) */}
                <div
                  className="
    relative w-[280px] h-[358px]
    sm:w-[300px] sm:h-[385px]
    group cursor-pointer
    transition-transform duration-300
    hover:-rotate-1 hover:scale-[1.01]
  "
                >
                  <Image
                    src="/profile3.png"
                    alt="Profile"
                    fill
                    priority
                    className="object-cover rounded-md hover:brightness-120 transform-transition duration-300"
                  />
                </div>

                {/* SOCIALS under image on desktop */}
                <SocialButtons className="mt-6 w-[280px] sm:w-[300px] hidden lg:grid" />

                {/* Mobile name block */}
                <div className="mt-6 lg:hidden text-center w-full">
                  <h1 className="text-3xl sm:text-4xl font-minecraft text-[#cfe0c9] leading-tight">
                    Michael Pasyechnyk
                  </h1>
                  <p className="mt-2 text-[#a6b2a3] tracking-wide">
                    engineering student • builder • designer-ish
                  </p>

                  {/* SOCIALS below name on mobile */}
                  <SocialButtons className="mt-5 w-full max-w-[360px] mx-auto lg:hidden" />
                </div>
              </div>
            </div>

            {/* RIGHT: HUD info */}
            <div className="flex-1 w-full">
              {/* Desktop name + title row */}
              <div className="hidden lg:flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-4xl xl:text-5xl font-minecraft text-[#cfe0c9] leading-tight">
                    Michael Pasyechnyk
                  </h1>
                  <p className="mt-2 text-[#a6b2a3] tracking-wide">
                    engineering student • builder • designer-ish
                  </p>
                </div>

                <div
                  className="
                    shrink-0
                    px-3 py-2
                    bg-[#0f130f]/80
                    border-2 border-[#2a342a]
                    rounded-lg
                    shadow-[0_8px_0_#0b0d0b]
                    text-right
                  "
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#a6b2a3]/90">
                    Title
                  </p>
                  <p className="text-[#cfe0c9] font-minecraft text-sm">
                    “Systems Designer”
                  </p>
                </div>
              </div>

              {/* Bars */}
              <div
                className="
                  mt-5
                  p-4
                  bg-[#0f130f]/55
                  border-2 border-[#2a342a]
                  rounded-lg
                  shadow-[0_8px_0_#0b0d0b]
                "
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Bar label="HP" valueText="Focused / Consistent" pct={82} />
                  <Bar label="XP" valueText="Shipping weekly" pct={64} />
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="px-3 py-2 bg-[#101310] border border-[#2a342a] rounded text-xs text-[#a6b2a3]">
                    STR <span className="text-[#cfe0c9]">07</span>
                  </div>
                  <div className="px-3 py-2 bg-[#101310] border border-[#2a342a] rounded text-xs text-[#a6b2a3]">
                    DEX <span className="text-[#cfe0c9]">14</span>
                  </div>
                  <div className="px-3 py-2 bg-[#101310] border border-[#2a342a] rounded text-xs text-[#a6b2a3]">
                    INT <span className="text-[#cfe0c9]">16</span>
                  </div>
                  <div className="px-3 py-2 bg-[#101310] border border-[#2a342a] rounded text-xs text-[#a6b2a3]">
                    CHA <span className="text-[#cfe0c9]">12</span>
                  </div>
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickStats.map((s) => (
                  <StatChip
                    key={s.label}
                    label={s.label}
                    value={s.value}
                    icon={s.icon}
                  />
                ))}
              </div>

              {/* Loadout row */}
              <div
                className="
                  mt-5
                  p-4
                  bg-[#0f130f]/55
                  border-2 border-[#2a342a]
                  rounded-lg
                  shadow-[0_8px_0_#0b0d0b]
                "
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-minecraft text-sm text-[#cfe0c9]">
                    Loadout
                  </p>
                  <p className="text-xs text-[#a6b2a3] tracking-[0.18em] uppercase">
                    Equipped Skills
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-2 bg-[#101310] border border-[#2a342a] rounded text-sm text-[#cfe0c9]">
                    Next.js
                  </span>
                  <span className="px-3 py-2 bg-[#101310] border border-[#2a342a] rounded text-sm text-[#cfe0c9]">
                    React
                  </span>
                  <span className="px-3 py-2 bg-[#101310] border border-[#2a342a] rounded text-sm text-[#cfe0c9]">
                    UI Systems
                  </span>
                  <span className="px-3 py-2 bg-[#101310] border border-[#2a342a] rounded text-sm text-[#cfe0c9]">
                    Product Thinking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PixelPanel>
    </motion.section>
  );
}
