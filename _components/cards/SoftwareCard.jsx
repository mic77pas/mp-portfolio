import Image from "next/image";
import SkillBadge from "../SkillBadge";
import TitlePlaque from "./TitlePlaque";
import { skillIcons } from "../../data/skillIcons";

// Image strip expands to fill the card (and zooms) on hover; logo covers zoom
// much further than screenshots.
//
// The card sizes itself to its own width (container queries), not the
// screen's: below 280px wide (the two-up grid on phones) it goes compact -
// tighter padding, smaller text and icon-only tool chips - while the home
// rail's cards and the desktop grid keep the full layout. In the full layout
// the minimum height is the tallest software card (three rows of pills), so
// every card matches it however much it holds.
export default function SoftwareCard({ project, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`@container group relative flex flex-col shrink-0 text-left overflow-visible rounded-xl border-2 border-(--pal-border) bg-(--pal-surface) shadow-lg cursor-pointer transition-colors duration-300 hover:border-(--pal-accent) ${className}`}
    >
      <div className="absolute inset-x-2 top-2 bottom-[calc(100%-6rem)] group-hover:bottom-2 @min-[280px]:inset-x-4 @min-[280px]:top-4 @min-[280px]:group-hover:bottom-4 overflow-hidden rounded-lg @min-[280px]:rounded-xl border-2 border-(--pal-border) transition-[bottom] duration-500 ease-out z-40">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 450px, 85vw"
          // logos sit small in their cover so the closed strip shows them
          // whole; the open card zooms in further so they read large
          className={`object-cover brightness-85 @min-[280px]:brightness-70 transition duration-500 ease-out group-hover:brightness-100 ${
            project.category === "Logo"
              ? "group-hover:scale-170"
              : "group-hover:scale-105"
          }`}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-2 pt-[6.5rem] pb-7 @min-[280px]:min-h-78 @min-[280px]:p-4 @min-[280px]:pt-28 @min-[280px]:pb-11">
        {/* compact cards cap it at six lines (the popup has it in full) so a
            long blurb doesn't stretch the whole row */}
        <p className="text-(--pal-text) font-minecraft text-[11px] leading-snug line-clamp-6 @min-[280px]:line-clamp-none @min-[280px]:text-sm @min-[280px]:leading-normal transition-opacity duration-300 group-hover:opacity-0">
          {project.description}
        </p>

        {/* full: named pills */}
        <div className="hidden @min-[280px]:flex flex-wrap items-center justify-start gap-2 pt-3">
          {project.skills?.map((skill) => (
            <SkillBadge key={skill} name={skill} />
          ))}
        </div>

        {/* compact: just the tool icons, named on hover / to screen readers */}
        <ul className="flex @min-[280px]:hidden flex-wrap gap-1.5 pt-2.5 mt-auto">
          {project.skills?.map((skill) => (
            <SkillChip key={skill} name={skill} />
          ))}
        </ul>
      </div>

      <TitlePlaque>{project.title}</TitlePlaque>
    </button>
  );
}

function SkillChip({ name }) {
  const skill = skillIcons[name];
  const Icon = skill?.icon;

  return (
    <li
      title={name}
      className="inline-flex items-center justify-center size-7 rounded-md border border-[#636363] bg-[#2b2c2b] text-white text-[9px]"
    >
      {Icon ? (
        <>
          <Icon size={15} color={skill.color} aria-hidden />
          <span className="sr-only">{name}</span>
        </>
      ) : (
        name.slice(0, 2)
      )}
    </li>
  );
}
