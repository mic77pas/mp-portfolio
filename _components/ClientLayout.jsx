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

  if (isHome) {
    // fills available main height and centers both ways
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        {children}
      </div>
    );
  }

  // all other pages: centered horizontally, max width 5xl
  return <div className="w-full max-w-5xl px-8 mx-auto pt-10">{children}</div>;
}