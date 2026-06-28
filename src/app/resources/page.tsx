import { createPageMetadata } from "@/lib/config/metadata";
import { resourceSections } from "@/lib/content/resources";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = createPageMetadata({
  title: "Resources / Lab",
  description:
    "A living collection of useful tools, experiments, references, and practical systems.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <div className="page-container page-stack">
      <section className="page-intro lg:max-w-3xl">
        <h1>Resources / Lab</h1>
        <p>
          A living space for useful resources, experiments, workflows, and
          practical systems. Some are finished, some are still being tested. The
          point is to document the work clearly and keep improving it.
        </p>
      </section>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        {resourceSections.map((section) => (
          <section key={section.title} className="space-y-4">
            <SectionHeading title={section.title} as="h3" />
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:rounded-2xl"
                    >
                      <h4 className="text-sm font-medium text-white group-hover:text-neutral-200">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-neutral-400">
                        {item.description}
                      </p>
                    </a>
                  ) : (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-neutral-400">
                        {item.description}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
