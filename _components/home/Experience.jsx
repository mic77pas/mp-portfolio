"use client";

import { useState } from "react";
import Image from "next/image";
import { workExperience, education } from "../../data/profile";
import Reveal from "../Reveal";
import ScrambleText from "../../src/components/ScrambleText";

const tabs = [
  { id: "work", label: "Work", items: workExperience },
  { id: "education", label: "Education", items: education },
];

// logo (opens the org's site) | title + org | date, with the work summary or
// the course names underneath
function Entry({ entry }) {
  const { title, company, date, logo, href, summary, courses = [] } = entry;

  return (
    <div className="w-full">
      <div className="flex items-center gap-[10px] w-full">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${company} website`}
          className="relative size-[44px] shrink-0 overflow-hidden rounded-full transition-transform duration-200 hover:scale-110"
        >
          <Image src={logo} alt="" fill sizes="44px" className="object-cover" />
        </a>

        <div className="flex flex-1 min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="flex flex-col gap-[3px] font-minecraft text-[15px] leading-none text-white min-w-0">
            <span className="font-bold truncate">{title}</span>
            <span className="truncate">{company}</span>
          </span>

          <span className="font-minecraft font-bold text-[12px] md:text-[14px] leading-none text-white whitespace-nowrap">
            {date}
          </span>
        </div>
      </div>

      {summary && (
        <p className="ml-[54px] mt-2 font-minecraft text-[14px] leading-snug text-[#c7dac3]">
          {summary}
        </p>
      )}

      {courses.length > 0 && (
        <ul className="ml-[54px] mt-2 flex flex-col gap-1.5">
          {courses.map((c) => (
            <li
              key={c}
              className="flex gap-3 font-minecraft text-[14px] leading-snug text-[#c7dac3]"
            >
              <span className="text-[#80967d] leading-snug">⯀</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Experience() {
  const [tab, setTab] = useState("work");
  const active = tabs.find((t) => t.id === tab);

  return (
    <section className="flex flex-col gap-5 w-full">
      <ScrambleText
        as="h2"
        text="Experience"
        className="font-minecraft font-bold text-[20px] text-[#c1dab6]"
      />

      <Reveal className="flex flex-col gap-3 w-full">
        {/* Work / Education switch with a sliding highlight */}
        <div
          role="tablist"
          aria-label="Experience type"
          className="relative grid grid-cols-2 rounded-[12px] border-2 border-[#a2be9c] bg-[#262d26] p-1 shadow-[0px_4px_0px_rgba(0,0,0,0.45)]"
        >
          <span
            aria-hidden
            className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-[8px] bg-[#a2be9c] shadow-[0px_3px_0px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out ${tab === "work" ? "translate-x-0" : "translate-x-full"}`}
          />
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative cursor-pointer py-3 font-minecraft font-bold text-[14px] md:text-[16px] leading-none transition-colors duration-200 ${tab === t.id ? "text-[#1a1e1a]" : "text-[#c7d8c0] hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          className="flex flex-col gap-5 w-full rounded-[12px] border-2 border-[#a2be9c] bg-[#1a1e1a] p-3 md:p-4 shadow-[0px_4px_0px_rgba(0,0,0,0.45)]"
        >
          {active.items.map((entry, i) => (
            <Reveal key={`${tab}-${entry.company}`} delay={0.08 * (i + 1)} y={16}>
              <Entry entry={entry} />
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
