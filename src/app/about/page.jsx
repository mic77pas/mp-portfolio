"use client";
import ProfileCard from "../../components/ProfileCard";
import { useEffect } from "react";
import CircularGallery from "../../components/CircularGallery";
import galleryImages from "../../../data/galleryImages";
import Link from "next/link";
import UWLogo from "../../../_components/UWLogo";
import { FaInstagram } from "react-icons/fa";
import CareerTimeline from "../../../_components/CareerTimeline";
import careers from "../../../data/career";
import Image from "next/image";

const items = galleryImages.map((item) => ({
  image: item.src, // Mapped to image
  text: item.caption, // Mapped to text (for the OGL text renderer)
}));

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    // ⭐️ FIX 1: Use a container with max-w-7xl and mx-auto for proper centering.
    // ⭐️ FIX 2: Use "items-start" to align content to the top.
    <div className="flex flex-col items-start max-w-5xl mx-auto md:px-4 pt-10 md:pt-20 pb-10">
      <div className="rounded-2xl flex flex-col sm:flex-row items-center justify-center mt-4 max-w-5xl">
        <div className="w-full sm:w-auto flex justify-center items-center">
          <div className="hidden sm:flex">
            <ProfileCard
              name="Michael Pasyechnyk"
              handle="mic77_pas"
              status="Online"
              contactText={<FaInstagram />}
              avatarUrl="headshot.png"
              miniAvatarUrl="selfie2.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
            />
          </div>
        </div>

        <div className="flex sm:hidden justify-center">
          <Image src="/regularhs.JPG" alt="It's me!" width={300} height={300} className="w-full mb-8 border-[#39493a] border-8 rounded-xl shadow-lg shadow-[#0c0c0c]" />
        </div>

        {/* ⭐️ FIX 4: Adjust width and margin for spacing and responsiveness.
               "w-full max-w-md" makes it occupy a reasonable space. */}
        <div className="w-[82%] sm:ml-10 sm:w-full text-[#ADB9A9] text-md sm:text-xl leading-8">
          <p className="mb-5">
            Hey! I’m a{" "}
            <Link
              href="https://uwaterloo.ca/systems-design-engineering/"
              className="hover:text-[#d5e3d0] duration-200"
              target="_blank"
            >
              <b>Systems Design Engineering</b>
            </Link>{" "}
            student at the{" "}
            <Link
              href="https://uwaterloo.ca/"
              className="hover:text-[#d5e3d0] duration-200"
              target="_blank"
            >
              <b>University of Waterloo. </b>
              {/* <UWLogo className="-translate-y-px inline-block" /> */}
              <b> </b>
            </Link>
            I love learning and putting to practice all types of new
            technologies, ranging from{" "}
            <span className="font-bold">
              full-stack development, product design, artificial intelligence,
              and ui/ux!
            </span>
          </p>
          <p className="mb-6 sm:mb-15">
            As a curious developer, I’m always looking for{" "}
            <span className="font-bold">
              new opportunities to expand and put my skills to use.
            </span>{" "}
            And whenever I’m not on the grind, you can usually find me{" "}
            <span className="font-bold">
              rock climbing, playing games, volunteering, and cooking!
            </span>
          </p>
          <a href="/posts" className="button-view block w-full text-center">
            View some of my highlights
          </a>
        </div>
      </div>

      <hr className="h-1 w-full bg-gradient-to-r from-[#98B493] via-[#7da376] to-[#98B493] border-0 rounded mt-10" />

      <div
        style={{ height: "600px", position: "relative" }}
        className="w-full max-w-5xl mx-auto inset-shadow-lg max-h-90 mt-7 -mb-15"
      >
        {/* <SimpleGallery /> */}
        <CircularGallery
          items={items}
          bend={0}
          textColor="#a6b2a3"
          borderRadius={0.05}
          scrollEase={0.05}
          font="20px Montserrat text-[5px]"
        />
      </div>
      <hr className="h-1 w-full bg-gradient-to-r from-[#98B493] via-[#7da376] to-[#98B493] border-0 rounded mb-6" />
      <div className="flex flex-col items-center w-full rounded-2xl h-120">
        <h2 className="bg-[#455445] text-[#90AD8F] mt-4 p-5.5 rounded-t-xl w-full text-center text-4xl font-bold border-b-[#30382f] border-b-6 z-10">
          My Career
        </h2>
        <CareerTimeline events={careers} />
      </div>
    </div>
  );
}
