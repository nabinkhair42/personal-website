"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemedIconProps {
  src: string;
  alt: string;
  size?: number;
  hasDarkVariant?: boolean;
  className?: string;
  title?: string;
}

const ThemedIcon = ({
  src,
  alt,
  size = 20,
  hasDarkVariant = false,
  className,
  title,
}: ThemedIconProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const activeSrc = hasDarkVariant && isDark ? src.replace(".svg", "-dark.svg") : src;

  return (
    <Image
      src={activeSrc}
      alt={alt}
      width={size}
      height={size}
      className={cn(className)}
      title={title}
    />
  );
};

export default ThemedIcon;
