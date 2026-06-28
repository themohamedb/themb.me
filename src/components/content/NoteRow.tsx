import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import type { Note } from "@/types/content";
import { cn } from "@/lib/utils";

interface NoteRowProps {
  note: Note;
  showDivider?: boolean;
}

export function NoteRow({ note, showDivider = true }: NoteRowProps) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className={cn(
        "group block py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        showDivider && "border-b border-border-subtle",
      )}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="min-w-0 space-y-1.5">
          <h3 className="text-xs text-white">{note.title}</h3>
          <p className="text-[10px] leading-normal text-muted">
            {note.description}
          </p>
        </div>
        <ArrowIcon className="h-6 w-6 shrink-0 text-neutral-500 transition-colors group-hover:text-neutral-300" />
      </div>
    </Link>
  );
}
