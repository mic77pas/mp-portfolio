"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Tab = "work" | "education";

type WorkItem = {
  title: string;
  org: string;
  date?: string;
  iconSrc?: string;
  iconAlt?: string;
  href?: string;
};

type CourseItem = {
  title: string;
  href?: string;
};

type EducationGroup = {
  org: string;
  iconSrc?: string;
  iconAlt?: string;
  href?: string; // org link
  date?: string;
  description?: React.ReactNode;
  timeline?: {
    labels: string[]; // e.g. ["1A","Co-op","1B"...]
    activeIndex?: number; // optional for highlighting
  };
  courses?: CourseItem[];
};

const workData: WorkItem[] = [
  {
    title: "Software Engineer Intern",
    org: "ParkUsher",
    date: "Jan 2026 – Present",
    iconSrc: "/logos/experience/parkusher.png",
    href: "https://www.parkusher.app/",
  },
  {
    title: "Software Engineer Intern",
    org: "IpserLab",
    date: "May 2025 – Aug 2025",
    iconSrc: "/logos/experience/ipserlab.jpg",
    href: "https://ipserlab.com",
  },
];

const educationGroups: EducationGroup[] = [
  {
    org: "University of Waterloo",
    iconSrc: "/logos/uwaterloo.png",
    href: "https://uwaterloo.ca/systems-design-engineering/",
    date: "2025 – 2030",
    description: <>BASc, Systems Design Engineering (SYDE)</>,
    timeline: {
      labels: [
        "1A",
        "Co-op",
        "1B",
        "Co-op",
        "2A",
        "Co-op",
        "2B",
        "Co-op",
        "3A",
        "Co-op",
        "3B",
        "Co-op",
        "4A",
        "4B",
      ],
    },
  },
  {
    org: "Harvard CS50",
    iconSrc: "/logos/harvardlogo.png",
    courses: [
      {
        title: "Web Programming w/ Python and JavaScript",
        href: "https://cs50.harvard.edu/web/",
      },
      {
        title: "Introduction to Programming w/ Python",
        href: "https://cs50.harvard.edu/python/",
      },
    ],
  },
  {
    org: "Udemy",
    iconSrc: "/logos/udemy.png",
    courses: [
      { title: "TypeScript Fundamentals" },
      { title: "Modern React & Front-End Development" },
    ],
  },
];

function PlusBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[2px] font-minecraft text-[#80967d]">■</span>
      <span className="text-[#D9DED8] leading-6">{children}</span>
    </li>
  );
}

function Icon({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;

  return (
    <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden bg-[#0F1511] ring-2 ring-[#2B352A] shadow-[0px_4px_10px_rgba(0,0,0,0.6)]">
      <Image src={src} alt={alt} fill sizes="44px" className="object-cover" />
    </div>
  );
}

function RowLink({
  href,
  children,
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!href) return <div className={className}>{children}</div>;
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}

function WorkRow({ item }: { item: WorkItem }) {
  return (
    <RowLink
      href={item.href}
      className="block w-full hover:bg-white/5 transition"
    >
      <div className="w-full flex items-center gap-4 py-4 px-4 sm:px-5">
        <Icon src={item.iconSrc} alt={item.iconAlt ?? item.org} />

        <div className="min-w-0">
          <p className="font-minecraft text-[18px] text-white truncate">
            {item.org}
          </p>
          <p className="text-[#C9D1C8] text-sm truncate">{item.title}</p>
        </div>

        <div className="ml-auto flex items-center gap-4 shrink-0">
          {item.date ? (
            <p className="text-[#93A093] text-sm hidden sm:block">
              {item.date}
            </p>
          ) : null}
          {item.href ? (
            <ArrowUpRight className="text-[#cfe0c9] opacity-80" size={18} />
          ) : null}
        </div>
      </div>
    </RowLink>
  );
}

/**
 * Optimized UW timeline chips
 * - Uses data array
 * - Keeps your exact “purple active” + “muted bordered” look
 * - Optional: pass activeIndex if you ever want one highlighted
 */
function UWTimelineChips({
  labels,
  activeIndex,
}: {
  labels: string[];
  activeIndex?: number;
}) {
  return (
    <div className="hidden lg:flex flex-row justify-start mt-4 w-fit rounded-full shadow-[0px_4px_6px_rgba(0,0,0,0.5)] overflow-hidden">
      {labels.map((label, i) => {
        const isActive = activeIndex != null ? i === activeIndex : i < 2; // default: first two like your old example
        const isFirst = i === 0;
        const isLast = i === labels.length - 1;

        const base = "w-14 h-7 flex items-center justify-center text-center";
        const round = isFirst
          ? "rounded-l-full"
          : isLast
            ? "rounded-r-full"
            : "";
        const classes = isActive
          ? "bg-[#b176a2] hover:bg-[#c4a1bb]"
          : "bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border";

        const textClass = isActive
          ? "text-[#ffffff] text-xs font-semibold"
          : "text-[#94758d] text-xs font-semibold";

        return (
          <div
            key={`${label}-${i}`}
            className={[base, classes, round].join(" ")}
          >
            <p className={textClass}>{label}</p>
          </div>
        );
      })}
    </div>
  );
}

function EducationGroupCard({ group }: { group: EducationGroup }) {
  const header = (
    <div className="py-4 px-4 sm:px-5">
      <div className="flex items-start gap-4">
        <Icon src={group.iconSrc} alt={group.iconAlt ?? group.org} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-minecraft text-[20px] text-white drop-shadow-[0px_2px_0px_rgba(0,0,0,0.6)] truncate">
                {group.org}
              </h3>
              {group.description ? (
                <p className="text-[#C9D1C8] text-md mt-1">
                  {group.description}
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {group.date ? (
                <p className="text-[#93A093] text-sm">{group.date}</p>
              ) : null}
              {group.href ? (
                <ArrowUpRight className="text-[#cfe0c9] opacity-80" size={18} />
              ) : null}
            </div>
          </div>

          {group.timeline ? (
            <UWTimelineChips
              labels={group.timeline.labels}
              activeIndex={group.timeline.activeIndex}
            />
          ) : null}

          {group.courses?.length ? (
            <ul className="mt-3 space-y-2">
              {group.courses.map((c, i) => (
                <PlusBullet key={`${c.title}-${i}`}>
                  {c.href ? (
                    <Link
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="no-underline decoration-white/20 hover:decoration-white/60 transition"
                    >
                      {c.title}
                    </Link>
                  ) : (
                    c.title
                  )}
                </PlusBullet>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );

  // whole card links to org, but course links still work (nested links are bad)
  // so we only wrap the header if there are NO inner course links,
  // otherwise we keep it unwrapped and show arrow as a normal link.
  const hasCourseLinks = !!group.courses?.some((c) => c.href);

  if (!group.href || hasCourseLinks) return header;

  return (
    <Link
      href={group.href}
      target="_blank"
      rel="noreferrer"
      className="block hover:bg-white/5 transition"
    >
      {header}
    </Link>
  );
}

export default function ExperienceSection() {
  const [tab, setTab] = useState<Tab>("work");

  const items = useMemo(() => {
    if (tab === "work") return workData;
    return educationGroups;
  }, [tab]);

  return (
    <section className="w-full flex flex-col items-center mb-16">
      {/* Tabs */}
      <div className="relative w-full rounded-2xl border border-[#384438] bg-[#0E120E]/70 shadow-[0px_10px_30px_rgba(0,0,0,0.55)]">
        <div className="relative p-2">
          <div
            className={[
              "absolute inset-y-2 left-2 w-[calc(50%-0.5rem)] rounded-xl bg-[#a4bd94] shadow-[0px_4px_10px_rgba(0,0,0,0.4)]",
              "transition-transform duration-300",
              tab === "work" ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
          />

          <div className="relative grid grid-cols-2">
            <button
              type="button"
              onClick={() => setTab("work")}
              className={[
                "py-3 cursor-pointer font-minecraft font-bold text-[20px] rounded-xl transition-colors",
                tab === "work"
                  ? "text-[#202520]"
                  : "text-[#E6EDE5] hover:text-white",
              ].join(" ")}
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => setTab("education")}
              className={[
                "py-3 cursor-pointer font-minecraft font-bold text-[20px] rounded-xl transition-colors",
                tab === "education"
                  ? "text-[#202520]"
                  : "text-[#E6EDE5] hover:text-white",
              ].join(" ")}
            >
              Education
            </button>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="mt-6 w-full rounded-2xl border border-[#384438] bg-[#0E120E]/75 shadow-[0px_18px_40px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="divide-y divide-[#2a342a]">
          {tab === "work"
            ? (items as WorkItem[]).map((item, idx) => (
                <WorkRow key={`${item.org}-${idx}`} item={item} />
              ))
            : (items as EducationGroup[]).map((g, idx) => (
                <EducationGroupCard key={`${g.org}-${idx}`} group={g} />
              ))}
        </div>
      </div>
    </section>
  );
}
