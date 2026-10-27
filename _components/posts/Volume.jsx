import { useId } from "react";

// A wooden volume bolted to the wall: a faceted 3D shape seen face-on, each
// facet shaded by which way it points (light from the top left), with
// plywood grain, a few T-nut holes and a shadow cast onto the wall.
// Drawn in a 100x100 box stretched to the size it's given.

// each shape: base outline (where it meets the wall) plus the raised peak,
// a point (pyramid) or a ridge line (wedge)
const SHAPES = [
  // three-sided pyramid
  { base: [[0, 100], [100, 92], [46, 0]], peak: [[52, 60]] },
  // four-sided pyramid, skewed
  { base: [[0, 34], [62, 0], [100, 58], [30, 100]], peak: [[50, 50]] },
  // long wedge with a ridge along the top
  { base: [[0, 18], [100, 0], [92, 100], [6, 86]], peak: [[30, 44], [74, 38]] },
];

const LIGHT = [-0.55, -0.83];

const centroid = (pts) => [
  pts.reduce((s, p) => s + p[0], 0) / pts.length,
  pts.reduce((s, p) => s + p[1], 0) / pts.length,
];

const nearestPeak = (peak, pt) =>
  peak.reduce((best, p) =>
    Math.hypot(pt[0] - p[0], pt[1] - p[1]) < Math.hypot(pt[0] - best[0], pt[1] - best[1]) ? p : best,
  );

// split the shape into facets: each base edge joins up to the peak. Along a
// ridge the long sides become quads and the ends triangles.
function facets({ base, peak }) {
  return base.map((a, i) => {
    const b = base[(i + 1) % base.length];
    const pa = nearestPeak(peak, a);
    const pb = nearestPeak(peak, b);
    return pa === pb ? [a, b, pa] : [a, b, pb, pa];
  });
}

// brightness of a facet from the direction it leans away from the peak
function shade(facet, peakCenter) {
  const [fx, fy] = centroid(facet);
  let dx = fx - peakCenter[0];
  let dy = fy - peakCenter[1];
  const len = Math.hypot(dx, dy) || 1;
  dx /= len;
  dy /= len;
  const lit = dx * LIGHT[0] + dy * LIGHT[1]; // -1 (away) .. 1 (facing light)
  return 0.5 + 0.32 * lit;
}

const mix = (hex, k) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.max(0, Math.min(255, Math.round(v * k)));
  const r = ch((n >> 16) & 255);
  const g = ch((n >> 8) & 255);
  const b = ch(n & 255);
  return `rgb(${r} ${g} ${b})`;
};

export default function Volume({ kind = 0, color = "#5c6650", seed = 1, className = "", style }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const shape = SHAPES[kind % SHAPES.length];
  const peakCenter = centroid(shape.peak);
  const faces = facets(shape);
  const pts = (f) => f.map((p) => p.join(",")).join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      className={`overflow-visible ${className}`}
      style={{ filter: "drop-shadow(10px 18px 14px rgba(0,0,0,0.6))", ...style }}
    >
      <defs>
        {/* plywood: long streaky grain multiplied over the paint */}
        <filter id={`g${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.35" numOctaves="3" seed={seed} result="n" />
          <feColorMatrix in="n" type="saturate" values="0" result="m" />
          <feComponentTransfer in="m" result="s">
            <feFuncR type="linear" slope="0.45" intercept="0.68" />
            <feFuncG type="linear" slope="0.45" intercept="0.68" />
            <feFuncB type="linear" slope="0.45" intercept="0.68" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="s" mode="multiply" result="b" />
          {/* keep the grain inside the shape */}
          <feComposite in="b" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      <g filter={`url(#g${uid})`}>
        {faces.map((f, i) => (
          <polygon key={i} points={pts(f)} fill={mix(color, shade(f, peakCenter) * 1.2)} />
        ))}
      </g>

      {/* crisp facet edges: dark seams, a light catch on the ridges */}
      {faces.map((f, i) => (
        <polygon
          key={i}
          points={pts(f)}
          fill="none"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {shape.base.map((b, i) => {
        const p = nearestPeak(shape.peak, b);
        return (
          <line
            key={i}
            x1={b[0]}
            y1={b[1]}
            x2={p[0]}
            y2={p[1]}
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      {/* T-nut holes, a couple per facet */}
      {faces.flatMap((f, i) => {
        const [cx, cy] = centroid(f);
        return [0.35, -0.25].map((t, j) => {
          const x = cx + (f[0][0] - cx) * t;
          const y = cy + (f[0][1] - cy) * t;
          return (
            <g key={`${i}-${j}`}>
              <ellipse cx={x} cy={y + 0.4} rx="1.5" ry="1.5" fill="rgba(255,255,255,0.08)" />
              <ellipse cx={x} cy={y} rx="1.2" ry="1.2" fill="#0d0f0d" />
            </g>
          );
        });
      })}
    </svg>
  );
}
