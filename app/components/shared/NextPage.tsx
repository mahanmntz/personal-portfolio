import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

// Themed "continue to the next page" guide card with a hover animation.
export default function NextPage({
  href,
  eyebrow,
  title,
}: {
  href: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="group mt-20 flex items-center justify-between gap-4 dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 dark:hover:border-zinc-700 hover:border-zinc-300 rounded-xl p-8 duration-300 hover:-translate-y-1"
    >
      <div>
        <p className="text-sm dark:text-zinc-400 text-zinc-500 mb-1">
          {eyebrow}
        </p>
        <h3 className="font-incognito text-2xl font-bold tracking-tight group-hover:dark:text-primary-color group-hover:text-tertiary-color duration-300">
          {title}
        </h3>
      </div>
      <span className="grid place-items-center min-h-[48px] min-w-[48px] rounded-full dark:bg-zinc-800 bg-zinc-100 group-hover:dark:bg-primary-color group-hover:bg-tertiary-color duration-300">
        <HiArrowRight className="text-xl duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
      </span>
    </Link>
  );
}
