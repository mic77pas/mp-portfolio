"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
import { ArrowUpRight } from "lucide-react";
import { workExperience } from "../../data/profile";
import Reveal from "../Reveal";

function Job({ job, open, onToggle }) {
  const { title, company, date, logo, logoNeedsCrop, href, bullets = [] } = job;
  const panelId = `job-${company.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <div className="w-full">
      <div className="flex items-center gap-[10px] w-full transition-transform duration-300 ease-out hover:translate-x-1.5">
        {/* logo opens the company site */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${company} website`}
          className="relative size-[44px] shrink-0 transition-transform duration-200 hover:scale-110"
        >
          <Image
            src={logo}
            alt=""
            fill
            sizes="44px"
            className={
              logoNeedsCrop ? "rounded-full object-cover" : "object-contain"
            }
          />
        </a>

        {/* rest of the row toggles the details dropdown */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex flex-1 min-w-0 cursor-pointer flex-col items-start gap-1 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span className="flex flex-col gap-[3px] font-minecraft text-[15px] leading-none text-white min-w-0">
            <span className="font-bold truncate transition-colors group-hover:text-[#c1dab6]">
              {title}
            </span>
            <span className="truncate">{company}</span>
          </span>

          <span className="flex items-center gap-2 font-minecraft font-bold text-[12px] md:text-[14px] leading-none text-white whitespace-nowrap">
            {date}
            <FiChevronDown
              size={16}
              className={`shrink-0 text-[#c1dab6] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.3, ease: "easeInOut" },
            }}
            className="overflow-hidden"
          >
            <div className="ml-[54px] mt-3 flex flex-col gap-3 rounded-[10px] border-2 border-[#a2be9c] bg-[#121412] px-4 py-3">
              {bullets.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 font-minecraft text-[14px] leading-snug text-[#c7dac3]"
                    >
                      <span className="text-[#80967d] leading-snug">⯀</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-minecraft text-[14px] text-[#93a093]">
                  More details coming soon!
                </p>
              )}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-1 font-minecraft text-[13px] leading-none text-[#c1dab6] transition-colors hover:text-white"
              >
                Visit {company}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WorkExperience() {
  const [openCompany, setOpenCompany] = useState(null);

  return (
    <section className="flex flex-col gap-5 w-full">
      <Reveal
        as="h2"
        className="font-minecraft font-bold text-[20px] text-[#c1dab6]"
      >
        Work Experience
      </Reveal>
      <div className="flex flex-col gap-4 w-full">
        {workExperience.map((job, i) => (
          <Reveal key={job.company} delay={0.08 * (i + 1)} y={16}>
            <Job
              job={job}
              open={openCompany === job.company}
              onToggle={() =>
                setOpenCompany((c) => (c === job.company ? null : job.company))
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
