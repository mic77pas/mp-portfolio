"use client";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SocialLinks from "./SocialLinks"; // new component
import DarkModeToggle from "./DarkModeToggle"; // optional, if you have one

export default function Header() {
  return (
    <header className="sticky top-0 bg-neutral-800/30 backdrop-blur-lg px-8 py-4 z-30 rounded-b-xl shadow-2xl text-xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left: Logo + Main Nav */}
        <div className="flex items-center gap-12">
          <Logo />
          <Navigation />
        </div>

        {/* Right: Resume, Contact, LinkedIn, GitHub, Dark/Light */}
        <div className="flex items-center gap-12">
          <SocialLinks />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
