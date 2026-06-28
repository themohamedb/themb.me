import type { HowIWorkItem } from "@/types/content";

interface HowIWorkCardProps {
  item: HowIWorkItem;
}

export function HowIWorkCard({ item }: HowIWorkCardProps) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
      <div className="space-y-2">
        <h3 className="text-base font-medium text-white">{item.title}</h3>
        <p className="text-sm leading-relaxed text-neutral-400">
          {item.description}
        </p>
      </div>
    </article>
  );
}
