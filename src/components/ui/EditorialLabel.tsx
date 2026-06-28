import { cn } from "@/lib/utils";

interface EditorialLabelProps {
  label: string;
  className?: string;
  repeat?: 1 | 2 | 3;
}

export function EditorialLabel({
  label,
  className,
  repeat = 3,
}: EditorialLabelProps) {
  const items = Array.from({ length: repeat }, (_, index) => index);

  return (
    <div
      className={cn(
        "grid items-center gap-4",
        repeat === 3 && "grid-cols-3",
        repeat === 2 && "grid-cols-2",
        repeat === 1 && "grid-cols-1",
        className,
      )}
      aria-hidden
    >
      {items.map((item) => (
        <span key={item} className="editorial-label text-center">
          {label}
        </span>
      ))}
    </div>
  );
}
