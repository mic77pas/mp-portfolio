// _components/portfolio/LaptopFrame.jsx
export function LaptopFrame({ src, alt = "", className = "" }) {
  return (
    <div className={`w-full max-w-[640px] mx-auto ${className}`}>
      {/* lid */}
      <div className="bg-[#252723] rounded-2xl p-3 shadow-[0px_6px_0px_rgba(0,0,0,0.3)]">
        {/* camera dot */}
        <div className="flex justify-center mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#90AD8F]/30" />
        </div>
        {/* screen */}
        <div className="rounded-md overflow-hidden bg-black aspect-video">
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* base / keyboard deck */}
      <div className="h-3 bg-[#1c1e1a] rounded-b-lg mx-6 shadow-[0px_3px_1px_rgba(0,0,0,0.4)]" />
      {/* thin foot lip */}
      <div className="h-1.5 bg-[#141613] rounded-full mx-14" />
    </div>
  );
}
