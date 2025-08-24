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
    <div className="p-8 flex items-center justify-center">
      <main className="flex flex-col rounded-4xl p-8">
        {/* New container for the image and text */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-2">
          {/* Right: Text content */}
          <div className="flex flex-col justify-start text-left md:text-left">
            <h1
              className={`${inter.className} text-[#98B493] text-shadow-md text-shadow-[#1f271d] text-[45px] mb-4 tracking-tight`}
            >
              Hey, I&apos;m Michael! 👋
            </h1>

            <p className="text-[#c4d3c1] text-base md:text-lg max-w-lg">
              I&apos;m a Systems Design Engineering student at the University of
              Waterloo.
            </p>
          </div>
          {/* Left: Image */}
          <div className="w-100 h-120 relative flex-shrink-0">
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
  );
}
