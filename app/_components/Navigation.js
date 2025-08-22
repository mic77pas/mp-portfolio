import Link from "next/link";

export default function Logo() {
  return (
    <nav className="z-10">
      <ul className="nav-list">
        <li>
          {/* Apply the class to the Link component, which will pass it to the <a> tag */}
          <Link href="/about" className="nav-link">
            about
          </Link>
        </li>
        <li>
          <Link href="/projects" className="nav-link">
            projects
          </Link>
        </li>
      </ul>
    </nav>
  );
}
