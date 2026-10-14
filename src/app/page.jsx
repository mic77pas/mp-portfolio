import Hero from "../../_components/home/Hero";
import ProfileCard from "../../_components/home/ProfileCard";
import WorkExperience from "../../_components/home/WorkExperience";
import ProjectsPreview from "../../_components/home/ProjectsPreview";
import ScrollTopOnLoad from "../../_components/home/ScrollTopOnLoad";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <ScrollTopOnLoad />
      <Hero />

      <div className="page-container mt-[61px] mb-[60px] md:mb-[90px] flex flex-col gap-[52px]">
        <ProfileCard />
        <WorkExperience />
        <ProjectsPreview />
      </div>
    </div>
  );
}
