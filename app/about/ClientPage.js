"use client";
import Image from "next/image";
import { motion } from "framer-motion";

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
              <h1 className="text-[#9ab397] text-4xl font-extrabold mb-6 rounded-xl">
                Hey, I&apos;m Michael! 👋
              </h1>
              <div className="text-[#c4d3c1] text-base md:text-lg max-w-lg pb-5">
                <p className="border-l-4 border-[#9ab397] pl-4">
                  I&apos;m a Systems Design Engineering student at the
                  University of Waterloo, with a growing interest in software
                  development, ux/ui, and product design.
                </p>
                <br />
                <p>
                  I solve problems using my building blocks of design and
                  development to make the world a better place. To me, learning
                  is a lifelong journey and it never stops.
                </p>
                <br />
                <p>
                  When I&apos;m not developing new programs, you&apos;ll most
                  likely find me climbing, travelling, volunteering, or playing
                  video games.
                </p>
              </div>
            </div>
            <div className="md:w-85 md:h-110 w-50 h-100 relative flex-shrink-0 overflow-hidden rounded-2xl">
              <Image
                src="/selfie2.jpg"
                fill
                className="object-cover rounded-2xl shadow-xl transition-transform duration-500 ease-in-out hover:scale-120"
                alt="Photo"
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col rounded-3xl p-8 bg-[#2e3a2b] shadow-lg w-full max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image container */}
            <div className="flex flex-col gap-4">
              <div className="relative w-60 h-60 flex-shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src="/env.avif"
                  fill
                  className="object-cover rounded-2xl shadow-xl transition-transform duration-500 ease-in-out hover:scale-110"
                  alt="Second Photo"
                />
              </div>
              {/* First image */}
              <div className="relative w-60 h-60 flex-shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src="/eng.jpg"
                  fill
                  className="object-cover rounded-2xl shadow-xl transition-transform duration-500 ease-in-out hover:scale-110"
                  alt="Photo"
                />
              </div>

              {/* Second image */}
            </div>

            {/* Text content */}
            <div>
              <h1 className="text-[#9ab397] text-3xl font-extrabold mb-6 rounded-full px-4 py-2 bg-[#41503f]">
                EN<span className="text-[#4e9646]">V</span> to EN
                <span className="text-[#9b3bb3]">G</span>
              </h1>
              <div className="text-[#c4d3c1] test-sm max-w-lg pb-5 pl-2">
                <p>
                  When first applying to Waterloo, I was still unsure about my
                  academic goals and what I wanted to pursue. Coming from a
                  family surrounded by people already in the tech field
                  (especially with some encouragement from my father), I decided
                  to apply to Computer Science as I enjoyed the subject in high
                  school and thought it'd be what I wanted to study.{" "}
                </p>
                <br />
                <p>
                  I was deferred to the Geomatics program in the Faculty of
                  Environment and while thrown off at first as I was unfamiliar
                  with the major, ......
                </p>
                <br />
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
