"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

// A number that climbs from zero to `value` the first time it comes into
// view, keeping the value's zero padding ("09" counts 00, 01, ... 09).
//
// "In view" means actually visible: on the home page the content sits pinned
// underneath the hero until the hero lifts away, and an IntersectionObserver
// would count it as on screen the whole time it's covered. So this checks
// against the hero's bottom edge as the page scrolls.
export default function CountUp({ value, delay = 0, duration = 1.2 }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const text = value == null ? "" : String(value);
  const target = Number(text);
  const ready = text !== "" && Number.isFinite(target);
  const [shown, setShown] = useState(0);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = ref.current;
      // display: none (the other breakpoint's layout) never counts as seen
      if (!el || !el.offsetParent) return;
      const box = el.getBoundingClientRect();
      const hero = document.querySelector("[data-hero]");
      const covered = hero ? Math.max(0, hero.getBoundingClientRect().bottom) : 0;
      if (box.top >= covered && box.bottom <= window.innerHeight - 40) setSeen(true);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [seen]);

  useEffect(() => {
    if (!seen || !ready) return;
    if (still) {
      setShown(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [seen, ready, target, delay, duration, still]);

  return (
    <span ref={ref}>
      {ready ? (
        <>
          <span aria-hidden>{String(shown).padStart(text.length, "0")}</span>
          <span className="sr-only">{text}</span>
        </>
      ) : (
        // holds the line's height until the value arrives
        " "
      )}
    </span>
  );
}
