"use client";

import { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "about me", href: "#about-me" },
  { label: "resource", href: "#knowledge-hub" },
  { label: "lab", href: "#appliedlab" },
  { label: "notes", href: "#notes" },
];

function MenuArrow() {
  return (
    <span
      className="relative h-2.5 w-6 shrink-0 text-white before:absolute before:right-0 before:top-1/2 before:h-px before:w-[18px] before:-translate-y-1/2 before:bg-current after:absolute after:right-0 after:top-1/2 after:size-1.5 after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-current"
      aria-hidden="true"
    />
  );
}

export function FloatingMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed bottom-[max(24px,env(safe-area-inset-bottom))] right-[max(20px,calc((100vw-390px)/2+20px))] z-50"
    >
      <button
        className="relative grid size-10 place-items-center rounded-full border border-white/[0.12] bg-[#171717]/95 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-[#202020] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/25"
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="site-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span
          className="absolute left-1/2 top-[11px] h-0.5 w-3 -translate-x-1/2 rounded-full bg-current"
          aria-hidden="true"
        />
        <span
          className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
          aria-hidden="true"
        />
        <span
          className="absolute left-1/2 bottom-[11px] h-0.5 w-3 -translate-x-1/2 rounded-full bg-current"
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id="site-menu"
          className="absolute bottom-14 right-0 flex min-h-[244px] w-[min(240px,calc(100vw-40px))] flex-col justify-end rounded-xl border border-white/[0.14] bg-[#101010]/95 px-6 pb-5 pt-16 shadow-[0_28px_90px_rgba(0,0,0,0.46)] backdrop-blur-2xl"
        >
          <button
            className="absolute right-5 top-5 grid size-6 place-items-center rounded-full bg-white text-black transition duration-200 hover:-translate-y-0.5 hover:bg-[#d8d8d8] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/30"
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          >
            <span
              className="absolute h-0.5 w-3 rotate-45 rounded-full bg-current"
              aria-hidden="true"
            />
            <span
              className="absolute h-0.5 w-3 -rotate-45 rounded-full bg-current"
              aria-hidden="true"
            />
          </button>

          <div className="flex flex-col">
            {menuItems.map((item) => (
              <a
                key={`${item.label}-${item.href}`}
                className="flex min-h-[52px] items-center justify-between border-b border-white/[0.14] text-[13px] font-black tracking-[-0.04em] text-[#f4f4f4] transition duration-200 last:border-b-0 hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/25"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.label}</span>
                <MenuArrow />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
