import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-border bg-surface text-muted-light hover:border-neutral-700 hover:bg-[#161616]",
  secondary:
    "border-border bg-transparent text-muted-light hover:border-neutral-700",
  ghost:
    "border border-transparent bg-transparent text-muted hover:text-muted-light",
  text: "border-0 bg-transparent px-0 py-0 font-normal text-muted hover:text-neutral-300",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    variant === "text"
      ? variantStyles.text
      : cn(
          "rounded-full border px-5 py-2 font-semibold",
          variantStyles[variant],
        ),
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
