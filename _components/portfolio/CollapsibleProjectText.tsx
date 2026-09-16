import { useState } from "react";

export function CollapsibleProjectText({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <div className="border-b-2 border-border-subtle py-3 last:border-b-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
      >
        <p className="text-2xl text-text-primary [text-shadow:var(--shadow-text-strong)]">
          {title}
        </p>

        <span
          className={`text-xl text-accent transition-transform duration-300 ${
            open ? "rotate-90" : "rotate-0"
          }`}
        >
          &gt;
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-1 text-text-secondary">{children}</div>
        </div>
      </div>
    </div>
  );
}
