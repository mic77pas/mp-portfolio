"use client";
import Logo from "./Logo";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";
import { HiMail, HiMailOpen } from "react-icons/hi";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex justify-center px-8 pb-8">
      {/* Floating centered container */}
      <div className="flex w-full max-w-5xl items-center justify-between rounded-b-4xl bg-neutral-950/35 backdrop-blur-lg shadow-md px-8 py-5">
        {/* Left: Logo + About + Projects */}
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="flex items-center gap-6 sm:gap-8 text-[#98B493] font-semibold text-sm sm:text-base md:text-lg">
            <Link href="/about" className="nav-link">
              about
            </Link>
            <Link href="/projects" className="nav-link">
              projects
            </Link>
          </nav>
        </div>

        {/* Right: Resume + Contact + Socials + Toggle */}
        <div className="flex items-center gap-6 sm:gap-8 text-[#98B493] font-semibold text-sm sm:text-base md:text-lg">
          <Link href="/blog" className="nav-link">
            blogs
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            resume
          </Link>
          <a href="mailto:mic77p@gmail.com" className="group nav-link">
            {/* The first icon, visible by default */}
            <span className="group-hover:hidden">
              <HiMail size={36} />
            </span>

            {/* The second icon, hidden by default but visible on hover */}
            <span className="hidden group-hover:block">
              <HiMailOpen size={36} />
            </span>
          </a>
          {/* Social Icons */}
          <Link
            href="https://linkedin.com/in/michaelpasyechnyk"
            target="_blank"
            className="nav-link"
          >
            <FaLinkedin size={34} />
          </Link>
          <Link
            href="https://github.com/mic77pas"
            target="_blank"
            className="nav-link"
          >
            <FaGithub size={34} />
          </Link>

          {/* Dark Mode */}
          {/* <DarkModeToggle /> */}
        </div>
      </div>
    </header>
  );
}

// {
//   /* Tooltip */
// }
// <div
//   className="
//           absolute left-1/2 -translate-x-1/2 mt-10
//           hidden group-hover:flex
//           items-center
//           px-2 py-1 text-sm text-white
//           bg-neutral-900/40 rounded-lg shadow-lg
//           whitespace-nowrap
//         "
// ></div>;
