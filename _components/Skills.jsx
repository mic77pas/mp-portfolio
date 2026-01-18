import LogoLoop from "../src/components/LogoLoop";
import { skills, CATEGORY_COLORS } from "../data/skills";
import { useMemo, useState, useCallback } from "react";
import { motion } from "motion/react";

export default function Skills() {
  const [counter, setCounter] = useState(0);

  const handleClick = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  const skillsByCategory = useMemo(() => {
    return skills.reduce((acc, skill) => {
      const category = skill.category || "Other"; // Fallback
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
  }, []);

  const sortedSkills = useMemo(() => {
    // 1. Combine all skills into a single array
    const allSkills = Object.values(skillsByCategory).flat();

    // 2. Sort the skills based on their category (for visual grouping by color)
    const categoryOrder = Object.keys(CATEGORY_COLORS);

    allSkills.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      return indexA - indexB;
    });

    return allSkills;
  }, [skillsByCategory]);

  const logoProps = useMemo(
    () =>
      skills.map((skill) => ({
        src: skill.icon,
        alt: skill.name,
        title: skill.name,
        href: skill.link,
        width: 48,
        height: 48,
      })),
    []
  );

  return (
    <motion.div
      //   initial={{ opacity: 0, y: 50 }} // starts slightly below, invisible
      //   whileInView={{ opacity: 1, y: 0 }} // fades & slides up
      //   transition={{ duration: 0.7, ease: "easeOut" }} // smooth timing
      //   viewport={{ once: true, amount: 0.2 }} // triggers only once when 20% is visible
      className="flex flex-col pt-5 pb-5 justify-center items-center"
    >
      <h2 className="font-minecraft text-4xl font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
        Tech Stack
      </h2>
      {/* <hr className="h-1 w-full bg-gradient-to-r from-[#98B493] via-[#7da376] to-[#98B493] border-0 rounded" /> */}
      <div className="w-full">
        <LogoLoop
          logos={logoProps}
          speed={60}
          direction="left"
          logoHeight={48}
          gap={30}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#1a1d1a"
          scaleOnHover={true}
          className="border border-[#384438] bg-[#2c332c]/75 pt-3 rounded-t-2xl"
          // style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.5)" }}
        />
      </div>
      <div
        className="flex flex-col w-full mb-6 p-3 rounded-b-2xl border border-[#384438] bg-[#131813]/75 py-5"
        style={{ boxShadow: "0px 4px 8px rgba(0,0,0,0.5)" }}
      >
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {sortedSkills.map((skill) => (
            <a
              key={skill.name}
              href={skill.link}
              target="_blank"
              className={`
                skill-blob
                ${CATEGORY_COLORS[skill.category] || "bg-gray-500"}
                `}
            >
              {skill.name}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
