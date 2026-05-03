import Image from "next/image";
import { useState } from "react";
import { projects } from "../../data/projects";
import { FaGithub, FaRegHandPointer } from "react-icons/fa6";

type Project = (typeof projects)[number];

export function ProjectHeroDrawer({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="overflow-hidden rounded-xl border-2 border-[#6a8366] bg-[#101310] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
      {/* Image / GIF preview */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative block aspect-video w-full cursor-pointer overflow-visible z-10 "
      >
        <div className="absolute inset-0 overflow-hidden">
          {project.gif?.endsWith(".mp4") || project.gif?.endsWith(".webm") ? (
            <video
              src={project.gif}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover scale-125"
            />
          ) : (
            <Image
              src={project.gif || project.image}
              alt={`${project.title} preview`}
              fill
              unoptimized={project.gif?.endsWith(".gif")}
              className="object-cover"
            />
          )}
        </div>

        <div
          className={`absolute -rotate-12 bottom-4 right-4 z-40 flex items-center justify-center rounded-full border-2 border-[#6a8366] bg-[#1d201d]/80 p-3 font-minecraft text-lg text-[#c7d3b4] backdrop-blur-sm transition-all duration-300 ${
            open
              ? "opacity-0 scale-90 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <FaRegHandPointer />
        </div>
      </button>

      {/* Drawer */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-row justify-between rounded-b-lg  border-t-2 border-[#6a8366] bg-[#1a1b1a] p-6 shadow-[inset_12px_12px_12px_rgba(0,0,0,0.2),inset_-12px_-12px_12px_rgba(0,0,0,0.2)]">
            <div className="text-shadow-[0px_3px_0px_rgba(0,0,0,0.6)]">
              <h1 className="font-minecraft text-4xl text-[#90AD8F] ">
                {project.title}
              </h1>
              <p className="mt-1 font-minecraft text-sm text-[#90AD8F]">
                {project.caption}
              </p>

              <p className="mt-4 max-w-3xl font-minecraft text-sm leading-7 text-[#c7d3b4]">
                {project.description}
              </p>
            </div>

            {/* <div className="mt-5 flex flex-wrap gap-2">
              {project.skills?.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div> */}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-fit items-center gap-2 rounded-lg border-2 border-[#6a8366] bg-[#252725] px-4 py-2 font-minecraft text-[#c7d3b4] hover:bg-[#6a8366] hover:text-[#101310] transition duration-200"
              >
                <FaGithub size={20} />
                <p className="hidden lg:block">View GitHub</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
