"use client";
import ProfileCard from "../../components/ProfileCard";
import { useEffect, useState } from "react";
import CircularGallery from "../../components/CircularGallery";
import images from "../../../data/galleryImages";
import Link from "next/link";
import UWLogo from "../../../_components/UWLogo";
import { FaInstagram } from "react-icons/fa";
import CareerTimeline from "../../../_components/CareerTimeline";
import careers from "../../../data/career";
import Image from "next/image";
import { motion } from "framer-motion";
import ExperienceSection from "../../../_components/Experience";
import PixelTransition from "../../components/PixelTransition";
import AboutHeader from "../../../_components/AboutHeader";

const items = images.map((item) => ({
  image: item.src, // Mapped to image
  text: item.caption, // Mapped to text (for the OGL text renderer)
}));

export default function About() {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "instant" });
  // }, []);

  return (
    <motion.div
      className="flex flex-col items-start px-8 w-full mx-auto gap-8 mt-10"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <AboutHeader />
      <ExperienceSection />

      {/* <hr className="h-1 w-full bg-gradient-to-r from-[#98B493] via-[#7da376] to-[#98B493] border-0 rounded mb-6" /> */}
      {/* <div className="flex flex-col items-center w-full rounded-2xl h-120">
        <h2 className="bg-[#455445] text-[#90AD8F] mt-4 p-5.5 rounded-t-xl w-full text-center text-4xl font-bold border-b-[#30382f] border-b-6 z-10">
          My Career
        </h2>
        <CareerTimeline events={careers} />
      </div> */}
    </motion.div>
  );
}
