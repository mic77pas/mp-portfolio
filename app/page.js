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
      <section className="p-8 flex items-center justify-center">
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
              <h1 className="font-extrabold text-[#98B493] text-shadow-md text-shadow-[#1f271d] text-6xl md:text-7xl tracking-tight text-center md:text-left">
                Michael Pasyechnyk
              </h1>

              {/* Typing Sentence inside search bar */}
              <div className="my-6 flex justify-center md:justify-start">
                <div className="flex items-center bg-[#515d4f]/50 rounded-full shadow-md w-full max-w-lg px-4 py-2">
                  <span className="mr-3 text-[#2c312b]">
                    <IoSearch size={22} />
                  </span>
                  <TypingSentence className="text-lg md:text-xl" />
                </div>
              </div>

              <p className="text-[#c4d3c1] text-base md:text-lg leading-relaxed max-w-2xl">
                I’m a software engineering intern at{" "}
                <Link
                  href="https://ipserlab.com/"
                  className="hover:text-[#8aa385] transition duration-100"
                >
                  <b>IpserLab</b>
                </Link>{" "}
                working on front-end and learning the ropes in product
                management, and studying{" "}
                <Link
                  href="https://uwaterloo.ca/systems-design-engineering/"
                  className="hover:text-[#8aa385] transition duration-100"
                >
                  <b>Systems Design Engineering</b>
                </Link>{" "}
                at the{" "}
                <Link
                  href="https://uwaterloo.ca/"
                  className="hover:text-[#8aa385] transition duration-100"
                >
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
            Skills
          </h2>
          <hr className="pb-4"/>
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

          <div className="mt-8">
            <SkillCarousel />
          </div>
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