"use client";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import ScrollReveal from "../../components/ScrollReveal";
// import { motion } from "motion/react";
import { useState } from "react";
import projects from "../../../data/projects";

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [loadingGif, setLoadingGif] = useState(true);
  const [search, setSearch] = useState("");

  // Filter projects based on search query
  const filteredProjects = projects.filter(
    (project) => project.title.toLowerCase().includes(search.toLowerCase())
    // || project.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen text-foreground px-8 pt-25 max-w-6xl mx-auto">
      <h1 className="text-[50px] font-bold mb-6 text-center text-[#90AD8F]">
        My Projects
      </h1>

      {/* <hr className="h-1 w-auto bg-gradient-to-r from-[#98B493] via-[#7da376] to-[#98B493] border-0 rounded mb-10" /> */}

      {/* Search bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-4xl px-5 py-3 mb-3 rounded-full bg-[#3d453b] text-white placeholder-[#99b198] shadow-md focus:outline-none focus:ring-2 focus:ring-[#60775c] transition-all duration-300 sm:w-3/4 md:w-2/3 lg:w-1/2"
        />
      </div>

      {/* Grid of project cards */}
      <div
        // baseOpacity={0}
        // enableBlur={true}
        // baseRotation={2}
        // blurStrength={8}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={() => {
              setSelected(project);
              setLoadingGif(true);
            }}
          >
            {/* Inner content scales on hover */}
            <div className="">
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="transform transition-transform duration-300 hover:scale-105 object-cover w-full h-64"
              />
              <div className="absolute bottom-0 h-24 w-full bg-black/50 backdrop-blur-md text-white p-3">
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-200 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
}
