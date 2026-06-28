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
      <Tag className="text-xl font-medium tracking-tight text-white sm:text-2xl">
        {title}
      </Tag>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
