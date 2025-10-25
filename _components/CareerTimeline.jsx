import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function CareerTimeline({ events }) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);
  const [selected, setSelected] = useState(null);

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
            <Link key={event.name} href={`/about/${event.name}`}>
              {" "}
              <motion.div
                className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg shadow-[#262824] overflow-hidden mb-3 bg-[#ffffff]"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(event)}
              >
                {event.logo ? (
                  <Image
                    src={event.logo}
                    alt={event.title}
                    width={120}
                    height={120}
                    className="object-contain p-1 scale-115 rounded-full hover:cursor-pointer"
                  />
                ) : (
                  <span className="text-[#AABF9F] font-bold">Logo</span>
                )}
              </motion.div>
            </Link>

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
        <div className="relative flex flex-col items-center justify-center w-[280px] sm:w-[360px] select-none pr-5">
          <motion.div
            className="w-32 h-32 rounded-full flex items-center justify-center bg-[#1c1f1c] overflow-hidden mb-3"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="text-center font-bold text-[35px] text-[#7C8B76]">
              TBD
            </p>
          </motion.div>
          <p className="text-sm md:text-lg font-semibold text-[#d5e3d0] my-3 text-center">
            Stay tuned 🙃
          </p>
          <div className="relative flex items-center justify-center w-full">
            <div className="absolute top-1/2 left-0 w-full h-[4px] bg-[#7da376] rounded-x" />
            <div className="relative z-10 w-6 h-6 bg-[#d5e3d0] rounded-full border-4 border-[#7da376]" />
          </div>
          <p className="text-sm text-[#b0c3ad] mt-3">In the future!</p>
        </div>
      </motion.div>

      {/* {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#282b28] p-6 rounded-2xl max-w-4xl w-full relative shadow-xl text-[#d5e3d0]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-[#aabf9f] hover:text-[#7da376]"
            >
              ✕
            </button>

            <div className="flex flex-row items-center">
              <Image
                src={selected.logo}
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full z-5"
              ></Image>
              <div className="-ml-10 pl-15 h-18 w-full rounded-lg bg-[#373d36] flex items-center justify-between pr-5">
                <h2 className="text-3xl font-bold">
                  {selected.title}
                </h2>
                <p className="text-[#8B9786] text-sm justify-end font-bold">{selected.date}</p>
              </div>
            </div>

            <p className="mt-10">
              {selected.description || "More details coming soon!"}
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
}
