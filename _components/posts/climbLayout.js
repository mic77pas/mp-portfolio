import { SHAPE_COUNT } from "./Hold";

// Geometry for the climbing wall on /posts. Positions are in wall
// coordinates: `x` in px from the wall's left edge and `alt` (altitude) in px
// up from the ground, so the wall reads bottom-up like a climb and can grow
// upward as posts are added.
//
// The route is laid out from the cards' measured heights so that a card,
// centred on screen, has the hold below it (just grabbed) and the hold above
// it (next) both in view.

// how many px of wall make a "metre" on the altimeter
export const PX_PER_M = 140;

const DECOY_COLORS = ["pink", "blue", "orange", "purple", "yellow"];

// wide screens: the route runs up the middle with cards either side.
// Narrower: cards stack up the route, a hold between each.
export const isWide = (width) => width >= 1000;

export const cardWidthFor = (width) =>
  isWide(width)
    ? Math.min(440, (Math.min(width - 48, 1180) - 270) / 2)
    : Math.min(width - 32, 400);

export const summitWidthFor = (width) => Math.min(width - 32, 440);

// Small seeded PRNG, so holds land in the same spots on every visit
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const between = (r, lo, hi) => lo + r() * (hi - lo);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// `stage` is the screen the wall is seen through: its size and how much of
// its top (fixed header) and bottom (HUD) are covered. `cardHeights` are the
// cards' rendered heights, including anything poking out above them.
export function buildLayout({ stage, cardHeights, summitH, count }) {
  const { width, height, insetTop, insetBottom } = stage;
  const wide = isWide(width);
  const groundH = wide ? 130 : 200;
  const visH = height - insetTop - insetBottom;
  const cx = width / 2;
  const cardW = cardWidthFor(width);
  const cardH = (i) => cardHeights[i] ?? 480;

  const holds = Array.from({ length: count + 1 }, (_, i) => {
    const r = rng(i * 9973 + 7);
    const isTop = i === count;
    return {
      isTop,
      size: isTop ? (wide ? 100 : 88) : between(r, 70, 84) * (wide ? 1 : 0.9),
      shape: isTop ? 0 : Math.floor(r() * SHAPE_COUNT),
      rotate: between(r, -30, 30),
      jitter: between(r, -1, 1),
    };
  });

  const alts = [];
  const cards = [];

  if (wide) {
    // a card sits between its hold and the next, beside the route. Gaps are
    // capped so both holds fit on screen with the card centred between them.
    const maxGap = Math.max(300, visH - 160);
    const gaps = Array.from({ length: count }, (_, i) => clamp(cardH(i) * 0.8, 320, maxGap));
    // cards two apart share a side: open the gap between them if they'd touch
    for (let i = 0; i + 2 < count; i++) {
      const need = (cardH(i) + cardH(i + 2)) / 2 + 60;
      const have = (gaps[i] + 2 * gaps[i + 1] + gaps[i + 2]) / 2;
      if (have < need) gaps[i + 1] += (need - have) / 2;
    }
    alts[0] = Math.max(
      groundH + holds[0].size / 2 + 60,
      groundH + 30 + cardH(0) / 2 - (gaps[0] ?? 0) / 2,
    );
    for (let i = 0; i < count; i++) {
      alts[i + 1] = alts[i] + gaps[i];
      const side = i % 2 === 0 ? "left" : "right";
      cards.push({
        left: side === "left" ? cx - 125 - cardW : cx + 125,
        bottom: (alts[i] + alts[i + 1]) / 2 - cardH(i) / 2,
        width: cardW,
        height: cardH(i),
        side,
      });
    }
  } else {
    const gap = 18;
    alts[0] = groundH + holds[0].size / 2 + 34;
    for (let i = 0; i < count; i++) {
      const bottom = alts[i] + holds[i].size / 2 + gap;
      cards.push({
        left: (width - cardW) / 2,
        bottom,
        width: cardW,
        height: cardH(i),
        side: i % 2 === 0 ? "left" : "right",
      });
      alts[i + 1] = bottom + cardH(i) + gap + holds[i + 1].size / 2;
    }
  }

  const route = holds.map((h, i) => {
    // even holds lean right of centre, odd ones left
    const lean = i % 2 === 0 ? 1 : -1;
    const x = h.isTop
      ? cx
      : wide
        ? cx + lean * (30 + 16 * h.jitter)
        : width * (0.5 + lean * 0.25) + 10 * h.jitter;
    const alt = alts[i];
    return {
      key: `route-${i}`,
      index: i,
      isTop: h.isTop,
      x,
      alt,
      size: h.size,
      shape: h.shape,
      rotate: h.rotate,
      // where the quickdraw's lower carabiner hangs, for the rope
      clip: { x: x - h.size / 2 + h.size * 0.62 + 9, alt: alt - h.size * 0.08 - 36 },
    };
  });

  const top = route[count];
  const summitW = summitWidthFor(width);
  const summit = {
    left: (width - summitW) / 2,
    bottom: top.alt + top.size / 2 + 30,
    width: summitW,
  };

  // the welcome panel takes the first card's spot until it's revealed
  const intro = cards[0]
    ? { left: cards[0].left, bottom: Math.max(groundH + 24, cards[0].bottom), width: cards[0].width }
    : { left: summit.left, bottom: groundH + 24, width: summit.width };

  // "start here" beside the first hold
  const r0 = route[0];
  const startLabel = wide
    ? { x0: r0.x + r0.size / 2 + 8, x1: r0.x + r0.size / 2 + 150 }
    : { x0: r0.x - r0.size / 2 - 140, x1: r0.x - r0.size / 2 - 8 };

  // the route sign, wide screens only, off to the right of the start
  const sign = wide ? { left: Math.min(width - 270, cx + 260), bottom: groundH + 26 } : null;

  // ── off-route holds: rejection-sampled into the open wall ──────────────
  const blocked = [
    ...cards.map((c) => [c.left, c.left + c.width, c.bottom, c.bottom + c.height]),
    [intro.left, intro.left + intro.width, intro.bottom, intro.bottom + 300],
    [summit.left, summit.left + summit.width, summit.bottom, summit.bottom + summitH],
    [startLabel.x0, startLabel.x1, r0.alt - 20, r0.alt + 20],
    ...(sign ? [[sign.left, sign.left + 250, sign.bottom, sign.bottom + 60]] : []),
  ];
  const overlaps = (p, pad) =>
    blocked.some(
      ([x0, x1, a0, a1]) =>
        p.x + p.size / 2 + pad > x0 &&
        p.x - p.size / 2 - pad < x1 &&
        p.alt + p.size / 2 + pad > a0 &&
        p.alt - p.size / 2 - pad < a1,
    );

  const decoys = [];
  route.forEach((h, i) => {
    const r = rng(i * 7919 + 101);
    const next = route[i + 1];
    let a0;
    let a1;
    let want;
    if (wide) {
      a0 = i === 0 ? groundH + 30 : h.alt - 20;
      a1 = next ? next.alt - 20 : h.alt + 140;
      want = clamp(Math.round(((a1 - a0) * width) / 62000), 3, 14);
    } else {
      // the strip of wall between two stacked cards
      a0 = h.alt - h.size / 2 - 14;
      a1 = h.alt + h.size / 2 + 14;
      want = 3;
    }
    const near = [h, next].filter(Boolean);
    const placed = [];
    for (let tries = 0; placed.length < want && tries < want * 14; tries++) {
      // about a third are little foot chips
      const chip = r() < 0.32;
      const size = (chip ? between(r, 20, 32) : between(r, 38, 66)) * (wide ? 1 : 0.85);
      const p = { x: between(r, 24, width - 24), alt: between(r, a0, a1), size };
      if (overlaps(p, 10)) continue;
      if (near.some((o) => Math.hypot(o.x - p.x, o.alt - p.alt) < (o.size + size) / 2 + 40)) continue;
      if (placed.some((o) => Math.hypot(o.x - p.x, o.alt - p.alt) < (o.size + size) / 2 + 26)) continue;
      placed.push(p);
    }
    placed.forEach((p, j) =>
      decoys.push({
        ...p,
        key: `decoy-${i}-${j}`,
        stage: i,
        shape: Math.floor(r() * SHAPE_COUNT),
        rotate: between(r, -60, 60),
        color: DECOY_COLORS[Math.floor(r() * DECOY_COLORS.length)],
      }),
    );
  });

  // big wooden volumes, partly off the edges of the wall
  const volumes = route.map((h, i) => {
    const r = rng(i * 31 + 5);
    const onLeft = (i + (r() < 0.3 ? 1 : 0)) % 2 === 1;
    const w = between(r, 170, 270) * (wide ? 1 : 0.6);
    const next = route[i + 1];
    return {
      key: `volume-${i}`,
      x: onLeft ? -w * (wide ? 0.15 : 0.45) : width - w * (wide ? 0.85 : 0.55),
      alt: between(r, h.alt, next ? Math.max(h.alt, next.alt - w * 0.6) : h.alt + 60),
      w,
      h: w * between(r, 0.75, 1.05),
      kind: i % 3,
      color: ["#5c6650", "#6b5f4b", "#55605f"][Math.floor(r() * 3)],
    };
  });

  const summitTop = summit.bottom + summitH;
  const wallH = summitTop + 900;

  // ── camera: `cam` is the altitude at the stage's bottom edge ────────────
  const centreOn = (alt) => alt - insetBottom - visH / 2;

  // Highest the camera may go: just far enough to show the next hold to
  // grab, or the whole summit card once the route is topped out
  const capFor = (reached) => {
    const topAlt =
      reached > count ? summitTop + 40 : route[reached].alt + route[reached].size / 2 + 40;
    return Math.max(0, topAlt - insetBottom - visH);
  };

  // where the camera sits to look at card i (or the summit), centred
  const focusFor = (i) =>
    i >= count
      ? centreOn((top.alt - top.size / 2 + summitTop) / 2)
      : centreOn(cards[i].bottom + cards[i].height / 2);

  // the mist above the next hold that hides the rest of the route
  const fogFor = (reached) => {
    if (reached > count) return wallH + 200;
    const n = route[reached];
    return Math.max(n.alt + n.size / 2 + 30, capFor(reached) + insetBottom + visH - 30);
  };

  return {
    wide,
    width,
    groundH,
    route,
    cards,
    summit,
    intro,
    startLabel,
    sign,
    decoys,
    volumes,
    wallH,
    topAlt: summitTop,
    capFor,
    focusFor,
    fogFor,
  };
}
