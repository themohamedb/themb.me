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
        "inline-flex h-[21px] min-w-[64px] shrink-0 items-center justify-center rounded-full border border-border bg-surface-tag px-3 text-[8px] font-normal text-muted",
        className,
      )}
    >
      {label}
    </span>
  );
}
