import Image from "next/image";
import Logo from "@/public/logo.png";

// Shown automatically by Next.js while a route segment is loading.
export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center">
      <div className="relative grid place-items-center">
        {/* spinning ring in the app's accent color */}
        <span className="absolute h-24 w-24 rounded-full border-2 border-transparent border-t-primary-color dark:border-t-primary-color animate-spin" />
        {/* logo gently pulsing in the center */}
        <Image
          src={Logo}
          width={48}
          height={48}
          alt="Loading"
          priority
          className="animate-pulse"
        />
      </div>
    </div>
  );
}
