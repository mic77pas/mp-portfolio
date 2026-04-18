"use client";
import Image from "next/image";
import { FaCode, FaFigma, FaGithub, FaReact } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import ScrollReveal from "../../components/ScrollReveal";
import { motion } from "motion/react";
import { useState } from "react";
import projects from "../../../data/projects";
import reactProjects from "../../../data/udemyReact";

import Skills from "../../../_components/Skills";
import Dock from "../../components/Dock";

import { VscVscode } from "react-icons/vsc";
import { IoLogoFigma } from "react-icons/io5";
import { SiFramer, SiFramework, SiThreedotjs } from "react-icons/si";
import { FaPencil } from "react-icons/fa6";
import ModelView from "../../components/ModelView";
import { MdOutlinePrint } from "react-icons/md";
import Link from "next/link";
import SkillBadge from "../../../_components/SkillBadge";

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [loadingGif, setLoadingGif] = useState(true);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("code"); // "code" | "figma" | "framer" | "other"

  // Filter projects based on search query
  const filteredProjects = projects.filter(
    (project) => project.title.toLowerCase().includes(search.toLowerCase()),
    // || project.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-screen text-foreground flex flex-col justify-start"
    >
      <SkillsDock mode={mode} setMode={setMode} />

      {mode === "code" && (
        <>
          {/* <h1 className="font-minecraft text-4xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
            My Projects
          </h1> */}
          {/* Grid of project cards */}
          <div
            // baseOpacity={0}
            // enableBlur={true}
            // baseRotation={2}
            // blurStrength={8}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-y-16 w-full mb-16 auto-rows-fr"
          >
            {projects.map((project) => (
              <Link
                href={`/portfolio/${project.slug}`}
                key={project.slug}
                className="group relative flex flex-col w-full h-full overflow-visible rounded-xl border-2 border-[#6a8366] bg-[#1a1b1a] shadow-lg"
              >
                {/* Expanding image layer */}
                <div
                  className="
    absolute left-4 right-4 top-4 h-20
    overflow-hidden rounded-xl border-2 border-[#6a8366]
    transition-[height] duration-500 ease-out
    group-hover:h-62
    z-40
  "
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover brightness-70 hover:brightness-100 transition duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Optional dark overlay */}
                  {/* <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/35" /> */}
                </div>

                {/* Any content you want above image */}
                <div className="relative z-10 p-4 pt-26 flex flex-col h-full">
                  <p className="text-[#c7d3b4] text-sm transition-opacity duration-300 group-hover:opacity-0">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center justify-start gap-2 py-7">
                    {project.skills?.map((skill) => (
                      <SkillBadge key={skill} name={skill} />
                    ))}
                  </div>
                </div>

                {/* Bottom title plate stays above image */}
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
                  <h2 className="font-minecraft text-center font-black text-[22px] mb-1">
                    {project.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
          <Skills />
        </>
      )}

      {mode === "other" && (
        <div className="flex flex-col text-center">
          <h1 className="font-minecraft text-4xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
            Solidworks
          </h1>
          <ModelView />
        </div>
      )}

      {mode === "figma" && (
        <div className="flex flex-col text-center">
          <h1 className="font-minecraft text-4xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
            Figma Designs
          </h1>

          <div className="mt-20 gap-4 flex flex-col justify-center items-center">
            <Image
              src="/wip.png"
              width={300}
              height={100}
              alt="Coming soon"
              className="mx-auto saturate-120 brightness-130"
            />
            <h2 className="font-minecraft text-2xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)]">
              Coming soon!
            </h2>
          </div>
        </div>
      )}

      {mode === "framer" && (
        <div className="flex flex-col text-center">
          <h1 className="font-minecraft text-4xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
            Framer Sites
          </h1>

          <div className="mt-20 gap-4 flex flex-col justify-center items-center">
            <Image
              src="/wip.png"
              width={300}
              height={100}
              alt="Coming soon"
              className="mx-auto saturate-120 brightness-130"
            />
            <h2 className="font-minecraft text-2xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)]">
              Coming soon!
            </h2>
          </div>
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-neutral-900 p-6 rounded-2xl max-w-2xl w-full relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-50 text-[#3c493a] hover:text-[#72916d]"
            >
              <div className="relative inline-flex items-center justify-center cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#3c493a]" />
                <IoIosCloseCircle
                  size={32}
                  className="absolute text-[#b6cab3]"
                />
              </div>
            </button>

            {/* Loader overlay */}
            <div className="relative w-full">
              {loadingGif && (
                <div className="absolute inset-0 flex justify-center items-center bg-black/40 rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#98B493]" />
                </div>
              )}

              <Image
                src={selected.gif || selected.image}
                alt={selected.title}
                className="rounded-lg mb-2 object-cover w-full"
                width={800}
                height={400}
                unoptimized={true}
                onLoad={() => setLoadingGif(false)}
              />
            </div>

            <h2 className="text-2xl text-gray-300 mb-2 font-bold">
              {selected.title}
            </h2>
            <p className="text-gray-300 mb-4">{selected.description}</p>

            {selected.github && (
              <a
                href={selected.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button-hover"
              >
                <FaGithub size={20} /> View on GitHub
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

const SkillsDock = ({ mode, setMode }) => {
  return (
    <div className="fixed z-80 -right-1 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5 py-7 pl-5 px-4 bg-[url('/comps/pixeldock.png')] bg-size-[100%_100%] bg-no-repeat bg-center rounded-l-2xl">
      {/* Code */}
      <button
        onClick={() => setMode("code")}
        className={`group w-13 h-13 flex items-center justify-center rounded-full border-2 transition cursor-pointer ${
          mode === "code"
            ? "bg-[#8dad8c] border-[#8dad8c]"
            : "bg-[#101310] border-[#8dad8c] hover:bg-[#8dad8c]"
        }`}
      >
        <Image
          src={"/logos/vscode.png"}
          alt="VSCode"
          width={26}
          height={26}
          className={`transition-all duration-150 ${
            mode === "code"
              ? "grayscale brightness-0"
              : "group-hover:grayscale group-hover:brightness-0"
          }`}
        />
      </button>

      {/* Figma */}
      <button
        onClick={() => setMode("figma")}
        className={`group w-13 h-13 flex items-center justify-center rounded-full border-2 transition cursor-pointer ${
          mode === "figma"
            ? "bg-[#8dad8c] border-[#8dad8c]"
            : "bg-[#101310] border-[#8dad8c] hover:bg-[#8dad8c]"
        }`}
      >
        <Image
          src={"/logos/figma.svg"}
          alt="Figma"
          width={18}
          height={20}
          className={`transition-all duration-150 ${
            mode === "figma"
              ? "grayscale brightness-0"
              : "group-hover:grayscale group-hover:brightness-0"
          }`}
        />
      </button>

      {/* Framer */}
      <button
        onClick={() => setMode("framer")}
        className={`group w-13 h-13 flex items-center justify-center rounded-full border-2 transition cursor-pointer ${
          mode === "framer"
            ? "bg-[#8dad8c] border-[#8dad8c]"
            : "bg-[#101310] border-[#8dad8c] hover:bg-[#8dad8c]"
        }`}
      >
        <Image
          src={"/logos/framer.webp"}
          alt="Framer"
          width={25}
          height={25}
          className={`transition-all duration-150 ${
            mode === "framer"
              ? "grayscale brightness-0"
              : "group-hover:grayscale group-hover:brightness-0"
          }`}
        />
      </button>

      {/* Other */}
      <button
        onClick={() => setMode("other")}
        className={`group w-13 h-13 flex items-center justify-center rounded-full border-2 transition cursor-pointer ${
          mode === "other"
            ? "bg-[#8dad8c] border-[#8dad8c]"
            : "bg-[#101310] border-[#8dad8c] hover:bg-[#8dad8c]"
        }`}
      >
        <Image
          src={"/logos/solidworks.png"}
          alt="Solidworks"
          width={32}
          height={32}
          className={`transition-all duration-150 ${
            mode === "other"
              ? "grayscale brightness-0"
              : "group-hover:grayscale group-hover:brightness-0"
          }`}
        />
      </button>
    </div>
  );
};
