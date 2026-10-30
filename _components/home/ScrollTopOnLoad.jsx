"use client";

import { useLayoutEffect } from "react";

// The home page always opens at the very top on refresh instead of the
// browser restoring the old scroll position. That includes arriving via
// /#about (whose link doesn't reset scroll), so ProfileCard's scroll down to
// that section lifts the hero away from the top.
export default function ScrollTopOnLoad() {
  useLayoutEffect(() => {
    const { history } = window;
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // keep restoration off through the reload itself, then hand it back to
    // the browser when navigating to other pages
    const keepManual = () => (history.scrollRestoration = "manual");
    window.addEventListener("beforeunload", keepManual);
    return () => {
      window.removeEventListener("beforeunload", keepManual);
      history.scrollRestoration = "auto";
    };
  }, []);

  return null;
}
