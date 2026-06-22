import { techRegistry } from "@/app/data/tech";

// Renders a project's tech stack as brand-colored logos (logos > text).
export default function StackIcons({
  stack,
  size = "sm",
}: {
  stack?: string[];
  size?: "sm" | "md";
}) {
  if (!stack || stack.length === 0) return null;

  const box = size === "md" ? "h-9 w-9" : "h-7 w-7";
  const icon = size === "md" ? "text-xl" : "text-base";

  return (
    <ul className="flex flex-wrap items-center gap-1.5">
      {stack.map((key) => {
        const tech = techRegistry[key];
        if (!tech) return null;
        return (
          <li
            key={key}
            title={tech.name}
            aria-label={tech.name}
            className={`grid ${box} place-items-center rounded-md dark:bg-zinc-800/70 bg-white border dark:border-zinc-700 border-zinc-200`}
          >
            <tech.Icon
              className={`${icon} ${
                tech.color ? "" : "dark:text-white text-zinc-700"
              }`}
              style={tech.color ? { color: tech.color } : undefined}
            />
          </li>
        );
      })}
    </ul>
  );
}
