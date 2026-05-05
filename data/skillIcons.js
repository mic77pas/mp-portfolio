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
import { FiFigma } from "react-icons/fi";

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
  SiFramer,
  SiReactquery,
  SiReactrouter,
  SiExpo,
  SiFastify,
} from "react-icons/si";

export const skillIcons = {
  // 🧠 Languages
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: FaPython, color: "#3776AB" },
  "C++": { icon: SiJavascript, color: "#00599C" }, // (optional: swap if you install a real C++ icon)

  HTML5: { icon: FaHtml5, color: "#E34F26" },
  CSS3: { icon: FaCss3Alt, color: "#1572B6" },

  // ⚛️ Frontend
  React: { icon: FaReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  "React Query": { icon: SiReactquery, color: "#FF4154" },
  "React Router": { icon: SiReactrouter, color: "#CA4245" },
  "Context API": { icon: FaReact, color: "#61DAFB" },

  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Styled Components": { icon: SiStyledcomponents, color: "#DB7093" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF" },

  // 📱 Mobile / Frontend Extensions
  "React Native": { icon: FaReact, color: "#61DAFB" },
  Expo: { icon: SiExpo, color: "#FFFFFF" },

  // 🖥️ Backend / DB
  "Node.js": { icon: FaNodeJs, color: "#5FA04E" },
  Fastify: { icon: SiFastify, color: "#000000" },

  Supabase: { icon: SiSupabase, color: "#3ECF8E" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  SQL: { icon: SiPostgresql, color: "#336791" },

  Django: { icon: SiDjango, color: "#4a9453" },

  // ☁️ Tools / Dev
  Git: { icon: FaGitAlt, color: "#F05032" },
  GitHub: { icon: FaGithub, color: "#FFFFFF" },

  Vercel: { icon: SiVercel, color: "#FFFFFF" },
  Netlify: { icon: SiNetlify, color: "#00C7B7" },

  Docker: { icon: FaDocker, color: "#2496ED" },
  AWS: { icon: FaAws, color: "#FF9900" },

  Vite: { icon: SiVite, color: "#646CFF" },
  Figma: { icon: FiFigma, color: "#F24E1E" },

  // 📊 Data / ML
  JupyterLab: { icon: SiJupyter, color: "#F37626" },
  "scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
};
