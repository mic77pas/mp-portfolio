"use client";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import AnimatedLogo from "./AnimatedLogo";
import AboutLink from "./AboutLink";
import Logo from "./Logo";
import { AnimatePresence, motion } from "motion/react";
import { navIntro } from "./headerIntro";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// The nav links, shared by the inline desktop list and the mobile menu panel
const navItems = (className) => [
  <AboutLink key="about" className={className}>
    about
  </AboutLink>,
  <Link key="portfolio" href="/portfolio" className={className}>
    portfolio
  </Link>,
  <Link key="posts" href="/posts" className={className}>
    posts
  </Link>,
];

// Three bars that fold into an X while the menu is open
function MenuIcon({ open }) {
  const bar =
    "absolute left-0 h-[3px] w-full rounded-full bg-current transition-all duration-300 ease-out";
  return (
    <span aria-hidden className="relative block w-6 h-[18px]">
      <span className={`${bar} ${open ? "top-[7.5px] rotate-45" : "top-0"}`} />
      <span className={`${bar} top-[7.5px] ${open ? "opacity-0 scale-x-0" : ""}`} />
      <span className={`${bar} ${open ? "top-[7.5px] -rotate-45" : "top-[15px]"}`} />
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const lastY = useRef(0);
  const lastHeight = useRef(0);
  const ticking = useRef(false);

  // The header lives in the root layout, so it keeps its state across
  // navigations: a bar hidden by scrolling down the home page would stay
  // hidden on the next page (the jump back to the top comes with a height
  // change, which onScroll deliberately ignores). Start each page shown.
  useEffect(() => {
    setHidden(false);
    setMenuOpen(false);
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

  // the menu folds away with the bar when scrolling down hides it
  useEffect(() => {
    if (hidden) setMenuOpen(false);
  }, [hidden]);

  // close the mobile menu on a tap outside the header or Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setMenuOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "fixed inset-x-0 top-0 z-100 w-full flex flex-col",
          "transform-gpu transition-[translate,background-color,box-shadow] duration-300 ease-out rounded-b-2xl",
          // always transparent over the page, except while the mobile menu
          // has it opened out into a panel (its links need a backing)
          menuOpen
            ? "bg-(--pal-header)/85 backdrop-blur-sm shadow-[0px_4px_12px_rgba(0,0,0,0.45)]"
            : "bg-transparent",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        {/* soft shade along the top edge while the bar is transparent; fades
            out while the menu panel's solid background is in */}
        <div
          aria-hidden
          className={[
            "pointer-events-none absolute inset-x-0 top-0 -bottom-6 -z-10 bg-linear-to-b from-black/75 via-black/45 to-transparent transition-opacity duration-300",
            menuOpen ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />

        <div className="flex flex-row items-center justify-between w-full h-16 md:h-20 shrink-0 px-4 lg:px-8">
          {/* the logo is an ambigram: flipping it on hover shows it reads the
              same. The shadow lives on the non-rotating link, so it's cast
              from the rotated logo and always falls below it. */}
          <Link
            href="/"
            className="group block filter-[drop-shadow(1px_2px_2px_rgba(0,0,0,0.8))]"
          >
            <Logo className="w-[58px] h-[30px] md:w-[72px] md:h-[37px] transition-transform duration-500 ease-in-out group-hover:rotate-180 group-hover:brightness-120" />
          </Link>

          {/* md up: the links sit inline */}
          <nav className="hidden md:block">
            <ul className="font-minecraft flex gap-8 font-bold text-(--pal-title)">
              {navItems("nav-link nav-link-bright").map((item, i) => (
                <motion.li key={item.key} {...navIntro(i)}>
                  {item}
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* phones: a menu button that opens the bar out downwards into a
              panel holding the links */}
          <motion.button
            {...navIntro(0)}
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden -mr-2 p-2 text-(--pal-title) filter-[drop-shadow(1px_2px_2px_rgba(0,0,0,0.8))] cursor-pointer"
          >
            <MenuIcon open={menuOpen} />
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              // following a link (or the about scroll) closes the menu
              onClick={(e) => e.target.closest("a") && setMenuOpen(false)}
              className="md:hidden overflow-hidden"
            >
              <ul className="font-minecraft font-bold text-base text-(--pal-title) flex flex-col items-end px-4 -mt-1 pb-4">
                {/* each row spans the panel for an easy tap (.nav-link is
                    inline-block) */}
                {navItems("nav-link nav-link-bright w-full py-1.5 text-right").map(
                  (item) => (
                    <li key={item.key} className="w-full">
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
