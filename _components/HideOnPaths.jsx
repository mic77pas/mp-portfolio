"use client";

import { usePathname } from "next/navigation";

// Leaves its children out on the given routes: the site footer on /posts,
// where the climbing wall prints it on its crash pad instead
export default function HideOnPaths({ paths, children }) {
  return paths.includes(usePathname()) ? null : children;
}
