"use client";
import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiMailOpen, HiOutlineDotsVertical } from "react-icons/hi";
import Logo from "./Logo";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform
      w-[90%] max-w-sm rounded-full 
      bg-[#0c0d0c]/40 backdrop-blur-lg shadow-md px-6 py-3
      flex justify-between items-center"
    >
      {/* Left side: Logo + Nav Links */}
      <div className="flex items-center justify-between w-full text-sm font-semibold nav-link">
        <Logo />
        <Link
          href="/about"
          className="hover:text-[#98B493] transition-colors duration-300"
        >
          about
        </Link>
        <Link
          href="/projects"
          className="hover:text-[#98B493] transition-colors duration-300"
        >
          projects
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <HiOutlineDotsVertical className="w-6 h-6 text-[#c3d7c0]" />
        </button>
      </div>

      {/* Right side: Toggle Button */}

      {/* Dropdown Menu (conditionally rendered) */}
      {isOpen && (
        <div
          className="absolute bottom-full mb-4 right-0
  bg-[#0c0d0c]/60 backdrop-blur-md rounded-2xl shadow-lg
  flex flex-col items-center gap-4 p-4 text-[#c4dbbf] text-shadow-[#0f1a0c] text-shadow-2xs font-semibold"
        >
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#98B493] transition-colors duration-300"
          >
            resume
          </Link>
          <div className="flex gap-4 mt-1">
            <a
              href="mailto:mic77p@gmail.com"
              className="group flex items-center gap-2 hover:text-[#98B493] transition-colors duration-300"
            >
              <HiMail className="w-7 h-7 -translate-y-0.5" />
            </a>
            <Link
              href="https://linkedin.com/in/michaelpasyechnyk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#98B493] transition-colors duration-300"
            >
              <FaLinkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://github.com/mic77pas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#98B493] transition-colors duration-300"
            >
              <FaGithub className="w-6 h-6" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
