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
  const project = projects.find((p) => p.slug === "react-apps");
  const currentIndex = projects.findIndex((p) => p.slug === "react-apps");

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
                I used <SkillBadge name="React" />{" "}
                <SkillBadge name="JavaScript" /> <SkillBadge name="Next.js" />{" "}
                <SkillBadge name="Redux" /> <SkillBadge name="Context API" />{" "}
                and <SkillBadge name="React Query" /> to build interactive and
                data-driven applications. I also worked with{" "}
                <SkillBadge name="Supabase" /> <SkillBadge name="PostgreSQL" />{" "}
                <SkillBadge name="Node.js" /> and deployed projects using{" "}
                <SkillBadge name="Vercel" /> and <SkillBadge name="Netlify" />.
                For styling, I used <SkillBadge name="Tailwind CSS" /> and{" "}
                <SkillBadge name="Styled Components" />
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.2}>
            <CollapsibleProjectText title="What is it?">
              <p className="mt-1 text-[16px] leading-9">
                This project is a collection of 10+ React applications I built
                as part of a 90+ hour Modern React Development course by Jonas
                Schmedtmann. The apps range from small concept projects to
                full-stack applications like a hotel booking platform,
                management dashboard, and food ordering system, with each app
                focused on a different set of real-world development patterns
                and tools
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.3}>
            <CollapsibleProjectText title="Why this project?">
              <p className="mt-1 text-[16px] leading-9">
                This was one of my first major software courses and a turning
                point in how I approached development. I wanted to go beyond
                tutorials and actually build complete, production-style
                applications while learning how modern React systems work
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.4}>
            <CollapsibleProjectText title="What did I learn?">
              <p className="mt-1 text-[16px] leading-9">
                I developed a strong foundation in React fundamentals and
                advanced patterns such as state management with Redux and
                Context API, data fetching with React Query, and building
                scalable component architectures. I also learned how to work
                with APIs, handle authentication, manage global state, and
                structure full-stack applications using tools like Next.js and
                Supabase. This course played a huge role in shaping how I now
                build modern web applications and I use all and any fundamentals
                I learned to this day
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>
        </div>
      </ProjectSection>
    </main>
  );
}
