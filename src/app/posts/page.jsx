"use client";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Architects_Daughter } from "next/font/google";
import posts from "../../../data/posts";

const architect = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-architect",
});

// Helper for post boxes
const PostContainer = ({ title, date, photo, text }) => (
  <div className="w-[520px] h-[360px] bg-[#50574F] border-[#373B38] border-20 p-4 rounded-4xl shadow-lg flex flex-row">
    {/* Left text box */}
    <div className="bg-[#434743] rounded-lg p-2 w-[500px] flex justify-start text-sm text-[#c8d4be]">
      <p>{text}</p>
    </div>

    {/* Right image box */}
    <div className="flex flex-col">
      <div className="relative w-[200px] h-[220px] overflow-hidden rounded-lg ml-3">
        <Image
          src={photo}
          alt={title || "Post image"}
          fill
          className="object-cover hover:scale-110 duration-300"
        />
        <p className="absolute bottom-2 right-2 text-sm text-[#b2bfa8] bg-[#232924]/90 px-2 py-1 rounded">
          {date || "Month Day, Year"}
        </p>
      </div>
      <p className="bg-[#373c37] ml-3 mt-2 h-[60px] rounded-lg p-2 justify-center align-center text-center font-bold">
        {title}
      </p>
    </div>
  </div>
);

export default function PostsPage() {
  const y = useMotionValue(0);
  const wallRef = useRef(null);
  const [dragLimits, setDragLimits] = useState({ top: 0, bottom: 0 });

  const postHeight = 360;
  const totalHeight = posts.length * postHeight + postHeight * 1.4;

  useEffect(() => {
    const updateLimits = () => {
      if (!wallRef.current) return;

      const container = wallRef.current.parentElement;
      const containerHeight =
        container?.clientHeight || window.innerHeight - 157;

      const spacing = 40; // space between posts
      const padding = 400 / (posts.length / 1.2); // consistent buffer for both ends
      const totalHeight = posts.length * (postHeight + spacing);

      // If total content fits inside viewport → no drag
      if (totalHeight + padding * 2 <= containerHeight) {
        setDragLimits({ top: 0, bottom: 0 });
        y.set(0);
        return;
      }

      // Dynamically compute limits so both top and bottom posts are visible
      const visibleHeight = containerHeight - padding;
      const topLimit = -(totalHeight - visibleHeight);
      const bottomLimit = 0; // bottom flush with viewport

      setDragLimits({ top: topLimit, bottom: bottomLimit });
      y.set(topLimit); // start at the bottom (latest post visible)
    };

    updateLimits();

    window.addEventListener("resize", updateLimits);
    return () => window.removeEventListener("resize", updateLimits);
  }, [posts.length, postHeight, y]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="relative w-full h-[calc(100vh-157px)] overflow-hidden text-[#b2bfa8]"
    >
      {/* Top "You've made it" text */}

      {/* Draggable wall */}
      <motion.div
        ref={wallRef}
        drag="y"
        dragConstraints={dragLimits}
        style={{ y }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center max-w-6xl pt-8"
      >
        <div
          className={`${architect.className} text-center mt-10 mb-8 w-fit text-[#b2bfa8]`}
        >
          <p className="text-3xl font-semibold">You've made it to the top!</p>
          <p className="w-sm text-2xl text-[#b2bfa8]">
            Feel free to climb up another time to see any new updates 🙌
          </p>
        </div>

        {posts.map((post) => (
          <div
            key={post.id}
            className="relative flex justify-center items-center -mb-1"
            style={{ minHeight: `${postHeight}px` }}
          >
            {/* Left-side post */}
            {post.side === "left" && (
              <div className="absolute right-[240px]">
                <PostContainer
                  title={post.title}
                  date={post.date}
                  photo={post.photo}
                  text={post.text}
                />
              </div>
            )}

            {/* Center climbing hold */}
            <Image
              src="/holds.png"
              alt="Climbing Hold"
              width={180}
              height={180}
              draggable={false}
              className="bg-[#373B38] hover:cursor-grab active:cursor-grabbing"
            />

            {/* Right-side post */}
            {post.side === "right" && (
              <div className="absolute left-[240px]">
                <PostContainer
                  title={post.title}
                  date={post.date}
                  photo={post.photo}
                  text={post.text}
                />
              </div>
            )}

            {post.id === posts[0].id && (
              <div className="absolute -top-4 w-[200px] h-[16px] bg-[#535c52] rounded-full shadow-lg shadow-black/50" />
            )}

            {/* "Start climbing here" text beside bottom-most hold */}
            {post.id === 1 && (
              <div
                className={`${architect.className} flex flex-col absolute left-[200px] text-[#b2bfa8] w-[520px] text-[40px]`}
              >
                <Image
                  src="/postarrow.png"
                  alt="Start dragging!"
                  width={360}
                  height={360}
                ></Image>
                <p className="pl-30 -mt-15 justify-center w-full items-center flex flex-wrap">
                  Climb your way up through my highlights!
                </p>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
