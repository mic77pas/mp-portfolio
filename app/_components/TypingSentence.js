"use client";
import { TypeAnimation } from "react-type-animation";

export default function TypingSentence() {
  return (
    <div className=" text-[18px] md:text-[22px] font-semibold text-[#b0c3ad]">
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
        speed={50} // typing speed (lower = slower)
        deletionSpeed={50} // how fast it deletes
        repeat={Infinity} // loop forever
      />
    </div>
  );
}
