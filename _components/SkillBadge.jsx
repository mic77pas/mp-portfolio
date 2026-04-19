import { skillIcons } from "../data/skillIcons";

export default function SkillBadge({ name, size = "md" }) {
  const skill = skillIcons[name];
  const Icon = skill?.icon;

  return (
    <div
      className={`
        rounded-lg border border-[#636363] bg-[#2b2c2b]
        text-white flex items-center justify-center gap-2 w-fit h-7
        transition-all duration-200
        hover:brightness-110 hover:scale-105
        ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}
      `}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 16} color={skill.color} />}
      <span>{name}</span>
    </div>
  );
}
