import Link from "next/link";
import { projects } from "../../data/projects";

type Project = (typeof projects)[number];

export function ProjectPageNav({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-3 items-center -mt-5 w-full [text-shadow:var(--shadow-text-strong)] text-[12px] md:text-[16px]">
      <div className="justify-self-start">
        {prevProject ? (
          <Link
            href={`/portfolio/${prevProject.slug}`}
            className="font-bold font-minecraft text-accent hover:text-accent-hover"
          >
            &lt; {prevProject.title}
          </Link>
        ) : null}
      </div>

      <div className="justify-self-center">
        <Link
          href="/portfolio"
          className="text-shadow-none px-3 shadow-sm rounded-full bg-accent flex w-fit items-center gap-2 font-minecraft text-accent-contrast hover:bg-accent-hover transition duration-200"
        >
          All Projects
        </Link>
      </div>

      <div className="justify-self-end">
        {nextProject ? (
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="font-minecraft font-bold text-accent hover:text-accent-hover"
          >
            {nextProject.title} &gt;
          </Link>
        ) : null}
      </div>
    </div>
  );
}
