"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

type Tab = "work" | "education";

type ExperienceItem = {
  role: string;
  org: string;
  date: string;
  bullets: string[];
  iconSrc?: string;
  iconAlt?: string;
};

const workData: ExperienceItem[] = [
  {
    role: "Software Engineer Intern",
    org: "ParkUsher",
    date: "Jan 2026 – Present",
    bullets: [
      "Directed creation of Nest.js API layer, GitHub Actions CI/CD pipeline, and AI-powered Flutter → React with TanStack translation",
      "Developed a comprehensive Jest test suite for the backend, integrating with Firebase Emulator",
      "Implemented Agile methodology and Notion issue tracking",
    ],
    iconSrc: "/logos/parkusher.png",
  },
  {
    role: "Software Engineer Intern",
    org: "IpserLab",
    date: "May 2025 – Aug 2025",
    bullets: [
      "Designed and implemented front-end features using React and TypeScript for early-stage startup products",
      "Collaborated with founders and engineers to define feature requirements and ensure alignment with product vision",
      "Gained exposure to Java-based backend architecture, APIs, and deployment workflows",
      "Participated in Agile Sprints, including having led meetings as an acting PM",
    ],
    iconSrc: "/logos/ipserlab.jpg",
  },
];

const educationData: ExperienceItem[] = [
  {
    role: "BASc, Systems Design Engineering (SYDE)",
    org: "University of Waterloo",
    date: "2025 – 2030",
    bullets: ["Focus: full-stack, product design, AI systems", "Co-op program"],
    iconSrc: "/logos/uwaterloo.png",
  },
  {
    role: "CS50 Courses",
    org: "Harvard University",
    date: "",
    bullets: [
      "Web Programming w/ Python and Javascript",
      "Programming with Python",
    ],
    iconSrc: "/logos/harvardlogo.png",
  },
  {
    role: "Technical Learning",
    org: "Udemy",
    date: "",
    bullets: ["Modern React and Front-End Development"],
    iconSrc: "/logos/udemy.png",
  },
];

function initials(text: string) {
  const parts = text.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

function PlusBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2px font-minecraft text-[#80967d]">■</span>
      <span className="text-[#D9DED8] leading-6">{children}</span>
    </li>
  );
}

function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <div className="relative pl-18 py-4">
      {/* icon */}
      <div className="absolute left-2 top-5">
        <div className="h-12 w-12 rounded-full bg-[#0F1511] ring-2 ring-[#2B352A] shadow-[0px_4px_10px_rgba(0,0,0,0.6)] grid place-items-center overflow-hidden hover:scale-105 transform transition-transform duration-200">
          {item.iconSrc ? (
            <Image
              src={item.iconSrc}
              alt={item.iconAlt ?? item.org}
              fill
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <span className="font-minecraft text-[#AABF9F] text-lg">
              {initials(item.org)}
            </span>
          )}
        </div>
      </div>

      {/* content */}
      <div>
        <h3 className="font-minecraft text-[22px] text-white drop-shadow-[0px_2px_0px_rgba(0,0,0,0.6)]">
          {item.role}
        </h3>
        <p className="font-minecraft text-[16px] text-[#C9D1C8] -mt-0.5">
          {item.org}
        </p>
        <p className="text-[#93A093] text-sm mt-1">{item.date}</p>

        <ul className="mt-3 space-y-2">
          {item.bullets.map((b, i) => (
            <PlusBullet key={i}>{b}</PlusBullet>
          ))}
        </ul>
        {item.org === "University of Waterloo" && (
          <div className="lg:flex flex-row justify-start mt-4 w-fit cursor-pointer rounded-full shadow-[0px_4px_6px_rgba(0,0,0,0.5)] hidden">
            <div className="bg-[#b176a2] hover:bg-[#c4a1bb] w-14 h-7 flex text-center justify-center items-center rounded-l-full">
              <p className="text-[#ffffff] text-xs font-semibold">1A</p>
            </div>
            <div className="bg-[#b176a2] hover:bg-[#c4a1bb] w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#ffffff] text-xs font-semibold">Co-op</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">1B</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">Co-op</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">2A</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">Co-op</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">2B</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">Co-op</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">3A</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">Co-op</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">3B</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">Co-op</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center">
              <p className="text-[#94758d] text-xs font-semibold">4A</p>
            </div>
            <div className="bg-[#44283d]/50 hover:bg-[#1f1418] border-[#b687aa] border w-14 h-7 flex text-center justify-center items-center rounded-r-full">
              <p className="text-[#94758d] text-xs font-semibold">4B</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [tab, setTab] = useState<Tab>("work");

  const items = useMemo(
    () => (tab === "work" ? workData : educationData),
    [tab]
  );

  return (
    <section className="w-full flex flex-col justify-center items-center mb-16">
      <h2 className="font-minecraft text-4xl font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
        Experience
      </h2>

      {/* TABS (final version with safe padding + no clipping) */}
      <div className="relative w-full rounded-2xl border border-[#384438] bg-[#0E120E]/70 shadow-[0px_10px_30px_rgba(0,0,0,0.55)]">
        {/* inner padding wrapper */}
        <div className="relative p-2">
          {/* slider */}
          <div
            className={[
              "absolute inset-y-2 left-2 w-[calc(50%-0.5rem)] rounded-xl bg-[#a5d69f] border-3 border-[#486648] shadow-[0px_4px_10px_rgba(0,0,0,0.4)]",
              "transition-transform duration-300",
              tab === "work" ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
          />

          {/* buttons */}
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
        <div className="px-4 py-2" />
        <div className="px-2 pb-2">
          {items.map((item, idx) => (
            <TimelineItem key={`${item.role}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
