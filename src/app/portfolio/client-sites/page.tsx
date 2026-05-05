"use client";
import Link from "next/link";
import { projects } from "../../../../data/projects";
import SkillBadge from "../../../../_components/SkillBadge";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaRegHandPointer } from "react-icons/fa6";
import { motion } from "motion/react";
import { useState } from "react";
import {
  AnimatedProjectSection,
  ProjectHeroDrawer,
  ProjectSection,
  CollapsibleProjectText,
} from "../../../../_components/portfolio/index";

export default function Page() {
  const project = projects.find((p) => p.slug === "client-sites");
  const currentIndex = projects.findIndex((p) => p.slug === "client-sites");

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <main className="flex flex-col gap-8 text-[#c7d3b4]">
      <AnimatedProjectSection delay={0}>
        <ProjectHeroDrawer project={project} />
      </AnimatedProjectSection>
      <AnimatedProjectSection delay={0.1}>
        <div className="grid grid-cols-3 items-center -mt-5 w-full text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] text-[12px] md:text-[16px]">
          {/* LEFT */}
          <div className="justify-self-start">
            {prevProject ? (
              <Link
                href={`/portfolio/${prevProject.slug}`}
                className="font-bold font-minecraft text-[#90AD8F] hover:text-[#b7d4b3]"
              >
                &lt; {prevProject.title}
              </Link>
            ) : null}
          </div>

          {/* CENTER */}
          <div className="justify-self-center">
            <Link
              href="/portfolio"
              className="text-shadow-none px-3 shadow-[0px_3px_1px_rgba(0,0,0,0.4)] rounded-full bg-[#90AD8F] flex w-fit items-center gap-2 font-minecraft text-[#252723] hover:text-[#e2ece0] transition duration-200"
            >
              All Projects
            </Link>
          </div>

          {/* RIGHT */}
          <div className="justify-self-end">
            {nextProject ? (
              <Link
                href={`/portfolio/${nextProject.slug}`}
                className="font-minecraft font-bold text-[#90AD8F] hover:text-[#b7d4b3]"
              >
                {nextProject.title} &gt;
              </Link>
            ) : null}
          </div>
        </div>
      </AnimatedProjectSection>{" "}
      <ProjectSection>
        <div className="font-minecraft">
          <AnimatedProjectSection delay={0.1}>
            <CollapsibleProjectText title="What tools did I use?">
              <p className="mt-1 text-[16px] leading-9">
                I used <SkillBadge name="React" />{" "}
                <SkillBadge name="JavaScript" /> <SkillBadge name="Next.js" />{" "}
                <SkillBadge name="Node.js" /> and{" "}
                <SkillBadge name="Tailwind CSS" /> to build responsive, polished
                websites for different clients. I also used{" "}
                <SkillBadge name="Figma" /> for planning layouts, visual
                direction, and quick design mockups, with deployment handled
                through <SkillBadge name="Vercel" />
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.2}>
            <CollapsibleProjectText title="What is it?">
              <p className="mt-1 text-[16px] leading-9">
                This is a collection of portfolio and landing websites I created
                for different clients, including friends, student groups, and
                small companies. Each site was built around the client’s goals,
                personality, and audience, whether they needed a personal
                portfolio, professional web presence, or a clean way to showcase
                their work
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.3}>
            <CollapsibleProjectText title="Why this project?">
              <p className="mt-1 text-[16px] leading-9">
                I wanted to practice my frontend and design skills in a more
                realistic setting by working with real people instead of only
                building personal projects. These client sites gave me the
                chance to understand someone else’s needs, translate vague ideas
                into polished interfaces, and deliver websites that were
                actually useful to them
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.4}>
            <CollapsibleProjectText title="What did I learn?">
              <p className="mt-1 text-[16px] leading-9">
                I learned how to communicate with clients, gather requirements,
                iterate on feedback, and balance visual design with usability. I
                also improved at building reusable frontend components, creating
                responsive layouts, and making small design decisions that help
                a website feel more professional, personal, and easy to navigate
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>
        </div>
      </ProjectSection>
    </main>
  );
}
