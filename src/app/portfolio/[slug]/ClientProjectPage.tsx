"use client";

import { FaGithub } from "react-icons/fa";
import { IoLogoFigma } from "react-icons/io5";
import { LuExternalLink } from "react-icons/lu";
import {
  AnimatedProjectSection,
  ProjectHeroDrawer,
  ProjectSection,
  CollapsibleProjectText,
} from "../../../../_components/portfolio/index";
import { ProjectPageNav } from "../../../../_components/portfolio/ProjectPageNav";
import { ProjectSubGrid } from "../../../../_components/portfolio/ProjectSubGrid";
import { projects } from "../../../../data/projects";

// data/projects.js entries don't currently populate demoUrl/figmaUrl/otherUrl
// (no real values exist yet), but the template supports them once they do.
type Project = (typeof projects)[number] & {
  demoUrl?: string;
  figmaUrl?: string;
  otherUrl?: string;
};
type SubItem = {
  title: string;
  description: string;
  image: string;
  gif?: string;
  github?: string;
  tech?: string[];
};

const TEXT_SECTIONS: {
  key: keyof Project;
  title: string;
}[] = [
  { key: "toolsUsed", title: "What tools did I use?" },
  { key: "whatIsIt", title: "What is it?" },
  { key: "why", title: "Why this project?" },
  { key: "learnings", title: "What did I learn?" },
];

export default function ClientProjectPage({
  project,
  subItems,
}: {
  project: Project;
  subItems?: SubItem[];
}) {
  const extraLinks = [
    project.demoUrl && {
      href: project.demoUrl,
      label: "Live Demo",
      icon: LuExternalLink,
    },
    project.figmaUrl && {
      href: project.figmaUrl,
      label: "View in Figma",
      icon: IoLogoFigma,
    },
    project.otherUrl && {
      href: project.otherUrl,
      label: "More",
      icon: LuExternalLink,
    },
  ].filter(Boolean) as { href: string; label: string; icon: typeof FaGithub }[];

  const textSections = TEXT_SECTIONS.filter(
    ({ key }) => typeof project[key] === "string" && project[key],
  );

  return (
    <main className="flex flex-col gap-8 text-text-secondary">
      <AnimatedProjectSection delay={0}>
        <ProjectHeroDrawer project={project} />
      </AnimatedProjectSection>

      {extraLinks.length > 0 && (
        <AnimatedProjectSection delay={0.05}>
          <div className="flex flex-wrap justify-center gap-3">
            {extraLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="button-hover font-minecraft"
              >
                <Icon size={18} /> {label}
              </a>
            ))}
          </div>
        </AnimatedProjectSection>
      )}

      <AnimatedProjectSection delay={0.1}>
        <ProjectPageNav project={project} />
      </AnimatedProjectSection>

      {subItems && subItems.length > 0 && (
        <ProjectSubGrid items={subItems} />
      )}

      {textSections.length > 0 && (
        <ProjectSection>
          <div className="font-minecraft">
            {textSections.map(({ key, title }, index) => (
              <AnimatedProjectSection key={key} delay={0.1 * (index + 1)}>
                <CollapsibleProjectText title={title} defaultOpen={index === 0}>
                  <p className="mt-1 text-[16px] leading-9">
                    {project[key] as string}
                  </p>
                </CollapsibleProjectText>
              </AnimatedProjectSection>
            ))}
          </div>
        </ProjectSection>
      )}
    </main>
  );
}
