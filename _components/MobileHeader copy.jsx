"use client";
import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiMailOpen, HiOutlineDotsVertical } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import Image from "next/image";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform
      w-[90%] max-w-sm rounded-full 
      bg-[#2b322c]/70 backdrop-blur-xl shadow-md px-6 py-3
      flex justify-between items-center"
    >
      {/* Left side: Logo + Nav Links */}
      <div className="flex items-center justify-between w-full text-sm font-semibold nav-link">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="transition-transform duration-300 hover:-translate-y-1 hover:brightness-120"
          />
        </Link>
        <Link href="/about">about</Link>
        <Link href="/projects">projects</Link>
        <Link href="/posts">posts</Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <HiOutlineDotsVertical className="w-6 h-6 text-[#AABF9F]" />
        </button>
      </div>

      {/* Right side: Toggle Button */}

      {/* Dropdown Menu (conditionally rendered) */}
      {isOpen && (
        <div
          className="absolute bottom-full mb-4 right-0
  bg-[#242a25]/90 backdrop-blur-lg rounded-2xl shadow-lg
  flex flex-col items-center gap-4 p-4 text-[#c4dbbf] text-shadow-[#0f1a0c] text-shadow-2xs font-semibold -translate-x-3.5 nav-link"
        >
          <Link
            href="https://drive.google.com/file/d/1xjUtUyP-G2ZbX70XMVxO5C6djpVyiSXO/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoDocumentText className="w-7 h-7" />
          </Link>
          <a
            href="mailto:mic77p@gmail.com"
            className="group flex items-center gap-2 hover:text-[#98B493] transition-colors duration-300"
          >
            <HiMail className="w-7 h-7" />
          </a>
          <Link
            href="https://linkedin.com/in/michaelpasyechnyk"
            target="_blank"
            rel="noopener noreferrer"
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
      )}
    </div>
  );
}
