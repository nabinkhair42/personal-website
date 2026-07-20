import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends ComponentPropsWithoutRef<"header"> {
  label: string;
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
    <header className={cn("flex flex-col gap-2", className)} {...props}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <Heading className="text-3xl font-medium tracking-tight md:text-4xl">{title}</Heading>
      {description ? <p className="text-muted-foreground">{description}</p> : null}
    </header>
  );
}
