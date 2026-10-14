"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LuBookOpen, LuSwords } from "react-icons/lu";
import { FaRegStar, FaShieldAlt } from "react-icons/fa";
import PhotoCard from "../PhotoCard";
import PhonePhoto from "./PhonePhoto";
import { scrollToAbout } from "../AboutLink";
import { profile } from "../../data/profile";

const STAT_ICONS = {
  STR: LuSwords,
  DEX: FaShieldAlt,
  INT: LuBookOpen,
  CHA: FaRegStar,
};

const DAY_MS = 24 * 60 * 60 * 1000;

// Wall-clock parts for `date` in `timeZone`, as plain numbers.
function zonedParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

function computeStats(now) {
  const { birthday, timezone, wakeHour, sleepHour } = profile;
  const [bYear, bMonth, bDay] = birthday.split("-").map(Number);
  const today = zonedParts(now, timezone);

  // Level = age; EXP = how far through the current year of age
  const hadBirthday =
    today.month > bMonth || (today.month === bMonth && today.day >= bDay);
  const level = today.year - bYear - (hadBirthday ? 0 : 1);
  const lastYear = hadBirthday ? today.year : today.year - 1;
  const last = Date.UTC(lastYear, bMonth - 1, bDay);
  const next = Date.UTC(lastYear + 1, bMonth - 1, bDay);
  const todayUtc = Date.UTC(today.year, today.month - 1, today.day);
  const exp = Math.min(1, (todayUtc - last + DAY_MS / 2) / (next - last));

  // HP drains over the waking day; Online while there's HP left
  const hourNow = today.hour + today.minute / 60;
  const awake = hourNow >= wakeHour && hourNow < sleepHour;
  const hp = awake ? 1 - (hourNow - wakeHour) / (sleepHour - wakeHour) : 0;

  return { level, exp, hp, online: awake };
}

const birthdayLabel = (() => {
  const [, m, d] = profile.birthday.split("-").map(Number);
  const month = new Date(2000, m - 1, 1).toLocaleString("en-US", {
    month: "long",
  });
  const suffix =
    d % 10 === 1 && d !== 11
      ? "st"
      : d % 10 === 2 && d !== 12
        ? "nd"
        : d % 10 === 3 && d !== 13
          ? "rd"
          : "th";
  return `${month} ${d}${suffix}`;
})();

function Bar({ value }) {
  return (
    <div className="h-[14px] w-full rounded-[18px] bg-[#303830] overflow-hidden">
      <motion.div
        className="h-full rounded-[18px] bg-[#a2be9c]"
        initial={{ width: 0 }}
        animate={{ width: `${Math.round((value ?? 0) * 100)}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

const panel = "border-2 border-[#a2be9c] rounded-[12px]";

// Renders [label](url) markers in bio text as links
function BioText({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <a
        key={i}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#e6f2e1] transition-colors hover:text-white"
      >
        {m[1]}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}

export default function ProfileCard() {
  // Time-based values are computed client-side only to avoid hydration
  // mismatches between server and visitor clocks.
  const [stats, setStats] = useState(null);

  // arriving via /#about from another page: scroll once the page has laid out
  useEffect(() => {
    if (window.location.hash !== "#about") return;
    const id = setTimeout(() => {
      scrollToAbout();
      history.replaceState(history.state, "", "/");
    }, 100);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const update = () => setStats(computeStats(new Date()));
    update();
    const id = setInterval(update, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="about"
      className="grid grid-cols-1 md:grid-cols-[255px_1fr] gap-[14px] md:gap-x-[18px] w-full scroll-mt-28"
    >
      {/* phone mockup on wider screens; plain lift-up photo card on mobile */}
      <PhonePhoto
        src={profile.photo}
        alt="Michael climbing at Niagara Glen"
        caption={profile.photoCaption}
        timezone={profile.timezone}
        imageClassName="object-cover scale-[1.6] origin-[43%_54%]"
        className="hidden md:block md:min-h-[407px] cursor-pointer outline-none"
      />
      <PhotoCard
        src={profile.photo}
        alt="Michael climbing at Niagara Glen"
        caption={profile.photoCaption}
        sizes="160vw"
        imageClassName="object-cover scale-[1.6] origin-[43%_54%]"
        className="h-[360px] md:hidden"
      />

      <div className="grid grid-rows-[auto_1fr] gap-[14px] min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-[151px_1fr] gap-[14px]">
          <div className="grid grid-cols-2 gap-[14px] sm:flex sm:flex-col">
            <div
              className={`${panel} bg-[#121412] h-[42px] self-start w-full flex items-center gap-[10px] px-[12px]`}
            >
              <span className="relative flex size-[14px] shrink-0">
                {stats?.online && (
                  <span className="absolute inset-0 rounded-full bg-[#a2be9c]/70 animate-ping" />
                )}
                <span
                  className={[
                    "relative size-full rounded-full transition-colors",
                    stats?.online ? "bg-[#c1dab6]" : "bg-[#5c645a]",
                  ].join(" ")}
                />
              </span>
              <span className="font-minecraft font-bold text-[16px] leading-none text-[#c1dab6]">
                {stats ? (stats.online ? "Online" : "Offline") : " "}
              </span>
            </div>

            <div
              className={`${panel} bg-[#262d26] min-h-[84px] sm:flex-1 flex flex-col items-center justify-center font-minecraft font-bold text-[#c7d8c0] [text-shadow:0px_2px_0px_rgba(0,0,0,0.5)]`}
            >
              <span className="text-[16px] leading-none tracking-[2.6px] pl-[2.6px]">
                LEVEL
              </span>
              <span className="text-[32px] leading-none mt-2">
                {stats?.level ?? " "}
              </span>
            </div>
          </div>

          <div
            className={`${panel} bg-[#121412] p-[14px] flex flex-col justify-between gap-3 min-w-0`}
          >
            <div className="grid grid-cols-2 gap-[18px]">
              <div className="flex flex-col gap-[10px]">
                <span className="font-minecraft font-bold text-[14px] text-white">
                  HP
                </span>
                <Bar value={stats?.hp} />
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-minecraft font-bold text-[14px] text-white">
                    EXP
                  </span>
                  <span className="font-minecraft text-[10px] text-[#b1b1b1] truncate">
                    Lvl. up on {birthdayLabel}!
                  </span>
                </div>
                <Bar value={stats?.exp} />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[14px]">
              {profile.stats.map(({ key, value }) => {
                const Icon = STAT_ICONS[key];
                return (
                  <div
                    key={key}
                    className="h-[36px] rounded-[6px] border border-[#c1dab6] bg-[#1a1c1a] flex items-center justify-between gap-2 px-3 min-w-0"
                  >
                    <span className="flex items-center gap-1.5 text-[#a6b2a3]">
                      {Icon && <Icon size={15} className="shrink-0" />}
                      <span className="font-minecraft font-bold text-[14px] leading-none">
                        {key}
                      </span>
                    </span>
                    <span className="font-minecraft font-bold text-[15px] leading-none text-[#c1dab6]">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={`${panel} bg-[#121412] px-3 py-3 font-minecraft text-[16px] md:text-[18px] text-[#c7dac3] flex flex-col gap-[1.2em]`}
        >
          {profile.bio.map((p) => (
            <p key={p}>
              <BioText text={p} />
            </p>
          ))}
          <Link
            href="/about"
            className="group mt-auto self-end flex h-9 items-center gap-2 rounded-[8px] border-2 border-[#a2be9c] bg-[#262d26] px-3 text-[14px] leading-none text-[#c1dab6] transition-colors hover:bg-[#33402f] hover:text-white"
          >
            See more
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
