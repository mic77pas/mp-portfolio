"use client";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";


export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`
        relative w-16 h-9 flex items-center rounded-full p-1 transition-colors duration-300
        ${dark ? "bg-neutral-800" : "bg-gray-300"}
      `}
    >
      {/* Circle with icon */}
      <span
        className={`
          w-7 h-7 flex items-center justify-center rounded-full shadow-md transform transition-transform duration-300
          ${dark ? "translate-x-7 bg-neutral-800 text-white" : "translate-x-0 bg-white"}
        `}
      >
        {dark ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />}
      </span>
    </button>
  );
}
