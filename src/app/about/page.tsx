import { HowIWorkCard } from "@/components/content/HowIWorkCard";
import { EditorialLabel } from "@/components/ui/EditorialLabel";
import { createPageMetadata } from "@/lib/config/metadata";
import { siteConfig } from "@/lib/config/site";
import { howIWorkItems } from "@/lib/content/how-i-work";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Mohamed Bashir — product builder working across design, code, workflows, and practical digital systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page-container page-stack pt-28 sm:pt-32">
      <EditorialLabel label="About" />

      <section className="drop-cap-section">
        <span className="drop-cap" aria-hidden>
          A
        </span>
        <div className="page-intro lg:max-w-3xl">
          <h1 className="sr-only">About</h1>
          <p className="editorial-heading !text-3xl sm:!text-4xl lg:!text-5xl">
            <span className="sr-only">A</span>
            bout {siteConfig.fullName}
          </p>
          <div className="space-y-4 editorial-body">
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
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <EditorialLabel label="Process" repeat={2} />
        <h2 className="editorial-heading">
          How I <em className="italic">work</em>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {howIWorkItems.map((item) => (
            <HowIWorkCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
