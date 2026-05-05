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
import { ProjectGrid } from "./ProjectGrid";

export default function Page() {
  const project = projects.find((p) => p.slug === "cs50-web");
  const currentIndex = projects.findIndex((p) => p.slug === "cs50-web");

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
      </AnimatedProjectSection>
      {/* <span className="font-minecraft text-3xl text-center font-bold text-[#90AD8F] bg-[#161616] py-2 rounded-lg text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)]">
        Course Projects
      </span> */}
      <ProjectGrid />
      <ProjectSection>
        <div className="font-minecraft">
          <AnimatedProjectSection delay={0.1}>
            <CollapsibleProjectText title="What tools did I use?">
              <p className="mt-1 text-[16px] leading-9">
                I used <SkillBadge name="Python" /> <SkillBadge name="Django" />{" "}
                <SkillBadge name="JavaScript" /> <SkillBadge name="HTML5" />{" "}
                <SkillBadge name="CSS3" /> and <SkillBadge name="MySQL" /> to
                build full-stack web applications. I worked extensively with
                Django’s ORM, authentication system, and templating engine,
                while also using the fetch API for asynchronous front-end
                interactions and dynamic updates
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.2}>
            <CollapsibleProjectText title="What is it?">
              <p className="mt-1 text-[16px] leading-9">
                This project is a collection of full-stack web applications I
                built as part of Harvard’s CS50 Web Programming with Python and
                JavaScript course. The projects range from front-end replicas to
                fully functional applications like an email client, social
                network, and e-commerce auction platform, all designed to mirror
                real-world web systems
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.3}>
            <CollapsibleProjectText title="Why this project?">
              <p className="mt-1 text-[16px] leading-9">
                I wanted to strengthen my understanding of how full-stack web
                applications actually work under the hood. This course pushed me
                to go beyond frontend development and learn how to build
                complete systems, handling routing, databases, authentication,
                and server-side logic using Django
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.4}>
            <CollapsibleProjectText title="What did I learn?">
              <p className="mt-1 text-[16px] leading-9">
                I learned how to build full-stack applications from scratch,
                including designing database models, implementing authentication
                systems, and connecting front-end interfaces with back-end
                logic. I also gained experience with asynchronous JavaScript
                using the fetch API, creating single-page application behaviors,
                and structuring scalable Django applications. This course gave
                me a strong foundation in how modern web apps function
                end-to-end
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>
        </div>
      </ProjectSection>
    </main>
  );
}
