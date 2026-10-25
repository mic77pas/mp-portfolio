"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import ScrambleText from "../../src/components/ScrambleText";
import { portfolioGroups } from "../../data/portfolioGroups";

// /portfolio opens on whichever tab is saved under this key (see
// src/app/portfolio/page.jsx), so each card saves its kind before navigating.
const STORAGE_KEY = "portfolioMode";

const groupOf = (kind) => portfolioGroups.find((g) => g.kind === kind);

// --- Software: a code editor with a generic snippet; a terminal slides up on
// hover and "builds" it ---------------------------------------------------------
const kw = "text-(--pal-accent)";
const fn = "text-(--pal-heading)";
const punc = "text-(--pal-muted)";

const codeLines = [
  <><span className={kw}>function</span> <span className={fn}>build</span><span className={punc}>(idea) {"{"}</span></>,
  <span className="pl-4"><span className={kw}>const</span> app <span className={punc}>=</span> <span className={fn}>design</span><span className={punc}>(idea);</span></span>,
  <span className="pl-4"><span className={kw}>while</span> <span className={punc}>(!app.ready) {"{"}</span></span>,
  <span className="pl-8">app.<span className={fn}>iterate</span><span className={punc}>();</span></span>,
  <span className={`pl-4 ${punc}`}>{"}"}</span>,
  <span className="pl-4"><span className={kw}>return</span> <span className={fn}>ship</span><span className={punc}>(app);</span></span>,
  <span className={punc}>{"}"}</span>,
];

function SoftwareStage() {
  return (
    <div className="absolute inset-0 flex flex-col bg-(--pal-deep)">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b-2 border-(--pal-border) bg-(--pal-header) px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#d06b6b]" />
        <span className="size-2.5 rounded-full bg-[#d6b45c]" />
        <span className="size-2.5 rounded-full bg-[#6fae78]" />
        <span className="ml-2 rounded-t-[4px] bg-(--pal-deep) px-2 py-0.5 font-minecraft text-[11px] text-(--pal-text)">
          build.ts
        </span>
      </div>

      <ol className="flex-1 overflow-hidden px-3 py-3 font-minecraft text-[12px] leading-[1.7] text-(--pal-text)">
        {codeLines.map((line, i) => (
          <li key={i} className="flex gap-3 whitespace-nowrap">
            <span className="w-3 shrink-0 text-right text-(--pal-plaque)">
              {i + 1}
            </span>
            {line}
          </li>
        ))}
      </ol>

      {/* terminal */}
      <div className="absolute inset-x-3 bottom-3 translate-y-[130%] rounded-[8px] border-2 border-(--pal-border) bg-(--pal-surface) px-3 py-2 font-minecraft text-[11px] leading-[1.6] shadow-[0px_4px_0px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:translate-y-0">
        <p className="text-(--pal-text)">
          <span className="text-(--pal-accent)">$</span> npm run build
        </p>
        <p className="text-[#6fae78]">
          ✓ Compiled successfully
          <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[2px] bg-(--pal-heading) animate-pulse" />
        </p>
      </div>
    </div>
  );
}

// --- Design: a Figma-style canvas with a wireframe page in a selected frame
// and a collaborator cursor that wanders over to its button on hover ----------
function Bar({ className = "" }) {
  return <span className={`block h-1.5 rounded-full ${className}`} />;
}

function DesignStage() {
  return (
    <div
      className="absolute inset-0 bg-(--pal-deep)"
      style={{
        backgroundImage:
          "radial-gradient(color-mix(in oklab, var(--pal-border) 55%, transparent) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      {/* swatch toolbar */}
      <div className="absolute left-3 top-1/2 flex -translate-y-1/2 flex-col gap-1.5 rounded-[6px] border-2 border-(--pal-border) bg-(--pal-header) p-1.5">
        {["--pal-heading", "--pal-accent", "--pal-button", "--pal-plaque"].map(
          (c) => (
            <span
              key={c}
              className="size-3 rounded-[3px]"
              style={{ background: `var(${c})` }}
            />
          ),
        )}
      </div>

      {/* selected frame */}
      <div className="absolute inset-y-[16%] left-[22%] right-[10%]">
        <span className="absolute -top-5 left-0 font-minecraft text-[10px] text-(--pal-muted)">
          # Landing Page
        </span>

        {/* wireframe page */}
        <div className="flex size-full flex-col gap-[6%] overflow-hidden rounded-[2px] bg-(--pal-surface) p-[5%]">
          {/* nav */}
          <div className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-full bg-(--pal-heading)" />
            <Bar className="w-[18%] bg-(--pal-plaque)" />
            <span className="ml-auto flex w-[34%] gap-1.5">
              <Bar className="flex-1 bg-(--pal-border)" />
              <Bar className="flex-1 bg-(--pal-border)" />
              <Bar className="flex-1 bg-(--pal-border)" />
            </span>
          </div>

          {/* hero: copy + image placeholder */}
          <div className="flex min-h-0 flex-1 gap-[6%]">
            <div className="flex flex-1 flex-col justify-center gap-1.5">
              <Bar className="h-2.5 w-[90%] bg-(--pal-heading)" />
              <Bar className="h-2.5 w-[65%] bg-(--pal-heading)" />
              <Bar className="mt-1 w-[80%] bg-(--pal-plaque)" />
              <Bar className="w-[70%] bg-(--pal-plaque)" />
              <span className="mt-1.5 h-3.5 w-[45%] rounded-[3px] bg-(--pal-button) transition-colors duration-300 delay-300 group-hover:bg-(--pal-button-hover)" />
            </div>
            <div className="relative flex-1 rounded-[3px] border-2 border-(--pal-border)">
              <svg
                className="absolute inset-0 size-full text-(--pal-border)"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>

          {/* card row */}
          <div className="flex h-[18%] gap-[5%]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="flex-1 rounded-[3px] bg-(--pal-header) transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </div>

        {/* selection box */}
        <div className="pointer-events-none absolute -inset-1 border-2 border-(--pal-heading) transition-all duration-500 ease-out group-hover:-inset-2">
          {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map(
            (pos) => (
              <span
                key={pos}
                className={`absolute ${pos} size-2 border-2 border-(--pal-heading) bg-(--pal-deep)`}
              />
            ),
          )}
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-[3px] bg-(--pal-button) px-1.5 py-0.5 font-minecraft text-[9px] text-white whitespace-nowrap">
          1440 × 900
        </span>
      </div>

      {/* collaborator cursor */}
      <div className="absolute left-[80%] top-[78%] transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:left-[36%] group-hover:top-[60%]">
        <svg
          viewBox="0 0 16 16"
          className="size-4 text-(--pal-button-hover) drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
          aria-hidden
        >
          <path d="M1 1 L14 7 L8 8.5 L6 15 Z" fill="currentColor" />
        </svg>
        <span className="ml-3 block rounded-[3px] bg-(--pal-button-hover) px-1.5 py-0.5 font-minecraft text-[9px] text-(--pal-deep)">
          Michael
        </span>
      </div>
    </div>
  );
}

// --- Models: a Blender-style viewport with a cube on a grid floor that does a
// quarter turn on hover ------------------------------------------------------------
const CUBE = 84; // px
const half = CUBE / 2;
// lighter on top, darker underneath, so the cube reads as lit from above
const faces = [
  { t: `translateZ(${half}px)`, shade: 30 },
  { t: `rotateY(180deg) translateZ(${half}px)`, shade: 30 },
  { t: `rotateY(90deg) translateZ(${half}px)`, shade: 18 },
  { t: `rotateY(-90deg) translateZ(${half}px)`, shade: 18 },
  { t: `rotateX(90deg) translateZ(${half}px)`, shade: 50 },
  { t: `rotateX(-90deg) translateZ(${half}px)`, shade: 10 },
];

function ModelStage() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-(--pal-deep) [perspective:700px]">
      {/* grid floor */}
      <div
        className="absolute -inset-x-1/2 bottom-[-20%] h-[80%] origin-bottom [transform:rotateX(68deg)]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--pal-border) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--pal-border) 45%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <span className="absolute left-3 top-2.5 font-minecraft text-[10px] text-(--pal-muted)">
        User Perspective
      </span>

      {/* axis gizmo */}
      <svg
        viewBox="0 0 40 40"
        className="absolute right-3 top-2.5 size-10 transition-transform duration-700 ease-out group-hover:rotate-[25deg]"
        aria-hidden
      >
        <line x1="20" y1="20" x2="34" y2="26" stroke="#d06b6b" strokeWidth="2" />
        <line x1="20" y1="20" x2="8" y2="27" stroke="#6fae78" strokeWidth="2" />
        <line x1="20" y1="20" x2="20" y2="5" stroke="#6b8fd0" strokeWidth="2" />
        <circle cx="34" cy="26" r="3" fill="#d06b6b" />
        <circle cx="8" cy="27" r="3" fill="#6fae78" />
        <circle cx="20" cy="5" r="3" fill="#6b8fd0" />
      </svg>

      {/* contact shadow */}
      <div className="absolute bottom-[16%] left-1/2 h-3 w-[34%] -translate-x-1/2 rounded-[50%] bg-black/50 blur-[4px]" />

      {/* cube: tilted towards the camera, then turned about its vertical axis */}
      <div
        className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
        style={{ width: CUBE, height: CUBE }}
      >
        <div className="size-full [transform-style:preserve-3d] [transform:rotateX(-24deg)]">
          {/* rests at a three-quarter angle and turns 90deg on hover (an
              identical-looking pose); as a transition, it turns back from
              wherever it is when the cursor leaves */}
          <div className="size-full [transform-style:preserve-3d] [transform:rotateY(-35deg)] transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:[transform:rotateY(55deg)]">
            {faces.map(({ t, shade }) => (
              <span
                key={t}
                className="absolute inset-0 border-2 border-(--pal-heading)"
                style={{
                  transform: t,
                  background: `color-mix(in oklab, var(--pal-button) ${shade}%, transparent)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* corner brackets */}
      {["left-2 top-2 border-l-2 border-t-2", "right-2 top-2 border-r-2 border-t-2", "left-2 bottom-2 border-l-2 border-b-2", "right-2 bottom-2 border-r-2 border-b-2"].map(
        (pos) => (
          <span
            key={pos}
            className={`absolute size-3 border-(--pal-plaque) ${pos}`}
          />
        ),
      )}
    </div>
  );
}

const cards = [
  {
    kind: "software",
    Stage: SoftwareStage,
    tagline: "Websites & web apps",
    noun: "projects",
  },
  {
    kind: "design",
    Stage: DesignStage,
    tagline: "UI, web layouts & logo design",
    noun: "designs",
  },
  {
    kind: "model",
    Stage: ModelStage,
    tagline: "3D modelling, rendering & CAD",
    noun: "models",
  },
];

function TypeCard({ kind, Stage, tagline, noun }) {
  const group = groupOf(kind);

  const remember = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, kind);
    } catch {
      /* storage unavailable: /portfolio opens on its default tab */
    }
  };

  return (
    <Link
      href="/portfolio"
      onClick={remember}
      // pins this card to its type's palette (see globals.css)
      data-palette={kind}
      className="group flex h-full flex-col overflow-hidden rounded-[12px] border-2 border-(--pal-border) bg-(--pal-surface) transition-all duration-300 ease-out hover:-translate-y-1 hover:border-(--pal-accent) hover:shadow-[0px_6px_0px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden border-b-2 border-(--pal-border)">
        <Stage />
      </div>

      <div className="flex flex-1 items-end justify-between gap-3 px-4 py-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          <span className="font-minecraft font-bold text-[18px] leading-none text-(--pal-title)">
            {group.title}
          </span>
          <span className="font-minecraft text-[13px] leading-snug text-(--pal-text)">
            {tagline}
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-1 font-minecraft text-[12px] leading-none text-(--pal-muted) transition-colors group-hover:text-(--pal-heading)">
          {group.items.length} {noun}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export default function ProjectsPreview() {
  return (
    <section className="flex flex-col gap-5 w-full">
      <Reveal className="flex items-end justify-between font-minecraft font-bold">
        <ScrambleText
          as="h2"
          text="Projects"
          className="text-[20px] text-[#c1dab6]"
        />
        <Link
          href="/portfolio"
          className="text-[14px] text-white transition-colors duration-200 hover:text-[#c1dab6]"
        >
          View All
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.kind} delay={0.08 * (i + 1)} className="h-full">
            <TypeCard {...card} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
