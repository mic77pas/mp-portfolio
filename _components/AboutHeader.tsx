"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaGuitar,
  FaGear,
  FaHeart,
  FaRegStar,
} from "react-icons/fa6";
import { FileText } from "lucide-react";
import { LuBookOpen, LuHeart, LuSwords, LuTarget } from "react-icons/lu";
import {
  FaArrowAltCircleUp,
  FaMoneyBillWaveAlt,
  FaShieldAlt,
  FaSkiing,
} from "react-icons/fa";
import { TbCampfireFilled, TbFishHook } from "react-icons/tb";
import { GiMountainClimbing } from "react-icons/gi";
import { PiPersonSimpleHikeBold } from "react-icons/pi";
import { RiSpeakFill } from "react-icons/ri";
import { CiStar } from "react-icons/ci";

function PixelPanel({ children }: { children: ReactNode }) {
  return (
    <div className="w-full bg-[#121612]/55 border-2 border-[#2a342a] shadow-[0_6px_12px_#0b0d0b] rounded-xl backdrop-blur-sm overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:100%_6px]" />
      {children}
    </div>
  );
}

function SocialIcon({
  href,
  children,
  label,
}: {
  href: string;
  children: ReactNode;
  label: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="grid place-items-center w-11 h-11 rounded-md bg-[#0f130f]/60 border-2 border-[#2a342a] shadow-[0_6px_0_#0b0d0b] text-[#cfe0c9] hover:bg-[#98B493]/15 hover:-translate-y-[1px] active:translate-y-[2px] active:shadow-[0_4px_0_#0b0d0b] transition"
    >
      {children}
    </Link>
  );
}

function Bar({
  label,
  valueText,
  pct,
  icon,
}: {
  label: string;
  valueText?: string;
  pct: number;
  icon: ReactNode;
}) {
  const width = `${Math.max(0, Math.min(100, pct))}%`;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-[#cfe0c9]">
        <div className="flex flex-row gap-2 items-center">
          {icon}
          <p className="font-minecraft font-bold text-md">{label}</p>
        </div>

        <p className="text-xs font-minecraft text-[#98a198] tracking-wide">
          {valueText}
        </p>
      </div>
      <div className="mt-2 h-3 w-full bg-[#101310] border border-[#2a342a] rounded-full">
        <div className="h-full bg-[#9cb498] rounded-full" style={{ width }} />
      </div>
    </div>
  );
}

function StatPill({ k, v, icon }: { k: string; v: string; icon?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-[#101310] border border-[#2a342a] rounded text-xs">
      {/* Left: icon + label grouped */}
      <div className="flex items-center gap-1 text-[#a6b2a3]">
        {icon && <span className="flex items-center">{icon}</span>}
        <span className="text-xs font-minecraft font-bold">{k}</span>
      </div>

      {/* Right: value */}
      <span className="text-[#cfe0c9] font-semibold">{v}</span>
    </div>
  );
}

function InventorySlot({
  icon,
  label,
  onClick,
  href,
}: {
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <div
      onClick={onClick}
      className={`
  group
  relative w-full h-full
  rounded
  bg-[#0b0e0b]
  border border-[#2a342a]
  shadow-[0_3px_0_#070907]
  overflow-visible
  grid place-items-center
  cursor-pointer
  hover:bg-[#141a14]
  hover:shadow-[inset_0_0_0_2px_#789c78,inset_0_0_6px_rgba(152,180,147,0.45)]
  active:translate-y-0.5
  active:shadow-[0_1px_0_#070907]
  transition-transform
`}
    >
      {/* <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2
  opacity-0 group-hover:opacity-100 transition
  text-[11px] text-[#cfe0c9] bg-black/90
  px-2 py-1 rounded border border-[#2a342a] shadow-[0_3px_0_#070907]
  whitespace-nowrap z-50"
      >
        {label}
      </div> */}
      {icon && (
        <div className="relative text-[#cfe0c9] text-2xl z-10">{icon}</div>
      )}
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        title={label}
      >
        {content}
      </Link>
    );
  }

  return content;
}

function SlideshowModal({
  open,
  images,
  index,
  onClose,
  onChangeIndex,
}: {
  open: boolean;
  images: { src: string; alt?: string }[];
  index: number;
  onClose: () => void;
  onChangeIndex: (next: number) => void;
}) {
  // close on escape + arrow key navigation
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        onChangeIndex((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChangeIndex((index + 1) % images.length);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, index, images.length, onClose, onChangeIndex]);

  if (!open) return null;

  const prev = () => onChangeIndex((index - 1 + images.length) % images.length);
  const next = () => onChangeIndex((index + 1) % images.length);

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm grid place-items-center p-4 inventory-scroll"
      onMouseDown={(e) => {
        // close when clicking the backdrop (not the modal)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl bg-[#0f130f]/90 border-2 border-[#2a342a] rounded-xl shadow-[0_12px_0_#0b0d0b] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a342a]">
          <p className="text-md uppercase text-[#a6b2a3] font-minecraft">
            INVENTORY
          </p>
          <button
            onClick={onClose}
            className="text-[#cfe0c9] text-sm px-3 py-1 rounded border border-[#2a342a] bg-[#0b0e0b] hover:bg-[#141a14] transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="relative w-full aspect-[16/9] bg-[#0b0e0b] overflow-hidden">
          {/* Blurred stretched background */}
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover scale-110 blur-xl opacity-40"
            aria-hidden
            priority
          />

          {/* Optional dark overlay to improve contrast */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Foreground main image */}
          <Image
            src={img.src}
            alt={img.alt ?? `Slide ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain"
            priority
          />

          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2
      w-11 h-11 grid place-items-center rounded-md
      bg-[#0b0e0b]/80 border-2 border-[#2a342a]
      shadow-[0_6px_0_#070907]
      text-[#cfe0c9]
      hover:bg-[#141a14] active:shadow-[0_4px_0_#070907]
      transition"
          >
            ←
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2
      w-11 h-11 grid place-items-center rounded-md
      bg-[#0b0e0b]/80 border-2 border-[#2a342a]
      shadow-[0_6px_0_#070907]
      text-[#cfe0c9]
      hover:bg-[#141a14] active:shadow-[0_4px_0_#070907]
      transition"
          >
            →
          </button>
        </div>

        {/* Thumbnails */}
        <div className="p-3 border-t border-[#2a342a] bg-[#0f130f]/60">
          <div className="flex gap-2 overflow-x-auto pb-3">
            {images.map((im, i) => (
              <button
                key={im.src + i}
                onClick={() => onChangeIndex(i)}
                className={`relative w-20 h-12 shrink-0 rounded border-2 ${
                  i === index ? "border-[#98B493]" : "border-[#2a342a]"
                } bg-[#0b0e0b]`}
                title={`Go to ${i + 1}`}
              >
                <Image
                  src={im.src}
                  alt={im.alt ?? `Thumb ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryGrid({ onOpenAt }: { onOpenAt: (index: number) => void }) {
  const items = [
    { slot: 0, icon: <TbCampfireFilled />, label: "GitHub", openAt: 0 },
    { slot: 1, icon: <GiMountainClimbing />, label: "LinkedIn", openAt: 1 },
    { slot: 2, icon: <TbFishHook />, label: "Projects", openAt: 2 },
    { slot: 3, icon: <FaGuitar />, label: "Resume", openAt: 3 },
    { slot: 4, icon: <FaGear />, label: "", openAt: 4 },
    { slot: 5, icon: <FaSkiing />, label: "", openAt: 5 },
    { slot: 6, icon: <PiPersonSimpleHikeBold />, label: "", openAt: 6 },
    { slot: 7, icon: <RiSpeakFill />, label: "", openAt: 7 },
    { slot: 8, icon: <FaMoneyBillWaveAlt />, label: "", openAt: 8 },
  ];

  const totalSlots = 27; // 27 + 9

  return (
    <div className="grid grid-cols-9 gap-2">
      {Array.from({ length: totalSlots }).map((_, i) => {
        const item = items.find((x) => x.slot === i);

        return (
          <div key={i} className="aspect-square">
            <InventorySlot
              icon={item?.icon}
              label={item?.label}
              onClick={item ? () => onOpenAt(item.openAt) : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AboutHeader() {
  const galleryImages = useMemo(
    () => [
      { src: "/gallery/campfire.jpg", alt: "Cottage Shot" },
      { src: "/gallery/climbing.jpg", alt: "Climbing Shot" },
      { src: "/gallery/fishing.jpg", alt: "Fishing Shot" },
      { src: "/gallery/guitar.jpg", alt: "Guitar Shot" },
      { src: "/gallery/helmet.jpg", alt: "Helmet Shot" },
      { src: "/gallery/skiing.jpg", alt: "Skiing Shot" },
      { src: "/gallery/hiking.jpg", alt: "Hiking Shot" },
      { src: "/gallery/tedxuw.jpg", alt: "TEDxUW Shot" },
      { src: "/gallery/velocity.jpg", alt: "Velocity Shot" },
    ],
    [],
  );

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGalleryAt = (i: number) => {
    setGalleryIndex(i);
    setGalleryOpen(true);
  };
  const [isOfflineHours, setIsOfflineHours] = useState(false);

  const age = useMemo(() => {
    const birthDate = new Date(2006, 6, 30);

    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      years -= 1;
    }

    return years;
  }, []);

  useEffect(() => {
    const FORCE_TEST_HOUR = null; // 14 or 2
    const computeStatus = () => {
      const laHour =
        FORCE_TEST_HOUR ??
        Number(
          new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            hour12: false,
            timeZone: "America/Los_Angeles",
          }).format(new Date()),
        );

      setIsOfflineHours(laHour >= 0 && laHour < 6);
    };

    computeStatus();
    const t = window.setInterval(computeStatus, 60_000);
    return () => window.clearInterval(t);
  }, []);

  const statusText = isOfflineHours ? "Offline" : "Online";
  const statusColor = isOfflineHours ? "text-[#dfc241]" : "text-[#cfe0c9]";
  const dotColor = isOfflineHours ? "bg-[#d6b72f]" : "bg-[#98B493]";
  const pingColor = isOfflineHours ? "bg-[#d6b72f]/70" : "bg-[#98B493]/70";

  return (
    <motion.section
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full"
    >
      <SlideshowModal
        open={galleryOpen}
        images={galleryImages}
        index={galleryIndex}
        onClose={() => setGalleryOpen(false)}
        onChangeIndex={setGalleryIndex}
      />

      <div className="flex flex-row gap-4 bg-[#181B18]/90 border-2 border-[#87a082] rounded-xl w-full p-8 ">
        <div
          className="relative w-[280px] h-[400px] overflow-hidden rounded-lg
      after:content-[''] after:absolute after:inset-0 
      after:shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] after:pointer-events-none border-2 border-[#87a082]"
        >
          <Image
            src="/me.jpg"
            alt="Photo of me!"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-32 gap-4">
              <div className="flex w-full h-fit py-1 pl-3 items-center justify-start gap-3 shrink-0 bg-[#121412] border-2 border-[#87a082] rounded-lg">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full animate-ping opacity-75 ${pingColor}`}
                  />
                  <span
                    className={`relative inline-flex h-3 w-3 rounded-full ${dotColor}`}
                  />
                </span>
                <p
                  className={`text-md font-minecraft font-bold tracking-wide ${statusColor}`}
                >
                  {statusText}
                </p>
              </div>
              <div className="flex flex-col w-full h-fit pt-1 px-4 items-center justify-start shrink-0 bg-[#262D26] border-2 border-[#87a082] rounded-lg text-[#C7D8C0] font-minecraft font-bold">
                <p className="ml-2 tracking-[4px] drop-shadow-[0_3px_0_rgba(0,0,0,0.8)]">
                  LEVEL
                </p>
                <p className="text-[30px] drop-shadow-[0_3px_0_rgba(0,0,0,0.8)]">
                  19
                </p>
              </div>
            </div>
            <div className="w-full rounded-lg border-2 border-[#87a082] bg-[#121412] p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Bar label="HP" pct={82} icon={<FaHeart />} />
                <Bar
                  label="EXP"
                  pct={70}
                  icon={<FaArrowAltCircleUp />}
                  valueText={"Lvl. up on July 30th!"}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <StatPill k="STR" v="09" icon={<LuSwords size={14} />} />
                <StatPill k="DEX" v="17" icon={<FaShieldAlt size={14} />} />
                <StatPill k="INT" v="15" icon={<LuBookOpen size={14} />} />
                <StatPill k="CHA" v="12" icon={<FaRegStar size={14} />} />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col rounded-lg border-2 border-[#87a082] bg-[#121412]"></div>
        </div>
      </div>
    </motion.section>
  );
}
