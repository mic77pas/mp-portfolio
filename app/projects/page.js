"use client";
import { useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

/*

{
  id: 1,
  title: "",
  description: "",
  image: "/projects/",
  gif: "",
  github: "",
},

*/

const projects = [
  {
    id: 10,
    title: "Wild Oasis Website",
    description:
      "Hotel booking site (connected with `The Wild Oasis`) utilizing the Next.js 'app' router, react server components, server actions, and authentication with NextAuth ",
    image: "/projects/wild-oasis-website.png",
    gif: "https://github.com/user-attachments/assets/83ec42ae-fafd-41aa-9733-22183891128c",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 9,
    title: "The Wild Oasis",
    description:
      "Hotel management site w/ bookings, cabin editing, and user settings, utlizing react query, styled componenets, reack hook form, supabase, advanced compound component patterns, authentication, charts, dark mode, and professional application planning/development",
    image: "/projects/wild-oasis.png",
    gif: "https://github.com/user-attachments/assets/7c284a36-a955-41ae-9c54-f727ee5f0cc3",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 8,
    title: "Fast React Pizza",
    description:
      "Pizza menu/ordering site with a search order, cart overview, and order tracker, practising React router data loading, redux/redux toolkit, thunks, and Tailwind CSS",
    image: "/projects/fast-react-pizza.png",
    gif: "https://github.com/user-attachments/assets/ce0f51ed-7646-46da-aeaa-fb381694c83f",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 7,
    title: "WorldWise",
    description:
      "World map travelling tracker practising React Router, Context API, memo/useMemo, useCallback, and the Leaflet library",
    image: "/projects/worldwise.png",
    gif: "https://github.com/user-attachments/assets/afb36b0a-9260-4dcf-9a07-0d3d6a32b4db",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 6,
    title: "The React Quiz",
    description:
      "Multiple-choice react-based quiz w/ points and timer, practising the useReducer hook",
    image: "/projects/react-quiz.png",
    gif: "https://github.com/user-attachments/assets/8131133e-5243-4e26-abf4-612c8de0799f",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 5,
    title: "Classy Weather",
    description: "Simple weather app utilizing react class components",
    image: "/projects/classy-weather.png",
    gif: "https://github.com/user-attachments/assets/81be5636-ed43-492b-9a2c-f8e9a9383bb4",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 4,
    title: "usePopcorn",
    description:
      "Movie rating gallery with built-in search and movie stats, practising useEffect, data fetching, and custom hooks",
    image: "/projects/usePopcorn.png",
    gif: "https://github.com/user-attachments/assets/f519dd1a-1116-445b-87ca-2a0fef584b05",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 3,
    title: "Eat-N-Split",
    description:
      "Money splitting application to track expenses with friends practising React components",
    image: "/projects/eat-n-split.png",
    gif: "https://github.com/user-attachments/assets/c9d2ca19-1ec1-4db1-acab-f5f191dbebd9",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 2,
    title: "Travel List",
    description:
      "Travel 'to-do' list with sorting and packing status practising useState and other state management concepts",
    image: "/projects/travel-list.png",
    gif: "https://github.com/user-attachments/assets/65f3a3b0-c9a7-4cca-ad27-83409d24e80a",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 1,
    title: "React Pizza Graphic",
    description:
      "Simple menu graphic made with react components, props, and JSX",
    image: "/projects/react-pizza.png",
    gif: "https://github.com/user-attachments/assets/6576e93c-5790-4168-8392-d05318becbff",
    github: "https://github.com/mic77pas/ReactApps",
  },

  // add more projects...
];

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
    <div className="min-h-screen bg-background text-foreground px-8 py-12">
      <h1 className="text-[40px] font-bold mb-6 text-center text-[#98B493] text-shadow-lg text-shadow-[#1f271d]">
        My Projects
      </h1>

      {/* Search bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-4xl px-5 py-3 mb-3 rounded-full bg-[#2e3a2b] text-white placeholder-[#788b74] shadow-md focus:outline-none focus:ring-2 focus:ring-[#60775c] transition-all duration-300 sm:w-3/4 md:w-2/3 lg:w-1/2"
        />
      </div>

      {/* Grid of project cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="card-hover"
            onClick={() => {
              setSelected(project);
              setLoadingGif(true); // reset loader when opening modal
            }}
          >
            {/* Static preview image */}
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={300}
              className="object-cover w-full h-64"
            />

            {/* Glassy overlay */}
            <div className="absolute bottom-0 h-24 w-full bg-black/50 backdrop-blur-md text-white p-3">
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
