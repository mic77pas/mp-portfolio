"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function scrollToAbout() {
  const about = document.getElementById("about");
  if (!about) return;

  // On the home page the content sits pinned under the hero until the hero
  // has been scrolled away, so scrollIntoView sees #about as already in view.
  // Its resting position is the hero's height plus its offset in the content.
  const content = about.closest("[data-hero-content]");
  const spacer = document.querySelector("[data-hero-spacer]");
  if (!content || !spacer) {
    about.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const offset =
    about.getBoundingClientRect().top - content.getBoundingClientRect().top;
  const margin = parseFloat(getComputedStyle(about).scrollMarginTop) || 0;
  window.scrollTo({
    top: spacer.offsetHeight + offset - margin,
    behavior: "smooth",
  });
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
