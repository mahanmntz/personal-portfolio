"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks } from "@/app/data/nav";

export default function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="md:block hidden">
      <ul className="flex items-center gap-x-1">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`relative font-incognito text-base px-3.5 py-1.5 rounded-full duration-300 ${
                isActive(link.href)
                  ? "dark:text-white text-zinc-900"
                  : "dark:text-zinc-400 text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900"
              }`}
            >
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-full dark:bg-zinc-800 bg-zinc-100 border dark:border-zinc-700/60 border-zinc-200"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
