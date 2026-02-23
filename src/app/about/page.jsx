"use client";

import { motion } from "framer-motion";
import AboutHeader from "../../../_components/AboutHeader";
import ExperienceSection from "../../../_components/Experience";

export default function About() {
  return (
    <motion.div
      className="w-full flex flex-col gap-8"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <AboutHeader />
      <ExperienceSection />
    </motion.div>
  );
}
