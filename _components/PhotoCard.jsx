import Image from "next/image";

// Photo that slides up on hover to reveal a caption strip underneath.
export default function PhotoCard({
  src,
  alt,
  caption,
  className = "",
  imageClassName = "object-cover",
  sizes = "280px",
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[12px] border-2 border-[#a2be9c] bg-[#1b1d1b] ${className}`}
    >
      {/* the photo keeps its size and just translates up, so nothing rescales */}
      <div className="absolute inset-0 z-10 overflow-hidden rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-[52px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={imageClassName}
        />
      </div>

      <p className="absolute inset-x-0 bottom-0 h-[52px] px-3 flex items-center justify-center text-center font-minecraft font-bold text-[13px] leading-tight text-[#c7dac3] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {caption}
      </p>
    </div>
  );
}
