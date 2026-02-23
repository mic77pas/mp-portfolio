"use client";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import ScrollReveal from "../../components/ScrollReveal";
import { motion } from "motion/react";
import { useState } from "react";
import projects from "../../../data/projects";
import Skills from "../../../_components/Skills";
import Dock from "../../components/Dock";

import { VscVscode } from "react-icons/vsc";
import { IoLogoFigma } from "react-icons/io5";
import { SiFramer } from "react-icons/si";
import { FaPencil } from "react-icons/fa6";
import ModelView from "../../components/ModelView";

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

  const items = [
    {
      icon: <VscVscode size={20} />,
      label: "Code",
      onClick: () => setMode("code"),
      active: mode === "code",
    },
    {
      icon: <IoLogoFigma size={20} />,
      label: "Figma",
      onClick: () => setMode("figma"),
      active: mode === "figma",
    },
    {
      icon: <SiFramer size={20} />,
      label: "Framer",
      onClick: () => setMode("framer"),
      active: mode === "framer",
    },
    {
      icon: <FaPencil size={20} />,
      label: "Other",
      onClick: () => setMode("other"),
      active: mode === "other",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-screen text-foreground flex flex-col justify-start"
    >
      <Dock items={items} panelHeight={70} />

      {mode === "code" && (
        <>
          <Skills />
          <h1 className="font-minecraft text-4xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
            My Projects
          </h1>
          {/* Grid of project cards */}
          <div
            // baseOpacity={0}
            // enableBlur={true}
            // baseRotation={2}
            // blurStrength={8}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 w-full mb-14"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-xl overflow-visible shadow-lg cursor-pointer"
                onClick={() => {
                  setSelected(project);
                  setLoadingGif(true);
                }}
                // hover:border-4 hover:border-[#aabeaa]
              >
                {/* Inner content scales on hover */}
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="
    w-full h-64 object-cover rounded-xl
    ring-0 ring-transparent
    transition-all duration-300 ease-out
    group-hover:ring-4
    group-hover:ring-[#aabeaa]
    group-hover:scale-[1.02]
  "
                />
                <div
                  className="
    absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6
    w-4/5 h-16 rounded-xl
    flex items-center justify-center
    bg-[#738d73]/90 backdrop-blur-sm
    text-[#262b26]
    border-3 border-transparent
    transition-all duration-300 ease-out
    group-hover:bg-[#2c332c]/70
    group-hover:text-white
    group-hover:border-[#aabeaa]
    shadow-[0px_3px_4px_rgba(0,0,0,0.5)]
  "
                >
                  <h2 className="font-minecraft text-center font-black text-[22px] mb-1">
                    {project.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
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
