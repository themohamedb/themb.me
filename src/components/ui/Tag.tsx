import { cn } from "@/lib/utils";
import type { ContentTag } from "@/types/content";

interface TagProps {
  label: ContentTag | string;
  className?: string;
}

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-neutral-400",
        className,
      )}
    >
      {label}
    </span>
  );
}
