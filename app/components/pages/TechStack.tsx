import { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedux,
  SiDocker,
  SiGit,
  SiFigma,
  SiSanity,
  SiVercel,
  SiExpress,
} from "react-icons/si";
import { Slide } from "../../animation/Slide";
import ScrambleText from "../../animation/ScrambleText";

type Tech = { name: string; Icon: IconType; color?: string };

// ❇️ Edit your stack here (logos only). `color` optional — omit for mono brands.
const rowOne: Tech[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Redux", Icon: SiRedux, color: "#764ABC" },
];

const rowTwo: Tech[] = [
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Express", Icon: SiExpress },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Sanity", Icon: SiSanity, color: "#F03E2F" },
  { name: "Vercel", Icon: SiVercel },
];

function Row({ items, direction }: { items: Tech[]; direction: "left" | "right" }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <ul
        className={`marquee-track flex items-center gap-4 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {loop.map((tech, i) => (
          <li
            key={`${tech.name}-${i}`}
            title={tech.name}
            aria-label={tech.name}
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl dark:bg-zinc-900/60 bg-white border dark:border-zinc-800 border-zinc-200 duration-300 hover:-translate-y-1 hover:dark:border-zinc-700 hover:border-zinc-300"
          >
            <tech.Icon
              className={`text-3xl ${
                tech.color ? "" : "dark:text-white text-zinc-700"
              }`}
              style={tech.color ? { color: tech.color } : undefined}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="mt-20 md:mt-28">
      <Slide delay={0.16}>
        <h2 className="font-incognito text-4xl font-bold tracking-tight mb-10">
          <ScrambleText text="Tech Stack" />
        </h2>
      </Slide>

      <Slide delay={0.18}>
        <div className="group/marquee dark:bg-primary-bg/40 bg-secondary-bg border dark:border-zinc-800 border-zinc-200 rounded-2xl p-8 flex flex-col gap-5">
          <Row items={rowOne} direction="left" />
          <Row items={rowTwo} direction="right" />
        </div>
      </Slide>
    </section>
  );
}
