import Image from "next/image";
import Link from "next/link";
import logoLight from "./logoLight.svg";
import logoDark from "./logoDark.svg";
import { useState } from "react";
import newLogo from "./newLogo.png";

export default function Logo() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link href="/" className="flex items-center">
      <Image
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        // src={isHovering ? logoLight : logoDark}
        src={newLogo}
        alt="Signature"
        quality={100}
        width={100}
        className="h-auto max-h-14 w-auto transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:brightness-120"
      />
    </Link>
  );
}
