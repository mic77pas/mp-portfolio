"use client";

export default function SkillSlides() {
  // Array of JSX elements for Devicon icons
  const skills = [
    <i class="devicon-javascript-plain colored text-5xl" />,
    <i className="devicon-react-original colored text-5xl" />,
    <i className="devicon-nextjs-original colored text-5xl" />,
    <i className="devicon-typescript-plain colored text-5xl" />,
    <i className="devicon-python-plain colored text-5xl" />,
    <i className="devicon-java-plain colored text-5xl" />,
  ];

  return (
    <div className="overflow-hidden w-full border-t border-b border-gray-700 py-4">
      <div className="flex animate-[scroll_5s_linear_infinite]">
        {/* duplicate skills to make the loop seamless */}
        {[...skills, ...skills].map((SkillElement, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-24 mx-4 text-[#98B493]"
          >
            {SkillElement}
          </div>
        ))}
      </div>
    </div>
  );
}
