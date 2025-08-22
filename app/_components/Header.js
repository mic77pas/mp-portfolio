
"use client"
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="sticky top-0 bg-neutral-800/30 backdrop-blur-lg px-8 py-4 z-30 rounded-b-xl shadow-2xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
