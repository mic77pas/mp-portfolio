"use client";
import { TypeAnimation } from "react-type-animation";
import { IoSearch } from "react-icons/io5";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function TypingSentence() {
  return (
    <div
      className={`
        ${montserrat.className}
        flex flex-row items-center
        bg-[#404B3F] rounded-full
        text-[#A1BD98] font-semibold
        w-[75%] sm:w-[360px] md:w-[460px]
        h-[40px] sm:h-[48px] md:h-[52px]
        px-4 sm:px-6
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
        text-shadow-[0px_2px_5px_rgba(0,0,0,0.25)]
      `}
    >
      {/* Fixed icon */}
      <IoSearch
        size={20}
        className="mr-3 sm:mr-4 md:mr-5 text-[#A1BD98] flex-shrink-0"
      />

      {/* Typing text stays left-aligned, scales by screen size */}
      <div className="overflow-hidden">
        <TypeAnimation
          sequence={[
            "developer and designer",
            2000,
            "engineering student",
            2000,
            "eager learner",
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
          className="text-[18px] md:text-[24px] leading-tight"
        />
      </div>
    </div>
  );
}
