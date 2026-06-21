import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import LogoWhite from "@/public/logo-white.png";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <UnmountStudio>
      <header className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src={LogoWhite}
              width={35}
              height={35}
              alt="logo"
              className="block dark:hidden"
            />
            <Image
              src={Logo}
              width={35}
              height={35}
              alt="logo"
              className="hidden dark:block"
            />
          </Link>

          <NavLinks />

          <div className="flex items-center gap-x-4">
            <Theme />
          </div>
        </div>
      </header>
    </UnmountStudio>
  );
}
