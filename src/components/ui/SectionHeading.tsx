import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  title,
  description,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Tag className="text-xs font-bold text-white sm:text-xl sm:font-medium sm:tracking-tight lg:text-2xl">
        {title}
      </Tag>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base sm:text-neutral-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
