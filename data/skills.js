// data/skillsData.js
const OLIVE_GREEN = "90AD8F";

export const CATEGORY_COLORS = {
  Language: "#cf9182", // Example Color 1 (Choose your own)
  Frontend: "#abcddb", // Olive Green (Matching your palette)
  Backend: "#abcf82",
  Database: "#cfbe82",
  "DevOps/Tool": "#b888ba",
  // Design: "#b888ba",
};

export const skills = [
  // --- Languages ---
  {
    name: "JavaScript",
    category: "Language",
    icon: `https://cdn.simpleicons.org/javascript/${OLIVE_GREEN}`, // Using a placeholder color in the link
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: `https://cdn.simpleicons.org/typescript/${OLIVE_GREEN}`,
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Python",
    category: "Language",
    icon: `https://cdn.simpleicons.org/python/${OLIVE_GREEN}`,
    link: "https://www.python.org/",
  },
  {
    name: "C++",
    category: "Language",
    icon: `https://cdn.simpleicons.org/cplusplus/${OLIVE_GREEN}`,
    link: "https://isocpp.org/",
  },
  {
    name: "HTML5",
    category: "Language",
    icon: `https://cdn.simpleicons.org/html5/${OLIVE_GREEN}`,
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS3",
    category: "Language",
    icon: `https://cdn.simpleicons.org/css/${OLIVE_GREEN}`,
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },

  // --- Frontend / State ---
  {
    name: "React",
    category: "Frontend",
    icon: `https://cdn.simpleicons.org/react/${OLIVE_GREEN}`,
    link: "https://react.dev/",
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: `https://cdn.simpleicons.org/nextdotjs/${OLIVE_GREEN}`,
    link: "https://nextjs.org/",
  },
  {
    name: "Redux",
    category: "Frontend",
    icon: `https://cdn.simpleicons.org/redux/${OLIVE_GREEN}`,
    link: "https://redux.js.org/",
  },
  // --- Styling ---
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: `https://cdn.simpleicons.org/tailwindcss/${OLIVE_GREEN}`,
    link: "https://tailwindcss.com/",
  },
  {
    name: "Styled Components",
    category: "Frontend",
    icon: `https://cdn.simpleicons.org/styledcomponents/${OLIVE_GREEN}`,
    link: "https://styled-components.com/",
  },

  // --- Backend / Database ---
  {
    name: "Node.js",
    category: "Backend",
    icon: `https://cdn.simpleicons.org/nodedotjs/${OLIVE_GREEN}`,
    link: "https://nodejs.org/en",
  },
  {
    name: "Supabase",
    category: "Backend",
    icon: `https://cdn.simpleicons.org/supabase/${OLIVE_GREEN}`,
    link: "https://supabase.com/",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: `https://cdn.simpleicons.org/postgresql/${OLIVE_GREEN}`,
    link: "https://www.postgresql.org/",
  },
  {
    name: "MySQL",
    category: "Database",
    icon: `https://cdn.simpleicons.org/mysql/${OLIVE_GREEN}`,
    link: "https://www.mysql.com/",
  },
  {
    name: "Django",
    category: "Backend",
    icon: `https://cdn.simpleicons.org/django/${OLIVE_GREEN}`,
    link: "https://www.djangoproject.com/",
  },

  // --- Tools & Deployment ---
  {
    name: "Git",
    category: "DevOps/Tool",
    icon: `https://cdn.simpleicons.org/git/${OLIVE_GREEN}`,
    link: "https://git-scm.com/",
  },
  {
    name: "GitHub",
    category: "DevOps/Tool",
    icon: `https://cdn.simpleicons.org/github/${OLIVE_GREEN}`,
    link: "https://github.com/",
  },
  {
    name: "Vercel",
    category: "DevOps/Tool",
    icon: `https://cdn.simpleicons.org/vercel/${OLIVE_GREEN}`,
    link: "https://vercel.com/",
  },
  {
    name: "Docker",
    category: "DevOps/Tool",
    icon: `https://cdn.simpleicons.org/docker/${OLIVE_GREEN}`,
    link: "https://www.docker.com/",
  },
  {
    name: "Netlify",
    category: "DevOps/Tool",
    icon: `https://cdn.simpleicons.org/netlify/${OLIVE_GREEN}`,
    link: "https://www.netlify.com/",
  },
  {
    name: "Vite",
    category: "DevOps/Tool",
    icon: `https://cdn.simpleicons.org/vite/${OLIVE_GREEN}`,
    link: "https://vite.dev/",
  },
  {
    name: "MCP",
    category: "DevOps/Tool",
    icon: `https://cdn.simpleicons.org/modelcontextprotocol/${OLIVE_GREEN}`,
    link: "https://modelcontextprotocol.io/",
  },

  // // --- Design / Other ---
  // {
  //   name: "Figma",
  //   category: "Design",
  //   icon: `https://cdn.simpleicons.org/figma/${OLIVE_GREEN}`,
  //   link: "https://www.figma.com/",
  // },
  // {
  //   name: "Notion",
  //   category: "Design",
  //   icon: `https://cdn.simpleicons.org/notion/${OLIVE_GREEN}`,
  //   link: "https://www.notion.so/",
  // },
];
