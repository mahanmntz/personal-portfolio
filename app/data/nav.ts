import {
  HiBeaker,
  HiBookmarkAlt,
  HiHome,
  HiMusicNote,
  HiUser,
} from "react-icons/hi";
import type { IconType } from "react-icons";

export type NavLink = {
  title: string;
  href: string;
  icon: IconType;
};

// Single source of truth for navigation order (used by the navbar, the mobile
// bottom bar and the swipe-between-pages handler).
export const navLinks: NavLink[] = [
  { title: "Home", href: "/", icon: HiHome },
  { title: "About", href: "/about", icon: HiUser },
  { title: "Projects", href: "/projects", icon: HiBeaker },
  { title: "Blog", href: "/blog", icon: HiBookmarkAlt },
  { title: "Quotes", href: "/quotes", icon: HiMusicNote },
];
