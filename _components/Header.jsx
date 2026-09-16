"use client";

import Image from "next/image";
import Link from "next/link";

const RESUME_URL =
  "https://drive.google.com/file/d/12K4VSG5kEep4KhuxYuXZ6ek6-4BCrV2P/view?usp=sharing";

export default function Header() {
  return (
    <header className="fixed top-0 z-100 w-full hidden md:flex items-center justify-between px-8 py-6 lg:px-12">
      <Link href="/" className="shrink-0">
        <Image
          src="/logos/pixelnew.png"
          alt="Michael Pasyechnyk"
          width={48}
          height={48}
          className="transition-transform duration-300 hover:scale-105 hover:brightness-110 saturate-50"
        />
      </Link>

      <nav>
        <ul className="font-minecraft flex gap-6 font-bold text-sm">
          <li>
            <Link href="/about" className="nav-link">
              about
            </Link>
          </li>
          <li>
            <Link
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              resume
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
