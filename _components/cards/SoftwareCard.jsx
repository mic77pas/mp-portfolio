import Image from "next/image";
import SkillBadge from "../SkillBadge";
import TitlePlaque from "./TitlePlaque";

// Image strip expands to fill the card (and zooms) on hover. The minimum
// height is the tallest software card (three rows of pills), so every card
// matches it however much it holds.
export default function SoftwareCard({ project, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col shrink-0 min-h-78 text-left overflow-visible rounded-xl border-2 border-(--pal-border) bg-(--pal-surface) shadow-lg cursor-pointer transition-colors duration-300 hover:border-(--pal-accent) ${className}`}
    >
      <div className="absolute left-4 right-4 top-4 bottom-[calc(100%-6rem)] overflow-hidden rounded-xl border-2 border-(--pal-border) transition-[bottom] duration-500 ease-out group-hover:bottom-4 z-40">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 450px, 85vw"
          className="object-cover brightness-70 transition duration-500 ease-out group-hover:scale-105 group-hover:brightness-100"
        />
      </div>

      <div className="relative z-10 p-4 pt-28 flex flex-col h-full">
        <p className="text-(--pal-text) text-sm font-minecraft transition-opacity duration-300 group-hover:opacity-0">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center justify-start gap-2 py-3 pb-7">
          {project.skills?.map((skill) => (
            <SkillBadge key={skill} name={skill} />
          ))}
        </div>
      </div>

      <TitlePlaque>{project.title}</TitlePlaque>
    </button>
  );
}
