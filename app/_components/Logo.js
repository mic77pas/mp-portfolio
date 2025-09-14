import Image from "next/image";
import Link from "next/link";
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
        className="logo h-10 sm:h-12 md:h-14 lg:h-16 w-auto"

      />
    </Link>
  );
}
