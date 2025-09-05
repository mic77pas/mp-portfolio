"use client";
import Link from "next/link";
import TypingSentence from "./_components/TypingSentence";
import UWLogo from "./_components/UWLogo";
import SkillCarousel from "./_components/SkillCarousel";
import { IoSearch } from "react-icons/io5";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./_components/accordion";
import { motion } from "framer-motion";

// experienceData.ts (or define at top of your component)
export const volunteering = [
  {
    position: "Production Manager",
    organization: "TEDxUW",
    organizationLink: "https://www.tedxuw.com/",
    time: "Apr 2025 – Present",
    descriptions: [
      "Oversaw production planning and execution for TEDxUW 2025.",
      "Coordinated logistics, tech, and volunteer teams to ensure smooth event delivery.",
    ],
  },
  {
    position: "Campus Ambassador",
    organization: "Velocity",
    organizationLink: "https://velocityincubator.com/",
    time: "Jan 2025 – Apr 2025",
    descriptions: [
      "Promoted Velocity’s startup programs through campus events, peer outreach, and social engagement.",
      "Collaborated with student organizations to boost participation and reported key student insights to Velocity staff.",
    ],
  },
  {
    position: "Residence Ambassador",
    organization: "University of Waterloo",
    organizationLink: "https://uwaterloo.ca/",
    time: "Sep 2024 – Apr 2025",
    descriptions: [
      "Delivered campus housing tours to prospective students and families, highlighting residence life at V1.",
      "Supported open houses and contributed to marketing content promoting the student living experience.",
    ],
  },
  {
    position: "Community Representative Co-Lead",
    organization: "UW Computer Science Club",
    organizationLink: "https://csclub.uwaterloo.ca/",
    time: "Jan 2025 – Apr 2025",
    descriptions: [
      "Organized social initiatives and events to foster community among CS students.",
      "Facilitated collaborations with other clubs to expand outreach and engagement.",
    ],
  },
  {
    position: "Logistics Organizer",
    organization: "Tech+ UW",
    organizationLink: "https://www.techplusuw.com/",
    time: "Jan 2025 – Apr 2025",
    descriptions: [
      "Organized mentorship programs and workshops promoting diversity in tech.",
      "Coordinated logistics to ensure seamless execution of events and mentorship sessions.",
    ],
  },
  {
    position: "Council Representative",
    organization: "UW Environment Student Society, WAGS, WESEF",
    organizationLink: "https://uwaterloo.ca/environment/",
    time: "Sep 2024 – Apr 2025",
    descriptions: [
      "Represented Geomatics students in three faculty-level councils, voicing student concerns and shaping programming.",
      "Collaborated with peers and faculty to support student-led initiatives and academic development.",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <>
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        {/* Hero Section */}
        <section className="px-8 py-5 flex items-center justify-center">
          <main className="flex flex-col w-full max-w-4xl rounded-4xl">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Left: (optional photo) */}
              {/* <div className="relative flex-shrink-0">
              <Image
                src="/selfie.jpg"
                fill
                className="object-cover rounded-2xl shadow-xl"
                alt="Photo"
              />
            </div> */}

              {/* Right: Text content */}
              <div className="flex flex-col">
                <h1 className="font-extrabold text-[#98B493] text-shadow-md text-shadow-[#1c1f1b] text-4xl md:text-5xl tracking-tight text-center md:text-left">
                  Michael Pasyechnyk
                </h1>

                {/* Typing Sentence inside search bar */}
                <div className="my-5 flex justify-center md:justify-start">
                  <div className="flex items-center bg-[#515d4f]/50 rounded-full shadow-md w-full max-w-lg px-4 py-2">
                    <span className="mr-3 text-[#2c312b]">
                      <IoSearch size={22} />
                    </span>
                    <TypingSentence />
                  </div>
                </div>

                <p className="text-[#c4d3c1] text-sm md:text-base leading-relaxed max-w-2xl">
                  I’m a previous software engineering intern at{" "}
                  <Link href="https://ipserlab.com/" className="link">
                    <b>IpserLab</b>
                  </Link>{" "}
                  working on front-end and learning the ropes in product
                  management, and studying{" "}
                  <Link
                    href="https://uwaterloo.ca/systems-design-engineering/"
                    className="link"
                  >
                    <b>Systems Design Engineering</b>
                  </Link>{" "}
                  at the{" "}
                  <Link href="https://uwaterloo.ca/" className="link">
                    <b>University of Waterloo </b>
                    <UWLogo className="-translate-y-px inline-block" />
                  </Link>
                </p>
              </div>
            </div>
          </main>
        </section>

        {/* Skills Section */}
        <section className="py-3 flex items-center justify-center">
          <main className="flex flex-col w-full max-w-4xl rounded-3xl p-8 bg-[#303b2d] shadow-lg">
            <h2 className="text-[#98B493] text-2xl md:text-3xl font-bold pb-3 text-center">
              Skills & Tools
            </h2>

            <hr className="h-1 bg-gradient-to-r from-[#98B493] via-[#638b5c] to-[#98B493] border-0 mb-5 rounded" />

            <div className="mb-4">
              <SkillCarousel />
            </div>

            <ul className="list-disc ml-6 text-[#c4d3c1] space-y-3">
              <li>
                <span className="font-semibold text-[#98B493]">Languages:</span>{" "}
                Javascript/Typescript, Python, C++, HTML5, CSS3
              </li>
              <li>
                <span className="font-semibold text-[#98B493]">
                  Frontend / UI:
                </span>{" "}
                React, Next.js, Redux, Context API, React Query, TailwindCSS,
                Styled Components, Vite
              </li>
              <li>
                <span className="font-semibold text-[#98B493]">
                  Backend / Fullstack:
                </span>{" "}
                Node.js, Django, Supabase, PostgreSQL
              </li>
              <li>
                <span className="font-semibold text-[#98B493]">
                  Tools & Deployment:
                </span>{" "}
                Git, GitHub, Netlify, Vercel, Figma, Canva, Notion
              </li>
            </ul>
          </main>
        </section>

        {/* About blocks with accordion */}
        <section className="p-8 flex items-center justify-center">
          <main className="flex flex-col justify-center rounded-3xl px-3 py-3 border-[#2e3a2b] border-8 shadow-md w-full max-w-4xl">
            <Accordion type="multiple" className="rounded-xl">
              <AccordionItem value="experience" className="border-0 pb-3">
                <AccordionTrigger className="flex items-center justify-between w-full px-4 py-4 text-lg hover:no-underline hover:cursor-pointer font-semibold text-white hover:bg-[#2e3a2b] data-[state=open]:bg-[#2e3a2b] data-[state=open]:rounded-b-none rounded-lg transition">
                  Experience
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-[#c4d3c1] text-base bg-[#3e4f3a] rounded-b-xl">
                  <p className="font-semibold text-md text-white">
                    Software Engineering Intern -{" "}
                    <Link
                      href="https://ipserlab.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#cef4c8] hover:text-[#85a281] transition duration-200"
                    >
                      IpserLab
                    </Link>
                  </p>
                  <p className="text-sm text-[#c4d3c1] mb-2">
                    May 2025 - Aug 2025 · Remote
                  </p>
                  <p>
                    Worked on front-end development, UI improvements, and
                    product management tasks.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="community" className="border-0 pb-3">
                <AccordionTrigger className="flex items-center justify-between w-full px-4 py-4 text-lg hover:no-underline hover:cursor-pointer font-semibold text-white hover:bg-[#2e3a2b] data-[state=open]:bg-[#2e3a2b] data-[state=open]:rounded-b-none rounded-lg transition">
                  Volunteering
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-[#c4d3c1] text-base bg-[#3e4f3a] rounded-b-xl">
                  {volunteering.map((exp, i) => (
                    <div key={i}>
                      <p className="font-semibold text-md text-white">
                        {exp.position} -{" "}
                        <Link
                          href={exp.organizationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#cef4c8] hover:text-[#85a281] transition duration-200"
                        >
                          {exp.organization}
                        </Link>
                      </p>
                      <p className="text-sm text-[#c4d3c1] mb-2">{exp.time}</p>
                      <ul className="list-disc ml-6 space-y-1 mb-4">
                        {exp.descriptions.map((d, j) => (
                          <li key={j}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="education" className="border-0">
                <AccordionTrigger className="flex items-center justify-between w-full px-4 py-4 text-lg hover:no-underline hover:cursor-pointer font-semibold text-white hover:bg-[#2e3a2b] data-[state=open]:bg-[#2e3a2b] data-[state=open]:rounded-b-none rounded-lg transition">
                  Education
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-[#c4d3c1] text-base bg-[#3e4f3a] rounded-b-xl">
                  <p className="font-semibold text-md text-white">
                    University of Waterloo - Systems Design Engineering (BASc)
                  </p>
                  <p className="text-sm text-[#c4d3c1] mb-2">Class of 2030</p>
                  <p>
                    <b>Relevant Courses:</b> Human Factors of Design, Data
                    Structures and Algorithms, Digital Systems.
                  </p>
                  <br />
                  <p className="font-semibold text-md text-white">
                    University of Waterloo - Geomatics (BES)
                  </p>
                  <p className="text-sm text-[#c4d3c1] mb-2">2024 – 2025</p>
                  <p>
                    <b>Relevant Courses:</b> Designing Functional Programs,
                    Algorithm Design and Data Abstraction, Geospatial Data,
                    Geographic Information Systems
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </main>
        </section>

        {/* Other Section */}
        {/* <section className="p-4 pb-10 flex items-center justify-center gap-8">
          <Link
            href="/about"
            className="nav-link font-bold bg-[#303b2d] p-5 rounded-full text-center w-[250px] card-hover"
          >
            About Me
          </Link>
          <Link
            href="/projects"
            className="nav-link font-bold bg-[#303b2d] p-5 rounded-full text-center w-[250px] card-hover"
          >
            View My Projects
          </Link>
        </section> */}
      </motion.div>
    </>
  );
}
