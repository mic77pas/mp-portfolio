"use client";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Architects_Daughter } from "next/font/google";

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
          className="object-cover"
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

const posts = [
  {
    id: 3,
    title: "ENV to ENG Transition",
    date: "August 24, 2025",
    photo: "/posts/weng.jpg",
    side: "left",
    text: "My first year in Geomatics introduced me to mapping, spatial data, and technology, a field I hadn’t expected but learned so much  from. I soon realized I wanted to merge that problem-solving with design and systems thinking, which led me to Systems Design Engineering. It’s been a rewarding transition, and I’m excited to explore how technology and design can create impact.",
  },
  {
    id: 2,
    title: "Velocity Ambassador Experience",
    date: "April 2, 2025",
    photo: "/posts/velocity1.jpg",
    side: "right",
    text: "Being a Velocity Ambassador has been an amazing way to dive into Waterloo’s startup ecosystem and connect with driven founders across campus. From helping run the Velocity Pitch Competition to sharing upcoming events with students, I’ve loved getting to play a small part in supporting innovators and entrepreneurs at Waterloo.",
  },
  {
    id: 1,
    title: "TEDxUW 2024 Conference",
    date: "Oct 6, 2024",
    photo: "/posts/tedxevent.jpg",
    text: "TEDxUW was my first real taste of a large-scale conference experience at Waterloo. Volunteering with the production team was an absolute blast, from helping run the event behind the scenes to connecting with so many inspiring people across the TEDx community, and it’s something I’ll always look back on as a defining early experience.",
    side: "left",
  },
];

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
    <div className="relative w-full h-[calc(100vh-157px)] overflow-hidden text-[#b2bfa8]">
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
    </div>
  );
}
