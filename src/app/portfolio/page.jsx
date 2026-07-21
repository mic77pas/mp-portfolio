"use client";
import Image from "next/image";
import { FaCode, FaFigma, FaGithub, FaReact } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import ScrollReveal from "../../components/ScrollReveal";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { projects, reactApps } from "../../../data/projects";
import { figmaDesigns } from "../../../data/figmaDesigns";

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

// mode-switch transition — content fades and lifts slightly on enter,
// drops slightly on exit, so it never feels like a jump cut
const modeVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

// project grid stagger — parent triggers children one after another
const gridVariants = {
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// figma grid stagger — reuses the same rhythm as the project grid
const figmaGridVariants = {
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const figmaCardVariants = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [loadingGif, setLoadingGif] = useState(true);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("code");
  const [selectedFigma, setSelectedFigma] = useState(null);

  useEffect(() => {
    const savedMode = sessionStorage.getItem("portfolioMode");

    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const handleSetMode = (newMode) => {
    setMode(newMode);
    sessionStorage.setItem("portfolioMode", newMode);
  };

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Figma grid grows/shrinks its column count with how many designs exist
  // (capped at 3 across), so cards stay full-width instead of leaving gaps.
  // Extra designs beyond the cap simply wrap onto the next row.
  const figmaColumns = Math.min(figmaDesigns.length, 3);
  const figmaGridColsClass =
    figmaColumns <= 1
      ? "grid-cols-1"
      : figmaColumns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="h-fit text-foreground flex flex-col justify-start">
      <SkillsDock mode={mode} setMode={handleSetMode} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="h-fit text-foreground flex flex-col justify-start"
      >
        <AnimatePresence mode="wait">
          {mode === "code" && (
            <motion.div
              key="code"
              variants={modeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h1 className="font-minecraft text-3xl md:text-4xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
                Software Projects
              </h1>

              <motion.div
                variants={gridVariants}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-16 w-full mb-16 auto-rows-fr"
              >
                {projects.map((project) => (
                  <motion.div key={project.slug} variants={cardVariants}>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      onClick={() =>
                        sessionStorage.setItem("portfolioMode", mode)
                      }
                      className="group relative flex flex-col w-full h-full overflow-visible rounded-xl border-2 border-[#6a8366] bg-[#1a1b1a] shadow-lg"
                    >
                      {/* Expanding image layer */}
                      <div
                        className="
        absolute left-4 right-4 top-4 bottom-[calc(100%-6rem)]
        overflow-hidden rounded-xl border-2 border-[#6a8366]
        transition-[bottom] duration-500 ease-out
        group-hover:bottom-4
        z-40
      "
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover brightness-70 transition duration-500 ease-out group-hover:scale-105 group-hover:brightness-100"
                        />
                      </div>

                      {/* Any content you want above image */}
                      <div className="relative z-10 p-4 pt-28 flex flex-col h-full">
                        <p className="text-[#c7d3b4] text-sm font-minecraft transition-opacity duration-300 group-hover:opacity-0">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-start gap-2 py-3 pb-7">
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
                  </motion.div>
                ))}
              </motion.div>

              <Skills />
            </motion.div>
          )}

          {mode === "models" && (
            <motion.div
              key="models"
              variants={modeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h1 className="font-minecraft text-3xl md:text-4xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
                3D Models
              </h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, delay: 0.15, ease: "easeOut" },
                }}
                className="flex flex-col text-center mb-4"
              >
                <ModelView />
              </motion.div>
              <h2 className="font-minecraft text-lg text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)]">
                Click on models to view and learn more!
              </h2>
            </motion.div>
          )}

          {mode === "figma" && (
            <motion.div
              key="figma"
              variants={modeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col text-center"
            >
              <h1 className="font-minecraft text-3xl md:text-4xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] mb-6">
                Figma Designs
              </h1>

              {figmaDesigns.length === 0 ? (
                <div className="mt-20 gap-4 flex flex-col justify-center items-center">
                  <Image
                    src="/wip.png"
                    width={300}
                    height={100}
                    alt="Coming soon"
                    className="mx-auto saturate-150 brightness-150"
                  />
                  <h2 className="font-minecraft text-2xl text-center font-bold text-[#90AD8F] text-shadow-[0px_3px_1px_rgba(0,0,0,0.5)]">
                    Coming soon!
                  </h2>
                </div>
              ) : (
                <motion.div
                  variants={figmaGridVariants}
                  initial="initial"
                  animate="animate"
                  className={`grid ${figmaGridColsClass} gap-4 md:gap-6 w-full mb-16`}
                >
                  {figmaDesigns.map((design) => (
                    <motion.button
                      key={design.slug}
                      type="button"
                      variants={figmaCardVariants}
                      onClick={() => setSelectedFigma(design)}
                      className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-[#6a8366] bg-[#1a1b1a] text-left cursor-pointer"
                    >
                      <Image
                        src={design.image}
                        alt={design.title}
                        fill
                        className="object-cover transition duration-500 ease-out group-hover:scale-105"
                      />

                      {/* hover overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {design.category && (
                          <span className="mb-1 w-fit rounded-full bg-[#8dad8c]/90 px-2 py-0.5 text-[10px] font-minecraft text-[#101310]">
                            {design.category}
                          </span>
                        )}
                        <p className="font-minecraft text-sm font-bold text-[#e4ecd9]">
                          {design.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[#c7d3b4] line-clamp-2">
                          {design.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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

              {/* Loader overlay
            <div className="relative w-full">
              {loadingGif && (
                // Default values shown
                <Square
                  size="35"
                  stroke="5"
                  strokeLength="0.25"
                  bgOpacity="0.1"
                  speed="1.2"
                  color="black"
                />
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
            </div> */}

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

        <AnimatePresence>
          {selectedFigma && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4"
              onClick={() => setSelectedFigma(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="relative w-full max-w-4xl rounded-2xl border-2 border-[#6a8366] bg-[#1a1b1a] p-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <button
                  onClick={() => setSelectedFigma(null)}
                  className="absolute top-3 right-3 z-10 text-[#3c493a] hover:text-[#72916d]"
                  aria-label="Close"
                >
                  <div className="relative inline-flex items-center justify-center cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#3c493a]" />
                    <IoIosCloseCircle
                      size={32}
                      className="absolute text-[#b6cab3]"
                    />
                  </div>
                </button>

                <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-[#3d4a3a]">
                  <Image
                    src={selectedFigma.image}
                    alt={selectedFigma.title}
                    fill
                    className="object-cover bg-black"
                  />
                </div>

                <h2 className="font-minecraft text-xl font-bold text-[#e4ecd9] mt-4">
                  {selectedFigma.title}
                </h2>
                <p className="text-[#c7d3b4] text-sm mt-1">
                  {selectedFigma.description}
                </p>

                {selectedFigma.figmaUrl && (
                  <a
                    href={selectedFigma.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-hover mt-4 inline-flex items-center gap-2"
                  >
                    <IoLogoFigma size={18} /> View in Figma
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
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
      {/* <button
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
      </button> */}

      {/* Models */}
      <button
        onClick={() => setMode("models")}
        className={`group w-13 h-13 flex items-center justify-center rounded-full border-2 transition cursor-pointer ${
          mode === "models"
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
            mode === "models"
              ? "grayscale brightness-0"
              : "group-hover:grayscale group-hover:brightness-0"
          }`}
        />
      </button>
    </div>
  );
};
