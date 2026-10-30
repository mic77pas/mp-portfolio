"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { IoIosCloseCircle } from "react-icons/io";
import posts from "../../data/posts";
import Reveal from "../Reveal";
import PostCard, { cardOverhang } from "./PostCard";

// every card on the board uses the same format (a photo banner across the
// top) and has its text cut to fit, so they all come out the same size
const BOARD_DISPLAY = "landscape";

// /posts/all: every post at once, for anyone who'd rather not climb. The
// same cards as the wall, pinned to a board newest first, each keeping its
// hold number from the route. Opening one shows the whole post in a modal.
export default function AllPosts() {
  // posts are sorted oldest first (the order up the wall)
  const newestFirst = posts.map((post, index) => ({ post, index })).reverse();
  // the card being read, and which way it leans on the board
  const [open, setOpen] = useState(null);

  return (
    <div className="page-container pt-28 md:pt-36 pb-16">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-minecraft text-[11px] tracking-wider text-(--pal-muted) uppercase">
            Posts · all {posts.length}
          </span>
          <h1 className="font-minecraft mt-2 text-2xl leading-tight text-(--pal-heading) md:text-3xl">
            Every highlight, no climbing required
          </h1>
          <p className="mt-2 text-sm text-(--pal-title) italic">
            Newest first, from where I am now back to starting university.
          </p>
        </div>
        <Link
          href="/posts"
          className="font-minecraft inline-flex items-center gap-2 self-start rounded-lg border-2 border-(--pal-border)/70 px-3 py-2 text-sm text-(--pal-title) transition hover:-translate-y-0.5 hover:bg-(--pal-accent)/15 md:self-auto"
        >
          <ArrowLeft size={16} /> Back to the wall
        </Link>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {newestFirst.map(({ post, index }, k) => {
          const side = k % 2 === 0 ? "right" : "left";
          return (
            <Reveal key={post.id} delay={(k % 3) * 0.08} className="mx-auto w-full max-w-[440px]">
              {/* room for the snap and tag that poke out above each card */}
              <button
                type="button"
                onClick={() => setOpen({ index, side })}
                aria-haspopup="dialog"
                aria-label={`Read “${post.title}” in full`}
                className="block w-full cursor-pointer text-left"
                style={{ paddingTop: cardOverhang(BOARD_DISPLAY) }}
              >
                <PostCard post={post} index={index} side={side} display={BOARD_DISPLAY} clamp still />
              </button>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
        {open && <PostModal key={open.index} {...open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

// the card's own width in the modal, before it's blown up
const BASE_W = 400;
// room kept clear round the blown-up card (the photos hanging off its sides,
// the close button, a margin top and bottom)
const MARGIN_X = 120;
const MARGIN_Y = 96;

// The whole post over the board (dimmed and blurred behind it): the same
// card as on the board, in full, blown up so its photos and text read large
function PostModal({ index, side, onClose }) {
  const post = posts[index];
  const closeRef = useRef(null);
  const cardRef = useRef(null);
  const [view, setView] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  // the card's height at its own size (offsetHeight ignores the zoom)
  const [natH, setNatH] = useState(null);

  // blown up as far as the screen allows, both ways, up to 1.75x; never
  // below its own size (on phones it just scrolls)
  const base = Math.min(BASE_W, view.w - 48);
  const fitW = (view.w - MARGIN_X) / base;
  const fitH = natH ? (view.h - MARGIN_Y) / natH : fitW;
  const zoom = Math.max(1, Math.min(1.75, fitW, fitH));

  useLayoutEffect(() => {
    setNatH(cardRef.current.offsetHeight);
  }, [base, index]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const onResize = () => setView({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    // lock <html> as well as <body> (see ProjectModal), which also pauses Lenis
    const root = document.documentElement;
    const prev = [root.style.overflow, document.body.style.overflow];
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const opener = document.activeElement;
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      [root.style.overflow, document.body.style.overflow] = prev;
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      data-lenis-prevent
      className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-md"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed top-4 right-4 z-10 cursor-pointer transition hover:scale-110 md:top-6 md:right-6"
      >
        <span className="relative inline-flex items-center justify-center">
          <span className="h-8 w-8 rounded-full bg-(--pal-close)" />
          <IoIosCloseCircle size={36} className="absolute text-(--pal-close-icon)" />
        </span>
      </button>

      <div className="flex min-h-full items-center justify-center px-6 py-12">
        <motion.div
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-label={post.title}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          // zoom rather than a transform, so the modal makes room for the
          // card's full blown-up size (and scrolls if it's taller than the
          // screen)
          style={{ zoom, width: base, paddingTop: cardOverhang(BOARD_DISPLAY) }}
        >
          <PostCard
            post={post}
            index={index}
            side={side}
            display={BOARD_DISPLAY}
            photoScale={zoom}
            upright
            still
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
