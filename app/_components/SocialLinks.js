import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <nav
      className="flex gap-12 items-center text-nav-50 font-semibold text-shadow-lg"
      style={{ textShadow: "2px 2px 0 #18210F", color: "#98B493" }}
    >
      <Link href="/resume.pdf" className="nav-link" target="_blank" rel="noopener noreferrer">
        resume
      </Link>
      <Link href="/contact" className="nav-link">
        contact
      </Link>
      <div className="relative group">
        <Link
          href="https://linkedin.com/in/michaelpasyechnyk"
          target="_blank"
          className="nav-link"
        >
          <FaLinkedin size={44} />
        </Link>
        <div
          className="
          absolute left-1/2 -translate-x-1/2 mt-10
          hidden group-hover:flex
          items-center
          px-2 py-1 text-sm text-white
          bg-neutral-900/40 rounded-lg shadow-lg
          whitespace-nowrap
        "
        >
          LinkedIn
        </div>
      </div>

      <div className="relative group">
        <Link
          href="https://github.com/mic77pas"
          target="_blank"
          className="nav-link"
        >
          <FaGithub size={44} />
        </Link>

        {/* Tooltip */}
        <div
          className="
          absolute left-1/2 -translate-x-1/2 mt-10
          hidden group-hover:flex
          items-center
          px-2 py-1 text-sm text-white
          bg-neutral-900/40 rounded-lg shadow-lg
          whitespace-nowrap
        "
        >
          GitHub
        </div>
      </div>
    </nav>
  );
}
