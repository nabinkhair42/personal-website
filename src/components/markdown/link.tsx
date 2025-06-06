import NextLink from "next/link";
import { ComponentProps } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Link({ href, className, children, ...props }: ComponentProps<"a">) {
  if (!href) return null;

  const isExternal = href.startsWith("http") || href.startsWith("//");
  
  return (
    <NextLink
      href={href}
      className={cn(
        "inline-flex items-center gap-1 text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-300 underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-600 hover:decoration-zinc-600 dark:hover:decoration-zinc-400 font-medium",
        className
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      <span>{children}</span>
      {isExternal && (
        <ExternalLink className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
      )}
    </NextLink>
  );
}