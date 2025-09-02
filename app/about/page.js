"use client";
import Link from "next/link";
import TypingSentence from "../_components/TypingSentence";
import Image from "next/image";
import { Inter } from "next/font/google";
import UWLogo from "../_components/UWLogo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../_components/accordion";
import { motion } from "framer-motion";

const inter = Inter({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  display: "swap",
});

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Page() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible">
      <div className="p-8 flex flex-col gap-8 items-center">
        {/* About block */}
        <section className="flex flex-col rounded-3xl p-8 bg-[#2e3a2b] shadow-lg w-full max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <h1 className="text-[#98B493] text-4xl font-extrabold mb-3">
                Hey, I&apos;m Michael! 👋
              </h1>
              <p className="text-[#c4d3c1] text-base md:text-lg max-w-lg pb-5">
                I&apos;m a Systems Design Engineering student at the University
                of Waterloo, with a growing interest in software development,
                ux/ui, and product design.
                <br />
                <br />
                I solve problems using my building blocks of design and
                development to make the world a better place. To me, learning is
                a lifelong journey and it never stops.
                <br />
                <br />
                When I&apos;m not developing new programs, you&apos;ll most
                likely find me climbing, travelling, volunteering, or playing
                video games.
              </p>
            </div>
            <div className="md:w-100 md:h-120 w-80 h-100 relative flex-shrink-0">
              <Image
                src="/selfie2.jpg"
                fill
                className="object-cover rounded-2xl shadow-xl"
                alt="Photo"
              />
            </div>
          </div>
        </section>

        {/* About blocks with accordion */}
        <section className="flex flex-col rounded-xl px-3 py-3 border-[#2e3a2b] border-8 shadow-md w-full max-w-4xl">
          <Accordion type="single" collapsible className="rounded-xl">
            {/* Experience */}
            <AccordionItem value="experience" className="border-0 pb-3">
              <AccordionTrigger className="flex items-center justify-between w-full px-4 py-4 text-lg font-semibold text-white hover:bg-[#2e3a2b] data-[state=open]:bg-[#2e3a2b] data-[state=open]:rounded-b-none rounded-lg transition">
                Experience
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-[#c4d3c1] text-base bg-[#3e4f3a] rounded-b-xl">
                <p className="font-semibold text-lg text-white">
                  IpserLab — Software Engineering Intern
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  May 2025 – Aug 2025
                </p>
                <p>
                  Worked on front-end development, UI improvements, and product
                  management tasks.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Community */}
            <AccordionItem value="community" className="border-0 pb-3">
              <AccordionTrigger className="flex items-center justify-between w-full px-4 py-4 text-lg font-semibold text-white hover:bg-[#2e3a2b] data-[state=open]:bg-[#2e3a2b] data-[state=open]:rounded-b-none rounded-lg transition">
                Community
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-[#c4d3c1] text-base bg-[#3e4f3a] rounded-b-xl">
                <p>
                  Clubs, volunteering, and leadership experiences can go here.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Education */}
            <AccordionItem value="education" className="border-0">
              <AccordionTrigger className="flex items-center justify-between w-full px-4 py-4 text-lg font-semibold text-white hover:bg-[#2e3a2b] data-[state=open]:bg-[#2e3a2b] data-[state=open]:rounded-b-none rounded-lg transition">
                Education
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-[#c4d3c1] text-base bg-[#3e4f3a] rounded-b-xl">
                <p className="font-semibold text-lg text-white">
                  University of Waterloo - Systems Design Engineering (BASc)
                </p>
                <p className="text-sm text-[#c4d3c1] mb-2">2025 – 2030</p>
                <p>
                  <b>Relevant Courses:</b> Human Factors of Design, Data
                  Structures and Algorithms, Digital Systems.
                </p>
                <br />
                <p className="font-semibold text-lg text-white">
                  University of Waterloo - Geomatics (BES)
                </p>
                <p className="text-sm text-[#c4d3c1] mb-2">2024 – 2025</p>
                <p>
                  <b>Relevant Courses:</b> Designing Functional Programs,
                  Algorithm Design and Data Abstraction, Geospatial Data,
                  Geographic Information Systems
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </motion.div>
  );
}
