"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const formatTitle = (path) => {
      if (path === "/") return "Michael Pasyechnyk";
      const page = path
        .replace("/", "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return `${page} / Michael Pasyechnyk`;
    };

    document.title = formatTitle(pathname);
  }, [pathname]);

  return <>{children}</>;
}
