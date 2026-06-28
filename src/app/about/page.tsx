import { HowIWorkCard } from "@/components/content/HowIWorkCard";
import { createPageMetadata } from "@/lib/config/metadata";
import { howIWorkItems } from "@/lib/content/how-i-work";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Mohamed Bashir — product builder working across design, code, workflows, and practical digital systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page-container page-stack">
      <section className="page-intro lg:max-w-3xl">
        <h1>About</h1>
        <div className="space-y-4 text-base leading-relaxed text-neutral-400 sm:text-lg">
          <p>
            I&apos;m Mohamed Bashir, a product builder working across design,
            code, workflows, and practical digital systems.
          </p>
          <p>
            My work starts with design: understanding the problem, shaping the
            interface, and making the idea clear. Then I use modern tools like
            Figma, Notion, Claude, Codex, Cursor, Canva, and Perplexity to
            move from idea to working product faster.
          </p>
          <p>
            I care about useful products, clean interfaces, strong systems, and
            building with human judgment, not hype.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading title="How I work" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {howIWorkItems.map((item) => (
            <HowIWorkCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
