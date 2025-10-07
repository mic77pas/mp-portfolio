"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Page() {
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible">
      <div className="p-8 flex flex-col gap-8 items-center">
        {/* About block */}
        <section className="flex flex-col rounded-3xl p-8 bg-[#2e3a2b] shadow-lg w-full max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div>
              <h1 className="text-[#9ab397] text-2xl md:text-4xl font-extrabold mb-6 rounded-xl">
                Hey, I&apos;m Michael! 👋
              </h1>
              <div className="text-[#c4d3c1] text-sm md:text-lg max-w-lg pb-2">
                <p className="border-l-4 border-[#9ab397] pl-4">
                  I&apos;m a Systems Design Engineering student at the
                  University of Waterloo, with a growing interest in software
                  development, ux/ui, and product design.
                </p>
                <br />
                <p>
                  As a junior developer, I&apos;m always eager to learn any new
                  technologies and ways to grow in design and development to
                  make the world a better place. To me, learning is a lifelong
                  journey and it never stops.
                </p>
                <br />
                <p>
                  When I&apos;m not coding or studying, you&apos;ll most likely
                  find me climbing, travelling, volunteering, cooking, or
                  playing video games.
                </p>
              </div>
            </div>
            <ProfileCard
              name="Michael Pasyechnyk"
              title="Developer and Designer"
              handle="mic77_pas"
              status="Online"
              contactText={<span>&#8599;</span>}
              avatarUrl="headshot.png"
              miniAvatarUrl={"selfie2.jpg"}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact clicked")}
            />
            {/* <div className="md:w-85 md:h-110 w-70 h-70 relative flex-shrink-0 overflow-hidden rounded-2xl">
              <Image
                src="/selfie2.jpg"
                fill
                className="object-cover rounded-2xl shadow-xl transition-transform duration-500 ease-in-out hover:scale-120"
                alt="Photo"
              />
            </div> */}
          </div>
        </section>

        {/* Expand/Collapse bar */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full max-w-4xl rounded-3xl bg-[#41503f] text-[#c4d3c1] font-semibold px-6 py-3 shadow-md hover:bg-[#4a5a46] transition text-lg"
        >
          {expanded ? "▲ Hide Posts" : "▼ A Bit More About Me"}
        </button>

        {/* Expanded content */}
        {expanded && (
          <motion.section
            className="flex flex-col rounded-3xl p-8 bg-[#2e3a2b] shadow-lg w-full max-w-4xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image container */}
              <div className="flex md:flex-col gap-4 flex-row justify-between">
                <div className="relative md:w-52 md:h-52 w-30 h-30 flex-shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/env.avif"
                    fill
                    className="object-cover rounded-2xl shadow-xl transition-transform duration-500 ease-in-out hover:scale-110"
                    alt="Second Photo"
                  />
                </div>
                <div className="relative md:w-52 md:h-52 w-30 h-30 flex-shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/eng.jpg"
                    fill
                    className="object-cover rounded-2xl shadow-xl transition-transform duration-500 ease-in-out hover:scale-110"
                    alt="Photo"
                  />
                </div>
              </div>

              {/* Text content */}
              <div>
                <div className="flex items-center justify-between mb-6 text-[#9ab397] md:text-3xl text-xl rounded-full px-4 py-2 bg-[#41503f]">
                  <h1 className="font-extrabold">
                    EN<span className="text-[#4e9646]">V</span> to EN
                    <span className="text-[#8d3aa1]">G</span>
                  </h1>
                  <span className="text-[#c4d3c1] md:text-xs text-[10px] italic">
                    August 24th, 2025
                  </span>
                </div>
                <div className="text-[#c4d3c1] text-sm pl-2">
                  <p>
                    When I first applied to Waterloo, I wasn’t completely
                    certain about my academic goals. Coming from a family in the
                    tech field—and with encouragement from my father—I applied
                    to Computer Science, a subject I enjoyed in high school and
                    thought would be the right fit.
                  </p>
                  <br />
                  <p>
                    Instead, I was deferred to the Geomatics program in the
                    Faculty of Environment. While unfamiliar at first, I came to
                    appreciate how it connected mapping, spatial data, and
                    technology to real-world systems. Geomatics gave me a strong
                    foundation in problem-solving, analytical thinking, and
                    collaboration, and I’m grateful for the professors, peers,
                    and opportunities that shaped my first year.
                  </p>
                  <br />
                  <p>
                    Still, I wanted a program that blended technology, design,
                    and systems thinking more closely with my interests. That
                    led me to Systems Design Engineering (SYDE), where I’m
                    excited to explore engineering principles, human-centered
                    design, and innovation. Looking back, I see Geomatics not as
                    a detour but as a valuable first step that gave me
                    perspective and clarity. And now, I’m ready to take on the
                    challenges ahead.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* 
        <button
          onClick={() => setExpanded2(!expanded2)}
          className="w-full max-w-4xl rounded-3xl bg-[#41503f] text-[#c4d3c1] font-semibold px-6 py-3 shadow-md hover:bg-[#4a5a46] transition text-lg"
        >
          {expanded2 ? "▲ Hide FAQs" : "▼ Show FAQs"}
        </button>

        {expanded2 && (
          <motion.section
            className="flex flex-col rounded-3xl p-8 bg-[#2e3a2b] shadow-lg w-full max-w-4xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex flex-col md:flex-row gap-6 ">
              <p className="text-[#c4d3c1] font-semibold">What is Systems Design Engineering?</p>
            </div>
          </motion.section>
        )}
        */}
      </div>
    </motion.div>
  );
}
