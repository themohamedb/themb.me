import { siteConfig } from "@/lib/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:px-6 lg:max-w-7xl lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-1">
          <p className="text-sm text-neutral-400">
            © {year} {siteConfig.fullName}
          </p>
          <p className="text-xs text-neutral-600">
            Design, build, systems.
          </p>
        </div>

        <a
          href={`mailto:${siteConfig.email}`}
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:rounded-sm"
        >
          {siteConfig.email}
        </a>
      </div>
    </footer>
  );
}
