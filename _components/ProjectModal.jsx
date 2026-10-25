"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { IoLogoFigma } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import SkillBadge from "./SkillBadge";
import LaptopMockup from "./LaptopMockup";
import { subprojectLists } from "../data/projects";
import dynamic from "next/dynamic";

// three.js only loads once someone opens a model
const ModelViewer = dynamic(
  () => import("../src/components/ModelView").then((m) => m.ModelViewer),
  { ssr: false },
);
const ImageSlideshow = dynamic(
  () => import("../src/components/ModelView").then((m) => m.ImageSlideshow),
  { ssr: false },
);

// Screen cut-out of the phone frame, as % of the frame image (from Figma)
const PHONE = {
  frame: "/comps/devices/iphone.png",
  screen: "left-[8.1%] top-[6.29%] w-[82.77%] h-[87.24%] rounded-[8%/4%]",
};

function ScreenMedia({ video, image, title }) {
  return video ? (
    <video
      src={video}
      poster={image}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 size-full object-cover object-top"
    />
  ) : (
    <Image
      src={image}
      alt={title}
      fill
      sizes="900px"
      className="object-cover object-top"
    />
  );
}

function DeviceFrame({ device = "laptop", ...media }) {
  if (device === "phone") {
    return (
      <motion.div
        className="relative mx-auto aspect-[400/796] w-[min(340px,80vw,calc(88svh*400/796))]"
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`absolute overflow-hidden bg-black ${PHONE.screen}`}>
          <ScreenMedia {...media} />
        </div>
        <Image
          src={PHONE.frame}
          alt=""
          fill
          sizes="296px"
          className="pointer-events-none select-none"
        />
      </motion.div>
    );
  }

  // full content width, capped so the whole laptop (h ≈ 0.59w) fits on screen
  return (
    <LaptopMockup className="w-[min(100%,calc(88svh/0.59))]">
      <ScreenMedia {...media} />
    </LaptopMockup>
  );
}

function ActionLink({ href, icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="button-hover w-fit font-minecraft text-[#e4ecd9]"
    >
      {icon} {children}
    </a>
  );
}

function SoftwareBody({ item }) {
  const subprojects = item.subprojects ? subprojectLists[item.subprojects] : [];

  return (
    <>
      <div className="flex flex-col gap-4">
        <p>{item.description}</p>
        {item.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.skills.map((s) => (
              <SkillBadge key={s} name={s} />
            ))}
          </div>
        )}
        {item.github && (
          <ActionLink href={item.github} icon={<FaGithub size={18} />}>
            View on GitHub
          </ActionLink>
        )}
      </div>

      <Sections sections={item.sections} />

      {subprojects.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="font-bold text-[20px] text-(--pal-heading)">
            What&apos;s inside
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {subprojects.map((sub) => (
              <a
                key={sub.title}
                href={sub.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-xl border-2 border-(--pal-border) bg-(--pal-surface) transition hover:border-(--pal-accent)"
              >
                <div className="relative aspect-2/1 overflow-hidden">
                  <Image
                    src={sub.image}
                    alt={sub.title}
                    fill
                    sizes="(min-width: 640px) 500px, 90vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-1 p-3">
                  <span className="font-bold text-[16px] text-[#e4ecd9]">
                    {sub.title}
                  </span>
                  <span className="text-[13px] text-(--pal-text) line-clamp-3">
                    {sub.description}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function SectionHeading({ children }) {
  return (
    <h3 className="font-bold text-[20px] text-(--pal-heading)">{children}</h3>
  );
}

// text sections ({ title, body }) shared by software and design popups
function Sections({ sections = [] }) {
  return sections.map((section) => (
    <section key={section.title} className="flex flex-col gap-2">
      <SectionHeading>{section.title}</SectionHeading>
      <p>{section.body}</p>
    </section>
  ));
}

// client / role / year pills under a design's intro
function MetaPills({ meta }) {
  const pills = [meta.client, meta.role, meta.year].filter(Boolean);
  return (
    <ul className="flex flex-wrap gap-2">
      {pills.map((p) => (
        <li
          key={p}
          className="rounded-md border-2 border-(--pal-border) bg-(--pal-surface) px-2.5 py-1 text-[13px] md:text-[14px] leading-none text-(--pal-heading)"
        >
          {p}
        </li>
      ))}
    </ul>
  );
}

// iteration screenshots, numbered top to bottom
function Process({ steps }) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeading>Process</SectionHeading>
      <ol className="flex flex-col gap-8">
        {steps.map((step, i) => (
          <li key={`${step.image}-${i}`} className="flex flex-col gap-3">
            <div className="relative aspect-[1080/614] overflow-hidden rounded-xl border-2 border-(--pal-border) bg-[#161616]">
              <Image
                src={step.image}
                alt={step.caption ?? `Step ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 1000px, 92vw"
                className="object-contain"
              />
            </div>
            {step.caption && (
              <p className="text-[14px] md:text-[16px]">
                <span className="text-(--pal-accent)">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                — {step.caption}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

// Logos read as case studies: intro, meta, sections, process.
// Each part only shows when the item has it.
function DesignBody({ item }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <p>{item.description}</p>
        {item.meta && <MetaPills meta={item.meta} />}
        {item.figmaUrl && (
          <ActionLink href={item.figmaUrl} icon={<IoLogoFigma size={18} />}>
            View in Figma
          </ActionLink>
        )}
      </div>

      <Sections sections={item.sections} />
      {item.process?.length > 0 && <Process steps={item.process} />}
    </>
  );
}

function ModelBody({ item }) {
  return (
    <>
      <p>{item.description}</p>
      <ImageSlideshow images={item.images} title={item.title} />
    </>
  );
}

const BODIES = { software: SoftwareBody, design: DesignBody, model: ModelBody };

// The headline media for each kind, shown centred in the first screenful
function Showcase({ item }) {
  if (item.kind === "design") {
    return (
      <motion.div
        className="relative mx-auto w-[min(100%,calc(88svh*1080/614))] aspect-[1080/614] overflow-hidden rounded-[20px] bg-[#161616]"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="1080px"
          className="object-contain"
        />
      </motion.div>
    );
  }
  if (item.kind === "model") {
    return (
      <motion.div
        className="mx-auto w-[min(100%,calc(88svh*1080/614))] overflow-hidden rounded-[20px] bg-[#161616]"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <ModelViewer src={item.src} dark aspectClass="aspect-[1080/614]" />
      </motion.div>
    );
  }
  return (
    <DeviceFrame
      device={item.device}
      video={item.gif}
      image={item.image}
      title={item.title}
    />
  );
}

export default function ProjectModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    // lock <html> as well as <body>: html's overflow-x:hidden stops body's
    // overflow from reaching the viewport, so body alone still scrolls
    const root = document.documentElement;
    const prev = [root.style.overflow, document.body.style.overflow];
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      [root.style.overflow, document.body.style.overflow] = prev;
    };
  }, [onClose]);

  const Body = BODIES[item.kind] ?? SoftwareBody;

  return (
    <motion.div
      data-lenis-prevent
      className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-[10px]"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-10 cursor-pointer transition hover:scale-110"
      >
        <span className="relative inline-flex items-center justify-center">
          <span className="w-8 h-8 rounded-full bg-(--pal-close)" />
          <IoIosCloseCircle size={36} className="absolute text-(--pal-close-icon)" />
        </span>
      </button>

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="page-container flex flex-col gap-6 md:gap-10 pb-16 md:pb-[100px] font-minecraft text-[16px] md:text-[18px] text-(--pal-text)"
      >
        {/* md up, the first screenful is just the media, dead-centre in the
            viewport, with everything else below the fold. On phones the
            media sits at the top (below the close button) with the text
            straight after it */}
        <div className="relative flex justify-center pt-16 md:pt-0 md:h-svh md:items-center">
          <div className="w-full">
            <Showcase item={item} />
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:block text-(--pal-accent)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1], y: [0, 6, 0] }}
            transition={{
              opacity: { delay: 1.2, duration: 0.4 },
              y: { delay: 1.2, duration: 1.6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <FiChevronDown size={28} />
          </motion.div>
        </div>
        <h2 className="font-bold text-[28px] md:text-[36px] leading-none text-(--pal-title) [text-shadow:0px_4px_0px_#040404]">
          {item.title}
        </h2>
        <Body item={item} />
      </motion.div>
    </motion.div>
  );
}
