// app/_components/SkillCarousel.js
"use client";

import Image from "next/image";
import { skills } from "../_data/skills";

export default function SkillCarousel() {
  // Duplicate the skills list to ensure a seamless infinite loop
  const allSkills = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden rounded-2xl w-full shadow-md">
      <div className="animate-scroll-left">
        {allSkills.map((skill, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center p-3 bg-[#6d8e6b]"
          >
            <Image
              src={skill.icon}
              width={64}
              height={64}
              alt={skill.name}
              className="h-13 w-12" // Ensures a consistent size
            />
          </div>
        ))}
      </div>
    </div>
  );
}
