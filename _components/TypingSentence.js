"use client";
import { TypeAnimation } from "react-type-animation";
import { IoSearch } from "react-icons/io5";
import { Montserrat } from "next/font/google";
import { SearchIcon } from "raster-react";

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
        relative flex flex-row items-center text-[#A1BD98]
        w-[540px] h-[54px]
        px-3 py-2 gap-3 z-20
        hover:brightness-120 transition-all duration-200
      `} // className={`
      //   ${montserrat.className}
      //   flex flex-row items-center
      //   bg-[#3a3f39]
      //   text-[#A1BD98] font-semibold
      //   w-[460px] h-[54px]
      //   px-3 py-2 gap-3 z-20
      //   shadow-[0px_4px_1px_rgba(0,0,0,0.5)]
      //   text-shadow-[0px_2px_5px_rgba(0,0,0,0.25)]
      //   hover:brightness-120 transition-all duration-200 rounded-tl-2xl rounded-br-2xl
      // `}
      style={{
        backgroundImage: "url('/comps/sentence.png')",
        backgroundSize: "100% 100%",
      }}
    >
      {/* <IoSearch size={20} className="mr-3 sm:mr-4 md:mr-5 text-[#A1BD98] flex-shrink-0" /> */}
      <SearchIcon className="mb-1" size={40} color="A1BD98" strokeWidth={1} radius={4} />

      <div className="overflow-hidden mb-1">
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
          className="text-[26px] leading-tight font-minecraft font-normal"
        />
      </div>
    </div>
  );
}
