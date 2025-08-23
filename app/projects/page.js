"use client";
import { useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

/*

{
  id: ,
  title: "",
  description: "",
  image: "/projects/",
  github: "",
},

*/

const projects = [
  {
    id: 1,
    title: "Fast React Pizza Graphic",
    description:
      "A modern portfolio built with Next.js, Tailwind, and Framer Motion.",
    image: "/projects/react-pizza.png", // put in /public/projects/
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 2,
    title: "Fast React Pizza Graphic",
    description:
      "A modern portfolio built with Next.js, Tailwind, and Framer Motion.",
    image: "/projects/react-pizza.png", // put in /public/projects/
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 3,
    title: "Fast React Pizza Graphic",
    description:
      "A modern portfolio built with Next.js, Tailwind, and Framer Motion.",
    image: "/projects/react-pizza.png", // put in /public/projects/
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 4,
    title: "Fast React Pizza Graphic",
    description:
      "A modern portfolio built with Next.js, Tailwind, and Framer Motion.",
    image: "/projects/react-pizza.png", // put in /public/projects/
    github: "https://github.com/mic77pas/ReactApps",
  },
  // add more projects...
];

export default function Page() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-background text-foreground px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#98B493] text-shadow-md text-shadow-[#1f271d]">My Projects</h1>

      {/* Grid of project cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
            onClick={() => setSelected(project)}
          >
            {/* Image */}
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={300}
              className="object-cover w-full h-64"
            />

            {/* Glassy overlay */}
            <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-md text-white p-3">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-sm text-gray-200 line-clamp-2">
                {project.description}
              </p>
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
            className="bg-neutral-900 p-6 rounded-2xl max-w-lg w-full relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-[#3c493a] hover:text-[#72916d]"
            >
              <IoIosCloseCircle size={36} />
            </button>

            <Image
              src={selected.image}
              alt={selected.title}
              width={800}
              height={400}
              className="rounded-lg mb-4 object-cover"
            />

            <h2 className="text-2xl text-gray-300 mb-2 font-bold">
              {selected.title}
            </h2>
            <p className="text-gray-300 mb-4">{selected.description}</p>

            <a
              href={selected.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#638b5c] hover:bg-[#98b493] transition"
            >
              <FaGithub size={18} /> View on GitHub
            </a>
            {/* <a
              href={selected.other}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#638b5c] hover:bg-[#98b493] transition"
            >
              <Othericon size={18} /> View Site
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
}
