import { cn } from "@/lib/utils";

interface PageIntroProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageIntro({ title, description, className }: PageIntroProps) {
  return (
    <section className={cn("page-intro", className)}>
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </section>
  );
}
