import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import projects from "../data/projects"; // adjust path

// Reusable tech tag
function TechTag({ label }) {
  return (
    <span className="bg-[#364433]/90 text-white text-sm font-semibold px-2 py-1 rounded-md mx-1 mb-1 hover:scale-105 duration-200">
      {label}
    </span>
  );
}

export default function RecentProjects() {
  const [selected, setSelected] = useState(null);
  const [loadingGif, setLoadingGif] = useState(true);

  // Two newest projects
  const recentProjects = projects.slice(0, 2);

  return (
    <div className="flex flex-col mt-10 pt-5 pb-5 justify-center items-center gap-6 w-full">
      <h2 className="text-4xl font-bold text-[#90AD8F]">Recent Projects</h2>
      <hr className="h-1 w-95 md:w-5xl bg-gradient-to-r from-[#98B493] via-[#7da376] to-[#98B493] border-0 rounded" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-130 md:h-auto w-full max-w-95 md:max-w-5xl mt-3">
        {recentProjects.map((project) => (
          <div
            key={project.id}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={() => {
              setSelected(project);
              setLoadingGif(true);
            }}
          >
            {/* Tech tags */}
            <div className="absolute top-3 right-3 flex flex-wrap z-10">
              {project.tech?.map((tech) => (
                <TechTag key={tech} label={tech}/>
              ))}
            </div>

            {/* Inner content */}
            <div className="">
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="transform transition-transform duration-300 hover:scale-105 object-cover w-full h-90"
              />
              <div className="absolute bottom-0 h-24 w-full bg-black/50 backdrop-blur-md text-white p-3">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm line-clamp-2">{project.description}</p>
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
      <a href="/projects" className="button-view block md:w-100 text-center">
        View More Projects
      </a>
    </div>
  );
}
