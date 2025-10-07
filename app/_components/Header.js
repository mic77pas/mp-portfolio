"use client";
import Logo from "./Logo";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiMailOpen } from "react-icons/hi";
import GlassSurface from "@/components/GlassSurface";
import MobileHeader from "./MobileHeader"; // Import the new component

export default function Header() {
  // <GlassSurface
  //         width="100%" // Full width header
  //         height={70} // Adjust as needed
  //         borderRadius={24} // Rounded corners
  //         blur={12} // Glass blur
  //         brightness={50}
  //         opacity={0.85}
  //         className="w-full max-w-5xl flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5"
  //       ></GlassSurface>
  return (
    <>
      {/* Full Header for Desktop and larger screens */}
      <header className="hidden sm:flex sticky top-0 z-30 justify-center px-8 pb-8">
        <div
          className="flex w-full max-w-5xl items-center justify-between
          rounded-b-2xl sm:rounded-b-4xl bg-[#0c0d0c]/40 backdrop-blur-lg shadow-md
          px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5"
        >
          {/* Left: Logo + About + Projects */}
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
              <Link href="/about" className="nav-link">
                about
              </Link>
              <Link href="/projects" className="nav-link">
                projects
              </Link>
            </nav>
          </div>
          {/* Right: Resume + Contact + Socials */}
          <nav
            className="flex items-center gap-4 sm:gap-6 md:gap-8
            text-[#98B493] font-semibold
            text-xs sm:text-sm md:text-base lg:text-lg"
          >
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              resume
            </Link>
            <a href="mailto:mic77p@gmail.com" className="group nav-link">
              <span className="icon-hover-swap icon-hover-swap-visible">
                <HiMail className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" />
              </span>
              <span className="icon-hover-swap icon-hover-swap-hidden">
                <HiMailOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" />
              </span>
            </a>
            <Link
              href="https://linkedin.com/in/michaelpasyechnyk"
              target="_blank"
              className="nav-link"
            >
              <FaLinkedin className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" />
            </Link>
            <Link
              href="https://github.com/mic77pas"
              target="_blank"
              className="nav-link"
            >
              <FaGithub className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Header for smaller screens */}
      <div className="sm:hidden">
        <MobileHeader />
      </div>
    </>
  );
}
