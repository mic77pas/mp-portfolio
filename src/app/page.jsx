import Hero from "../../_components/home/Hero";
import ProfileCard from "../../_components/home/ProfileCard";
import WorkExperience from "../../_components/home/WorkExperience";
import ProjectsPreview from "../../_components/home/ProjectsPreview";
import ScrollTopOnLoad from "../../_components/home/ScrollTopOnLoad";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <ScrollTopOnLoad />

      {/* The hero lies on top of the page content: for the first screen of
          scrolling the content stays pinned (sticky) underneath while the
          hero lifts away, then the page scrolls normally. The spacer at the
          end matches the hero's height and is what gives the sticky content
          that first screen of "hold". */}
      <div className="relative w-full">
        <div className="absolute inset-x-0 top-0 z-20">
          <Hero />
        </div>

        <div data-hero-content className="sticky top-0 w-full flex flex-col items-center">
          {/* top margin clears the fixed header (64px mobile, 80px desktop) once the hero
              has lifted off */}
          <div className="page-container mt-[88px] md:mt-[112px] mb-[60px] md:mb-[90px] flex flex-col gap-[52px]">
            <ProfileCard />
            <WorkExperience />
            <ProjectsPreview />
          </div>
        </div>

        <div data-hero-spacer aria-hidden className="h-svh min-h-[600px]" />
      </div>
    </div>
  );
}
