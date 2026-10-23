"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToY } from "../src/lib/lenis";

export function scrollToAbout() {
  const about = document.getElementById("about");
  if (!about) return;

  // On the home page the content sits pinned under the hero until the hero
  // has been scrolled away, so scrollIntoView sees #about as already in view.
  // Its resting position is the hero's height plus its offset in the content.
  const content = about.closest("[data-hero-content]");
  const spacer = document.querySelector("[data-hero-spacer]");
  if (!content || !spacer) {
    const margin = parseFloat(getComputedStyle(about).scrollMarginTop) || 0;
    scrollToY(about.getBoundingClientRect().top + window.scrollY - margin);
    return;
  }

  // the content is scaled down (from its top edge) while the hero is up, so
  // undo that to get the at-rest offset
  const contentRect = content.getBoundingClientRect();
  const scale = contentRect.width / content.offsetWidth || 1;
  const offset = (about.getBoundingClientRect().top - contentRect.top) / scale;
  const margin = parseFloat(getComputedStyle(about).scrollMarginTop) || 0;
  scrollToY(spacer.offsetHeight + offset - margin);
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
