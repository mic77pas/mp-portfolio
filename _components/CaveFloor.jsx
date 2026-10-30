"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

// The cave floor under the footer (from the Figma "Template" frame): ragged
// stepped ramps of pixel blocks rising out of both bottom corners. Each
// corner has two walls, a darker one further back and a lighter ledge in
// front, and they rise into place at different speeds as the page bottoms
// out, so the floor reads as having depth. A shade also creeps in from the
// screen edges over the last stretch of the page, like heading deeper in.

// small seeded PRNG, so every visit (and the server render) builds the
// same rocks
function random(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// One corner's wall as block cells, in grid units with the corner at the
// bottom-left: each column steps down from `rows` high at the corner to
// nothing `cols` out, with jitter, holes knocked out of the face and a few
// loose blocks sitting just above the edge. It then trails off across the
// floor in a short run of scattered blocks (`trail` columns), so the wall
// tapers to a point rather than ending in a square edge.
function buildWall({ seed, cols, rows, trail, holes, strays }) {
  const rand = random(seed);
  const cells = [];
  for (let c = 0; c < cols; c++) {
    const slope = (1 - c / cols) ** 1.35 * rows;
    const h = Math.max(0, Math.min(rows, Math.round(slope + (rand() - 0.5) * 2.2)));
    for (let r = 0; r < h; r++) {
      // keep the bottom row whole so the wall sits on the floor
      if (r > 0 && rand() < holes) continue;
      // blocks catch a little more light toward the top of the wall
      cells.push({ c, r, shade: Math.min(3, Math.floor(rand() * 3 + (r / rows) * 1.6)) });
    }
    if (h < rows && rand() < strays) {
      cells.push({ c, r: h + 1, shade: Math.floor(rand() * 2) });
    }
  }
  // the trailing end: loose blocks thinning out along the floor, the odd one
  // stacked on another
  for (let k = 0; k < trail; k++) {
    const c = cols + k;
    if (rand() < 0.95 - k * 0.18) {
      cells.push({ c, r: 0, shade: Math.floor(rand() * 2) });
      if (k < 2 && rand() < 0.35) cells.push({ c, r: 1, shade: Math.floor(rand() * 2) });
    }
  }
  return { cells, cols: cols + trail, rows: rows + 2 };
}

const WALLS = {
  back: {
    left: buildWall({ seed: 7, cols: 14, rows: 7, trail: 4, holes: 0.12, strays: 0.3 }),
    right: buildWall({ seed: 19, cols: 14, rows: 7, trail: 4, holes: 0.12, strays: 0.3 }),
    // how much of the palette accent each shade mixes into the background
    tints: [2, 4, 6, 8],
  },
  front: {
    left: buildWall({ seed: 3, cols: 10, rows: 4, trail: 4, holes: 0.18, strays: 0.4 }),
    right: buildWall({ seed: 11, cols: 10, rows: 4, trail: 4, holes: 0.18, strays: 0.4 }),
    tints: [5, 8, 11, 14],
  },
};

function Wall({ wall, tints, side, y, className }) {
  const { cells, cols, rows } = wall;
  return (
    <motion.svg
      aria-hidden
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      style={{ y }}
      // the wall fades into the dark as it climbs away from the floor
      className={`absolute bottom-0 w-auto [mask-image:linear-gradient(to_top,#000_35%,rgba(0,0,0,0.35))] ${
        side === "left" ? "left-0" : "right-0 -scale-x-100"
      } ${className}`}
    >
      {cells.map(({ c, r, shade }) => (
        <rect
          key={`${c}-${r}`}
          x={c}
          y={rows - 1 - r}
          // a hairline gap between blocks, like the Figma tiles
          width={0.94}
          height={0.94}
          style={{
            fill: `color-mix(in srgb, var(--pal-accent) ${tints[shade]}%, var(--pal-bg))`,
          }}
        />
      ))}
    </motion.svg>
  );
}

export default function CaveFloor() {
  const ref = useRef(null);
  const still = useReducedMotion();

  // 0 as the floor starts to come into view, 1 at the very bottom of the page
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const backY = useTransform(scrollYProgress, [0, 1], still ? ["0%", "0%"] : ["22%", "0%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], still ? ["0%", "0%"] : ["55%", "0%"]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {["left", "right"].map((side) => (
        <div key={side}>
          {/* sized by the footer's height, so the walls always fit in it */}
          <Wall
            wall={WALLS.back[side]}
            tints={WALLS.back.tints}
            side={side}
            y={backY}
            className="h-[52%] md:h-full"
          />
          <Wall
            wall={WALLS.front[side]}
            tints={WALLS.front.tints}
            side={side}
            y={frontY}
            className="h-[45%] md:h-[68%]"
          />
        </div>
      ))}
    </div>
  );
}

// the screen edges darken over the last stretch of the page
export function CaveShade() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-[5] bg-[radial-gradient(ellipse_at_50%_35%,transparent_55%,rgba(0,0,0,0.38)_100%)]"
    />
  );
}
