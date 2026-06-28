import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

export function MobileHeader() {
  return (
    <header className="px-5 pt-8 sm:px-6 lg:hidden">
      <Link
        href="/"
        className="inline-block text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {siteConfig.name}
      </Link>
    </header>
  );
}
