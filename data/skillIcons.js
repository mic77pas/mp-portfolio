import {
  FaReact,
  FaPython,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
} from "react-icons/fa";

import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiStyledcomponents,
  SiSupabase,
  SiPostgresql,
  SiMysql,
  SiDjango,
  SiVercel,
  SiNetlify,
  SiVite,
  SiJupyter,
  SiScikitlearn,
} from "react-icons/si";

export const skillIcons = {
  // Languages
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: FaPython, color: "#3776AB" },
  "C++": { icon: SiJavascript, color: "#00599C" }, // fallback if needed

  HTML5: { icon: FaHtml5, color: "#E34F26" },
  CSS3: { icon: FaCss3Alt, color: "#1572B6" },

  // Frontend
  React: { icon: FaReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Styled Components": { icon: SiStyledcomponents, color: "#DB7093" },

  // Backend / DB
  "Node.js": { icon: FaNodeJs, color: "#5FA04E" },
  Supabase: { icon: SiSupabase, color: "#3ECF8E" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  Django: { icon: SiDjango, color: "#092E20" },

  // Tools
  Git: { icon: FaGitAlt, color: "#F05032" },
  GitHub: { icon: FaGithub, color: "#FFFFFF" },
  Vercel: { icon: SiVercel, color: "#FFFFFF" },
  Docker: { icon: FaDocker, color: "#2496ED" },
  Netlify: { icon: SiNetlify, color: "#00C7B7" },
  Vite: { icon: SiVite, color: "#646CFF" },

  // Project-specific
  AWS: { icon: FaAws, color: "#FF9900" },
  JupyterLab: { icon: SiJupyter, color: "#F37626" },
  "scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
};
