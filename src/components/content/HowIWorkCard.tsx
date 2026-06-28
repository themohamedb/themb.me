import { cn } from "@/lib/utils";
import type { HowIWorkItem } from "@/types/content";

interface HowIWorkCardProps {
  item: HowIWorkItem;
  index?: number;
  featured?: boolean;
}

export function HowIWorkCard({
  item,
  index,
  featured = false,
}: HowIWorkCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 transition-all duration-300 hover:border-white/[0.12] hover:from-white/[0.06] sm:p-6",
        featured && "sm:col-span-2 lg:col-span-2",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="space-y-3">
        {index !== undefined ? (
          <span className="font-mono text-[10px] tabular-nums tracking-[0.14em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
        <div className="space-y-2">
          <h3 className="text-base font-medium tracking-tight text-white">
            {item.title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed text-neutral-400",
              featured && "sm:max-w-lg",
            )}
          >
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}
