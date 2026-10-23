"use client";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import MobileHeader from "./MobileHeader";
import AnimatedLogo from "./AnimatedLogo";
import AboutLink from "./AboutLink";
import Logo from "./Logo";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// On the home page the bar stays transparent while the hero is lifting away
// and only fills in once the hero's bottom edge has passed under it
const solidFrom = () => {
  const heroSpacer = document.querySelector("[data-hero-spacer]");
  return heroSpacer ? heroSpacer.offsetHeight - 80 : 10;
};

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const lastHeight = useRef(0);
  const ticking = useRef(false);

  // The header lives in the root layout, so it keeps its state across
  // navigations: a bar hidden by scrolling down the home page would stay
  // hidden on the next page (the jump back to the top comes with a height
  // change, which onScroll deliberately ignores). Start each page shown.
  useEffect(() => {
    setHidden(false);
    setScrolled(window.scrollY > solidFrom());
    lastY.current = window.scrollY;
    lastHeight.current = document.documentElement.scrollHeight;
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        setScrolled(y > solidFrom());

        // The page changed height (e.g. a dropdown closing at the bottom
        // pulls the scroll position up): not the visitor scrolling, so
        // don't show/hide the bar
        const height = document.documentElement.scrollHeight;
        if (height !== lastHeight.current) {
          lastHeight.current = height;
          lastY.current = y;
          ticking.current = false;
          return;
        }

        // Ignore tiny scroll movements (prevents flicker)
        const THRESHOLD = 8;

        if (Math.abs(delta) > THRESHOLD) {
          // hide when scrolling down, show when scrolling up
          setHidden(delta > 0 && y > 60); // don't hide at very top
          lastY.current = y;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-100 w-full h-20 hidden sm:flex items-center",
          "transform-gpu transition-[translate,background-color,box-shadow] duration-300 ease-out rounded-b-2xl",
          // transparent over the hero; solid bar once the page scrolls
          scrolled
            ? "bg-(--pal-header)/85 backdrop-blur-sm shadow-[0px_4px_12px_rgba(0,0,0,0.45)]"
            : "bg-transparent",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        {/* soft shade along the top edge while the bar is transparent; fades
            out as the solid background fades in */}
        <div
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/40 to-transparent transition-opacity duration-300",
            scrolled ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />

        <div className="flex flex-row items-center justify-between w-full px-4 lg:px-8">
          {/* the logo is an ambigram: flipping it on hover shows it reads the
              same. The shadow lives on the non-rotating link, so it's cast
              from the rotated logo and always falls below it. */}
          <Link
            href="/"
            className="group block filter-[drop-shadow(1px_2px_2px_rgba(0,0,0,0.8))]"
          >
            <Logo className="w-[72px] h-[37px] transition-transform duration-500 ease-in-out group-hover:rotate-180 group-hover:brightness-120" />
          </Link>

          <nav>
            <ul className="font-minecraft flex gap-8 font-bold text-(--pal-title)">
              <li>
                <AboutLink className="nav-link nav-link-bright">about</AboutLink>
              </li>
              <li>
                <Link href="/portfolio" className="nav-link nav-link-bright">
                  portfolio
                </Link>
              </li>
              {/* <li>
                <Link href="/posts" className="nav-link nav-link-bright">
                  posts
                </Link>
              </li> */}
              <li>
                <Link
                  href="https://drive.google.com/file/d/12K4VSG5kEep4KhuxYuXZ6ek6-4BCrV2P/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link nav-link-bright"
                >
                  resume
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="sm:hidden">
        <MobileHeader />
      </div>
    </>
  );
}
