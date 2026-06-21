"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks } from "@/app/data/nav";

export default function BottomNav() {
  const pathname = usePathname();

  // The studio has its own chrome — keep the bottom bar off it.
  if (pathname.startsWith("/studio")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 rounded-full border dark:border-zinc-700/60 border-zinc-200/80 dark:bg-zinc-900/60 bg-white/70 backdrop-blur-xl shadow-lg shadow-black/10 px-2 py-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-label={link.title}
            aria-current={isActive(link.href) ? "page" : undefined}
            className="relative grid place-items-center h-11 w-11 rounded-full"
          >
            {isActive(link.href) && (
              <motion.span
                layoutId="bottom-active-pill"
                className="absolute inset-0 rounded-full dark:bg-primary-color/15 bg-tertiary-color/10 border dark:border-primary-color/30 border-tertiary-color/20"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <link.icon
              className={`relative text-xl duration-300 ${
                isActive(link.href)
                  ? "dark:text-primary-color text-tertiary-color"
                  : "dark:text-zinc-400 text-zinc-500"
              }`}
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}
