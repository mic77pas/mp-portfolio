"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

function toTitleCaseFromPath(pathname) {
  if (pathname === "/") return "Michael Pasyechnyk";

  const last = pathname.split("/").filter(Boolean).at(-1) ?? "";
  const page = last
    .split("-")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

  return `Michael Pasyechnyk / ${page || "Page"}`;
}

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const title = useMemo(() => toTitleCaseFromPath(pathname), [pathname]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  // Redesigned pages sit on the plain dark page background and lay out their
  // own spacing (the home hero and the posts climbing wall run edge-to-edge
  // underneath the fixed header)
  if (isHome || pathname === "/portfolio" || pathname.startsWith("/posts")) {
    return (
      <main className="w-full flex-1 flex flex-col items-center">
        {children}
      </main>
    );
  }

  // all other pages (not yet redesigned): waterfall backdrop, shared page width
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/bg/waterfall.gif')] bg-cover bg-center bg-no-repeat pointer-events-none">
        <div className="absolute inset-0 bg-[#242524]/90" />
      </div>
      <main className="w-full flex-1 flex justify-center pt-16 md:pt-26">
        <div className="page-container py-4 pt-5">{children}</div>
      </main>
    </>
  );
}
