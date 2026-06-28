import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container flex min-h-[50vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-sm text-neutral-500">404</p>
      <h1 className="mt-4 text-2xl font-medium text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-white/30 hover:bg-white/5"
      >
        back home
      </Link>
    </div>
  );
}
