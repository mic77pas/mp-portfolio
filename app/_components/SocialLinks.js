import Link from "next/link";

export default function SocialLinks() {
  return (
    <nav
      className="flex gap-12 items-center text-nav-50 font-semibold text-shadow-lg"
      style={{ textShadow: "2px 2px 0 #18210F", color: "#98B493" }}
    >
      <Link href="/resume" className="nav-link">
        resume
      </Link>
      <Link href="/contact" className="nav-link">
        contact
      </Link>
      <Link
        href="https://linkedin.com/in/michaelpasyechnyk"
        target="_blank"
        className="nav-link"
      >
        LinkedIn
      </Link>
      <Link
        href="https://github.com/mic77pas"
        target="_blank"
        className="nav-link"
      >
        GitHub
      </Link>
    </nav>
  );
}
