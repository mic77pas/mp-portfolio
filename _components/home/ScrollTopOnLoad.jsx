"use client";

import { useLayoutEffect } from "react";

// The home page always opens at the very top on refresh instead of the
// browser restoring the old scroll position. (Arriving via /#about is left
// alone so ProfileCard can scroll to that section.)
export default function ScrollTopOnLoad() {
  useLayoutEffect(() => {
    const { history } = window;
    history.scrollRestoration = "manual";
    if (window.location.hash !== "#about") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

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
