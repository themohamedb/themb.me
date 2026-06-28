import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/site";

export function HeroSection() {
  return (
    <section className="space-y-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12 lg:space-y-0 xl:gap-16">
      <div className="space-y-6">
        <p className="font-mono text-sm text-neutral-500">hello world</p>
        <div className="space-y-4">
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            I&apos;m {siteConfig.name}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg lg:max-w-none">
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
