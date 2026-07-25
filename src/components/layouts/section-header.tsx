import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends ComponentPropsWithoutRef<"header"> {
  label?: string;
  title: string;
  description?: string;
  headingLevel?: "h1" | "h2";
}

export function SectionHeader({
  label,
  title,
  description,
  headingLevel: Heading = "h2",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label ? <p className="text-sm text-muted-foreground">{label}</p> : null}
      <Heading className="text-xl font-medium tracking-tight text-balance leading-[1.15] md:text-2xl">
        {title}
      </Heading>
      {description ? (
        <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
