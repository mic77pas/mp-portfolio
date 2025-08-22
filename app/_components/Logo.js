import Image from "next/image";
import Link from "next/link";
import logoLight from "./logoLight.svg";
import logoDark from "./logoDark.svg";
import { useState } from "react";

export default function Logo() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        src={isHovering ? logoLight : logoDark}
        quality={100}
        width={70}
        alt="Signature"
        className="transition-transform duration-300 ease-in-out hover:-translate-y-1"
      />
    </Link>
  );
}
