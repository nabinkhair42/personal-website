import Image from "next/image";
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
  const darkSrc = src.replace(".svg", "-dark.svg");

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(className, hasDarkVariant && "dark:hidden")}
        title={title}
      />
      {hasDarkVariant && (
        <Image
          src={darkSrc}
          alt={alt}
          width={size}
          height={size}
          className={cn(className, "hidden dark:block")}
        />
      )}
    </>
  );
};

export default ThemedIcon;
