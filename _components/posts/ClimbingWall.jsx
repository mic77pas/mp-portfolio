"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUp, Flag, RotateCcw } from "lucide-react";
import posts from "../../data/posts";
import { FooterContent } from "../Footer";
import PostCard, { DISPLAYS, SummitCard, cardOverhang, displayFor } from "./PostCard";
import Volume from "./Volume";
import { ChalkBurst, Confetti, DecoyHold, RouteHold } from "./WallHolds";
import { PX_PER_M, buildLayout, cardWidthFor, isWide, summitWidthFor } from "./climbLayout";

// /posts: a climbing wall. Each green hold on the route reveals a post; the
// camera climbs to centre the new card, and can't be scrolled past the next
// hold you haven't grabbed (the rest of the wall is in the mist). Scrolling
// back down is free, down to the crash pad, which carries the site footer.
//
// The wall has its own camera instead of using the page scroll (the page
// itself doesn't scroll here): `cam` is the altitude of the stage's bottom
// edge, and the wall is translated down by it. The stage opts out of Lenis
// (data-lenis-prevent) so wheel and touch reach the handlers here.

const PROGRESS_KEY = "postsClimbReached";
const COUNT = posts.length;
// how far past the high point the camera stretches before springing back
const MAX_OVER = 80;
const WHEEL_EASE = { type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] };
const SPRING_BACK = { type: "spring", stiffness: 260, damping: 22 };
const SOFT = { type: "spring", stiffness: 70, damping: 18 };
const CLIMB = { type: "spring", stiffness: 55, damping: 12, mass: 1.1, delay: 0.12 };
const RAPPEL = { type: "tween", duration: 2.2, ease: [0.45, 0, 0.2, 1] };

export default function ClimbingWall() {
  const stageRef = useRef(null);
  const [size, setSize] = useState(null);
  const [cardHeights, setCardHeights] = useState({});
  const [summitH, setSummitH] = useState(null);
  // /posts?display=stack (any of DISPLAYS) previews every card in that layout
  const [displayOverride, setDisplayOverride] = useState(null);
  const [reached, setReached] = useState(0);
  // progress from earlier in the session, read once on arrival (null until
  // then). Anything already reached by then shows up in place instead of
  // animating in again; a restart clears it.
  const [arrival, setArrival] = useState(null);
  const [fontsReady, setFontsReady] = useState(false);
  const [hint, setHint] = useState(false);
  const [nudge, setNudge] = useState(0);
  const [bursts, setBursts] = useState([]);
  const [confetti, setConfetti] = useState(0);
  const reduce = useReducedMotion();

  const cam = useMotionValue(0);
  const targetRef = useRef(0);
  const capRef = useRef(0);
  const visHRef = useRef(0);
  const animRef = useRef(null);
  const settleRef = useRef(null);
  const pokedAt = useRef(0);
  const reachedRef = useRef(0);
  reachedRef.current = reached;

  // ── measuring ──────────────────────────────────────────────────────────
  useEffect(() => {
    const el = stageRef.current;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const setCardHeight = useCallback(
    (i, h) => setCardHeights((prev) => (prev[i] === h ? prev : { ...prev, [i]: h })),
    [],
  );
  const setSummitHeight = useCallback((_, h) => setSummitH(h), []);

  // the route is laid out from the cards' real heights, so wait for them
  const measured = summitH != null && posts.every((_, i) => cardHeights[i] != null);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("display");
    if (DISPLAYS.includes(preview)) setDisplayOverride(preview);

    let saved = 0;
    try {
      saved = parseInt(sessionStorage.getItem(PROGRESS_KEY) ?? "0", 10) || 0;
    } catch {
      /* storage unavailable */
    }
    saved = Math.min(Math.max(saved, 0), COUNT + 1);
    setReached(saved);
    setArrival(saved);

    // card heights depend on the pixel font, so measure once it's in (it
    // usually already is when coming from another page)
    let live = true;
    document.fonts.ready.then(() => live && setFontsReady(true));
    return () => {
      live = false;
    };
  }, []);
  const displays = useMemo(
    () => posts.map((post, i) => displayOverride ?? displayFor(post, i)),
    [displayOverride],
  );

  const stage = useMemo(
    () =>
      size && {
        width: size.w,
        height: size.h,
        // the fixed header covers the top; the HUD bar the bottom on narrow screens
        insetTop: size.w >= 768 ? 80 : 64,
        insetBottom: isWide(size.w) ? 40 : 84,
      },
    [size],
  );
  const visH = stage ? stage.height - stage.insetTop - stage.insetBottom : 0;
  visHRef.current = visH;

  // nothing is laid out (or shown) until the route can be built right the
  // first time: card sizes measured, fonts in, earlier progress read
  const layout = useMemo(
    () =>
      stage && measured && fontsReady && arrival !== null
        ? buildLayout({
            stage,
            cardHeights: posts.map((_, i) => cardHeights[i] + cardOverhang(displays[i])),
            summitH,
            count: COUNT,
          })
        : null,
    [stage, measured, fontsReady, arrival, cardHeights, summitH, displays],
  );

  // ── camera ─────────────────────────────────────────────────────────────
  const moveTo = useCallback(
    (to, transition) => {
      targetRef.current = to;
      animRef.current?.stop();
      animRef.current = animate(cam, to, reduce ? { duration: 0.25 } : transition);
    },
    [cam, reduce],
  );

  // tried to scroll above the next hold: make it wiggle (not too often)
  const poke = useCallback(() => {
    if (reachedRef.current > COUNT) return;
    const now = performance.now();
    if (now - pokedAt.current < 1200) return;
    pokedAt.current = now;
    setNudge((n) => n + 1);
    setHint(true);
  }, []);

  // move the camera by `delta` px of altitude, rubber-banding past the cap
  const drive = useCallback(
    (delta, immediate = false) => {
      const cap = capRef.current;
      const from = targetRef.current;
      let t = from + delta;
      if (delta > 0 && t > cap) {
        const base = Math.max(from, cap);
        t = Math.min(cap + MAX_OVER, base + (t - base) * 0.35);
        poke();
      }
      t = Math.max(0, t);
      targetRef.current = t;
      animRef.current?.stop();
      if (immediate) {
        cam.set(t);
        return;
      }
      animRef.current = animate(cam, t, reduce ? { duration: 0 } : WHEEL_EASE);
      clearTimeout(settleRef.current);
      settleRef.current = setTimeout(() => {
        if (targetRef.current > capRef.current) moveTo(capRef.current, SPRING_BACK);
      }, 160);
    },
    [cam, moveTo, poke, reduce],
  );

  // keep the cap in step with progress and screen size
  useEffect(() => {
    if (!layout) return;
    const cap = layout.capFor(reached);
    capRef.current = cap;
    if (targetRef.current > cap) {
      animRef.current?.stop();
      targetRef.current = cap;
      cam.set(cap);
    }
  }, [layout, reached, cam]);

  // pick up where this session left off, looking at the last card reached.
  // Placed before the wall's first paint (which is also faded in), so it
  // never shows the ground and then jumps.
  const placed = useRef(false);
  useLayoutEffect(() => {
    if (!layout || placed.current) return;
    placed.current = true;
    const at = arrival
      ? Math.min(layout.capFor(arrival), Math.max(0, layout.focusFor(arrival - 1)))
      : 0;
    targetRef.current = at;
    cam.set(at);
  }, [layout, arrival, cam]);

  useEffect(() => {
    if (arrival === null) return;
    try {
      sessionStorage.setItem(PROGRESS_KEY, String(reached));
    } catch {
      /* ignore */
    }
  }, [reached]);

  // ── input: wheel, touch, keys ──────────────────────────────────────────
  useEffect(() => {
    const el = stageRef.current;

    const onWheel = (e) => {
      e.preventDefault();
      drive(-(e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY));
    };

    let lastY = 0;
    let lastT = 0;
    let vel = 0;
    const onTouchStart = (e) => {
      lastY = e.touches[0].clientY;
      lastT = performance.now();
      vel = 0;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const y = e.touches[0].clientY;
      const now = performance.now();
      const dy = y - lastY; // > 0: finger moving down, pulling the wall down
      vel = (dy / Math.max(1, now - lastT)) * 0.6 + vel * 0.4;
      lastY = y;
      lastT = now;
      drive(dy, true);
    };
    const onTouchEnd = () => {
      if (Math.abs(vel) > 0.15) drive(vel * 260);
      else if (targetRef.current > capRef.current) moveTo(capRef.current, SPRING_BACK);
    };

    const onKey = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
      const page = visHRef.current * 0.8;
      const step = { ArrowUp: 140, ArrowDown: -140, PageUp: page, PageDown: -page }[e.key];
      if (e.key === "Home") {
        e.preventDefault();
        moveTo(capRef.current, SOFT);
      } else if (e.key === "End") {
        e.preventDefault();
        moveTo(0, SOFT);
      } else if (step !== undefined) {
        e.preventDefault();
        drive(step);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      clearTimeout(settleRef.current);
    };
  }, [drive, moveTo]);

  // the hint ring shows up if the next hold is left alone a while
  useEffect(() => {
    setHint(false);
    const t = setTimeout(() => setHint(true), 2600);
    return () => clearTimeout(t);
  }, [reached]);

  // ── climbing ───────────────────────────────────────────────────────────
  const burst = (x, alt, label) => {
    const id = Math.random();
    setBursts((b) => [...b, { id, x, alt, label }]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 1500);
  };

  const focusOn = (i) => {
    moveTo(Math.min(capRef.current, Math.max(0, layout.focusFor(i))), SOFT);
  };

  const climb = (i) => {
    if (i < reached) return focusOn(i);
    if (i !== reached) return;
    const hold = layout.route[i];
    const next = i + 1;
    burst(hold.x, hold.alt, hold.isTop ? "Topped out!" : "+1 post");
    setReached(next);
    const cap = layout.capFor(next);
    capRef.current = cap;
    // centre the card just revealed, the holds either side of it in view
    moveTo(Math.min(cap, Math.max(0, layout.focusFor(i))), CLIMB);
    if (hold.isTop && !reduce) setConfetti((c) => c + 1);
  };

  const restart = () => {
    moveTo(0, RAPPEL);
    setReached(0);
    // climbing again from scratch: everything animates in afresh
    setArrival(0);
  };

  useEffect(() => {
    if (!confetti) return;
    const t = setTimeout(() => setConfetti(0), 2600);
    return () => clearTimeout(t);
  }, [confetti]);

  // ── rendering ──────────────────────────────────────────────────────────
  const next = Math.min(reached, COUNT);
  // what was already on the wall when this visit began
  const arrived = arrival ?? 0;
  const arrivedNext = Math.min(arrived, COUNT);

  return (
    <section
      ref={stageRef}
      data-lenis-prevent
      aria-label="Climbing wall of posts. Grab the green route holds to reveal each post."
      className="relative h-svh w-full overflow-hidden overscroll-none bg-(--pal-bg)"
    >
      {/* off-screen copies of the cards, in their final pose, to size the route */}
      {size && (
        <div aria-hidden inert className="pointer-events-none invisible absolute top-0 left-0">
          {posts.map((post, i) => (
            <Measure key={post.id} index={i} width={cardWidthFor(size.w)} onHeight={setCardHeight}>
              <PostCard post={post} index={i} side={i % 2 === 0 ? "left" : "right"} display={displays[i]} still />
            </Measure>
          ))}
          <Measure index={0} width={summitWidthFor(size.w)} onHeight={setSummitHeight}>
            <SummitCard still />
          </Measure>
        </div>
      )}

      {layout && (
        // fades in once, already in place, rather than popping in piece by piece
        <motion.div
          className="absolute inset-x-0 bottom-0 will-change-transform"
          style={{ height: layout.wallH, y: cam }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <WallSurface layout={layout} />

          <Rope layout={layout} reached={reached} arrived={arrived} />

          {/* off-route holds, only on the stretch you can see */}
          {layout.decoys
            .filter((d) => d.stage <= next)
            .map((d) => (
              <DecoyHold key={d.key} decoy={d} appear={d.stage > arrivedNext} onMiss={() => setHint(true)} />
            ))}

          {layout.route.slice(0, next + 1).map((h) => (
            <RouteHold
              key={h.key}
              hold={h}
              labelLeft={!layout.wide}
              status={h.index < reached ? "done" : "next"}
              hint={hint}
              nudge={h.index === next ? nudge : 0}
              label={
                h.index < reached
                  ? `Back to: ${h.isTop ? "the top" : posts[h.index].title}`
                  : h.isTop
                    ? "Top out the route"
                    : `Grab hold ${h.index + 1} to reveal the next post`
              }
              appear={h.index > arrivedNext}
              swing={h.index >= arrived}
              onPress={climb}
            />
          ))}

          <AnimatePresence>
            {reached === 0 && <Intro key="intro" slot={layout.intro} />}
          </AnimatePresence>

          <AnimatePresence>
            {posts.slice(0, Math.min(reached, COUNT)).map((post, i) => {
              const slot = layout.cards[i];
              return (
                <div
                  key={post.id}
                  className="absolute z-20"
                  style={{ left: slot.left, bottom: slot.bottom, width: slot.width }}
                >
                  <PostCard post={post} index={i} side={slot.side} display={displays[i]} still={i < arrived} />
                </div>
              );
            })}
          </AnimatePresence>

          <AnimatePresence>
            {reached > COUNT && (
              <div
                key="summit"
                className="absolute z-20"
                style={{ left: layout.summit.left, bottom: layout.summit.bottom, width: layout.summit.width }}
              >
                <SummitCard onRappel={() => moveTo(0, RAPPEL)} onRestart={restart} still={arrived > COUNT} />
              </div>
            )}
          </AnimatePresence>

          <Fog bottom={layout.fogFor(reached)} />

          {bursts.map((b) => (
            <ChalkBurst key={b.id} x={b.x} alt={b.alt} label={b.label} />
          ))}
        </motion.div>
      )}

      {/* soft fade under the fixed header and round the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-28 bg-linear-to-b from-(--pal-bg) to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.55)]"
      />

      {confetti > 0 && <Confetti key={confetti} />}

      {layout && (
        <>
          <Altimeter layout={layout} cam={cam} stage={stage} visH={visH} reached={reached} onPick={focusOn} />
          <Hud
            reached={reached}
            cam={cam}
            stage={stage}
            visH={visH}
            onGround={() => moveTo(0, SOFT)}
            onHigh={() => moveTo(capRef.current, SOFT)}
            onRestart={restart}
          />
        </>
      )}
    </section>
  );
}

// ── pieces ───────────────────────────────────────────────────────────────

// reports its content's height as it changes (fonts loading, resizes)
function Measure({ index, width, onHeight, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(() => onHeight(index, Math.round(el.offsetHeight)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [index, onHeight]);
  return (
    <div ref={ref} style={{ width }}>
      {children}
    </div>
  );
}

// plywood panels with a grid of T-nut bolt holes, volumes, and the crash pad
function WallSurface({ layout }) {
  const padH = layout.groundH - 22;
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundColor: "#1c201c",
          backgroundImage: [
            "radial-gradient(circle at center, rgba(0,0,0,0.6) 0 2.2px, rgba(255,255,255,0.06) 2.6px 3.3px, transparent 3.8px)",
            "linear-gradient(to right, rgba(0,0,0,0.4) 0 2px, transparent 2px)",
            "linear-gradient(to top, rgba(0,0,0,0.4) 0 2px, transparent 2px)",
            "linear-gradient(to right, rgba(255,255,255,0.025), transparent 40%, rgba(255,255,255,0.02) 70%, transparent)",
          ].join(","),
          backgroundSize: "40px 40px, 240px 240px, 240px 240px, 100% 100%",
          backgroundPosition: "center bottom, center bottom, center bottom, 0 0",
        }}
      />

      {layout.volumes.map((v) => (
        <Volume
          key={v.key}
          kind={v.kind}
          color={v.color}
          seed={Math.round(v.alt)}
          className="absolute"
          style={{
            left: v.x,
            bottom: v.alt,
            width: v.w,
            height: v.h,
          }}
        />
      ))}

      {layout.sign && (
        <div
          className="font-minecraft absolute rotate-[-3deg] rounded-md border-2 border-(--pal-border)/70 bg-(--pal-surface) px-3 py-2 text-[11px] leading-snug text-(--pal-muted) shadow-[0_8px_18px_-6px_rgba(0,0,0,0.8)]"
          style={{ left: layout.sign.left, bottom: layout.sign.bottom }}
        >
          <span className="text-(--pal-title)">ROUTE 01 · The Highlights</span>
          <br />
          grade: V-fun · set by Michael
        </div>
      )}

      {/* crash pad: the foot of the page, with the site footer stitched on */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-[22px] border-t-4 border-[#3f5a3c] bg-[#253425] shadow-[0_-14px_30px_-10px_rgba(0,0,0,0.6)]"
        style={{
          height: padH,
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 calc(25% - 3px), rgba(0,0,0,0.35) calc(25% - 3px) 25%), linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(0,0,0,0.35))",
        }}
      >
        <footer
          className={`absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 rounded-xl bg-[#1b261b]/85 px-6 py-2.5 font-medium whitespace-nowrap shadow-[inset_0_2px_8px_rgba(0,0,0,0.55)] ${
            layout.wide ? "top-1/2 -translate-y-1/2" : "top-6"
          }`}
        >
          <FooterContent />
        </footer>
      </div>
    </>
  );
}

// the rope, fed from a coil on the crash pad up through each clipped quickdraw
function Rope({ layout, reached, arrived }) {
  const { route, wallH, width, wide } = layout;
  // the coil sits beside the footer label, clear of the HUD on phones
  const anchor = wide ? { x: width / 2 + 230, alt: 40 } : { x: width - 36, alt: 130 };
  const y = (alt) => wallH - alt;
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[15]"
      width={width}
      height={wallH}
      viewBox={`0 0 ${width} ${wallH}`}
    >
      {/* coil on the pad */}
      {[0, 1, 2].map((k) => (
        <ellipse
          key={k}
          cx={anchor.x + k * 3}
          cy={y(anchor.alt) + 6 - k * 4}
          rx={26 - k * 2}
          ry={9}
          fill="none"
          stroke="#d9c27a"
          strokeWidth="4"
          opacity={0.9 - k * 0.15}
        />
      ))}
      {route.map((h, i) => {
        if (reached <= i) return null;
        const a = i === 0 ? anchor : route[i - 1].clip;
        const b = h.clip;
        const sag = (i % 2 ? -1 : 1) * 36;
        const d = `M ${a.x} ${y(a.alt)} Q ${(a.x + b.x) / 2 + sag} ${y((a.alt + b.alt) / 2)} ${b.x} ${y(b.alt)}`;
        return (
          <g key={h.key}>
            <motion.path
              d={d}
              fill="none"
              stroke="#d9c27a"
              strokeWidth="4.5"
              strokeLinecap="round"
              initial={i < arrived ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            />
            {/* braid flecks once it's drawn */}
            <motion.path
              d={d}
              fill="none"
              stroke="#5b4d24"
              strokeWidth="2"
              strokeDasharray="2 7"
              initial={i < arrived ? false : { opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.1 }}
            />
          </g>
        );
      })}
    </svg>
  );
}

// mist over the unclimbed part of the wall; lifts as you climb
function Fog({ bottom }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-30 h-[1400px]"
      initial={false}
      animate={{ bottom }}
      transition={{ type: "spring", stiffness: 40, damping: 16, delay: 0.25 }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, var(--pal-bg) calc(100% - 240px), transparent)" }}
      />
      {[0, 1, 2, 3, 4].map((k) => (
        <motion.div
          key={k}
          className="absolute bottom-40 h-40 w-[45%] rounded-full bg-(--pal-text)/[0.07] blur-2xl"
          style={{ left: `${k * 20 - 10}%` }}
          animate={{ x: [0, k % 2 ? 40 : -40, 0], y: [0, -12, 0] }}
          transition={{ duration: 9 + k * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

// welcome panel in the first card's spot, until the first hold is grabbed
function Intro({ slot }) {
  return (
    <motion.div
      className="absolute z-20"
      style={{ left: slot.left, bottom: slot.bottom, width: slot.width }}
      initial={{ opacity: 0, y: 30, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      exit={{ opacity: 0, y: -80, rotate: -10, scale: 0.8, transition: { duration: 0.4 } }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
    >
      <div className="relative rounded-[24px_10px_24px_10px] border-2 border-dashed border-(--pal-border)/70 bg-(--pal-surface)/85 p-5 backdrop-blur-sm">
        <span className="font-minecraft text-[11px] tracking-wider text-(--pal-muted) uppercase">
          Posts · {COUNT} holds to the top
        </span>
        <h1 className="font-minecraft mt-2 text-2xl leading-tight text-(--pal-heading) md:text-3xl">
          Climb through my highlights
        </h1>
        <p className="mt-2 text-sm text-(--pal-title) italic">
          A review of my career, from starting university to the present day.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-(--pal-text)">
          Every hold on the{" "}
          <span className="font-minecraft rounded-sm bg-[#6fa552] px-1.5 text-xs text-[#142014]">green</span>{" "}
          route reveals a milestone: program switches, events, life updates.
          Stick to green; the other routes are someone else&apos;s problem.
        </p>
        <p className="mt-3 text-xs text-(--pal-muted)">
          You can always scroll back down to anything you&apos;ve already reached.
        </p>
      </div>
    </motion.div>
  );
}

// the altitude at the middle of the visible wall
const viewAlt = (c, stage, visH) => c + stage.insetBottom + visH / 2;

// vertical altitude gauge on wide screens; tap a reached hold to go back
function Altimeter({ layout, cam, stage, visH, reached, onPick }) {
  const pct = (alt) => `${Math.min(100, Math.max(0, (alt / layout.topAlt) * 100))}%`;
  const thumb = useTransform(cam, (c) => pct(viewAlt(c, stage, visH)));
  const meters = useTransform(cam, (c) => `${(viewAlt(c, stage, visH) / PX_PER_M).toFixed(1)} m`);

  return (
    <div className="absolute top-1/2 right-6 z-40 hidden h-[46vh] w-12 -translate-y-1/2 xl:block">
      <div className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-(--pal-surface) ring-2 ring-(--pal-border)/50" />
      {layout.route.map((h) => {
        const done = h.index < reached;
        return (
          <button
            key={h.key}
            type="button"
            disabled={!done}
            onClick={() => onPick(h.index)}
            aria-label={done ? `Jump to ${h.isTop ? "the top" : posts[h.index].title}` : "Not reached yet"}
            className={`absolute left-1/2 grid h-4 w-4 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border-2 transition ${
              done
                ? "cursor-pointer border-[#111411] bg-[#8fd36b] hover:scale-125"
                : "border-(--pal-border)/60 bg-(--pal-surface)"
            }`}
            style={{ bottom: pct(h.alt) }}
          >
            {h.isTop && <Flag size={8} className="text-[#111411]" />}
          </button>
        );
      })}
      <motion.div
        className="pointer-events-none absolute left-1/2 flex -translate-x-full translate-y-1/2 items-center"
        style={{ bottom: thumb }}
      >
        <motion.span className="font-minecraft mr-2 rounded bg-(--pal-surface)/90 px-1.5 py-0.5 text-[10px] whitespace-nowrap text-(--pal-title)">
          {meters}
        </motion.span>
        <span className="h-0 w-0 border-y-[6px] border-l-8 border-y-transparent border-l-(--pal-title)" />
      </motion.div>
    </div>
  );
}

function Hud({ reached, cam, stage, visH, onGround, onHigh, onRestart }) {
  const meters = useTransform(cam, (c) => `${(viewAlt(c, stage, visH) / PX_PER_M).toFixed(1)} m`);
  const btn =
    "grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-(--pal-title) transition hover:bg-(--pal-accent)/20 active:scale-90";
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 160, damping: 18 }}
      className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-2xl border-2 border-(--pal-border)/70 bg-(--pal-surface)/90 p-1.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur md:right-6 md:left-auto md:translate-x-0"
    >
      {/* progress: one pip per hold, a flag for the top */}
      <div
        className="flex items-center gap-1 px-2"
        aria-label={`${Math.min(reached, COUNT + 1)} of ${COUNT + 1} holds reached`}
      >
        {Array.from({ length: COUNT + 1 }, (_, i) => (
          <motion.span
            key={i}
            initial={false}
            animate={{ scale: i < reached ? [1, 1.6, 1] : 1 }}
            transition={{ duration: 0.4 }}
            className={`grid place-items-center rounded-full ${i === COUNT ? "h-4 w-4" : "h-2.5 w-2.5"} ${
              i < reached ? "bg-[#8fd36b]" : "bg-(--pal-border)/40"
            }`}
          >
            {i === COUNT && <Flag size={9} className="text-[#111411]" />}
          </motion.span>
        ))}
      </div>
      <motion.span className="font-minecraft w-12 text-center text-[10px] text-(--pal-muted) xl:hidden">
        {meters}
      </motion.span>

      <button type="button" onClick={onGround} aria-label="Back down to the ground" className={btn}>
        <ArrowDown size={16} />
      </button>
      <button type="button" onClick={onHigh} aria-label="Up to your high point" className={btn}>
        <ArrowUp size={16} />
      </button>
      {reached > 0 && (
        <button type="button" onClick={onRestart} aria-label="Restart the climb" className={btn}>
          <RotateCcw size={15} />
        </button>
      )}
    </motion.div>
  );
}
