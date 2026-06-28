import { HowIWorkCard } from "@/components/content/HowIWorkCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/config/metadata";
import { siteConfig } from "@/lib/config/site";
import { howIWorkItems } from "@/lib/content/how-i-work";

const stackTools = [
  "Figma",
  "Notion",
  "Claude",
  "Cursor",
  "Codex",
  "Canva",
  "Perplexity",
] as const;

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Mohamed Bashir — product builder working across design, code, workflows, and practical digital systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page-container page-stack">
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-white/[0.03] blur-3xl sm:-left-12"
        />

        <div className="relative space-y-8 lg:max-w-3xl">
          <div className="page-intro !space-y-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              About
            </p>
            <h1>{siteConfig.fullName}</h1>
            <p>
              Product builder working across design, code, workflows, and
              practical digital systems.
            </p>
          </div>

          <div className="max-w-2xl space-y-6 border-t border-white/[0.06] pt-8">
            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              My work starts with design — understanding the problem, shaping the
              interface, and making the idea clear. Then I use modern tools to
              move from idea to working product faster.
            </p>
            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              I care about useful products, clean interfaces, strong systems, and
              building with human judgment, not hype.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {stackTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500"
                >
                  {tool}
                </span>
              ))}
            </div>

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            >
              {siteConfig.email}
              <span aria-hidden className="text-muted">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          title="How I work"
          description="Design-first thinking, modern tools, and systems that turn ideas into products."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {howIWorkItems.map((item, index) => (
            <HowIWorkCard
              key={item.title}
              item={item}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
