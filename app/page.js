import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="mt-24 rounded-4xl">
        {/* <Image
          src={bg}
          fill
          placeholder="blur"
          quality={80}
          className="object-cover object-top"
          alt="Mountains and forests with two cabins"
        /> */}

        <div className="relative z-10 text-center px-4 py-4">
          <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
            Michael Pasyechnyk
          </h1>
          <Link
            href="/projects"
            className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            View My Projects
          </Link>
        </div>
      </main>
    </div>
  );
}
