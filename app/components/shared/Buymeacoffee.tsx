// ☕ لینک حمایت مالی — هر وقت خواستی، فقط همین خط رو عوض کن.
const SUPPORT_URL = "https://daramet.com/montify";

export default function Buymeacoffee() {
  return (
    <a
      href={SUPPORT_URL}
      className="flex items-center lg:flex-row flex-col lg:justify-around justify-center lg:text-start text-center gap-4 min-h-[110px] dark:bg-primary-bg bg-secondary-bg hover:dark:bg-[#2e290e44] rounded-lg border dark:border-zinc-800 border-zinc-200 hover:dark:border-[#ffdd0060] hover:border-[#e6d14fe7] duration-300 p-6 group"
      target="_blank"
      rel="noreferrer noopener"
    >
      Do you feel like supporting my work? 🙂
      <span className="inline-flex items-center gap-x-2 whitespace-nowrap rounded-md bg-[#FFDD00] px-4 py-2 font-semibold text-black grayscale group-hover:grayscale-0 duration-300">
        ☕ Buy me a coffee
      </span>
    </a>
  );
}
