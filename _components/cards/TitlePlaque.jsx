// The pixel title plate that hangs off the bottom edge of portfolio cards.
// Sized by the card's container queries (see SoftwareCard): on a compact card
// it's smaller and lets a long title wrap onto two lines.
export default function TitlePlaque({ children }) {
  return (
    <div
      className="
        absolute bottom-0 left-1/2 z-60
        h-10 w-[92%] -translate-x-1/2 translate-y-5
        @min-[280px]:h-14 @min-[280px]:w-4/5 @min-[280px]:translate-y-6
        rounded-xl border-3 border-transparent
        text-[#262b26]
        flex items-center justify-center
        transition-all duration-300 ease-out
        group-hover:scale-105
        filter drop-shadow-[0px_3px_0px_rgb(21,24,20)] @min-[280px]:drop-shadow-[0px_4px_0px_rgb(21,24,20)]
        group-hover:brightness-110
      "
    >
      {/* the plate's pixel outline cut from title.png and filled with the
          palette colour (see globals.css), so it follows palette swaps. On
          its own layer: a mask on the plate itself would clip the shadow */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-(--pal-plaque) mask-[url('/comps/title.png')] mask-size-[100%_100%] mask-no-repeat mask-center"
      />
      {/* Minecraft glyphs sit ~0.14em low in their line box; nudge up to optically centre */}
      <h2 className="font-minecraft text-center font-black text-[12px] leading-[1.1] px-2.5 line-clamp-2 @min-[280px]:text-[20px] @min-[400px]:text-[22px] @min-[280px]:leading-none @min-[280px]:px-4 @min-[280px]:line-clamp-1 -translate-y-[0.14em]">
        {children}
      </h2>
    </div>
  );
}
