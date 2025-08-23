"use client";
import { TypeAnimation } from "react-type-animation";

export default function TypingSentence() {
  return (
    <div className="text-[44px] font-semibold text-[#bfccbd]">
      <TypeAnimation
        sequence={[
          "developer and designer",
          2000,
          "engineering student",
          2000,
          "boardgame enjoyer",
          500,
          "boardgame enthusiast",
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
