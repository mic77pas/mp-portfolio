import Link from "next/link";
import { PiLinkedinLogo } from "react-icons/pi";
import { VscGithub } from "react-icons/vsc";
import { IoMailOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="flex flex-col justify-center items-center w-full py-5 gap-3 font-medium border-t border-border-subtle bg-surface-1"
    >
      <nav className="flex gap-6 font-bold items-center">
        <Link
          href="https://linkedin.com/in/michaelpasyechnyk"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          aria-label="LinkedIn"
        >
          <PiLinkedinLogo className="w-6 h-6" />
        </Link>
        <Link
          href="https://github.com/mic77pas"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          aria-label="GitHub"
        >
          <VscGithub className="w-6 h-6" />
        </Link>
        <a
          href="mailto:mic77p@gmail.com"
          className="group nav-link"
          aria-label="Email"
        >
          <IoMailOutline className="w-6 h-6" />
        </a>
      </nav>

      <span className="text-text-muted text-sm">
        &copy; Michael Pasyechnyk {new Date().getFullYear()}
      </span>
    </footer>
  );
}
