"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

export default function CompanyClient({ selected }) {
  return (
    <motion.div
      className="mt-20 mb-12 rounded-2xl max-w-5xl mx-auto text-[#c4d4bf]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="flex flex-row items-center"
        variants={itemVariants}
      >
        <Image
          src={selected.logo}
          alt="Logo"
          width={100}
          height={100}
          className="rounded-full z-5"
        />
        <div className="-ml-10 pl-18 h-18 w-full rounded-lg bg-[#373d36] flex items-center justify-between pr-5">
          <h2 className="text-4xl font-bold">{selected.title}</h2>
          <p className="text-[#8B9786] text-sm justify-end font-bold">
            {selected.date}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col mt-10 gap-7 text-lg text-[#b1c2ac]"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h3 className="text-3xl font-bold mb-3">About the company</h3>
          <p>{selected.about || "More details coming soon!"}</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-3xl font-bold mb-3">What did I do?</h3>
          <p>{selected.do || "More details coming soon!"}</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-3xl font-bold mb-3">What did I learn?</h3>
          <p>{selected.learn || "More details coming soon!"}</p>
        </motion.div>
        <a
          href="/about"
          className="text-[20px] text-end hover:text-[#e9f0e8] duration-100"
        >
          <p className="bg-[#3a3f3a] text-[14px] font-bold rounded-xl py-2 px-3 inline-block">
            Return to About Me &#x21a9;
          </p>
        </a>
      </motion.div>
    </motion.div>
  );
}
