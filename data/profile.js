// Content + config for the home page profile card, hero icons and work list.

export const profile = {
  // Level = age, EXP = progress to next birthday ("Lvl. up on July 30th!")
  birthday: "2006-07-30",

  // Online pill + HP bar are driven by local time in this timezone.
  // HP drains from 100% at wake time to 0% at sleep time; Online while awake.
  // `location` is the place named in the Offline hover note.
  timezone: "America/Los_Angeles",
  location: "California",
  // timezone: "America/Toronto",
  // location: "Toronto",
  wakeHour: 8,
  sleepHour: 23,

  photo: "/profile-climbing.jpg",
  photoCaption: "Outdoor climbing at Niagara Glen!",

  // mobile social-profile header: "@handle · tagline"
  handle: "mic77_pas",
  tagline: "SYDE @ UWaterloo",

  // [label](url) markers render as links
  bio: [
    "Hey! My name is Michael, and I’m a [Systems Design Engineering](https://uwaterloo.ca/systems-design-engineering/) student at the [University of Waterloo](https://uwaterloo.ca) based in both California and Toronto.",
    "My background mainly consists of front-end & full-stack software engineering, and am also interested in other areas like product design, UX/UI, AI, and 3D modelling.",
    "When I’m not on the grind, I also love to go climbing, travelling, cooking, and am always looking to learn or take on something new!",
  ],

  // D&D-style stat pills under the HP/EXP bars (icons mapped in ProfileCard)
  stats: [
    { key: "STR", value: "09" },
    { key: "DEX", value: "17" },
    { key: "INT", value: "15" },
    { key: "CHA", value: "12" },
  ],
};

export const heroIcons = [
  {
    href: "https://uwaterloo.ca/systems-design-engineering/",
    img: "/logos/greenwaterloo.png",
    hoverImg: "/logos/uwaterloo.png",
    label: "Studying SYDE",
    imgClassName: "saturate-60",
  },
  {
    href: "https://avante.io/",
    img: "/logos/experience/gAvante.png",
    hoverImg: "/logos/experience/avante.png",
    label: "Forward Deployed Engineer",
    imgClassName: "saturate-100 brightness-120",
  },
  {
    href: "https://linkedin.com/in/michaelpasyechnyk",
    img: "/logos/map.png",
    hoverImg: "/logos/mapcolored.png",
    label: "US/Canada",
  },
];

// `href` is the company site (opened from the logo); `bullets` fill the dropdown
export const workExperience = [
  {
    title: "Forward Deployed Engineer",
    company: "Avante IO",
    date: "Aug 2026 - Dec 2026",
    logo: "/logos/experience/avante.png",
    href: "https://www.avante.io/",
    bullets: [], // TODO: add what you're working on
  },
  {
    title: "Software Engineer",
    company: "ParkUsher",
    date: "Jan 2026 - Apr 2026",
    logo: "/logos/experience/parkusher.png",
    href: "https://www.parkusher.app/",
    bullets: [], // TODO: add what you worked on
  },
  {
    title: "Software Engineer",
    company: "IpserLab",
    date: "May 2025 - Aug 2025",
    logo: "/logos/experience/ipserlab.jpg",
    logoNeedsCrop: true, // square jpg; the pngs are already circular
    href: "https://ipserlab.com",
    bullets: [
      "Designed and implemented front-end features using React and TypeScript",
      "Worked closely with founders and engineers to define requirements and align with the product vision",
      "Gained exposure to Java-based backend systems, APIs, and deployment workflows",
      "Took part in Agile sprints and code reviews",
      "Helped reduce feature turnaround time by 15% while improving overall product quality",
    ],
  },
];
