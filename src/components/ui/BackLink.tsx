import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

interface BackLinkProps {
  href: string;
  label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      <ArrowIcon className="h-6 w-6 -scale-x-100 text-neutral-500 transition-colors group-hover:text-neutral-300" />
    </Link>
  );
}
