"use client";

import { motion } from "motion/react";
import PortfolioRail from "../../../_components/cards/PortfolioRail";
import { portfolioGroups } from "../../../data/portfolioGroups";

export default function Page() {
  return (
    <div className="page-container pt-8 md:pt-[168px] pb-16 flex flex-col gap-10 md:gap-14">
      {portfolioGroups.map((group, i) => (
        <motion.section
          key={group.kind}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
          className="flex flex-col gap-5"
        >
          <h2 className="font-minecraft font-bold text-[20px] text-[#c1dab6]">
            {group.title}
          </h2>
          <PortfolioRail items={group.items} />
        </motion.section>
      ))}
    </div>
  );
}
