import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/site";

export function HeroSection() {
  return (
    <section className="space-y-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12 lg:space-y-0 xl:gap-16">
      <div className="space-y-3 lg:space-y-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Portfolio
        </p>
        <div className="space-y-3 lg:space-y-4">
          <h1 className="text-2xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            I&apos;m {siteConfig.name}
          </h1>
          <p className="max-w-xs text-sm leading-[1.23] text-muted sm:max-w-xl sm:text-lg lg:max-w-none lg:text-neutral-400">
            I design to understand the world, then build with code, tools, and
            systems. This is where I document my products, interfaces,
            workflows, notes, and experiments.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 lg:justify-end">
        <Button href="/building">what I&apos;m building</Button>
        <Button href="/notes" variant="secondary">
          notes &amp; ideas
        </Button>
      </div>
    </section>
  );
}
