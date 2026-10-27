import { useId } from "react";

// A realistic climbing hold: shaded resin with sandy grain, chalk caked on
// the grip edge and a bolt washer. Drawn in a 128px box centred on 0,0 and
// scaled to fit its parent.

// outlines, roughly radius 45-55
const SHAPES = [
  // jug: a big bucket with a lip along the top
  "M-50 -4 C-52 -30 -24 -46 2 -45 C30 -44 52 -28 50 -2 C48 22 30 38 6 38 C-14 38 -22 24 -32 25 C-46 26 -49 12 -50 -4 Z",
  // crimp: a long, flat edge
  "M-56 -6 C-55 -19 -30 -24 0 -24 C30 -24 55 -20 56 -6 C57 9 38 16 0 15 C-38 14 -57 8 -56 -6 Z",
  // sloper: a fat round dome
  "M-46 6 C-48 -24 -26 -45 2 -44 C30 -43 48 -22 46 6 C44 30 24 43 -2 42 C-26 41 -44 30 -46 6 Z",
  // pinch: tall and narrow
  "M-22 -50 C-2 -56 22 -46 24 -20 C26 6 30 28 16 45 C2 58 -22 50 -25 30 C-28 8 -36 -40 -22 -50 Z",
  // fin: a triangular edge
  "M-52 28 C-48 8 -22 -40 0 -46 C22 -40 48 8 52 28 C32 40 -32 40 -52 28 Z",
  // knobbly multi-lobe blob
  "M-44 -16 C-40 -40 -10 -36 -4 -46 C8 -56 34 -42 38 -24 C52 -18 52 8 40 18 C36 40 8 46 -6 36 C-22 46 -48 34 -44 14 C-54 6 -52 -8 -44 -16 Z",
];

export const SHAPE_COUNT = SHAPES.length;

// the shadowed groove you'd actually grab, where a shape has one
const LIPS = [
  "M-34 -14 C-22 -30 22 -32 36 -14 C20 -21 -18 -21 -34 -14 Z",
  "M-46 -9 C-20 -16 20 -16 46 -9 C20 -4 -20 -4 -46 -9 Z",
  null,
  "M-14 -38 C-4 -44 10 -40 14 -30 C4 -34 -6 -34 -14 -38 Z",
  null,
  null,
];

export const HOLD_COLORS = {
  route: "#6fa552",
  pink: "#c4628a",
  blue: "#4a82b6",
  orange: "#cc7a36",
  purple: "#8467c0",
  yellow: "#c6aa3a",
};

// blend a #rrggbb colour toward black (amt < 0) or white (amt > 0)
function tint(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const to = amt < 0 ? 0 : 255;
  const a = Math.abs(amt);
  const ch = (v) => Math.round(v + (to - v) * a);
  const r = ch((n >> 16) & 255);
  const g = ch((n >> 8) & 255);
  const b = ch(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

export default function Hold({ shape = 0, color = "route", rotate = 0, seed = 1 }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const d = SHAPES[shape % SHAPES.length];
  const lip = LIPS[shape % SHAPES.length];
  const base = HOLD_COLORS[color] ?? HOLD_COLORS.route;
  const rot = `rotate(${rotate})`;

  return (
    <svg viewBox="-64 -64 128 128" className="block h-full w-full overflow-visible" aria-hidden>
      <defs>
        <clipPath id={`c${uid}`}>
          <path d={d} transform={rot} />
        </clipPath>
        {/* lit from the top left, in screen space so rotation doesn't move it */}
        <radialGradient id={`g${uid}`} cx="32%" cy="26%" r="80%">
          <stop offset="0" stopColor={tint(base, 0.38)} />
          <stop offset="0.42" stopColor={base} />
          <stop offset="1" stopColor={tint(base, -0.62)} />
        </radialGradient>
        <radialGradient id={`w${uid}`} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#f0f0ec" />
          <stop offset="0.6" stopColor="#8d918c" />
          <stop offset="1" stopColor="#3e423e" />
        </radialGradient>
        <filter id={`s${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="3" dy="8" stdDeviation="4.5" floodColor="#000" floodOpacity="0.65" />
        </filter>
        {/* fine sandy grain, multiplied into the resin */}
        <filter id={`t${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed={seed} result="n" />
          <feColorMatrix in="n" type="saturate" values="0" result="g" />
          <feComponentTransfer in="g" result="gs">
            <feFuncR type="linear" slope="0.5" intercept="0.62" />
            <feFuncG type="linear" slope="0.5" intercept="0.62" />
            <feFuncB type="linear" slope="0.5" intercept="0.62" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="gs" mode="multiply" />
        </filter>
        {/* blotchy, rough-edged chalk */}
        <filter id={`k${uid}`} x="-40%" y="-60%" width="180%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed={seed + 3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="18" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.4" />
        </filter>
        <filter id={`b${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      <g filter={`url(#s${uid})`}>
        <g clipPath={`url(#c${uid})`}>
          <rect x="-64" y="-64" width="128" height="128" fill={`url(#g${uid})`} filter={`url(#t${uid})`} />
          {lip && (
            <path d={lip} transform={rot} fill={tint(base, -0.75)} opacity="0.8" filter={`url(#b${uid})`} />
          )}
          {/* chalk caked on where hands go: the top edge */}
          <ellipse cx="2" cy="-32" rx="36" ry="12" fill="#f4f4ee" opacity="0.4" filter={`url(#k${uid})`} />
          <ellipse cx="-20" cy="-14" rx="10" ry="6" fill="#f4f4ee" opacity="0.18" filter={`url(#k${uid})`} />
          {/* soft specular glint */}
          <ellipse cx="-20" cy="-24" rx="14" ry="6" fill="#fff" opacity="0.22" filter={`url(#b${uid})`} />
        </g>
      </g>
      <path d={d} transform={rot} fill="none" stroke={tint(base, -0.7)} strokeOpacity="0.55" strokeWidth="1.2" />

      {/* bolt: recess, washer, socket */}
      <circle r="10.5" fill="#000" opacity="0.35" />
      <circle r="8.5" fill={`url(#w${uid})`} />
      <circle r="4.6" fill="#1c1d1c" />
      <polygon points="2.4,0 1.2,2.1 -1.2,2.1 -2.4,0 -1.2,-2.1 1.2,-2.1" fill="#000" />
    </svg>
  );
}
