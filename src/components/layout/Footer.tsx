import { siteConfig } from "@/lib/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="space-y-2">
            <p className="font-serif text-2xl font-light text-foreground">
              {siteConfig.fullName}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Design, build, systems.
            </p>
          </div>
          <div className="space-y-1 text-left sm:text-right">
            <a
              href={`mailto:${siteConfig.email}`}
              className="block font-mono text-[10px] tracking-wide text-muted transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            <p className="font-mono text-[10px] tracking-wide text-muted">
              © {year} {siteConfig.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
