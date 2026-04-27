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
    <div className="relative w-full overflow-hidden rounded-xl border-2 border-[#2a342a] bg-[#121612]/55 shadow-[0_6px_12px_#0b0d0b] backdrop-blur-sm">
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
      className="grid h-11 w-11 place-items-center rounded-md border-2 border-[#2a342a] bg-[#0f130f]/60 text-[#cfe0c9] shadow-[0_6px_0_#0b0d0b] transition hover:-translate-y-[1px] hover:bg-[#98B493]/15 active:translate-y-[2px] active:shadow-[0_4px_0_#0b0d0b]"
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
        <div className="flex flex-row items-center gap-2">
          {icon}
          <p className="font-minecraft text-md font-bold">{label}</p>
        </div>

        <p className="font-minecraft text-xs tracking-wide text-[#98a198]">
          {valueText}
        </p>
      </div>

      <div className="mt-2 h-3 w-full rounded-full border border-[#2a342a] bg-[#101310]">
        <div className="h-full rounded-full bg-[#9cb498]" style={{ width }} />
      </div>
    </div>
  );
}

function StatPill({ k, v, icon }: { k: string; v: string; icon?: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded border-2 border-[#617261]  bg-[#101310] px-2 py-3 text-md lg:text-xs lg:px-3 lg:py-2">
      <div className="flex items-center gap-1 text-[#a6b2a3]">
        {icon && (
          <span className="flex items-center text-lg sm:text-base lg:text-sm">
            {icon}
          </span>
        )}
        <span className="font-minecraft text-md lg:text-xs font-bold">{k}</span>
      </div>

      <span className="font-semibold text-[#cfe0c9]">{v}</span>
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
      className="
        group
        relative h-full w-full
        cursor-pointer
        place-items-center
        overflow-visible
        rounded
        border border-[#2a342a]
        bg-[#0b0e0b]
        shadow-[0_3px_0_#070907]
        transition-transform
        hover:bg-[#141a14]
        hover:shadow-[inset_0_0_0_2px_#789c78,inset_0_0_6px_rgba(152,180,147,0.45)]
        active:translate-y-0.5
        active:shadow-[0_1px_0_#070907]
        grid
      "
    >
      {icon && (
        <div className="relative z-10 text-2xl text-[#cfe0c9]">{icon}</div>
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
      className="inventory-scroll fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-xl border-2 border-[#2a342a] bg-[#0f130f]/90 shadow-[0_12px_0_#0b0d0b]">
        <div className="flex items-center justify-between border-b border-[#2a342a] px-4 py-3">
          <p className="font-minecraft text-md uppercase text-[#a6b2a3]">
            INVENTORY
          </p>
          <button
            onClick={onClose}
            className="rounded border border-[#2a342a] bg-[#0b0e0b] px-3 py-1 text-sm text-[#cfe0c9] transition hover:bg-[#141a14]"
          >
            ✕
          </button>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0b0e0b]">
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="scale-110 object-cover opacity-40 blur-xl"
            aria-hidden
            priority
          />

          <div className="absolute inset-0 bg-black/20" />

          <Image
            src={img.src}
            alt={img.alt ?? `Slide ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain"
            priority
          />

          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-md border-2 border-[#2a342a] bg-[#0b0e0b]/80 text-[#cfe0c9] shadow-[0_6px_0_#070907] transition hover:bg-[#141a14] active:shadow-[0_4px_0_#070907]"
          >
            ←
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-md border-2 border-[#2a342a] bg-[#0b0e0b]/80 text-[#cfe0c9] shadow-[0_6px_0_#070907] transition hover:bg-[#141a14] active:shadow-[0_4px_0_#070907]"
          >
            →
          </button>
        </div>

        <div className="border-t border-[#2a342a] bg-[#0f130f]/60 p-3">
          <div className="flex gap-2 overflow-x-auto pb-3">
            {images.map((im, i) => (
              <button
                key={im.src + i}
                onClick={() => onChangeIndex(i)}
                className={`relative h-12 w-20 shrink-0 rounded border-2 ${
                  i === index ? "border-[#98B493]" : "border-[#2a342a]"
                } bg-[#0b0e0b]`}
                title={`Go to ${i + 1}`}
              >
                <Image
                  src={im.src}
                  alt={im.alt ?? `Thumb ${i + 1}`}
                  fill
                  sizes="80px"
                  className="rounded object-cover"
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

  const totalSlots = 27;

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

function StatusCard({
  statusText,
  statusColor,
  dotColor,
  pingColor,
}: {
  statusText: string;
  statusColor: string;
  dotColor: string;
  pingColor: string;
}) {
  return (
    <div className="flex h-full lg:h-fit w-full pl-7 lg:pl-2 shrink-0 items-center justify-start gap-5 lg:gap-3 rounded-lg border-2 border-[#87a082] bg-[#121412] px-3 py-2">
      <span className="relative flex h-7 w-7 lg:h-3 lg:w-3">
        <span
          className={`absolute inline-flex h-full w-full rounded-full animate-ping opacity-75 ${pingColor}`}
        />
        <span
          className={`relative inline-flex h-full w-full rounded-full ${dotColor}`}
        />
      </span>

      <p
        className={`font-minecraft text-3xl lg:text-[16px] font-bold tracking-wide ${statusColor}`}
      >
        {statusText}
      </p>
    </div>
  );
}

function LevelCard() {
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center rounded-lg border-2 border-[#87a082] bg-[#262D26] px-4 py-2 text-[#C7D8C0]">
      <p className="font-minecraft font-bold tracking-[4px] drop-shadow-[0_3px_0_rgba(0,0,0,0.8)]">
        LEVEL
      </p>
      <p className="font-minecraft text-[30px] font-bold drop-shadow-[0_3px_0_rgba(0,0,0,0.8)]">
        19
      </p>
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

  const birthdayProgress = useMemo(() => {
    const today = new Date();
    const birthMonth = 6;
    const birthDay = 30;

    let lastBirthday = new Date(today.getFullYear(), birthMonth, birthDay);
    let nextBirthday = new Date(today.getFullYear() + 1, birthMonth, birthDay);

    if (today < lastBirthday) {
      lastBirthday = new Date(today.getFullYear() - 1, birthMonth, birthDay);
      nextBirthday = new Date(today.getFullYear(), birthMonth, birthDay);
    }

    const total = nextBirthday.getTime() - lastBirthday.getTime();
    const elapsed = today.getTime() - lastBirthday.getTime();

    return Math.round((elapsed / total) * 100);
  }, []);

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
    const FORCE_TEST_HOUR = null;

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

      <div className="flex w-full flex-col gap-4 rounded-xl border-2 border-[#87a082] bg-[#181B18]/90 p-4 sm:p-6 lg:flex-row lg:p-8">
        <div className="flex gap-3 lg:hidden">
          <div className="flex-1">
            <StatusCard
              statusText={statusText}
              statusColor={statusColor}
              dotColor={dotColor}
              pingColor={pingColor}
            />
          </div>

          <div className="min-w-[120px]">
            <LevelCard />
          </div>
        </div>

        <div
          className="
            relative h-[320px] w-full shrink-0 overflow-hidden rounded-lg border-2 border-[#87a082]
            after:pointer-events-none after:absolute after:inset-0 after:content-['']
            after:shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]
            sm:h-[380px] lg:h-[400px] lg:w-[280px]
          "
        >
          <Image
            src="/me.jpg"
            alt="Photo of me!"
            fill
            className="object-cover object-[center_5%] lg:object-center"
          />
        </div>

        <div className="block w-full rounded-lg border-2 border-[#87a082] bg-[#121412] p-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            <StatPill k="STR" v="09" icon={<LuSwords />} />
            <StatPill k="DEX" v="17" icon={<FaShieldAlt />} />
            <StatPill k="INT" v="15" icon={<LuBookOpen />} />
            <StatPill k="CHA" v="12" icon={<FaRegStar />} />
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:gap-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="hidden w-32 flex-col gap-4 lg:flex">
              <StatusCard
                statusText={statusText}
                statusColor={statusColor}
                dotColor={dotColor}
                pingColor={pingColor}
              />
              <LevelCard />
            </div>

            <div className="hidden w-full rounded-lg border-2 border-[#87a082] bg-[#121412] p-4 lg:block">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Bar label="HP" pct={82} icon={<FaHeart />} />
                <Bar
                  label="EXP"
  pct={birthdayProgress}
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

          <div className="flex flex-col lg:flex-1 h-fit p-3 rounded-lg border-2 border-[#87a082] bg-[#121412]">
            <p className="text-[#ccd8c2] font-minecraft">
              Hey! My name is Michael, and I&apos;m a{" "}
              <Link
                href="https://uwaterloo.ca/systems-design-engineering/"
                className="inline-flex items-center gap-1 hover:text-[#eef1eb] hover:scale-102 transition duration-200"
              >
                SYDE
              </Link>{" "}
              student at the{" "}
              <Link
                href="https://uwaterloo.ca"
                className="inline-flex items-center gap-1 hover:text-[#eef1eb] hover:scale-102 transition duration-200"
              >
                University of Waterloo
                <Image
                  src="/logos/uwaterloo.png"
                  alt="Logo"
                  width={20}
                  height={20}
                />
              </Link>{" "}
              based in both California and Toronto.
              <br />
              <br />
              I&apos;m a software engineer with full-stack experience and am
              also dabbling in other areas like AI, UI/UX, product design, and
              modelling.
              <br />
              <br />
              When I&apos;m not on the grind, I also love to go climbing,
              travelling, cooking, and am always looking to learn or take on
              something new!
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
