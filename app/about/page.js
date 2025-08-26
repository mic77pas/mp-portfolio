import Link from "next/link";
import TypingSentence from "../_components/TypingSentence";
import Image from "next/image";
import { Inter } from "next/font/google";
import UWLogo from "../_components/UWLogo";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <>
      <div className="p-8 flex items-center justify-center">
        <main className="flex flex-col rounded-4xl p-8">
          {/* New container for the image and text */}
          <div className="flex flex-col md:flex-row md:items-stretch gap-2">
            {/* Right: Text content */}
            <div className="flex flex-col justify-start text-left md:text-left">
              <h1
                className={`${inter.className} text-[#98B493] text-shadow-md text-shadow-[#1f271d] md:text-[45px] text-[30px] mb-4 tracking-tight`}
              >
                Hey, I&apos;m Michael! 👋
              </h1>

              <p className="text-[#c4d3c1] text-base md:text-lg max-w-lg pb-5">
                I&apos;m a Systems Design Engineering student at the University
                of Waterloo, with a growing interest in software development,
                ux/ui, and product design.
                <br />
                <br />
                I solve problems using my building blocks of design and
                development to make the world a better place. To me, learning is
                a lifelong journey and it never stops.
                <br />
                <br />
                When I&apos;m not developing new programs, you&apos;ll most
                likely find me climbing, travelling, volunteering, or playing
                video games.
              </p>
            </div>
            {/* Left: Image */}
            <div className="md:w-100 md:h-120 w-80 h-100 relative flex-shrink-0">
              <Image
                src="/selfie2.jpg" // replace with your image path
                fill
                className="object-cover rounded-2xl shadow-xl"
                alt="Photo"
              />
            </div>
          </div>
          {/* <hr className="mt-6 w-full border-t-2 border-primary-400 border-[#282c28]" /> */}
        </main>
      </div>
      <div className="p-8 flex items-center justify-center">
        <main
          className={`flex flex-col rounded-4xl p-8 ${inter.className} text-[#98B493] text-shadow-md text-shadow-[#1f271d] text-3xl mb-2 tracking-tight`}
        >
          Experience
        </main>
      </div>
      <div className="p-8 flex items-center justify-center">
        <main
          className={`flex flex-col rounded-4xl p-8 ${inter.className} text-[#98B493] text-shadow-md text-shadow-[#1f271d] text-3xl mb-2 tracking-tight`}
        >
          Education
        </main>
      </div>
      <div className="p-8 flex items-center justify-center">
        <main
          className={`flex flex-col rounded-4xl p-8 ${inter.className} text-[#98B493] text-shadow-md text-shadow-[#1f271d] text-3xl mb-2 tracking-tight`}
        >
          
        </main>
      </div>
    </>
  );
}
