import LogoLoop from "../src/components/LogoLoop";
import { skills, CATEGORY_COLORS } from "../data/skills";
import { useMemo } from "react";
import { motion } from "motion/react";

export default function Skills() {
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
      className="flex flex-col md:mt-30 pt-5 pb-5 justify-center items-center gap-6"
    >
      <h2 className="text-4xl font-bold text-[#90AD8F]">Skills</h2>
      <hr className="h-1 w-95 md:w-5xl bg-gradient-to-r from-[#98B493] via-[#7da376] to-[#98B493] border-0 rounded" />
      <div className="w-full max-w-95 md:max-w-5xl">
        {/* Your actual skills content will go here */}
        <LogoLoop
          logos={logoProps}
          speed={60}
          direction="left"
          logoHeight={48}
          gap={30}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#2b302a"
          scaleOnHover={true}
          className="bg-[#454d45] pt-3 rounded-2xl p-4"
        />
      </div>
      <div className="flex flex-col max-w-95 md:max-w-5xl w-full gap-6 p-3 rounded-2xl green-div">
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {sortedSkills.map((skill) => (
            <p
              key={skill.name}
              className={`
                skill-blob
                ${CATEGORY_COLORS[skill.category] || "bg-gray-500"}
                `}
            >
              {skill.name}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
