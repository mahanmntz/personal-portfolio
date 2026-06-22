import { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiSvelte,
  SiAngular,
  SiAstro,
  SiRemix,
  SiNestjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiLaravel,
  SiSpring,
  SiFlutter,
  SiExpo,
  SiSwift,
  SiTailwindcss,
  SiThreedotjs,
  SiFramer,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPhp,
  SiGo,
  SiRust,
  SiCplusplus,
  SiKotlin,
  SiDart,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiGraphql,
  SiFirebase,
  SiSupabase,
  SiDocker,
  SiGit,
  SiRedux,
  SiFigma,
  SiSanity,
  SiVercel,
  SiCloudflare,
  SiNodedotjs,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export type TechCategory = "framework" | "technology";
export type Tech = {
  name: string;
  Icon: IconType;
  color?: string;
  category: TechCategory;
};

// Single source of truth: value (stored in Sanity) -> logo, brand color, category.
export const techRegistry: Record<string, Tech> = {
  // ---- Frameworks (web, backend, mobile) ----
  react: { name: "React", Icon: SiReact, color: "#61DAFB", category: "framework" },
  nextjs: { name: "Next.js", Icon: SiNextdotjs, category: "framework" },
  vue: { name: "Vue", Icon: SiVuedotjs, color: "#4FC08D", category: "framework" },
  svelte: { name: "Svelte", Icon: SiSvelte, color: "#FF3E00", category: "framework" },
  angular: { name: "Angular", Icon: SiAngular, color: "#DD0031", category: "framework" },
  astro: { name: "Astro", Icon: SiAstro, color: "#FF5D01", category: "framework" },
  remix: { name: "Remix", Icon: SiRemix, category: "framework" },
  nestjs: { name: "NestJS", Icon: SiNestjs, color: "#E0234E", category: "framework" },
  express: { name: "Express", Icon: SiExpress, category: "framework" },
  nodejs: { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E", category: "framework" },
  django: { name: "Django", Icon: SiDjango, color: "#0C9D58", category: "framework" },
  flask: { name: "Flask", Icon: SiFlask, category: "framework" },
  fastapi: { name: "FastAPI", Icon: SiFastapi, color: "#009688", category: "framework" },
  laravel: { name: "Laravel", Icon: SiLaravel, color: "#FF2D20", category: "framework" },
  spring: { name: "Spring", Icon: SiSpring, color: "#6DB33F", category: "framework" },
  reactnative: { name: "React Native", Icon: TbBrandReactNative, color: "#61DAFB", category: "framework" },
  flutter: { name: "Flutter", Icon: SiFlutter, color: "#02569B", category: "framework" },
  expo: { name: "Expo", Icon: SiExpo, category: "framework" },
  swiftui: { name: "SwiftUI", Icon: SiSwift, color: "#F05138", category: "framework" },
  tailwindcss: { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8", category: "framework" },
  threejs: { name: "Three.js", Icon: SiThreedotjs, category: "framework" },
  framer: { name: "Framer Motion", Icon: SiFramer, color: "#0055FF", category: "framework" },

  // ---- Technologies, languages, databases & tools ----
  typescript: { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", category: "technology" },
  javascript: { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", category: "technology" },
  python: { name: "Python", Icon: SiPython, color: "#3776AB", category: "technology" },
  php: { name: "PHP", Icon: SiPhp, color: "#777BB4", category: "technology" },
  go: { name: "Go", Icon: SiGo, color: "#00ADD8", category: "technology" },
  rust: { name: "Rust", Icon: SiRust, category: "technology" },
  cpp: { name: "C++", Icon: SiCplusplus, color: "#00599C", category: "technology" },
  kotlin: { name: "Kotlin", Icon: SiKotlin, color: "#7F52FF", category: "technology" },
  dart: { name: "Dart", Icon: SiDart, color: "#0175C2", category: "technology" },
  postgresql: { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", category: "technology" },
  mysql: { name: "MySQL", Icon: SiMysql, color: "#4479A1", category: "technology" },
  mongodb: { name: "MongoDB", Icon: SiMongodb, color: "#47A248", category: "technology" },
  redis: { name: "Redis", Icon: SiRedis, color: "#FF4438", category: "technology" },
  prisma: { name: "Prisma", Icon: SiPrisma, category: "technology" },
  graphql: { name: "GraphQL", Icon: SiGraphql, color: "#E10098", category: "technology" },
  firebase: { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", category: "technology" },
  supabase: { name: "Supabase", Icon: SiSupabase, color: "#3FCF8E", category: "technology" },
  docker: { name: "Docker", Icon: SiDocker, color: "#2496ED", category: "technology" },
  git: { name: "Git", Icon: SiGit, color: "#F05032", category: "technology" },
  redux: { name: "Redux", Icon: SiRedux, color: "#764ABC", category: "technology" },
  figma: { name: "Figma", Icon: SiFigma, color: "#F24E1E", category: "technology" },
  sanity: { name: "Sanity", Icon: SiSanity, color: "#F03E2F", category: "technology" },
  vercel: { name: "Vercel", Icon: SiVercel, category: "technology" },
  cloudflare: { name: "Cloudflare", Icon: SiCloudflare, color: "#F38020", category: "technology" },
};

const optionsByCategory = (category: TechCategory) =>
  Object.entries(techRegistry)
    .filter(([, t]) => t.category === category)
    .map(([value, t]) => ({ title: t.name, value }));

// For the Sanity dropdowns (title shown, value stored).
export const frameworkOptions = optionsByCategory("framework");
export const technologyOptions = optionsByCategory("technology");
