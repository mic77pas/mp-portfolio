"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Poetsen_One, Caveat_Brush } from "next/font/google";
import TypingSentence from "../../_components/TypingSentence";
import SplitText from "../components/SplitText";

const poetsen = Poetsen_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

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
      className="flex flex-col items-center gap-2 w-28 group"
      variants={iconItem}
    >
      <div className="relative w-[77px] h-[77px] rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.5)]">
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

      <p className="font-minecraft text-[16px] text-[#dbe0db] opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
        {label}
      </p>
    </motion.div>
  );
}

export default function Home() {
  const icons = [
    {
      href: "https://uwaterloo.ca/systems-design-engineering/",
      img: "/logos/greenwaterloo.png",
      hoverImg: "/logos/uwaterloo.png",
      label: "Studying SYDE",
      imgClassName: "saturate-60",
    },
    {
      href: "https://www.parkusher.app/",
      img: "/logos/greenpark.png",
      hoverImg: "/logos/experience/parkusher.png",
      label: "SWE Intern",
      imgClassName: "brightness-80 saturate-70",
    },
    {
      href: "https://linkedin.com/in/michaelpasyechnyk",
      img: "/logos/map.png",
      hoverImg: "/logos/mapcolored.png",
      label: "US/Canada",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center mt-8"
    >
      <div className="flex flex-col items-center text-center gap-2">
        <div className="relative inline-block group cursor-pointer">
          <SplitText
            text="Michael Pasyechnyk"
            className="font-minecraft font-bold text-[36px] md:text-[60px] lg:text-[75px] leading-[1.1] text-[#99b494] hover:text-[#bbd3b6] transition duration-200 drop-shadow-[0px_6px_0px_rgba(0,0,0,0.5)]"
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
          <div
            className="
      pointer-events-none
      absolute
      right-0
      -top-10 md:-top-18
      opacity-0
      group-hover:opacity-100 
      transition-all duration-300 ease-out
      text-[#dbe0db]
      text-sm md:text-base
      flex items-center
    "
          >
            <Image
              src="/arrowright.png"
              alt="UA"
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
          className="flex flex-row justify-center items-start gap-4 mt-3"
          variants={iconContainer}
          initial="hidden"
          animate="show"
        >
          {icons.map((item) => (
            <IconLink key={item.href} {...item} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
