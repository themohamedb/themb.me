"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 pb-6 lg:hidden">
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="relative mx-auto max-w-lg">
        <div
          className={cn(
            "overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#0a0a0a] shadow-2xl shadow-black/50 transition-all duration-300",
            open
              ? "pointer-events-auto mb-3 max-h-[min(70vh,520px)] opacity-100"
              : "pointer-events-none mb-0 max-h-0 opacity-0",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          aria-hidden={!open}
        >
          <nav className="p-2">
            <ul className="divide-y divide-white/[0.06]">
              {mainNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3.5 text-sm text-neutral-300 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="border-t border-white/[0.06] px-4 py-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-xs text-neutral-500 transition-colors hover:text-neutral-300"
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
          className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] bg-[#111111] text-white shadow-lg shadow-black/40 transition-colors hover:border-white/20 hover:bg-[#161616] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative h-4 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-4 bg-white transition-transform duration-200",
                open ? "top-[7px] rotate-45" : "",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] h-0.5 w-4 bg-white transition-opacity duration-200",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[14px] h-0.5 w-4 bg-white transition-transform duration-200",
                open ? "top-[7px] -rotate-45" : "",
              )}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
