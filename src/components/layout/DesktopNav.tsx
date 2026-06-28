"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <header className="hidden lg:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 xl:max-w-7xl xl:px-8">
        <Link
          href="/"
          className="text-sm font-medium text-white transition-colors hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {mainNavigation.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                      active
                        ? "bg-white/[0.06] text-white"
                        : "text-neutral-400 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
