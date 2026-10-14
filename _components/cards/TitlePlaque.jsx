// The pixel title plate that hangs off the bottom edge of portfolio cards.
export default function TitlePlaque({ children }) {
  return (
    <div
      className="
        absolute bottom-0 left-1/2 z-60
        h-14 w-4/5 -translate-x-1/2 translate-y-6
        rounded-xl border-3 border-transparent
        bg-[url('/comps/title.png')] bg-center bg-no-repeat bg-size-[100%_100%]
        text-[#262b26]
        flex items-center justify-center
        transition-all duration-300 ease-out
        group-hover:scale-105
        filter drop-shadow-[0px_4px_0px_rgb(21,24,20)]
        group-hover:brightness-110
      "
    >
      {/* Minecraft glyphs sit ~0.14em low in their line box; nudge up to optically centre */}
      <h2 className="font-minecraft text-center font-black text-[20px] md:text-[22px] leading-none px-4 truncate -translate-y-[0.14em]">
        {children}
      </h2>
    </div>
  );
}
