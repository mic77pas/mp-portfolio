"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaSuitcase, FaInstagram } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { VscGithub } from "react-icons/vsc";
import { PiLinkedinLogo } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";

const RESUME_URL =
  "https://drive.google.com/file/d/12K4VSG5kEep4KhuxYuXZ6ek6-4BCrV2P/view?usp=sharing";

const MORE_LINKS = [
  { href: "/about/waterloo", label: "Waterloo" },
  { href: "/about/work", label: "Work Experience" },
  { href: "/hs-programs", label: "HS Programs" },
];

export default function MobileHeader() {
  const [openPanel, setOpenPanel] = useState(null); // "contact" | "more" | null

  const togglePanel = (panel) =>
    setOpenPanel((prev) => (prev === panel ? null : panel));
  const closePanels = () => setOpenPanel(null);

  return (
    <>
      <button
        aria-label="Close menu"
        onClick={closePanels}
        className={[
          "fixed inset-0 md:hidden transition-all duration-300 ease-out",
          openPanel
            ? "z-[100] bg-black/45 backdrop-blur-sm opacity-100 pointer-events-auto"
            : "z-[-1] bg-black/0 backdrop-blur-none opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <footer className="fixed bottom-0 left-0 z-150 w-full flex flex-col md:hidden">
        <div className="flex items-center justify-center w-full px-4 py-1 bg-surface-1/95 border-t border-border-subtle text-[11px] text-text-muted">
          <span>&copy; {new Date().getFullYear()} Michael Pasyechnyk</span>
        </div>

        <div className="relative flex justify-center items-center pt-2 h-20 border-t border-border-subtle bg-surface-1 [background-image:var(--chrome-bg-mobilenav)] bg-size-[100%_100%] bg-no-repeat bg-center">
          <div className="flex flex-row items-center justify-between w-full px-7">
            <nav className="flex-1">
              <ul className="font-minecraft flex items-center justify-between font-bold text-sm">
                <li>
                  <Link href="/">
                    <Image
                      src="/logos/pixelnew.png"
                      alt="Home"
                      width={48}
                      height={48}
                      className="-translate-y-0.5 transition-transform [filter:var(--shadow-icon)] duration-300 hover:scale-105 hover:brightness-110 saturate-50"
                    />
                  </Link>
                </li>
                <li className="-ml-3 [filter:var(--shadow-icon)]">
                  <Link href="/about" className="nav-link" aria-label="About">
                    <MdAccountCircle size={36} />
                  </Link>
                </li>
                <li className="[filter:var(--shadow-icon)]">
                  <Link
                    href="/portfolio"
                    className="nav-link"
                    aria-label="Portfolio"
                  >
                    <FaSuitcase size={30} />
                  </Link>
                </li>
                <li className="relative [filter:var(--shadow-icon)]">
                  <button
                    type="button"
                    onClick={() => togglePanel("contact")}
                    className={`nav-link cursor-pointer flex items-center justify-center transition-transform duration-200 ${
                      openPanel === "contact" ? "scale-110" : "scale-100"
                    }`}
                    aria-label="Open contact links"
                    aria-expanded={openPanel === "contact"}
                  >
                    <BiSolidMessageSquareDetail size={32} />
                  </button>

                  <div
                    className={[
                      "absolute bottom-full left-1/2 mb-12 -translate-x-1/2",
                      "transition-all duration-300 ease-out origin-bottom",
                      openPanel === "contact"
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 translate-y-30 pointer-events-none",
                    ].join(" ")}
                  >
                    <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-accent bg-surface-1/95 px-2 py-3 shadow-lg backdrop-blur-md">
                      <Link
                        href="https://github.com/mic77pas"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-white/10 nav-link"
                      >
                        <VscGithub size={26} />
                      </Link>

                      <Link
                        href="mailto:mic77p@gmail.com"
                        aria-label="Email"
                        className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-white/10 nav-link"
                      >
                        <IoMailOutline size={30} />
                      </Link>

                      <Link
                        href="https://linkedin.com/in/michaelpasyechnyk"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-white/10 nav-link"
                      >
                        <PiLinkedinLogo size={28} />
                      </Link>

                      <Link
                        href="https://instagram.com/mic77_pas"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-white/10 nav-link"
                      >
                        <FaInstagram size={26} />
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="relative [filter:var(--shadow-icon)]">
                  <button
                    type="button"
                    onClick={() => togglePanel("more")}
                    className={`nav-link cursor-pointer flex items-center justify-center transition-transform duration-200 ${
                      openPanel === "more" ? "scale-110" : "scale-100"
                    }`}
                    aria-label="More pages"
                    aria-expanded={openPanel === "more"}
                  >
                    <HiOutlineDotsVertical size={30} />
                  </button>

                  <div
                    className={[
                      "absolute bottom-full right-0 mb-12",
                      "transition-all duration-300 ease-out origin-bottom-right",
                      openPanel === "more"
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 translate-y-30 pointer-events-none",
                    ].join(" ")}
                  >
                    <div className="flex flex-col items-stretch gap-1 rounded-2xl border-2 border-accent bg-surface-1/95 px-3 py-3 shadow-lg backdrop-blur-md min-w-40">
                      {MORE_LINKS.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          className="nav-link text-left text-xs py-1"
                          onClick={closePanels}
                        >
                          {label}
                        </Link>
                      ))}
                      <Link
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link text-left text-xs py-1 flex items-center gap-1.5"
                        onClick={closePanels}
                      >
                        <IoIosDocument size={16} /> Resume
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
