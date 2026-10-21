import Image from "next/image";
import { SiBlender } from "react-icons/si";
import TitlePlaque from "./TitlePlaque";

// Badge showing which tool a 3D model was built in, tinted in its brand colour
const TOOLS = {
  blender: {
    label: "Blender",
    chip: "border-[#E87D0D] bg-[#2a1a0a]/90",
    icon: <SiBlender size={18} color="#E87D0D" />,
  },
  solidworks: {
    label: "SolidWorks",
    chip: "border-[#DA291C] bg-[#2a0f0d]/90",
    icon: (
      <Image
        src="/logos/solidworks.png"
        alt=""
        width={20}
        height={20}
        className="size-[20px] object-contain"
      />
    ),
  },
};

// Image-first card for Figma designs and 3D models.
export default function MediaCard({ item, onClick, className = "" }) {
  const tool = TOOLS[item.tool];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex shrink-0 min-h-[275px] p-4 text-left overflow-visible rounded-xl border-2 border-[#6a8366] bg-[#1a1b1a] shadow-lg cursor-pointer transition-colors duration-300 hover:border-[#8dad8c] ${className}`}
    >
      {/* image fills the card down to the same padding as the other sides;
          the title plaque overlaps its bottom edge */}
      <div className="relative flex-1 overflow-hidden rounded-xl border-2 border-[#6a8366] bg-[#242624]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 768px) 450px, 85vw"
          className="object-cover brightness-80 transition duration-500 ease-out group-hover:scale-105 group-hover:brightness-100"
        />

        {tool && (
          <span
            title={`Made in ${tool.label}`}
            aria-label={`Made in ${tool.label}`}
            className={`absolute top-2 right-2 z-10 flex size-9 items-center justify-center rounded-lg border-2 ${tool.chip}`}
          >
            {tool.icon}
          </span>
        )}
      </div>

      <TitlePlaque>{item.title}</TitlePlaque>
    </button>
  );
}
