import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function CareerTimeline({ events }) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);

  useEffect(() => {
    const updateDrag = () => {
      if (containerRef.current && timelineRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const timelineWidth = timelineRef.current.scrollWidth;
        setDragLimit(Math.min(0, containerWidth - timelineWidth - 16)); // 16px padding
      }
    };
    updateDrag();
    window.addEventListener("resize", updateDrag);
    return () => window.removeEventListener("resize", updateDrag);
  }, [events]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] overflow-hidden flex items-center rounded-b-lg px-4 bg-gradient-to-b from-[#1e201e] via-[#3b4239] to-[#1e201e]"
    >
      <motion.div
        ref={timelineRef}
        drag="x"
        dragConstraints={{ left: dragLimit, right: 0 }}
        dragElastic={0.2}
        className="flex items-center cursor-grab active:cursor-grabbing"
      >
        {events.map((event, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-center w-[280px] sm:w-[360px] select-none"
          >
            <motion.div
              className="w-40 h-40 rounded-full flex items-center justify-center shadow-lg shadow-[#262824] overflow-hidden mb-3 bg-[#1c1f1c]"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              {event.logo ? (
                <Image
                  src={event.logo}
                  alt={event.title}
                  width={140}
                  height={140}
                  className="object-contain p-1 scale-115 rounded-full"
                />
              ) : (
                <span className="text-[#AABF9F] font-bold">Logo</span>
              )}
            </motion.div>
            <p className="text-sm md:text-lg font-semibold text-[#d5e3d0] my-3 text-center w-[250px] sm:w-[320px]">
              {event.title}
            </p>
            <div className="relative flex items-center justify-center w-full">
              <div className="absolute top-1/2 left-0 w-full h-[4px] bg-[#7da376] rounded-x" />
              <div className="relative z-10 w-6 h-6 bg-[#d5e3d0] rounded-full border-4 border-[#7da376]" />
            </div>
            <p className="text-sm text-[#b0c3ad] mt-3">{event.date}</p>
          </div>
        ))}

        {/* TBD Item */}
        <div className="relative flex flex-col items-center justify-center w-[280px] sm:w-[360px] select-none">
          <motion.div
            className="w-40 h-40 rounded-full flex items-center justify-center bg-[#1c1f1c] overflow-hidden mb-3"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="text-center font-bold text-[35px] text-[#7C8B76]">TBD</p>
          </motion.div>
          <p className="text-sm md:text-lg font-semibold text-[#d5e3d0] my-3 text-center">Stay tuned 🙃</p>
          <div className="relative flex items-center justify-center w-full">
            <div className="absolute top-1/2 left-0 w-full h-[4px] bg-[#7da376] rounded-x" />
            <div className="relative z-10 w-6 h-6 bg-[#d5e3d0] rounded-full border-4 border-[#7da376]" />
          </div>
          <p className="text-sm text-[#b0c3ad] mt-3">In the future!</p>
        </div>
      </motion.div>
    </div>
  );
}
