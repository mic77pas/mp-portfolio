"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import Hold, { HOLD_COLORS } from "./Hold";

// The pressable bits of the climbing wall: route holds, off-route decoys,
// the quickdraws the rope clips into, and the chalk/confetti effects.

const MISS_LINES = ["Off route!", "Wrong colour!", "Not this one!", "Stick to green!"];

const box = (h) => ({
  left: h.x - h.size / 2,
  bottom: h.alt - h.size / 2,
  width: h.size,
  height: h.size,
});

// the coloured tape gyms put under a route's holds; START and TOP get words
function RouteTape({ hold }) {
  const word = hold.index === 0 ? "START" : hold.isTop ? "TOP" : null;
  return (
    <span
      aria-hidden
      style={{ background: HOLD_COLORS.route, rotate: `${hold.rotate * 0.2}deg` }}
      className={`font-minecraft pointer-events-none absolute top-full left-1/2 mt-1 -translate-x-1/2 text-[10px] leading-none text-[#142014] opacity-85 [clip-path:polygon(0_10%,6%_0,94%_8%,100%_0,100%_92%,95%_100%,5%_90%,0_100%)] ${
        word ? "px-2 py-1" : "h-2.5 w-9"
      }`}
    >
      {word}
    </span>
  );
}

// `appear`: pop in (false for holds already on the wall on arrival).
// `swing`: swing its quickdraw in once reached (false if it was reached
// before arriving)
export function RouteHold({ hold, status, hint, nudge, labelLeft, label, appear = true, swing = true, onPress }) {
  const [scope, animateEl] = useAnimate();
  const [bubble, setBubble] = useState(false);

  // wiggle (and say so) when the visitor tries to scroll past it
  useEffect(() => {
    if (!nudge || status !== "next") return;
    animateEl(scope.current, { rotate: [0, -14, 11, -7, 4, 0], scale: [1, 1.15, 1] }, { duration: 0.6 });
    setBubble(true);
    const t = setTimeout(() => setBubble(false), 1800);
    return () => clearTimeout(t);
  }, [nudge]); // eslint-disable-line react-hooks/exhaustive-deps

  const press = () => {
    animateEl(
      scope.current,
      { scale: [1, 0.78, 1.14, 1], y: [0, 5, -4, 0] },
      { duration: 0.45 },
    );
    onPress(hold.index);
  };

  return (
    <motion.div
      className="absolute z-10"
      style={box(hold)}
      initial={appear ? { scale: 0, rotate: -40, opacity: 0 } : false}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 13, delay: hold.index === 0 ? 0.4 : 0.8 }}
    >
      {/* a soft ring breathing out from the hold to grab: it only resets
          while fully faded, so the loop never visibly jumps */}
      <AnimatePresence>
        {status === "next" && hint && (
          <motion.span
            key="ring"
            aria-hidden
            className="pointer-events-none absolute -inset-1.5 rounded-full border-2 border-[#a9e07f]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.92, 1.22] }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              opacity: { duration: 2, repeat: Infinity, times: [0, 0.25, 1] },
            }}
          />
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={press}
        aria-label={label}
        whileHover={{ scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.9 }}
        className="relative block h-full w-full cursor-grab rounded-full focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#a9e07f] active:cursor-grabbing"
      >
        <div ref={scope} className="h-full w-full">
          <Hold shape={hold.shape} rotate={hold.rotate} seed={hold.index + 1} />
        </div>
      </motion.button>

      <RouteTape hold={hold} />
      {status === "done" && <Quickdraw swing={swing} />}

      {/* first hold: point the way in */}
      {hold.index === 0 && status === "next" && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, x: labelLeft ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className={`font-minecraft pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center gap-2 text-sm whitespace-nowrap text-(--pal-title) ${
            labelLeft ? "right-full mr-3 flex-row-reverse" : "left-full ml-4"
          }`}
        >
          <motion.span
            animate={{ x: labelLeft ? [0, 6, 0] : [0, -6, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            className="text-xl"
          >
            {labelLeft ? "→" : "←"}
          </motion.span>
          start here
        </motion.span>
      )}

      <AnimatePresence>
        {bubble && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-minecraft pointer-events-none absolute bottom-full left-1/2 z-40 mb-4 -translate-x-1/2 rounded-xl border-2 border-[#111411] bg-[#dfe7d4] px-3 py-2 text-xs whitespace-nowrap text-[#142014] shadow-[3px_4px_0_rgba(0,0,0,0.5)] after:absolute after:top-full after:left-1/2 after:-ml-1.5 after:border-6 after:border-transparent after:border-t-[#111411]"
          >
            Grab me to climb higher!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function DecoyHold({ decoy, appear = true, onMiss }) {
  const [scope, animateEl] = useAnimate();
  const [misses, setMisses] = useState(0);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    if (!misses) return;
    setShowing(true);
    const t = setTimeout(() => setShowing(false), 1200);
    return () => clearTimeout(t);
  }, [misses]);

  const press = () => {
    animateEl(
      scope.current,
      { x: [0, -8, 8, -6, 6, -3, 0], rotate: [0, -12, 10, -6, 5, 0] },
      { duration: 0.5 },
    );
    setMisses((m) => m + 1);
    onMiss();
  };

  return (
    <motion.div
      className="absolute z-10"
      style={box(decoy)}
      initial={appear ? { scale: 0, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.5 + (decoy.x % 7) * 0.05 }}
    >
      {/* not part of the route, so kept out of the tab order */}
      <motion.button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={press}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        className="block h-full w-full cursor-grab active:cursor-grabbing"
      >
        <div ref={scope} className="h-full w-full">
          <Hold shape={decoy.shape} rotate={decoy.rotate} color={decoy.color} seed={Math.round(decoy.x)} />
        </div>
      </motion.button>

      <AnimatePresence>
        {showing && (
          <motion.span
            key={misses}
            initial={{ opacity: 0, y: 8, scale: 0.5, rotate: -16 }}
            animate={{ opacity: 1, y: -4, scale: 1, rotate: -6 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ type: "spring", stiffness: 420, damping: 15 }}
            className="font-minecraft pointer-events-none absolute bottom-full left-1/2 z-40 mb-1 -translate-x-1/2 rounded-md border-2 border-[#111411] bg-[#e08a6e] px-2 py-1 text-[11px] whitespace-nowrap text-[#1d1210] shadow-[2px_3px_0_rgba(0,0,0,0.5)]"
          >
            {MISS_LINES[(misses - 1) % MISS_LINES.length]}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// carabiner, dogbone, carabiner, swinging into place under a reached hold
export function Quickdraw({ swing = true }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 20 44"
      className="pointer-events-none absolute h-10 w-[18px]"
      style={{ left: "62%", top: "58%", originX: 0.5, originY: 0 }}
      initial={swing ? { rotate: -70, opacity: 0 } : false}
      animate={{ rotate: [-70, 22, -12, 6, 0], opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.15 }}
    >
      <rect x="5" y="1" width="10" height="13" rx="5" fill="none" stroke="#cfd6cf" strokeWidth="2.2" />
      <rect x="6.5" y="12" width="7" height="17" rx="2" fill="#6a8366" />
      <rect x="4" y="27" width="12" height="15" rx="6" fill="none" stroke="#b9c3b9" strokeWidth="2.4" />
    </motion.svg>
  );
}

// a puff of chalk where a hold was grabbed, with an optional floating label
export function ChalkBurst({ x, alt, label }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2 + Math.random() * 0.4;
        const r = 34 + Math.random() * 50;
        return { dx: Math.cos(a) * r, dy: Math.sin(a) * r, s: 4 + Math.random() * 8 };
      }),
    [],
  );
  return (
    <div className="pointer-events-none absolute z-40" style={{ left: x, bottom: alt }}>
      <motion.span
        className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-white/45 blur-md"
        initial={{ scale: 0.2, opacity: 0.85 }}
        animate={{ scale: 2.1, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#f1f3ea]"
          style={{ width: b.s, height: b.s, left: -b.s / 2, top: -b.s / 2 }}
          initial={{ x: 0, y: 0, opacity: 0.95, scale: 0.6 }}
          animate={{ x: b.dx, y: b.dy + 22, opacity: 0, scale: 1.3 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.3, 1] }}
        />
      ))}
      {label && (
        <motion.span
          className="font-minecraft absolute -top-14 left-0 -translate-x-1/2 text-base whitespace-nowrap text-[#b9ddb2] drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]"
          initial={{ y: 10, opacity: 0, scale: 0.6 }}
          animate={{ y: -40, opacity: [0, 1, 1, 0], scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}

const CONFETTI_COLORS = ["#8fd36b", "#f08bb0", "#6fb2ef", "#f5a356", "#b294ef", "#f2d65e", "#f1f3ea"];

// celebration burst for topping out, thrown from the middle of the screen
export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        x: (Math.random() - 0.5) * 900,
        up: -(180 + Math.random() * 320),
        fall: 380 + Math.random() * 420,
        spin: (Math.random() - 0.5) * 1080,
        w: 6 + Math.random() * 8,
        round: Math.random() < 0.3,
        delay: Math.random() * 0.2,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute top-[42%] left-1/2 z-50">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute ${p.round ? "rounded-full" : "rounded-[2px]"}`}
          style={{ width: p.w, height: p.round ? p.w : p.w * 0.45, background: p.color }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: [0, p.x * 0.7, p.x],
            y: [0, p.up, p.fall],
            rotate: p.spin,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 2.2, delay: p.delay, ease: ["easeOut", "easeIn"], times: [0, 0.35, 1] }}
        />
      ))}
    </div>
  );
}
