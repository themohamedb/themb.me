"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { mainNavigation } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function FloatingMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative z-50 flex w-full justify-end px-4 pb-6 lg:hidden">
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="relative ml-auto w-fit">
        <div
          className={cn(
            "absolute bottom-[calc(100%+12px)] right-0 w-[240px] overflow-hidden rounded-[10px] border border-border-menu bg-surface-elevated shadow-2xl shadow-black/50 transition-all duration-300",
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          aria-hidden={!open}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <nav className="px-6 pb-6 pt-14">
            <ul className="space-y-[17px]">
              {mainNavigation.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-light">
                        {item.label}
                      </span>
                      <ArrowIcon className="h-6 w-6 text-neutral-500 transition-colors group-hover:text-neutral-300" />
                    </div>
                    {index < mainNavigation.length - 1 ? (
                      <div className="mt-[11px] border-b border-border-subtle" />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border-subtle px-6 py-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[10px] text-muted transition-colors hover:text-neutral-300"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="ml-auto flex h-[31px] w-[31px] items-center justify-center rounded-[15.5px] border border-[#252525] bg-surface shadow-[0_4px_6px_rgba(0,0,0,0.35)] transition-colors hover:border-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="flex flex-col gap-[3px]">
            <span className="h-[1.7px] w-3 rounded-sm bg-[#dbdbdb]" />
            <span className="h-[1.7px] w-3 rounded-sm bg-[#dbdbdb]" />
            <span className="h-[1.7px] w-3 rounded-sm bg-[#dbdbdb]" />
          </span>
        </button>
      </div>
    </div>
  );
}
