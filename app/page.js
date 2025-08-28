import Image from "next/image";
import Link from "next/link";
import TypingSentence from "./_components/TypingSentence";
import UWLogo from "./_components/UWLogo";
import SkillCarousel from "./_components/SkillCarousel";
import { IoSearch } from "react-icons/io5";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-8 py-5 flex items-center justify-center">
        <main className="flex flex-col w-full max-w-3xl rounded-4xl">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Left: (optional photo) */}
            {/* <div className="w-48 h-48 relative flex-shrink-0">
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
              <div className="my-6 flex justify-center md:justify-start">
                <div className="flex items-center bg-[#515d4f]/50 rounded-full shadow-md w-full max-w-lg px-4 py-2">
                  <span className="mr-3 text-[#2c312b]">
                    <IoSearch size={22} />
                  </span>
                  <TypingSentence />
                </div>
              </div>

              <p className="text-[#c4d3c1] text-sm md:text-base leading-relaxed max-w-2xl">
                I’m a software engineering intern at{" "}
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
      <section className="p-8 flex items-center justify-center">
        <main className="flex flex-col w-full max-w-3xl rounded-3xl p-8 bg-[#2e3a2b] shadow-lg">
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

      {/* Other Section */}
      <section className="p-8 flex items-center justify-center">
        <main className="flex flex-col w-full max-w-3xl rounded-3xl p-8 bg-[#1f271d] text-center shadow-md">
          <h2 className="text-[#98B493] text-2xl md:text-3xl font-bold">
            Other
          </h2>
        </main>
      </section>
    </>
  );
}
