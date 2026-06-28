import Link from "next/link";
import type { Note } from "@/types/content";

interface NoteRowProps {
  note: Note;
}

export function NoteRow({ note }: NoteRowProps) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-base font-medium text-white group-hover:text-white">
            {note.title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-400">
            {note.description}
          </p>
        </div>
        <span
          aria-hidden
          className="mt-1 shrink-0 text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-400"
        >
          →
        </span>
      </div>
    </Link>
  );
}
