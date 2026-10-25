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

// `href` is the company site (opened from the logo); `summary` is the one-line
// statement shown under each row
export const workExperience = [
  {
    title: "Forward Deployed Engineer",
    company: "Avante IO",
    date: "Aug 2026 - Dec 2026",
    logo: "/logos/experience/avante.png",
    href: "https://www.avante.io/",
    summary:
      "Designing client workflow architectures and building full-stack React, TypeScript & Django prototypes and automations, iterating with founders and clients.",
  },
  {
    title: "Software Engineer",
    company: "ParkUsher",
    date: "Jan 2026 - Apr 2026",
    logo: "/logos/experience/parkusher.png",
    href: "https://www.parkusher.app/",
    summary:
      "Shipped React Native + TypeScript features and Node.js/Fastify APIs for 10k+ users, improving task completion by 18% and cutting load times by 30%.",
  },
  {
    title: "Software Engineer",
    company: "IpserLab",
    date: "May 2025 - Aug 2025",
    logo: "/logos/experience/ipserlab.jpg",
    href: "https://ipserlab.com",
    summary:
      "Built React + TypeScript features for early-stage MVPs and led Agile sprints as acting Product Manager, improving feature turnaround time by 15%.",
  },
];

// `company` is the school / provider; `courses` are listed under the row by
// name. `date` is optional.
export const education = [
  {
    title: "Systems Design Engineering (BASc)",
    company: "University of Waterloo",
    logo: "/logos/uwaterloo.png",
    href: "https://uwaterloo.ca/systems-design-engineering/",
    courses: [],
  },
  {
    title: "CS50 Courses",
    company: "Harvard University",
    logo: "/logos/harvardlogo.png",
    href: "https://cs50.harvard.edu/",
    courses: [
      "CS50W: Web Programming with Python and JavaScript",
      "CS50P: Introduction to Programming with Python",
    ],
  },
  {
    title: "Online Courses",
    company: "Udemy",
    logo: "/logos/udemy.png",
    href: "https://www.udemy.com/",
    courses: [
      "TypeScript Fundamentals",
      "Modern React & Front-End Development",
    ],
  },
  {
    title: "Claude Courses",
    company: "Anthropic Academy",
    logo: "/logos/anthropic.png",
    href: "https://anthropic.skilljar.com/",
    courses: [
      "Claude 101",
      "AI Fluency: Framework & Foundations",
    ],
  },
];
