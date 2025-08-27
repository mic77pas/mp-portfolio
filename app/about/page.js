import Link from "next/link";
import TypingSentence from "../_components/TypingSentence";
import Image from "next/image";
import { Inter } from "next/font/google";
import UWLogo from "../_components/UWLogo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../_components/accordion";

const inter = Inter({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-8 items-center">
      {/* About block */}
      <section className="flex flex-col rounded-3xl p-8 bg-[#2e3a2b] shadow-lg w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <h1 className="text-[#98B493] text-4xl font-extrabold mb-3">
              Hey, I&apos;m Michael! 👋
            </h1>
            <p className="text-[#c4d3c1] text-base md:text-lg max-w-lg pb-5">
              I&apos;m a Systems Design Engineering student at the University of
              Waterloo, with a growing interest in software development, ux/ui,
              and product design.
              <br />
              <br />
              I solve problems using my building blocks of design and
              development to make the world a better place. To me, learning is a
              lifelong journey and it never stops.
              <br />
              <br />
              When I&apos;m not developing new programs, you&apos;ll most likely
              find me climbing, travelling, volunteering, or playing video
              games.
            </p>
          </div>
          <div className="md:w-100 md:h-120 w-80 h-100 relative flex-shrink-0">
            <Image
              src="/selfie2.jpg"
              fill
              className="object-cover rounded-2xl shadow-xl"
              alt="Photo"
            />
          </div>
        </div>
      </section>

      {/* About blocks with accordion */}
      <section className="flex flex-col rounded-3xl p-8 bg-[#2e3a2b] shadow-lg w-full max-w-4xl">
        <Accordion type="single" collapsible>
          <AccordionItem value="experience">
            <AccordionTrigger className="text-[#98B493] text-3xl font-bold">
              Experience
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4">
                <p className="font-semibold text-lg text-white">
                  IpserLab — Software Engineering Intern
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  May 2025 – Aug 2025
                </p>
                <p className="text-[#c4d3c1] text-base">
                  Worked on front-end development, UI improvements, and product
                  management tasks.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="education">
            <AccordionTrigger className="text-[#98B493] text-3xl font-bold">
              Education
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4">
                <p className="font-semibold text-lg text-white">
                  University of Waterloo — Systems Design Engineering (BASc)
                </p>
                <p className="text-sm text-gray-400 mb-2">2025 – 2030</p>
                <p className="text-[#c4d3c1] text-base">
                  <b>Relevant Courses:</b> Human Factors of Design, Data
                  Structures and Algorithms, Digital Systems.
                </p>
              </div>
            </AccordionContent>
            <AccordionContent>
              <div className="mt-4">
                <p className="font-semibold text-lg text-white">
                  University of Waterloo — Systems Design Engineering (BASc)
                </p>
                <p className="text-sm text-gray-400 mb-2">2025 – 2030</p>
                <p className="text-[#c4d3c1] text-base">
                  <b>Relevant Courses:</b> Human Factors of Design, Data
                  Structures and Algorithms, Digital Systems.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
