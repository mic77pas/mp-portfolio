"use client";
import { useEffect, useState } from "react";
import { Poetsen_One } from "next/font/google";
import TypingSentence from "../../_components/TypingSentence";
import Skills from "../../_components/Skills";
import RecentProjects from "../../_components/RecentProjects";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import SplitText from "../components/SplitText";

const poetsen = Poetsen_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const iconContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1, // 🔥 start from the right
    },
  },
};

const iconItem = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.34, 1.56, 0.64, 1], // bounce-y easing
    },
  },
};

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex items-center"
      >
        <div className="flex flex-col justify-center items-center text-center mt-16">
          {/* <h3 className="font-minecraft font-bold text-[50px] md:text-[90px] leading-[1.1] pb-4 text-[#99b494] hover:text-[#bbd3b6] transition duration-200 drop-shadow-[0px_6px_0px_rgba(0,0,0,0.5)]">
            Michael Pasyechnyk
          </h3> */}
          <SplitText
            text="Michael Pasyechnyk"
            className="font-minecraft font-bold text-[50px] md:text-[90px] leading-[1.1] pb-4 text-[#99b494] hover:text-[#bbd3b6] transition duration-200 drop-shadow-[0px_6px_0px_rgba(0,0,0,0.5)]"
            delay={50}
            duration={1}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            showCallback
          />
          {/* <hr className="w-5xl border-4 border-[#3a3f39] drop-shadow-[0px_4px_0px_rgba(0,0,0,0.5)]" /> */}
          <TypingSentence />

          <motion.div
            className="flex flex-row justify-center items-start gap-4 mt-6"
            variants={iconContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="flex flex-col justify-center items-center gap-2 w-28 group"
              variants={iconItem}
            >
              <div className="relative w-20 h-20 group rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.5)]">
                <Link
                  href="https://uwaterloo.ca/systems-design-engineering/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/logos/greenwaterloo.png"
                    alt="Logo"
                    fill
                    className="saturate-60 transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                  />
                  <Image
                    src="/logos/uwaterloo.png"
                    alt="Logo hover"
                    fill
                    className="transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                  />
                </Link>
              </div>
              <p
                className="font-minecraft text-[16px] text-[#dbe0db] opacity-0
              translate-y-1
              transition-all
              duration-200
              group-hover:opacity-100
              group-hover:translate-y-0"
              >
                Studying SYDE
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center items-center gap-2 w-28 group"
              variants={iconItem}
            >
              {/* <div className="relative w-20 h-20 group rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.5)]">
                <Link
                  href="https://www.linkedin.com/in/michaelpasyechnyk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/logos/greenwork.png"
                    alt="Logo"
                    fill
                    className="transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                  />
                  <Image
                    src="/logos/work.png"
                    alt="Logo hover"
                    fill
                    className="transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                  />
                </Link>
              </div>
              <p
                className="font-minecraft text-[16px] text-[#dbe0db] opacity-0
                translate-y-1
                transition-all
                duration-200
                group-hover:opacity-100
                group-hover:translate-y-0"
              >
                Searching for work!
              </p> */}
              <div className="relative w-20 h-20 group rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.5)]">
                <Link
                  href="https://www.parkusher.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/logos/greenpark.png"
                    alt="Logo"
                    fill
                    className="brightness-80 saturate-70 transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                  />
                  <Image
                    src="/logos/parkusher.png"
                    alt="Logo hover"
                    fill
                    className="transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                  />
                </Link>
              </div>
              <p
                className="font-minecraft text-[16px] text-[#dbe0db] opacity-0
                translate-y-1
                transition-all
                duration-200
                group-hover:opacity-100
                group-hover:translate-y-0"
              >
                SWE Intern
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center items-center gap-2 w-28 group"
              variants={iconItem}
            >
              <div className="relative w-20 h-20 group rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.5)]">
                <Link
                  href="https://linkedin.com/in/michaelpasyechnyk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/logos/map.png"
                    alt="Logo"
                    fill
                    className="transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                  />
                  <Image
                    src="/logos/mapcolored.png"
                    alt="Logo hover"
                    fill
                    className="transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                  />
                </Link>
              </div>
              <p
                className="font-minecraft text-[16px] text-[#dbe0db] opacity-0
              translate-y-1
              transition-all
              duration-200
              group-hover:opacity-100
              group-hover:translate-y-0"
              >
                Based in CA/US
              </p>
            </motion.div>

            {/* <motion.div className="flex flex-col justify-center items-center gap-2 w-28 group" variants={iconItem}>
              <div className="relative w-20 h-20 group rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.5)]">
                <Link
                  href="https://uwaterloo.ca/systems-design-engineering/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/logos/greenbulb.png"
                    alt="Logo"
                    fill
                    className="transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                  />
                  <Image
                    src="/logos/bulb.png"
                    alt="Logo hover"
                    fill
                    className="transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                  />
                </Link>
              </div>
              <p
                className="font-minecraft text-[16px] text-[#dbe0db] opacity-0
              translate-y-1
              transition-all
              duration-200
              group-hover:opacity-100
              group-hover:translate-y-0"
              >
                Curious by default!
              </p>
            </motion.div> */}
          </motion.div>
        </div>
        {/* <RecentProjects /> */}

        {/* <div className="hidden md:flex group text-[#AABF9F] text-4xl font-bold mt-12 mb-6 pt-8 justify-center items-center text-center">
        <p className="hover:scale-120 duration-400">
          Wanna chat? Let's{" "}
          <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#e4f0e0] after:w-0 group-hover:after:w-full after:transition-all after:duration-400 hover:text-[#e4f0e0] duration-180">
            <a href="mailto:mic77p@gmail.com">connect!</a>
          </span>
        </p>
      </div> */}
      </motion.div>
    </>
  );
}
