import Image from "next/image";
import { useState } from "react";
import { projects } from "../../data/projects";
import { FaGithub, FaRegHandPointer } from "react-icons/fa6";
import { Square } from "ldrs/react";

type Project = (typeof projects)[number];

export function ProjectHeroDrawer({
  project,
  scale,
}: {
  project: Project;
  scale?: number;
}) {
  const [open, setOpen] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(true);

  return (
    <section className="overflow-hidden rounded-xl bg-surface-1 shadow-lg">
      {/* Image / GIF preview */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative block aspect-video w-full cursor-pointer overflow-visible z-10 "
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Loader overlay */}
          {loadingMedia && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/40 z-50">
              <Square
                size="35"
                stroke="5"
                strokeLength="0.25"
                bgOpacity="0.1"
                speed="1.2"
                color="var(--accent)"
              />
            </div>
          )}

          {project.gif?.endsWith(".mp4") || project.gif?.endsWith(".webm") ? (
            <video
              src={project.gif}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setLoadingMedia(false)} // ✅ key line
              className={`h-full w-full object-cover scale-${scale ? scale : 100}`}
            />
          ) : (
            <Image
              src={project.gif || project.image}
              alt={`${project.title} preview`}
              fill
              unoptimized={project.gif?.endsWith(".gif")}
              onLoadingComplete={() => setLoadingMedia(false)} // ✅ for images
              className="object-cover"
            />
          )}
        </div>

        <div
          className={`absolute -rotate-12 bottom-4 right-4 z-40 flex items-center justify-center rounded-full border-2 border-border-subtle bg-surface-2/80 p-3 font-minecraft text-lg text-text-secondary backdrop-blur-sm transition-all duration-300 ${
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
          <div className="flex flex-row justify-between rounded-b-lg border-t-2 border-border-subtle bg-surface-1 p-6 shadow-sm">
            <div className="[text-shadow:var(--shadow-text-strong)]">
              <h1 className="font-minecraft text-4xl text-accent">
                {project.title}
              </h1>

              <p className="mt-4 max-w-3xl font-minecraft text-sm leading-7 text-text-secondary">
                {project?.description}
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
                className="inline-flex h-fit items-center gap-2 rounded-lg border-2 border-border-subtle bg-surface-2 px-4 py-2 font-minecraft text-text-secondary hover:bg-accent hover:text-accent-contrast transition duration-200"
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
