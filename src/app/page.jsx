"use client";
import { useEffect, useState } from "react";
import { Poetsen_One } from "next/font/google";
import TypingSentence from "../../_components/TypingSentence";
import Skills from "../../_components/Skills";
import RecentProjects from "../../_components/RecentProjects";
import Image from "next/image";
import { motion } from "motion/react";

const poetsen = Poetsen_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Home() {
  const [showMain, setShowMain] = useState(true);

  // Fade arrow away when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowMain(window.scrollY <= 50);
    };

    // Check scroll position right after mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-170px)] text-center">
        <h3
          className={`${poetsen.className} text-[60px] md:text-[90px] leading-[1.1] mb-3 pb-3 text-[#90AD8F] drop-shadow-[7px_7px_0px_rgba(0,0,0,0.25)]`}
        >
          Michael Pasyechnyk
        </h3>
        <TypingSentence />
      </div>

      {/* Arrow positioned fixed at bottom center */}
      <div
        className={`hidden md:block fixed bottom-6 left-1/2 transform -translate-x-1/2 transition-opacity duration-400 ${
          showMain ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/arrow.png"
          width={60}
          height={60}
          alt="Scroll down"
          className="animate-bounce"
        />
      </div>

      <Skills />

      <RecentProjects />

      <div className="hidden md:flex group text-[#AABF9F] bg-[#2A2B2A] text-4xl font-bold mt-12 pt-8 justify-center items-center text-center">
        <p className="hover:scale-120 duration-400">
          Wanna chat? Let's{" "}
          <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#e4f0e0] after:w-0 group-hover:after:w-full after:transition-all after:duration-400 hover:text-[#e4f0e0] duration-180">
            <a href="mailto:mic77p@gmail.com">connect!</a>
          </span>
        </p>
      </div>
    </>
  );
}
