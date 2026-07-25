import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface SoftLinkProps extends ComponentProps<typeof Link> {
  underline?: boolean;
}

export function SoftLink({ className, underline = false, children, ...props }: SoftLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
        underline &&
          "underline decoration-from-font underline-offset-4 [text-underline-position:from-font]",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
