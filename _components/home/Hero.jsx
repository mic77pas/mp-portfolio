"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Caveat_Brush } from "next/font/google";
import TypingSentence from "../TypingSentence";
import SplitText from "../../src/components/SplitText";
import { heroIcons } from "../../data/profile";
import { scrollToAbout } from "../AboutLink";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  // Square edge-to-edge at the top of the page; bottom corners round as the
  // hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const radius = useTransform(scrollYProgress, [0, 0.35], [0, 40]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Scroll-scrubbed depth while the hero lifts away: the waterfall drifts
  // slower than the hero, the title block sinks back and fades, and the page
  // content pinned underneath (see src/app/page.jsx) grows up to full size
  // as it's uncovered.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = ref.current;
        const lift = (end = "bottom top") => ({
          trigger: section,
          start: "top top",
          end,
          scrub: true,
          invalidateOnRefresh: true,
        });

        gsap.to(bgRef.current, {
          y: () => section.offsetHeight * 0.2,
          ease: "none",
          scrollTrigger: lift(),
        });

        gsap.to(contentRef.current, {
          y: () => section.offsetHeight * 0.3,
          scale: 0.92,
          opacity: 0,
          ease: "none",
          scrollTrigger: lift("70% top"),
        });

        const pageContent = document.querySelector("[data-hero-content]");
        if (pageContent) {
          gsap.fromTo(
            pageContent,
            { scale: 0.94, opacity: 0.4, transformOrigin: "50% 0%" },
            { scale: 1, opacity: 1, ease: "none", scrollTrigger: lift() },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <motion.section
      ref={ref}
      data-hero
      style={{
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
      }}
      // lvh, not svh: the full screen height, so on phones the hero still
      // fills the screen behind a translucent or retracting browser toolbar
      className="relative w-full h-lvh min-h-[600px] overflow-hidden flex items-center justify-center px-6 md:px-[110px] shadow-[0px_11px_11.3px_0px_rgba(0,0,0,0.45)] bg-[#242524]"
    >
      {/* the waterfall sits on its own layer, 20% taller than the hero
          (extending above it), so it can drift down as the hero lifts
          without exposing an edge */}
      <div
        ref={bgRef}
        className="absolute inset-x-0 -top-[20%] h-[120%] bg-[url('/bg/waterfall.gif')] bg-cover bg-center pointer-events-none will-change-transform"
      />
      <div className="absolute inset-0 bg-[#242524]/90 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-30px_33.4px_0px_rgba(0,0,0,0.31)]" />

      <div ref={contentRef} className="relative will-change-transform">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex flex-col items-center text-center gap-3 md:gap-4"
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
      </div>

      {/* scroll hint: bounces at the bottom of the hero, fades out as the
          hero starts lifting. */}
      <motion.div
        style={{ opacity: arrowOpacity }}
        // lifted by the toolbar's height (lvh - svh), so the arrow sits above
        // a phone's bottom browser bar rather than under it
        className="absolute bottom-[calc(100lvh-100svh+2rem)] left-1/2 -translate-x-1/2"
      >
        <motion.button
          type="button"
          aria-label="Scroll to about"
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 5, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1.5 },
            y: { duration: 2.6, ease: "easeInOut", repeat: Infinity },
          }}
          className="block p-2 text-[#6a8366] hover:text-[#8dad8c] transition-colors duration-200 filter-[drop-shadow(1px_2px_2px_rgba(0,0,0,0.8))] cursor-pointer"
        >
          {/* a wide, shallow chevron */}
          <svg
            viewBox="0 0 48 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 md:w-8 h-auto"
            aria-hidden
          >
            <polyline points="4 5 24 15 44 5" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
