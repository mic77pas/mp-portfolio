"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { IoLogoFigma } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";
import SkillBadge from "./SkillBadge";
import LaptopMockup from "./LaptopMockup";
import { subprojectLists } from "../data/projects";
import dynamic from "next/dynamic";

// three.js only loads once someone opens a model
const ModelViewer = dynamic(
  () => import("../src/components/ModelView").then((m) => m.ModelViewer),
  { ssr: false },
);

// Screen cut-out of the phone frame, as % of the frame image (from Figma)
const PHONE = {
  frame: "/comps/devices/iphone.png",
  screen: "left-[8.1%] top-[6.29%] w-[82.77%] h-[87.24%] rounded-[8%/4%]",
};

// shared entrance for the headline media of every layout
const MEDIA_IN = {
  initial: { opacity: 0, y: 30, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
        className="relative mx-auto aspect-[400/796] w-[min(340px,80vw,calc(80svh*400/796))]"
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

  // full content width, so the laptop lines up with the text below it; only
  // short screens shrink it, so the whole laptop (h ≈ 0.59w) stays in view
  return (
    <LaptopMockup className="w-[min(100%,calc(92svh/0.59))]">
      <ScreenMedia {...media} />
    </LaptopMockup>
  );
}

// md up, the first screenful is just the headline media, dead-centre in the
// viewport, with the text starting just below the fold. On phones the media
// sits at the top (below the close button) with the text straight after it
function Hero({ children }) {
  return (
    <div className="relative flex justify-center md:min-h-svh md:items-center">
      <div className="w-full">{children}</div>
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
  );
}

// "View in ..." button in the header's top-right corner, plus a "Visit
// website" button when the item has a live `website`
function ViewButton({ item }) {
  const link = item.github
    ? { href: item.github, icon: <FaGithub size={18} />, label: "View in GitHub" }
    : item.figmaUrl
      ? { href: item.figmaUrl, icon: <IoLogoFigma size={18} />, label: "View in Figma" }
      : null;
  const site = item.website && {
    href: item.website,
    icon: <FiExternalLink size={17} />,
    label: "Visit Website",
  };
  const links = [site, link].filter(Boolean);
  if (!links.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="button-hover shrink-0 rounded-lg text-[14px] md:text-[16px] text-[#e4ecd9]"
        >
          {l.icon} {l.label}
        </a>
      ))}
    </div>
  );
}

// role / year pills, used by designs in place of skills
function MetaPills({ meta }) {
  const pills = [meta.role, meta.year].filter(Boolean);
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

function Pills({ item }) {
  if (item.meta) return <MetaPills meta={item.meta} />;
  if (!item.skills?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {item.skills.map((s) => (
        <SkillBadge key={s} name={s} />
      ))}
    </div>
  );
}

// title + view button, pills, description: the block under every showcase
function ProjectHeader({ item, descriptionClass = "", className = "" }) {
  return (
    <div className={`flex flex-col gap-4 md:gap-[19px] ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="font-bold text-[28px] md:text-[40px] leading-none text-(--pal-title) [text-shadow:0px_4px_0px_#040404]">
          {item.title}
        </h2>
        <ViewButton item={item} />
      </div>
      <Pills item={item} />
      {item.description && <p className={descriptionClass}>{item.description}</p>}
    </div>
  );
}

function SectionHeading({ children }) {
  return <h3 className="font-bold text-(--pal-heading)">{children}</h3>;
}

// text sections ({ title, body }): bold heading straight above its paragraph
function Sections({ sections = [] }) {
  if (!sections.length) return null;
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-1">
          <SectionHeading>{section.title}</SectionHeading>
          <p>{section.body}</p>
        </section>
      ))}
    </div>
  );
}

// an image at its own aspect ratio: never letterboxed, never cropped
function FitImage({ src, alt, sizes, className = "" }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={900}
      sizes={sizes}
      className={`block h-auto w-full ${className}`}
    />
  );
}

function MediaTile({ src, alt, sizes, className = "", fit = "object-cover" }) {
  return (
    <div className={`relative overflow-hidden bg-[#161616] ${className}`}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} className={fit} />}
    </div>
  );
}

/* ---------- software ---------- */

function Subprojects({ list }) {
  const subprojects = list ? subprojectLists[list] : [];
  if (!subprojects?.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <SectionHeading>What&apos;s inside</SectionHeading>
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
  );
}

function SoftwareLayout({ item }) {
  return (
    <>
      <Hero>
        <DeviceFrame
          device={item.device}
          video={item.gif}
          image={item.image}
          title={item.title}
        />
      </Hero>
      <ProjectHeader item={item} />
      <Sections sections={item.sections} />
      <Subprojects list={item.subprojects} />
    </>
  );
}

/* ---------- design: layouts (web, app screens) ---------- */

// The whole Figma layout, framed like a selected frame on a Figma canvas:
// name label above, outline with corner handles, size badge below. Full
// content width, at the export's own aspect ratio.
function LayoutShowcase({ item }) {
  const layout = item.layout ?? { image: item.image, label: item.title };

  return (
    <motion.div
      {...MEDIA_IN}
      className="flex w-full flex-col gap-2.5 text-[13px] md:text-[15px]"
    >
      <span className="truncate text-(--pal-accent)">
        <span className="opacity-60">#</span> {layout.label}
      </span>

      <div className="relative outline-2 outline-(--pal-accent)">
        <Image
          src={layout.image}
          alt={`${item.title}: ${layout.label}`}
          width={layout.width ?? 1600}
          height={layout.height ?? 900}
          sizes="(min-width: 1070px) 1040px, 95vw"
          className="block h-auto w-full"
        />
        {/* selection handles */}
        {[
          "-left-1.5 -top-1.5",
          "-right-1.5 -top-1.5",
          "-left-1.5 -bottom-1.5",
          "-right-1.5 -bottom-1.5",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute ${pos} size-3 border-2 border-(--pal-accent) bg-(--pal-header)`}
          />
        ))}
      </div>

      {layout.width && (
        <div className="flex justify-center">
          <span className="rounded-[3px] bg-(--pal-accent) px-2 py-0.5 text-[12px] md:text-[13px] leading-tight text-(--pal-deep) tabular-nums">
            {layout.width} × {layout.height}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function DesignLayout({ item }) {
  return (
    <>
      <Hero>
        <LayoutShowcase item={item} />
      </Hero>
      <ProjectHeader item={item} />
      <Sections sections={item.sections} />
      {item.process?.length > 0 && <ProcessGrid steps={item.process} />}
    </>
  );
}

/* ---------- design: logos ---------- */

// iteration screenshots, two per row, numbered in order
function ProcessGrid({ steps }) {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 items-start gap-x-5 md:gap-x-[54px] gap-y-6">
      {steps.map((step, i) => (
        <li key={`${step.image}-${i}`} className="flex flex-col gap-2">
          <FitImage
            src={step.image}
            alt={step.caption ?? `Step ${i + 1}`}
            sizes="(min-width: 640px) 520px, 92vw"
            className="rounded-[8px]"
          />
          {step.caption && (
            <p className="text-[13px] md:text-[15px]">
              <span className="text-(--pal-accent)">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              — {step.caption}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

// No big showcase: the logo sits as a square beside the header, and the
// process images go between the sections, just before the last one
function LogoLayout({ item }) {
  const sections = item.sections ?? [];
  const beforeProcess = sections.slice(0, -1);
  const afterProcess = sections.slice(-1);

  return (
    <>
      {/* no hero up top, so just clear the close button; the content should
          mostly fit on the first screen. Phones: a small logo with the title
          and tags beside it, then the buttons and description full width.
          Wider: a big logo with the whole header beside it. */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center sm:items-start gap-x-4 sm:gap-x-5 gap-y-4 md:gap-y-[19px] md:pt-12">
        <motion.div {...MEDIA_IN} className="shrink-0 sm:row-span-2">
          {/* popupImage is a tight square crop, so the logo fills the tile */}
          <MediaTile
            src={item.popupImage ?? item.image}
            alt={item.title}
            sizes="(min-width: 768px) 230px, (min-width: 640px) 160px, 104px"
            className="size-[104px] sm:size-40 md:size-[230px] rounded-[14px] sm:rounded-[16px] md:rounded-[20px]"
          />
        </motion.div>
        <div className="flex min-w-0 flex-col gap-3 md:gap-[19px]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h2 className="font-bold text-[26px] sm:text-[28px] md:text-[40px] leading-none text-(--pal-title) [text-shadow:0px_4px_0px_#040404]">
              {item.title}
            </h2>
            <div className="hidden sm:block">
              <ViewButton item={item} />
            </div>
          </div>
          <Pills item={item} />
        </div>
        <div className="col-span-2 flex flex-col gap-4 sm:col-span-1 sm:col-start-2">
          <div className="sm:hidden">
            <ViewButton item={item} />
          </div>
          {item.description && <p className="text-[18px] md:text-[24px]">{item.description}</p>}
        </div>
      </div>
      <Sections sections={beforeProcess} />
      {item.process?.length > 0 && <ProcessGrid steps={item.process} />}
      <Sections sections={afterProcess} />
    </>
  );
}

/* ---------- models ---------- */

// individual pieces of the model, five to a row
function Parts({ parts }) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeading>Parts</SectionHeading>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-[28px]">
        {parts.map((part) => (
          <li key={part.image} className="flex flex-col gap-2">
            <MediaTile
              src={part.image}
              alt={part.name ?? "Model part"}
              sizes="200px"
              className="aspect-video rounded-[9px]"
            />
            {part.name && <span className="text-[13px] md:text-[15px]">{part.name}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

const GALLERY_GAP = 12;

// One large render with every render as a card in a column beside it. All
// are 16:9, so nothing jumps when the render changes. The cards share the
// main render's height: with more of them they get smaller and the main
// render grows to fill the space.
function ModelGallery({ images, title }) {
  const [index, setIndex] = useState(0);
  const n = images.length;
  // n cards (16:9) plus their gaps are as tall as the main render beside them
  const cardWidth = `calc((100cqw - ${GALLERY_GAP}px - ${
    ((n - 1) * GALLERY_GAP * 16) / 9
  }px) / ${n + 1})`;

  return (
    <section className="@container">
      <div
        className="flex flex-col gap-3 sm:flex-row"
        style={{ "--card-w": cardWidth }}
      >
        <div className="relative aspect-video min-w-0 flex-1 overflow-hidden rounded-[9px] bg-[#161616]">
          <AnimatePresence initial={false}>
            <motion.div
              key={images[index]}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={images[index]}
                alt={`${title} render ${index + 1}`}
                fill
                sizes="(min-width: 1070px) 820px, 95vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {n > 1 && (
          <ul className="grid grid-cols-4 gap-3 sm:flex sm:w-(--card-w) sm:shrink-0 sm:flex-col">
            {images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show render ${i + 1}`}
                  aria-pressed={i === index}
                  className={`relative block w-full aspect-video cursor-pointer overflow-hidden rounded-[9px] border-2 transition ${
                    i === index
                      ? "border-(--pal-accent)"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="300px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

// Header, text and renders first; the interactive 3D viewer comes last
function ModelLayout({ item }) {
  return (
    <>
      {/* no hero up top, so just clear the close button; the content should
          mostly fit on the first screen */}
      <ProjectHeader item={item} className="md:pt-12" />
      <Sections sections={item.sections} />
      {item.images?.length > 0 && (
        <ModelGallery images={item.images} title={item.title} />
      )}
      {item.parts?.length > 0 && <Parts parts={item.parts} />}
      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <SectionHeading>3D model</SectionHeading>
          <span className="text-[13px] md:text-[15px] text-(--pal-muted)">
            Drag to rotate
          </span>
        </div>
        <div className="w-full overflow-hidden rounded-[14px] bg-black">
          <ModelViewer src={item.src} aspectClass="aspect-[1080/611]" />
        </div>
      </section>
    </>
  );
}

function layoutFor(item) {
  if (item.kind === "model") return ModelLayout;
  if (item.kind === "design") {
    return item.category === "Logo" ? LogoLayout : DesignLayout;
  }
  return SoftwareLayout;
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

  const Layout = layoutFor(item);

  return (
    <motion.div
      data-lenis-prevent
      className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-(--pal-header)/90 backdrop-blur-[10px]"
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

      {/* layouts follow the V3 page of the Portfolio Figma file: Software,
          Design - Layout, Design - Logo and Model */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="page-container flex flex-col gap-6 md:gap-10 pt-16 md:pt-0 pb-16 md:pb-[100px] font-minecraft text-[16px] md:text-[20px] text-(--pal-text)"
      >
        <Layout item={item} />
      </motion.div>
    </motion.div>
  );
}
