import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

export default function Footer() {
  return (
    <>
      <footer className="hidden md:flex justify-between items-center w-full h-12 px-6 py-10 font-medium text-[#AABF9F] bg-[#2A2B2A]">
        {/* Left side */}
        <span>&copy; {new Date().getFullYear()} | MICHAEL PASYECHNYK</span>

        {/* Right side (icons) */}
        <nav className="flex gap-6 text-[#8EA783] font-bold items-center">
          {/* <a href="mailto:mic77p@gmail.com" className="group nav-link">
          <HiMail className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
        </a> */}
          <Link
            href="https://linkedin.com/in/michaelpasyechnyk"
            target="_blank"
            className="nav-link"
          >
            <FaLinkedin className="w-7 h-7 sm:w-8 sm:h-8 md:w-11 md:h-11" />
          </Link>
          <Link
            href="https://github.com/mic77pas"
            target="_blank"
            className="nav-link"
          >
            <FaGithub className="w-6 h-6 sm:w-7 sm:h-7 md:w-11 md:h-11" />
          </Link>
        </nav>
      </footer>

      <footer className="md:hidden">
        <div className="h-20">

        </div>
      </footer>
    </>
  );
}
