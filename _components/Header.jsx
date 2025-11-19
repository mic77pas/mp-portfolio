"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MobileHeader from "./MobileHeader";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function Header() {
  const [showMain, setShowMain] = useState(true);
  const pathname = usePathname(); // ✅ gives you current route

  useEffect(() => {
    // ✅ Only apply scroll behavior on the homepage
    if (pathname !== "/") {
      setShowMain(false); // always visible elsewhere
      return;
    }

    const handleScroll = () => {
      setShowMain(window.scrollY <= 50);
    };

    handleScroll(); // initialize state

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // re-run if route changes

  return (
    <>
      <header
        className={`
        hidden sm:flex sticky top-10 z-30 justify-between items-center w-full max-w-4xl mx-auto py-3 px-8 bg-[#2b322c]/70 backdrop-blur-xl shadow-lg rounded-full
        transition-opacity duration-300 ease-in-out
        ${
          pathname === "/"
            ? showMain
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
            : "opacity-100 pointer-events-auto"
        }
      `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={65}
              height={65}
              className="transition-transform duration-300 hover:-translate-y-1 hover:brightness-120"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <nav
          className={`${montserrat.className} flex gap-6 text-[#8EA783] font-bold`}
        >
          <Link href="/about" className="nav-link">
            about
          </Link>
          <Link href="/projects" className="nav-link">
            projects
          </Link>
          <Link href="/posts" className="nav-link">
            posts
          </Link>
          <Link
            href="https://drive.google.com/file/d/12k13lA9vVpsJVKTUUe4M1nzCn-Keg7Kl/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            resume
          </Link>
        </nav>
      </header>

      <div className="sm:hidden">
        <MobileHeader />
      </div>
    </>
  );
}
