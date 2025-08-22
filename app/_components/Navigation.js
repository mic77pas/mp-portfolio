import Link from "next/link";

export default function Logo() {
  return (
    <nav className="z-10 text-xl">
      <ul
        className="flex gap-16 items-center text-nav-50 font-semibold text-shadow-lg"
        style={{ textShadow: "2px 2px 0 #18210F", color: "#98B493" }}
      >
        <li>
          <Link href="/about">about</Link>
        </li>
        <li>
          <Link href="/projects">projects</Link>
        </li>
      </ul>
    </nav>
  );
}
