"use client";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { Montserrat } from "next/font/google";
import { SearchIcon } from "raster-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function TypingSentence() {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} // <- grow from left
      className={`
        ${montserrat.className}
        relative flex flex-row items-center text-[#A1BD98]
        w-[540px] h-[54px]
        px-3 py-2 gap-3 z-20
        hover:brightness-120 transition-all duration-200
      `}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/comps/sentence.png')",
          backgroundSize: "100% 100%",
        }}
      />

      <SearchIcon
        className="mb-1"
        size={40}
        color="A1BD98"
        strokeWidth={1}
        radius={4}
      />

      <div className="overflow-hidden mb-1">
        <TypeAnimation
          sequence={[
            "developer and designer",
            2000,
            "engineering student",
            2000,
            "eager learner",
            2000,
            "boardgame fanatic",
            2000,
            "climbing enjoyer",
            500,
            "climbing enthusiast",
            2000,
          ]}
          wrapper="span"
          speed={50}
          deletionSpeed={50}
          repeat={Infinity}
          className="text-[26px] leading-tight font-minecraft font-normal"
        />
      </div>
    </motion.div>
  );
}
