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
  const project = projects.find((p) => p.slug === "portfolio-website");
  const currentIndex = projects.findIndex(
    (p) => p.slug === "portfolio-website",
  );

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <main className="flex flex-col gap-8 text-[#c7d3b4]">
      <AnimatedProjectSection delay={0}>
        <ProjectHeroDrawer project={project} scale={125} />
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
                <SkillBadge name="TypeScript" />{" "}
                <SkillBadge name="Tailwind CSS" /> for the frontend, and{" "}
                <SkillBadge name="Next.js" /> <SkillBadge name="Node.js" /> for
                the backend. I also used <SkillBadge name="Figma" /> to
                prototype my design and create assets such as my logo and other
                custom components, and deployed this site on{" "}
                <SkillBadge name="Vercel" />
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.2}>
            <CollapsibleProjectText title="What is it?">
              <p className="mt-1 text-[16px] leading-9">
                This portfolio website is my personal space to showcase my
                projects, experience, background, and interests in software
                engineering, design, and creative technology. I built it to feel
                more personal than a standard resume, with custom visuals,
                interactive project pages, and a design style that reflects my
                personality.
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.3}>
            <CollapsibleProjectText title="Why this project?">
              <p className="mt-1 text-[16px] leading-9">
                I wanted a place where I could present my work in a more
                detailed and polished way than a resume or GitHub profile. Since
                I am interested in frontend development, UI/UX, and product
                design, this project let me combine technical implementation
                with visual design, animation, and storytelling.
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>

          <AnimatedProjectSection delay={0.4}>
            <CollapsibleProjectText title="What did I learn?">
              <p className="mt-1 text-[16px] leading-9">
                I learned how to structure a scalable Next.js project, create
                reusable components, manage dynamic project pages, and refine
                small UI details like animations, hover states, responsive
                layouts, and collapsible sections. I also got more comfortable
                turning design ideas from Figma into my first ever polished,
                deployed website!
              </p>
            </CollapsibleProjectText>
          </AnimatedProjectSection>
        </div>
      </ProjectSection>
    </main>
  );
}
