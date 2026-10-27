"use client";

import { createContext, useContext } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowDown,
  Briefcase,
  Camera,
  Drama,
  GraduationCap,
  Mic,
  Mountain,
  RotateCcw,
  Rocket,
  Sparkles,
} from "lucide-react";

const ICONS = {
  event: Mic,
  community: Rocket,
  program: GraduationCap,
  work: Briefcase,
  stage: Drama,
  life: Sparkles,
};

// stands in for a post's photo until there is one
// true inside a card shown in its final pose (one already reached when
// arriving on the page, or a measuring copy): every piece skips its entrance
const StillContext = createContext(false);
const useStill = () => useContext(StillContext);

function PhotoSoon() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(135deg,#262b26_0_10px,#2c322c_10px_20px)]">
      <span className="font-minecraft flex flex-col items-center gap-1.5 text-[10px] tracking-wider text-(--pal-muted) uppercase">
        <Camera size={22} strokeWidth={1.8} />
        photo soon
      </span>
    </div>
  );
}

// Cards are pinned to the wall at a tilt and fly in from the side they sit
// on. Each post picks how its photos are laid out with `display` (see
// data/posts.js); a post without one takes turns through the first three.
export const DISPLAYS = [
  "big-polaroid", // one large taped polaroid hanging off the side
  "polaroids", // two portrait polaroids fanned out of the top corner
  "landscape", // a torn-edge photo banner across the top, a snap pinned on
  "filmstrip", // a strip of film frames across the card
  "stack", // a messy pile of prints that fans out on hover
  "split", // a tall photo down one side, text beside it
  "portrait", // a tall taped portrait polaroid beside the text
  "none", // text only
];
const DEFAULT_CYCLE = ["big-polaroid", "polaroids", "landscape"];

export const displayFor = (post, index) =>
  DISPLAYS.includes(post.display) ? post.display : DEFAULT_CYCLE[index % DEFAULT_CYCLE.length];

// how far each display pokes out above the card's top edge (tape, tags,
// photos), so the wall can leave room for it
const OVERHANG = {
  "big-polaroid": 14,
  polaroids: 40,
  landscape: 24,
  filmstrip: 14,
  stack: 44,
  split: 16,
  portrait: 34,
  none: 14,
};
export const cardOverhang = (display) => OVERHANG[display] ?? 14;

// photo spots per display. A post with no photos yet fills every spot with
// "photo soon", so its layout can be previewed before the photos are in.
const SLOTS = {
  "big-polaroid": 1,
  polaroids: 2,
  landscape: 2,
  filmstrip: 3,
  stack: 3,
  split: 1,
  portrait: 1,
  none: 0,
};

const TILTS = [-2.5, 3, -1.6];

const EASE = [0.22, 1, 0.36, 1];

const item = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

// a strip of masking tape "holding" the card to the wall
function Tape({ className = "", delay = 0.9 }) {
  const still = useStill();
  return (
    <motion.span
      aria-hidden
      initial={still ? false : { scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay, duration: 0.35, ease: "backOut" }}
      className={`absolute z-20 h-6 w-20 bg-[#c1dab6]/40 shadow-sm backdrop-blur-[1px] [clip-path:polygon(0_12%,5%_0,10%_14%,90%_4%,95%_16%,100%_2%,100%_90%,94%_100%,88%_86%,8%_96%,3%_84%,0_100%)] ${className}`}
    />
  );
}

// a photo in a cream frame that unrolls downward as the card lands
function Polaroid({ photo, rotate = 0, className = "", frame = "aspect-[4/3]", sizes, delay = 0.6 }) {
  const still = useStill();
  return (
    <motion.figure
      style={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`bg-[#dfe7d4] p-1.5 pb-5 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className={`relative overflow-hidden bg-[#2a2e2a] ${frame}`}>
        <motion.div
          initial={still ? false : { clipPath: "inset(0 0 100% 0)", scale: 1.25 }}
          animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
          transition={{ delay, duration: 0.85, ease: EASE }}
          className="absolute inset-0"
        >
          {photo ? (
            <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
          ) : (
            <PhotoSoon />
          )}
        </motion.div>
      </div>
    </motion.figure>
  );
}

// a strip of film: sprocket holes along both edges, frames between
function Filmstrip({ photos, dir, className = "" }) {
  const still = useStill();
  const holes = {
    backgroundImage:
      "repeating-linear-gradient(90deg, transparent 0 6px, rgba(230,230,215,0.8) 6px 11px)",
  };
  return (
    <motion.div
      initial={still ? false : { opacity: 0, x: -dir * 80, rotate: dir * 6 }}
      animate={{ opacity: 1, x: 0, rotate: -dir * 1.5 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ delay: 0.55, type: "spring", stiffness: 110, damping: 15 }}
      className={`relative bg-[#0e0f0e] px-2 py-3.5 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.85)] ${className}`}
    >
      <span aria-hidden className="absolute inset-x-2 top-1 h-1.5" style={holes} />
      <span aria-hidden className="absolute inset-x-2 bottom-1 h-1.5" style={holes} />
      <div className="flex gap-1.5">
        {photos.map((photo, k) => (
          <div key={k} className="relative aspect-[4/3] flex-1 overflow-hidden bg-[#2a2e2a]">
            <motion.div
              initial={still ? false : { opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + k * 0.15, duration: 0.6, ease: EASE }}
              className="absolute inset-0"
            >
              {photo ? (
                <Image src={photo.src} alt={photo.alt} fill sizes="200px" className="object-cover" />
              ) : (
                <PhotoSoon />
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// resting and fanned-out poses for a pile of up to three prints, bottom first
const PILE = [
  { rotate: -8, x: -14, y: 6 },
  { rotate: 7, x: 14, y: 2 },
  { rotate: -1.5, x: 0, y: 0 },
];
const FAN = [
  { rotate: -10, x: -60, y: 10 },
  { rotate: 10, x: 60, y: 10 },
  { rotate: 0, x: 0, y: -8 },
];

// prints dropped in a pile, the main shot on top; hovering fans them out.
// Its hover label makes it drive its prints' poses itself, so it runs its
// own entrance rather than inheriting the card's.
function PhotoStack({ photos, dir, className = "" }) {
  const still = useStill();
  // photos[0] is the main shot, so it goes last (on top)
  const pile = [...photos].reverse();
  const offset = PILE.length - pile.length;
  return (
    <motion.div
      initial={still ? false : "hidden"}
      animate="shown"
      whileHover="fan"
      className={`relative ${className}`}
    >
      {pile.map((photo, k) => {
        const rest = PILE[offset + k];
        const fan = FAN[offset + k];
        const top = k === pile.length - 1;
        return (
          <motion.figure
            key={k}
            variants={{
              hidden: { opacity: 0, y: -70, x: 0, rotate: 0 },
              shown: {
                opacity: 1,
                x: rest.x * -dir,
                y: rest.y,
                rotate: rest.rotate * -dir,
                transition: { type: "spring", stiffness: 170, damping: 14, delay: 0.55 + k * 0.14 },
              },
              fan: {
                x: fan.x * -dir,
                y: fan.y,
                rotate: fan.rotate * -dir,
                transition: { type: "spring", stiffness: 260, damping: 20 },
              },
            }}
            className={`bg-[#dfe7d4] p-1.5 pb-5 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.85)] ${
              top ? "relative" : "absolute inset-0"
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#2a2e2a]">
              {photo ? (
                <Image src={photo.src} alt={photo.alt} fill sizes="340px" className="object-cover" />
              ) : (
                <PhotoSoon />
              )}
            </div>
          </motion.figure>
        );
      })}
    </motion.div>
  );
}

// a tall photo running down the card's side, wiped in from the edge
function SidePhoto({ photo, dir, fromRight, className = "" }) {
  const still = useStill();
  return (
    <motion.figure
      style={{ rotate: dir * 2 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`bg-[#dfe7d4] p-1.5 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="relative h-full min-h-48 overflow-hidden bg-[#2a2e2a]">
        <motion.div
          initial={still ? false : { clipPath: fromRight ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0%)" }}
          transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
          className="absolute inset-0"
        >
          {photo ? (
            <Image src={photo.src} alt={photo.alt} fill sizes="200px" className="object-cover" />
          ) : (
            <PhotoSoon />
          )}
        </motion.div>
      </div>
    </motion.figure>
  );
}

function Meta({ post }) {
  const Icon = ICONS[post.icon] ?? Sparkles;
  return (
    <motion.div variants={item} className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-minecraft inline-flex items-center gap-1.5 rounded-md border border-(--pal-border)/60 bg-(--pal-accent)/15 px-2 py-1 text-[11px] tracking-wide text-(--pal-title) uppercase">
        <Icon size={13} strokeWidth={2.4} />
        {post.kind}
      </span>
      <span className="text-(--pal-muted)">{post.date}</span>
    </motion.div>
  );
}

function Title({ children, className = "" }) {
  return (
    <motion.h2
      variants={item}
      className={`font-minecraft text-lg leading-tight text-(--pal-heading) md:text-xl ${className}`}
    >
      {children}
    </motion.h2>
  );
}

function Body({ children }) {
  return (
    <motion.p variants={item} className="mt-2 text-[13.5px] leading-relaxed text-(--pal-text)">
      {children}
    </motion.p>
  );
}

// the route-tag sticker in the corner: which hold this card hangs from
function HoldTag({ n, className = "" }) {
  const still = useStill();
  return (
    <motion.span
      aria-hidden
      initial={still ? false : { scale: 0, rotate: -40 }}
      animate={{ scale: 1, rotate: 8 }}
      transition={{ delay: 1.05, type: "spring", stiffness: 400, damping: 12 }}
      className={`font-minecraft absolute z-20 rounded-md border-2 border-[#111411] bg-[#8fd36b] px-2 py-0.5 text-[10px] text-[#142014] shadow-[2px_3px_0_rgba(0,0,0,0.5)] ${className}`}
    >
      HOLD {String(n).padStart(2, "0")}
    </motion.span>
  );
}

const shell =
  "relative border-2 border-(--pal-border) bg-(--pal-surface) shadow-[0_22px_45px_-14px_rgba(0,0,0,0.85)]";

// `display` overrides the post's own choice (used for previews); `still`
// renders it in its final pose with no entrance: for measuring, and for
// cards already reached when arriving on the page
export default function PostCard(props) {
  return (
    <StillContext.Provider value={!!props.still}>
      <CardBody {...props} />
    </StillContext.Provider>
  );
}

function CardBody({ post, index, side, display, still = false }) {
  const layout = display ?? displayFor(post, index);
  // which way the card leans and flies in from: away from the route
  const dir = side === "left" ? -1 : 1;
  const tilt = TILTS[index % TILTS.length] * -dir;
  // photos overhang the card toward the route, the asymmetric side
  const towardRoute = side === "left";
  const want = SLOTS[layout] ?? 1;
  const slots = post.photos.length ? post.photos.slice(0, want) : Array(want).fill(null);
  const [main, extra] = slots;
  const hasExtra = slots.length > 1;

  const card = {
    hidden: { opacity: 0, x: dir * 170, y: 90, rotate: tilt * 6 + dir * 14, scale: 0.6 },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: tilt,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 13,
        delay: 0.3,
        delayChildren: 0.6,
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: 260,
      rotate: tilt * 10,
      transition: { duration: 0.6, ease: "easeIn" },
    },
  };

  const motionProps = {
    variants: card,
    initial: still ? false : "hidden",
    animate: "shown",
    exit: "exit",
    whileHover: { rotate: tilt * 0.3, y: -6, transition: { type: "spring", stiffness: 260, damping: 20 } },
  };

  if (layout === "polaroids") {
    // portrait polaroids fanned out of the top corner beside the title; the
    // second one fans outward, away from the text
    return (
      <motion.article {...motionProps} className={`${shell} rounded-[10px_28px_12px_24px] p-5`}>
        <Tape className={`-top-3 ${towardRoute ? "left-8 -rotate-6" : "right-8 rotate-6"}`} />
        <HoldTag n={index + 1} className={`-bottom-3 ${towardRoute ? "left-6" : "right-6"}`} />
        <div className={`flex items-start gap-4 ${towardRoute ? "" : "flex-row-reverse"}`}>
          <div className="min-w-0 flex-1 pt-1">
            <Meta post={post} />
            <Title className="mt-2">{post.title}</Title>
          </div>
          {/* bottom padding keeps the fanned photo clear of the text below */}
          <div className={`relative -mt-12 w-[40%] shrink-0 pb-8 ${towardRoute ? "-mr-5" : "-ml-5"}`}>
            {hasExtra && (
              <Polaroid
                photo={extra}
                rotate={-dir * 9}
                frame="aspect-[3/4]"
                sizes="180px"
                delay={0.9}
                className={`absolute top-3 w-full ${towardRoute ? "left-5" : "right-5"}`}
              />
            )}
            <Polaroid photo={main} rotate={dir * 4} frame="aspect-[3/4]" sizes="180px" className="relative" />
          </div>
        </div>
        <Body>{post.text}</Body>
      </motion.article>
    );
  }

  if (layout === "landscape") {
    // photo banner with a torn bottom edge, a second snap pinned over its
    // corner (it stays on the banner, clear of the text)
    return (
      <motion.article {...motionProps} className={`${shell} rounded-[26px_26px_10px_16px]`}>
        <HoldTag n={index + 1} className={`-top-3 ${towardRoute ? "left-5" : "right-5"}`} />
        <div className="relative h-44 overflow-hidden rounded-t-[24px] [clip-path:polygon(0_0,100%_0,100%_88%,93%_94%,85%_89%,76%_97%,66%_90%,55%_96%,44%_89%,33%_95%,22%_88%,12%_96%,5%_90%,0_95%)] md:h-48">
          <motion.div
            initial={still ? false : { scale: 1.35, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.45, duration: 1, ease: EASE }}
            className="absolute inset-0"
          >
            {main ? (
              <Image src={main.src} alt={main.alt} fill sizes="440px" className="object-cover" />
            ) : (
              <PhotoSoon />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        </div>
        {hasExtra && (
          <Polaroid
            photo={extra}
            rotate={dir * 7}
            frame="aspect-[3/4]"
            sizes="120px"
            delay={1}
            className={`absolute -top-5 z-10 w-24 md:w-28 ${towardRoute ? "-right-6" : "-left-6"}`}
          />
        )}
        <div className="px-5 pt-3">
          <Meta post={post} />
          <Title className="mt-2">{post.title}</Title>
        </div>
        <div className="px-5 pb-5">
          <Body>{post.text}</Body>
        </div>
      </motion.article>
    );
  }

  if (layout === "filmstrip") {
    return (
      <motion.article {...motionProps} className={`${shell} rounded-[18px_18px_18px_6px] p-5 pt-6`}>
        <Tape className={`-top-3 left-1/2 -ml-10 ${towardRoute ? "rotate-3" : "-rotate-3"}`} />
        <HoldTag n={index + 1} className={`-bottom-3 ${towardRoute ? "right-6" : "left-6"}`} />
        <Meta post={post} />
        <Title className="mt-2">{post.title}</Title>
        {/* runs off both edges of the card */}
        <Filmstrip photos={slots} dir={dir} className="-mx-8 my-4" />
        <Body>{post.text}</Body>
      </motion.article>
    );
  }

  if (layout === "stack") {
    return (
      <motion.article {...motionProps} className={`${shell} rounded-[24px_12px_20px_12px] p-5`}>
        <HoldTag n={index + 1} className={`-top-3 ${towardRoute ? "left-6" : "right-6"}`} />
        {/* bottom margin leaves room for the prints as they fan out */}
        <PhotoStack photos={slots} dir={dir} className="mx-auto -mt-12 mb-8 w-[74%]" />
        <Meta post={post} />
        <Title className="mt-2">{post.title}</Title>
        <Body>{post.text}</Body>
      </motion.article>
    );
  }

  if (layout === "split") {
    return (
      <motion.article
        {...motionProps}
        className={`${shell} flex rounded-[12px_26px_12px_26px] ${towardRoute ? "flex-row-reverse" : ""}`}
      >
        <Tape className={`-top-3 ${towardRoute ? "right-8 rotate-6" : "left-8 -rotate-6"}`} />
        <HoldTag n={index + 1} className={`-bottom-3 ${towardRoute ? "left-6" : "right-6"}`} />
        <SidePhoto
          photo={main}
          dir={dir}
          fromRight={towardRoute}
          className={`relative -my-3 w-[40%] shrink-0 ${towardRoute ? "-mr-3" : "-ml-3"}`}
        />
        <div className="min-w-0 flex-1 p-5">
          <Meta post={post} />
          <Title className="mt-2">{post.title}</Title>
          <Body>{post.text}</Body>
        </div>
      </motion.article>
    );
  }

  if (layout === "portrait") {
    // a tall portrait polaroid taped beside the text, poking above the card
    // on the route side
    return (
      <motion.article {...motionProps} className={`${shell} rounded-[26px_10px_22px_12px] p-5`}>
        <HoldTag n={index + 1} className={`-bottom-3 ${towardRoute ? "left-6" : "right-6"}`} />
        <div className={`flex items-start gap-4 ${towardRoute ? "flex-row-reverse" : ""}`}>
          <div className={`relative -mt-11 w-[38%] shrink-0 ${towardRoute ? "-mr-7" : "-ml-7"}`}>
            <Tape className={`-top-3 left-1/2 -ml-10 ${towardRoute ? "rotate-6" : "-rotate-6"}`} delay={1} />
            <Polaroid
              photo={main}
              rotate={-dir * 3}
              frame="aspect-[2/3]"
              sizes="200px"
              className="relative"
            />
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <Meta post={post} />
            <Title className="mt-2">{post.title}</Title>
            <Body>{post.text}</Body>
          </div>
        </div>
      </motion.article>
    );
  }

  if (layout === "none") {
    return (
      <motion.article {...motionProps} className={`${shell} rounded-[22px_10px_22px_10px] p-5 pt-6`}>
        <Tape className={`-top-3 ${towardRoute ? "left-6 -rotate-6" : "right-6 rotate-6"}`} />
        <HoldTag n={index + 1} className={`-top-3 ${towardRoute ? "right-6" : "left-6"}`} />
        <Meta post={post} />
        <Title className="mt-2">{post.title}</Title>
        <Body>{post.text}</Body>
      </motion.article>
    );
  }

  // big-polaroid: one large landscape polaroid hanging off the side toward
  // the route
  return (
    <motion.article {...motionProps} className={`${shell} rounded-[22px_8px_26px_10px] p-5 pt-6`}>
      <Tape className={`-top-3 ${towardRoute ? "left-6 -rotate-6" : "right-6 rotate-6"}`} />
      <HoldTag n={index + 1} className={`-top-3 ${towardRoute ? "right-6" : "left-6"}`} />
      <Meta post={post} />
      <Title className="mt-2">{post.title}</Title>
      <Polaroid
        photo={main}
        rotate={-dir * 2.5}
        frame="aspect-[16/10]"
        sizes="420px"
        className={`relative mt-3 ${towardRoute ? "-mr-3 md:-mr-6" : "-ml-3 md:-ml-6"}`}
      />
      <Body>{post.text}</Body>
    </motion.article>
  );
}

// The card at the top of the route, once it's topped out
export function SummitCard({ onRappel, onRestart, still = false }) {
  return (
    <StillContext.Provider value={still}>
      <motion.article
        initial={still ? false : { opacity: 0, y: 120, scale: 0.5, rotate: -12 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 1.5 }}
        exit={{ opacity: 0, y: 260, rotate: 14, transition: { duration: 0.6, ease: "easeIn" } }}
        transition={{ type: "spring", stiffness: 110, damping: 12, delay: 0.5 }}
        className={`${shell} rounded-[28px_12px_28px_12px] p-5 text-center`}
      >
        <Tape className="-top-3 left-1/2 -ml-10 -rotate-3" delay={1.2} />
        <span className="font-minecraft inline-flex items-center gap-1.5 rounded-md border border-(--pal-border)/60 bg-(--pal-accent)/15 px-2 py-1 text-[11px] tracking-wide text-(--pal-title) uppercase">
          <Mountain size={13} strokeWidth={2.4} />
          Topped out
        </span>
        <h2 className="font-minecraft mt-3 text-2xl leading-tight text-(--pal-heading) md:text-3xl">
          You made it to the top!
        </h2>
        <Polaroid
          photo={{ src: "/profile-climbing.jpg", alt: "Michael grinning down from the top of a rock wall" }}
          rotate={-3}
          frame="aspect-[4/3]"
          sizes="420px"
          delay={0.9}
          className="mx-auto mt-4 w-[88%] [&_img]:object-[50%_52%]"
        />
        <p className="mt-3 text-[13.5px] leading-relaxed text-(--pal-text)">
          That’s every highlight so far. New holds get set whenever something
          worth sharing happens, so check back for a fresh route.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={onRappel}
            className="font-minecraft inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 border-[#111411] bg-(--pal-button) px-3 py-2 text-sm text-[#101310] shadow-[2px_3px_0_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:bg-(--pal-button-hover)"
          >
            <ArrowDown size={16} /> Rappel down
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="font-minecraft inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 border-(--pal-border) px-3 py-2 text-sm text-(--pal-title) transition hover:-translate-y-0.5 hover:bg-(--pal-accent)/15"
          >
            <RotateCcw size={16} /> Climb again
          </button>
        </div>
      </motion.article>
    </StillContext.Provider>
  );
}
