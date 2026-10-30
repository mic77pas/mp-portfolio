import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { FiLinkedin } from "react-icons/fi";
import { PiLinkedinLogo, PiLinkedinLogoBold } from "react-icons/pi";
import { VscGithub } from "react-icons/vsc";
import { IoMailOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import CaveFloor, { CaveShade } from "./CaveFloor";

// The links and copyright line, also printed on the crash pad at the foot of
// the /posts climbing wall (which shows them in place of this footer)
export function FooterContent() {
  return (
    <>
      <nav className="flex gap-6 font-bold items-center text-(--pal-link)">
        <Link
          href="https://linkedin.com/in/michaelpasyechnyk"
          target="_blank"
          className="nav-link"
        >
          <PiLinkedinLogo className="w-7 h-7" />
        </Link>
        <Link
          href="https://github.com/mic77pas"
          target="_blank"
          className="nav-link"
        >
          <VscGithub className="w-6 h-6" />
        </Link>
        <a href="mailto:mic77p@gmail.com" className="group nav-link">
          <IoMailOutline className="w-7 h-7 nav-link" />
        </a>
        {/* <IoDocumentTextOutline className="w-6 h-6 nav-link" /> */}
      </nav>

      {/* a size smaller on phones, so it stays clear of the portfolio
          dock that sits low on the right edge there */}
      <span className="text-(--pal-muted) text-xs md:text-sm text-center">
        &copy; {new Date().getFullYear()} | MICHAEL PASYECHNYK
      </span>
    </>
  );
}

export default function Footer() {
  return (
    // bg-[#2A2B2A]/70
    <>
      <CaveShade />
      {/* tall enough for the cave floor's walls to rise out of the corners,
          with the links sitting on the floor between them */}
      <footer
        id="site-footer"
        className="relative flex flex-col justify-end items-center w-full h-40 md:h-52 pb-5 gap-2 font-medium bg-linear-to-t from-[#0c0e0c]"
        // style={{
        //   backgroundImage: "url('/comps/footer3.png')",
        //   backgroundSize: "100% 100%",
        // }}
      >
        <CaveFloor />
        <div className="relative flex flex-col items-center gap-2">
          <FooterContent />
        </div>
      </footer>

      {/* <footer className="md:hidden">
        <div className="h-20">

        </div>
      </footer> */}
    </>
  );
}

// import Image from "next/image";
// import Link from "next/link";
// import { PiLinkedinLogo } from "react-icons/pi";
// import { VscGithub } from "react-icons/vsc";
// import { IoMailOutline } from "react-icons/io5";

// export default function Footer() {
//   return (
//     <footer className="relative w-full aspect-1440/220 font-medium">
//       {/* Background image */}
//       <Image
//         src="/comps/newfooter.png"
//         alt=""
//         fill
//         priority
//         className="pointer-events-none select-none object-cover object-top"
//       />

//       {/* Content */}
//       <div className="relative h-full flex flex-col items-center justify-end gap-2 pb-6">
//         <nav className="flex gap-6 font-bold items-center">
//           <Link
//             href="https://linkedin.com/in/michaelpasyechnyk"
//             target="_blank"
//             className="nav-link"
//           >
//             <PiLinkedinLogo className="w-7 h-7" />
//           </Link>

//           <Link
//             href="https://github.com/mic77pas"
//             target="_blank"
//             className="nav-link"
//           >
//             <VscGithub className="w-6 h-6" />
//           </Link>

//           <a href="mailto:mic77p@gmail.com" className="group nav-link">
//             <IoMailOutline className="w-7 h-7" />
//           </a>
//         </nav>

//         <span className="text-(--pal-muted) text-sm">
//           &copy; {new Date().getFullYear()} | MICHAEL PASYECHNYK
//         </span>
//       </div>
//     </footer>
//   );
// }
