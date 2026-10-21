"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Caveat_Brush } from "next/font/google";
import TypingSentence from "../TypingSentence";
import SplitText from "../../src/components/SplitText";
import { heroIcons } from "../../data/profile";

const caveat = Caveat_Brush({
  subsets: ["latin"],
  weight: ["400"],
});

const iconContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const iconItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

function IconLink({ href, img, hoverImg, label, imgClassName = "" }) {
  return (
    <motion.div
      className="relative flex flex-col items-center w-24 md:w-[127px] group"
      variants={iconItem}
    >
      <div className="relative size-[70px] md:size-[84px] rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:scale-105">
        <Link href={href} target="_blank" rel="noopener noreferrer">
          <Image
            src={img}
            alt=""
            fill
            className={`transition-opacity duration-200 opacity-100 group-hover:opacity-0 ${imgClassName}`}
          />
          <Image
            src={hoverImg}
            alt=""
            fill
            className="transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          />
        </Link>
      </div>

      {/* absolutely placed so the hidden label doesn't push the hero off-centre */}
      <p className="absolute top-full mt-2 w-max max-w-[160px] font-minecraft text-[16px] text-center text-[#dbe0db] opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
        {label}
      </p>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);

  // Square edge-to-edge at the top of the page; bottom corners round as the
  // hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const radius = useTransform(scrollYProgress, [0, 0.35], [0, 40]);

  return (
    <motion.section
      ref={ref}
      style={{
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
      }}
      className="relative w-full h-svh min-h-[600px] overflow-hidden flex items-center justify-center px-6 md:px-[110px] shadow-[0px_11px_11.3px_0px_rgba(0,0,0,0.45)] bg-[url('/bg/waterfall.gif')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-[#242524]/90 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-30px_33.4px_0px_rgba(0,0,0,0.31)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center gap-3 md:gap-4 pb-16 md:pb-0"
      >

        <div className="relative inline-block group cursor-pointer pointer-events-none md:pointer-events-auto">
          <SplitText
            text="Michael Pasyechnyk"
            className="font-minecraft font-bold text-[50px] md:text-[64px] lg:text-[76px] leading-[1.1] text-[#b9ddb2] hover:text-[#d3ecce] transition duration-200 [text-shadow:0px_6px_0px_#040404]"
            delay={50}
            duration={1}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <div className="pointer-events-none absolute right-0 -top-10 md:-top-18 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out text-[#dbe0db] text-sm md:text-base flex items-center">
            <Image
              src="/arrowright.png"
              alt=""
              width="70"
              height="70"
              className="-rotate-1 mr-1 mt-7"
            />
            <span className={`${caveat.className} text-[40px] ml-1 mr-3`}>
              “pass-itch-nick”!
            </span>
            <Image
              src="/ukraine.png"
              alt="UA"
              width="30"
              height="30"
              className="rotate-2"
            />
          </div>
        </div>

        <TypingSentence />

        <motion.div
          className="flex flex-row justify-center items-start mt-1"
          variants={iconContainer}
          initial="hidden"
          animate="show"
        >
          {heroIcons.map((item) => (
            <IconLink key={item.label} {...item} />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
