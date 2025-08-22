import Image from "next/image";
import Link from "next/link";
import logoLight from "./logoLight.svg";
import logoDark from "./logoDark.svg";
import { useState } from "react";

export default function Logo() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative group font-semibold">
      <Link href="/" className="flex items-center gap-4 z-10">
        <Image
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          src={isHovering ? logoLight : logoDark}
          quality={100}
          width={60}
          alt="Signature"
          className="mx-4 my-1 transition-transform duration-300 ease-in-out hover:-translate-y-1"
        />
      </Link>
      <div
        className="
          absolute left-1/2 -translate-x-1/2 mt-6
          hidden group-hover:flex
          items-center
          px-2 py-1 text-sm text-white
          bg-neutral-900/40 rounded-lg shadow-lg
          whitespace-nowrap
        "
      >
        Home
      </div>
    </div>
  );
}
