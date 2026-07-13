import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TimelineLogoProps {
  src?: string;
  alt: string;
  objectFit?: "contain" | "cover";
  className?: string;
  fallback?: ReactNode;
}

export function TimelineLogo({
  src,
  alt,
  objectFit = "contain",
  className,
  fallback,
}: TimelineLogoProps) {
  const frameClass = cn(
    "size-10 shrink-0 rounded-md border bg-muted",
    objectFit === "cover" ? "object-cover p-px" : "object-contain p-px",
    className,
  );

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className={frameClass}
      />
    );
  }

  return (
    <div
      className={cn("flex items-center justify-center", frameClass)}
      aria-hidden={!fallback}
    >
      {fallback}
    </div>
  );
}
