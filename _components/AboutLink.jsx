"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function scrollToAbout() {
  document
    .getElementById("about")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Links to the About section on the home page. Next's router doesn't
// reliably scroll to a hash (and ignores a hash that's already in the URL),
// so on the home page we scroll ourselves; elsewhere we navigate to /#about
// and ProfileCard scrolls into view on mount (then drops the hash, so a
// refresh always starts back at the top).
export default function AboutLink({ children, ...props }) {
  const pathname = usePathname();

  return (
    <Link
      href="/#about"
      scroll={false}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          scrollToAbout();
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
