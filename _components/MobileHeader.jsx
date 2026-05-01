"use client";
import Link from "next/link";
import Image from "next/image";
import { VscAccount, VscGithub } from "react-icons/vsc";
import { TbBriefcase } from "react-icons/tb";
import { PiLinkedinLogo, PiSuitcase } from "react-icons/pi";
import { FaGithub, FaInstagram, FaLinkedin, FaSuitcase } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { useState } from "react";
import { HiMail } from "react-icons/hi";
import { IoMailOutline } from "react-icons/io5";

export default function MobileHeader() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleContact = () => setIsContactOpen((prev) => !prev);
  const closeContact = () => setIsContactOpen(false);

  return (
    <>
      <button
        aria-label="Close contact menu"
        onClick={closeContact}
        className={[
          "fixed inset-0 md:hidden transition-all duration-300 ease-out",
          isContactOpen
            ? "z-[100] bg-black/45 backdrop-blur-sm opacity-100 pointer-events-auto"
            : "z-[-1] bg-black/0 backdrop-blur-none opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <footer
        className={[
          "fixed bottom-0 left-0 z-150 w-full h-20 flex md:hidden pt-2",
          "justify-center items-center",
          "bg-[url('/comps/mobileHeader.png')] bg-size-[100%_100%] bg-no-repeat bg-center",
        ].join(" ")}
      >
        <div className="flex flex-row items-center justify-between w-full px-10">
          <nav className="flex-1">
            <ul className="font-minecraft flex items-center justify-between font-bold text-sm">
              <li>
                <Link href="/">
                  <Image
                    src="/logos/pixelnew.png"
                    alt="Logo"
                    width={55}
                    height={55}
                    className="transition-transform drop-shadow-[0_4px_0px_rgba(0,0,0,0.8)] duration-300 hover:scale-105 hover:brightness-120 saturate-50"
                  />
                </Link>
              </li>
              <li className="-ml-5 drop-shadow-[0_4px_0px_rgba(0,0,0,0.8)]">
                <Link
                  href="/about"
                  className="nav-link text-[14px] md:text-lg "
                >
                  <MdAccountCircle size={40} className="" />
                </Link>
              </li>
              <li className="drop-shadow-[0_4px_0px_rgba(0,0,0,0.8)]">
                <Link href="/portfolio" className="nav-link">
                  <FaSuitcase size={34} />
                </Link>
              </li>
              <li className="relative drop-shadow-[0_4px_0px_rgba(0,0,0,0.8)]">
                <button
                  type="button"
                  onClick={toggleContact}
                  className={`nav-link cursor-pointer flex items-center justify-center transition-transform duration-200 ${
                    isContactOpen ? "scale-110" : "scale-100"
                  }`}
                  aria-label="Open contact links"
                  aria-expanded={isContactOpen}
                >
                  <BiSolidMessageSquareDetail size={36} />
                </button>

                <div
                  className={[
                    "absolute bottom-full left-1/2 mb-12 -translate-x-1/2",
                    "transition-all duration-300 ease-out origin-bottom",
                    isContactOpen
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 translate-y-3 scale-95 pointer-events-none",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3 rounded-2xl border-2 border-[#8dad8c] bg-[#1a1b1a]/95 px-4 py-3 shadow-xl backdrop-blur-md">
                    <Link
                      href="https://github.com/mic77pas"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-white/10 nav-link"
                    >
                      <VscGithub size={30} />
                    </Link>

                    <Link
                      href="mailto:mic77p@gmail.com"
                      aria-label="Email"
                      className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-white/10 nav-link"
                    >
                      <IoMailOutline size={36} />
                    </Link>

                    <Link
                      href="https://linkedin.com/in/michaelpasyechnyk"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-white/10 nav-link"
                    >
                      <PiLinkedinLogo size={32} />
                    </Link>

                    <Link
                      href="https://instagram.com/mic77_pas"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-white/10 nav-link"
                    >
                      <FaInstagram size={30} />
                    </Link>
                  </div>
                </div>
              </li>
              <li className="drop-shadow-[0_4px_0px_rgba(0,0,0,0.8)]">
                <Link
                  href="https://drive.google.com/file/d/1jc0GwlNZtplVagNXbdJmbcPwFYXuaBdc/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  <IoIosDocument size={37} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
