"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function DockItem({
  children,
  className = "",
  onClick,
  active,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`
    relative inline-flex items-center justify-center rounded-full border-2 shadow-md
    transition-colors duration-200
    ${
      active ? "bg-[#98B493] border-[#98B493]" : "bg-[#060010] border-[#92ad89]"
    }
    ${className}
  `}
      tabIndex={0}
      role="button"
    >
      {Children.map(children, (child) => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = "", ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060010] px-2 py-0.5 text-xs text-white`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = "", active }) {
  return (
    <div
      className={`
        flex items-center justify-center transition-all duration-200
        ${active ? "text-[#181b18] scale-125" : "text-[#98B493]"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// const [footerVisible, setFooterVisible] = useState(false);

// useEffect(() => {
//   const el = document.getElementById("site-footer");
//   if (!el) return;

//   const io = new IntersectionObserver(
//     ([entry]) => setFooterVisible(entry.isIntersecting),
//     { threshold: 0.01 }
//   );

//   io.observe(el);
//   return () => io.disconnect();
// }, []);

export default function Dock({
  items = [],
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const accum = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;

      // Ignore tiny jitter
      if (Math.abs(dy) < 4) return;

      // Accumulate scroll in one direction
      accum.current += dy;

      const HIDE_AFTER = 80; // px scroll down to hide
      const SHOW_AFTER = -40; // px scroll up to show

      if (accum.current > HIDE_AFTER) {
        setHidden(true);
        accum.current = 0;
      } else if (accum.current < SHOW_AFTER) {
        setHidden(false);
        accum.current = 0;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      style={{ height }}
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? 24 : 0,
      }}
      transition={{ duration: 0.2 }}
      className="fixed left-1/2 -translate-x-1/2 bottom-4 z-50 flex items-end pointer-events-none"
    >
      <motion.div
        onMouseMove={({ clientX }) => {
          isHovered.set(1);
          mouseX.set(clientX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} pointer-events-auto ${
          hidden ? "pointer-events-none" : ""
        } flex items-end w-fit gap-4 rounded-2xl border-[#92ad89] border-2 pb-2 px-4 bg-[#0f0f0f]/80 backdrop-blur-md shadow-lg`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {(items ?? []).map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            active={item.active}
            className={`${item.className} ${
              item.active ? "" : ""
            } cursor-pointer`}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon
              className="scale-120 group-hover:scale-160 transition-transform duration-200"
              active={item.active}
            >
              {item.icon}
            </DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
