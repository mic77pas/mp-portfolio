"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const formatTitle = (path) => {
      if (path === "/") return "Michael Pasyechnyk";

      // Split by '/' and remove empty strings
      const parts = path.split("/").filter(Boolean);

      // Take only the *last* segment (e.g. 'geomatics' from '/about/geomatics')
      const page = parts[parts.length - 1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return `Michael Pasyechnyk / ${page}`;
    };

    document.title = formatTitle(pathname);
  }, [pathname]);

  return <>{children}</>;
}
