"use client";

import { Montserrat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MobileHeader from "./MobileHeader";
import AnimatedLogo from "./AnimatedLogo";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function HeaderV2() {
  const [hidden, setHidden] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        const THRESHOLD = 8;

        if (Math.abs(delta) > THRESHOLD) {
          setHidden(delta > 0 && y > 60);
          lastY.current = y;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // const handleNavigate = (href) => {
  //   if (href === pathname || isNavigating) return;

  //   setIsNavigating(true);
  //   showLoader();

  //   setTimeout(() => {
  //     router.push(href);

  //     setTimeout(() => {
  //       hideLoader();
  //       setIsNavigating(false);
  //     }, 1400);
  //   }, 150);
  // };

  const headerColor = "#161816";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: hidden ? "translateY(-107%)" : "translateY(0)",
        transition: "transform 0.3s ease",
        filter: "drop-shadow(0 6px 0 #000)",
      }}
    >
      <div
        style={{ backgroundColor: headerColor, width: "100%" }}
        className="pt-5"
      >
        <nav className="cave-nav font-minecraft font-bold">
          {[
            { href: "/", label: "home" },
            { href: "/about", label: "about" },
            { href: "/portfolio", label: "portfolio" },
            { href: "/resume", label: "resume" },
          ].map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <button
                key={href}
                type="button"
                // onClick={() => handleNavigate(href)}
                className="nav-link font-minecraft"
                style={{
                  padding: "2px 12px",
                  borderRadius: "20px",
                  backgroundColor: isActive ? "#3f463d" : "transparent",
                  color: isActive ? "#dce9db" : undefined,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: "40px",
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        <polygon
          fill={headerColor}
          points="
      0,0
      0,90
      80,90
      80,55
      160,55
      160,90
      240,90
      240,30
      360,30
      360,90
      400,90
      400,55
      480,55
      480,90
      560,90
      560,40
      640,40
      640,70
      720,70
      720,90
      800,90
      800,45
      920,45
      920,90
      960,90
      960,60
      1040,60
      1040,90
      1120,90
      1120,35
      1240,35
      1240,90
      1280,90
      1280,55
      1360,55
      1360,90
      1440,90
      1440,0
    "
        />
      </svg>
    </header>
  );
}
