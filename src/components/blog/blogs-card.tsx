import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  link: string;
  children?: React.ReactNode;
}

const BlogCard = React.forwardRef<HTMLDivElement, BlogCardProps>(
  ({ className, link, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded border hover:shadow-md transition", className)}
      {...props}
    >
      <Link href={link} className="block h-full w-full">
        {children}
      </Link>
    </div>
  )
);
BlogCard.displayName = "BlogCard";

const BlogCardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src: string; alt: string; priority?: boolean }
>(({ className, alt, src, priority = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative h-[190px] w-full rounded-t overflow-hidden mb-3", className)}
    {...props}
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 400px"
      priority={priority}
    />
  </div>
));
BlogCardImage.displayName = "BlogCardImage";

const BlogCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-medium leading-tight line-clamp-2", className)}
    {...props}
  />
));
BlogCardTitle.displayName = "BlogCardTitle";

const BlogCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground pb-2 line-clamp-3", className)}
    {...props}
  />
));
BlogCardDescription.displayName = "BlogCardDescription";

const BlogCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("px-3", className)} {...props} />
);
BlogCardContent.displayName = "BlogCardContent";

const BlogCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between px-3 py-2 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
BlogCardFooter.displayName = "BlogCardFooter";

export {
  BlogCard,
  BlogCardImage,
  BlogCardTitle,
  BlogCardDescription,
  BlogCardContent,
  BlogCardFooter,
};

export default BlogCard;
