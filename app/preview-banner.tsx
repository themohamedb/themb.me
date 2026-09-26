// Shown only on Vercel preview deployments so a preview is never mistaken
// for the live site. VERCEL_ENV is "production" on themb.me, "preview" on
// every other branch, and unset locally.
export function PreviewBanner() {
  if (process.env.VERCEL_ENV !== "preview") return null;

  const branch = process.env.VERCEL_GIT_COMMIT_REF;

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4"
    >
      <span className="rounded-full border border-amber-300/40 bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-200 backdrop-blur">
        Preview{branch ? ` · ${branch}` : ""} — not live
      </span>
    </div>
  );
}
