"use client";
import { useEffect, useId, useRef, useState } from "react";
import { animate } from "motion";
import { LOGO_DRAW } from "./headerIntro";

// The MP ambigram (same outline as public/logos/mp-logo.svg), drawn in the
// palette's title colour so it follows palette swaps.
const OUTLINE =
  "M66.7583 1.74635C67.9019 0.00479505 70.4065 -0.643247 72.2723 0.775509L72.4565 0.924061L72.6608 1.10112C73.7557 2.06307 75.9249 4.1723 77.4118 7.03022C79.0477 10.1747 79.9858 14.55 77.3545 19.091C74.4062 24.179 69.4449 25.2447 65.7171 25.1341C64.9553 25.1115 64.2188 25.0401 63.5254 24.9405C64.2206 23.7389 64.8932 22.5755 65.565 21.4123C66.1348 20.4258 66.7047 19.4396 67.2884 18.4302C69.0758 18.2363 70.5691 17.4838 71.567 15.7618C72.7074 13.7936 72.4361 11.9338 71.4791 10.0943C71.1956 9.54944 70.8627 9.03696 70.5158 8.56626L64.8205 18.3942C64.8309 18.3955 64.8413 18.396 64.8517 18.3972C64.472 19.0543 64.0962 19.7046 63.7207 20.3549C62.9325 21.7196 62.1438 23.0837 61.3186 24.5089C61.3065 24.5059 61.2944 24.5034 61.2824 24.5004L53.5054 37.9226C51.5332 41.3262 46.3112 39.9321 46.3112 36.002V15.5097L33.3239 37.9226C31.3517 41.3262 26.1297 39.9321 26.1297 36.002V15.4442L12.3482 39.0835C11.2319 40.9984 8.4945 41.7434 6.54458 40.0759C5.53862 39.2156 3.1759 37.0193 1.58931 33.9707C-0.0472144 30.8261 -0.986414 26.4501 1.64554 21.908C4.72372 16.596 9.97693 15.6762 13.7518 15.8848C14.3854 15.9199 14.9961 15.9873 15.5736 16.0729L13.6027 19.4546C12.6865 21.0262 12.1374 21.9629 11.7875 22.5587C9.9655 22.74 8.44075 23.4975 7.43262 25.2372C6.29198 27.2057 6.564 29.0658 7.52148 30.9057C7.80674 31.4538 8.14212 31.9692 8.49135 32.4422L14.2242 22.6082L14.2222 22.6077C14.5342 22.0741 14.9322 21.3954 15.4426 20.52L25.5951 3.10583L25.6232 3.05732L25.7181 2.90176C27.763 -0.291893 32.8123 1.12364 32.8124 4.987V25.4882L45.7997 3.07632L45.8946 2.92027C47.9339 -0.282878 52.9938 1.12844 52.9939 4.997V25.4882L66.6488 1.92391L66.7583 1.74635Z";

// inlined so swapping to the mask at the end of the draw doesn't wait on a fetch
const OUTLINE_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79 41" preserveAspectRatio="none"><path d="${OUTLINE}"/></svg>`,
)}")`;

// Centreline of the letterforms, from the left loop's diagonal cut, round the
// loop, up and down the zigzag, round the P bowl to the right cut. A thick
// stroke along it, clipped to the outline, "draws" the logo.
const CENTRELINE =
  "M18 19.3 L11.6 19.3 C7.5 19.3 3.3 23.5 3.3 28 C3.3 32 5.5 35.5 8.9 38.6 L29.47 3.09 L29.47 37.92 L49.65 3.04 L49.65 37.87 L70.22 2.36 C73.62 5.46 75.82 8.96 75.82 12.96 C75.82 17.46 71.62 21.66 67.52 21.66 L61.12 21.66";

// The two cuts sit only ~2 units from the neighbouring diagonals, so a single
// stroke wide enough to cover the strokes would bleed into those diagonals
// before the pen gets there. Instead the stroke is drawn three times, each
// clipped to one side of the gaps beside the cuts (the regions overlap a
// little inside the gaps so there's no seam):
//   loop - left of the gap at the left cut
//   zigzag - between the two gaps, drawn from `from` along the path
//   bowl - right of the gap at the right cut, drawn from `from`
const SECTIONS = [
  {
    key: "loop",
    from: 0,
    width: 8,
    region: "45.02,-31.69 -15.15,72.14 -67.50,41.80 -7.33,-62.02",
  },
  {
    key: "zigzag",
    from: 0.0765, // leftmost point of the loop
    width: 7.2,
    region: "44.15,-32.19 -16.02,71.63 34.97,73.15 95.14,-30.67",
  },
  {
    key: "bowl",
    from: 0.8752, // top of the last diagonal
    width: 8,
    region: "94.27,-31.17 34.10,72.65 86.45,102.99 146.62,-0.84",
  },
];

// Show the part of the path between `from` and the pen position `p`
// (both as fractions of the path, which has pathLength 1)
const setProgress = (el, from, p) => {
  const len = Math.max(0, p - from);
  el.style.visibility = len > 0 ? "visible" : "hidden";
  el.style.strokeDasharray = `${len} 2`;
  el.style.strokeDashoffset = `${-from}`;
};

export default function Logo({ className = "" }) {
  const id = useId();
  const strokes = useRef([]);
  const [drawn, setDrawn] = useState(false);

  // Draws once per page load: the headers live in the root layout, so this
  // doesn't replay on client-side navigation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const controls = animate(0, 1, {
      ...LOGO_DRAW,
      ease: [0.6, 0, 0.3, 1],
      onUpdate: (p) =>
        strokes.current.forEach((el, i) => el && setProgress(el, SECTIONS[i].from, p)),
      // the clipped strokes leave hairline gaps at the inner points of the
      // loops, so finish on the solid outline
      onComplete: () => setDrawn(true),
    });
    return () => controls.stop();
  }, []);

  // Once drawn, the logo is the outline used as a mask over the palette's
  // title colour rather than an SVG fill: Chrome doesn't repaint a
  // currentColor fill while --pal-title transitions (the portfolio page's
  // palette swaps), so the SVG version blinks out mid-fade
  if (drawn) {
    return (
      <span
        role="img"
        aria-label="Logo"
        style={{ maskImage: OUTLINE_MASK }}
        className={`block bg-(--pal-title) mask-size-[100%_100%] mask-no-repeat ${className}`}
      />
    );
  }

  return (
    <svg
      role="img"
      aria-label="Logo"
      viewBox="0 0 79 41"
      preserveAspectRatio="none"
      className={`block text-(--pal-title) ${className}`}
    >
      <defs>
        <clipPath id={`${id}-outline`}>
          <path d={OUTLINE} />
        </clipPath>
        {SECTIONS.map((s) => (
          <clipPath key={s.key} id={`${id}-${s.key}`}>
            <polygon points={s.region} />
          </clipPath>
        ))}
      </defs>
      <g clipPath={`url(#${id}-outline)`}>
        {SECTIONS.map((s, i) => (
          <g key={s.key} clipPath={`url(#${id}-${s.key})`}>
            <path
              ref={(el) => (strokes.current[i] = el)}
              d={CENTRELINE}
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth={s.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ visibility: "hidden" }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
