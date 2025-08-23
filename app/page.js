import Image from "next/image";
import Link from "next/link";
import TypingSentence from "./_components/TypingSentence";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <div className="p-8 pt-20 flex items-center justify-center">
        <main className="flex flex-col rounded-4xl p-8">
          {/* New container for the image and text */}
          <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-8">
            {/* Left: Image */}
            <div className="w-60 h-64 md:h-auto relative flex-shrink-0">
              <Image
                src="/selfie.jpg" // replace with your image path
                fill
                className="object-cover rounded-2xl shadow-xl"
                alt="Photo"
              />
            </div>

            {/* Right: Text content */}
            <div className="flex flex-col justify-start text-left md:text-left">
              <h1
                className={`${inter.className} text-[#98B493] text-shadow-md text-shadow-[#1f271d] text-5xl md:text-5xl mb-2 tracking-tight`}
              >
                Michael Pasyechnyk
              </h1>

              <div className="mb-4">
                <TypingSentence />
              </div>

              <p className="text-[#c4d3c1] text-base md:text-lg max-w-xl">
                I’m a software engineering intern at <b>IpserLab</b> working on
                front-end and learning the ropes in Product Management, and a{" "}
                <b>Systems Design Engineering</b> student at the University of
                Waterloo.
              </p>
            </div>
          </div>
          {/* <hr className="mt-6 w-full border-t-2 border-primary-400 border-[#282c28]" /> */}
        </main>
      </div>

      <div className="p-8 flex items-center justify-center">
        <main className="flex flex-col rounded-4xl p-8">Skills</main>
      </div>
      <div className="p-8 flex items-center justify-center">
        <main className="flex flex-col rounded-4xl p-8">Experience</main>
      </div>
      <div className="p-8 flex items-center justify-center">
        <main className="flex flex-col rounded-4xl p-8">Other</main>
      </div>
    </>
  );
}
