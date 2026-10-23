"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

// Site-wide Lenis smooth scrolling. Lenis is stepped from GSAP's ticker
// (instead of its own rAF loop) and pings ScrollTrigger on every scroll, so
// scroll-linked GSAP animations stay locked to the smoothed position.
// Lenis already turns smoothing off for prefers-reduced-motion.
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      // pause while a modal locks <html> with overflow: hidden
      autoToggle: true,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
