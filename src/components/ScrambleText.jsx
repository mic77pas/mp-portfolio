"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrambleTextPlugin, useGSAP);

// only glyphs the Minecraft font actually has, so the scramble stays pixelated
const CHARS = "<>/|[]{}#*+=_01!?$%&@";

// Text that decodes from scrambled symbols the first time it's seen.
//
// "Seen" accounts for the home hero: page content sits pinned underneath it
// while it lifts away, so a plain ScrollTrigger/IntersectionObserver would
// fire while the text is still covered. Instead it waits until the text is
// on screen *and* below the hero's bottom edge.
export default function ScrambleText({
  text,
  as: Tag = "span",
  className = "",
  duration = 1.1,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { opacity: 0 });
        const hero = document.querySelector("[data-hero]");
        let done = false;

        const check = () => {
          if (done) return;
          const { top, bottom } = el.getBoundingClientRect();
          const covered = hero
            ? Math.max(0, hero.getBoundingClientRect().bottom)
            : 0;

          if (bottom < 0) {
            // already scrolled past (e.g. arriving mid-page): just show it
            done = true;
            gsap.set(el, { opacity: 1 });
          } else if (top < window.innerHeight * 0.9 && top > covered) {
            done = true;
            gsap.to(el, { opacity: 1, duration: 0.2 });
            gsap.to(el, {
              duration,
              ease: "none",
              scrambleText: { text, chars: CHARS, revealDelay: 0.3, speed: 0.6 },
            });
          }
          if (done) stop();
        };

        const stop = () => {
          window.removeEventListener("scroll", check);
          window.removeEventListener("resize", check);
        };

        window.addEventListener("scroll", check, { passive: true });
        window.addEventListener("resize", check);
        check();
        return stop;
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [text] },
  );

  // aria-label keeps the accessible name stable while the visible text is
  // mid-scramble
  return (
    <Tag ref={ref} aria-label={text} className={className}>
      {text}
    </Tag>
  );
}
