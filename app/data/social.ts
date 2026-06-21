import {
  BiLinkExternal,
  BiLogoCodepen,
  BiLogoTelegram,
  BiLogoDribbble,
  BiLogoGithub,
  BiLogoGitlab,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoStackOverflow,
  BiLogoSteam,
  BiLogoUnsplash,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiCodewars, SiLinktree } from "react-icons/si";

/**
 * ❇️  سوشال مدیای خودت رو همین‌جا تنظیم کن.
 *  - فقط `url` هر آیتم رو با لینک خودت عوض کن (الان روی yousername = mahanmntz گذاشته شده).
 *  - آیتمی که نمی‌خوای، کل بلاکش رو پاک کن.
 *  - `status: "social"` → بخش شبکه‌های اجتماعی.
 */
export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/mahanmntz",
    icon: BiLogoGithub,
    status: "social",
  },
  {
    id: 2,
    name: "X",
    url: "https://x.com/mahanmntz",
    icon: FaSquareXTwitter,
    status: "social",
  },
  {
    id: 3,
    name: "Linkedin",
    url: "https://linkedin.com/in/mahanmntz",
    icon: BiLogoLinkedinSquare,
    status: "social",
  },
  {
    id:  4,
    name: "Instagram",
    url: "https://instagram.com/mahanmntz",
    icon: BiLogoInstagram,
    status: "social",
  },
  {
    id:  5,
    name: "Steam",
    url: "https://steamcommunity.com/id/mahanmntz",
    icon: BiLogoSteam,
    status: "social",
  },
  {
    id: 6,
    name: "Youtube",
    url: "https://youtube.com/@mahanmntz",
    icon: BiLogoYoutube,
    status: "social",
  },
  {
    id: 7,
    name: "Stackoverflow",
    url: "https://stackoverflow.com/users/mahanmntz",
    icon: BiLogoStackOverflow,
    status: "social",
  },
  {
    id: 8,
    name: "Codewars",
    url: "https://www.codewars.com/users/mahanmntz",
    icon: SiCodewars,
    status: "social",
  },
  {
    id: 9,
    name: "Gitlab",
    url: "https://gitlab.com/mahanmntz",
    icon: BiLogoGitlab,
    status: "social",
  },
  {
    id: 11,
    name: "Telegram",
    url: "https://t.me/mahanmntz",
    icon: BiLogoTelegram,
    status: "social",
  }
];
