import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/markdown/mdx";
import { DEFAULT_OG_IMAGE } from "@/lib/site";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  className?: string;
}

export function BlogCard({ post, priority, className }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const href = `/blog/${slug}`;
  const title = frontmatter.title;
  const description = frontmatter.description;
  const thumbnail = frontmatter.image || DEFAULT_OG_IMAGE;

  return (
    <Link
      href={href}
      aria-label={title}
      className={cn(
        "group flex items-center justify-center overflow-hidden rounded-2xl border border-border p-1 shadow-sm transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-md hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-background transition-colors duration-200 ease-out group-hover:border-foreground/30">
        <div className="relative flex aspect-192/100 w-full items-center justify-center bg-muted">
          <Image
            src={thumbnail}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-center px-4 pt-2 pb-4 font-medium">
          <span className="flex w-full items-center justify-between gap-1">
            <span className="flex min-h-11 flex-1 items-center">
              <span className="line-clamp-2 leading-snug">{title}</span>
            </span>
            <span className="flex shrink-0 -translate-x-0.5 scale-75 items-center justify-center text-foreground opacity-0 transition-[opacity,translate,scale] duration-300 ease-out will-change-[transform,opacity] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
              <ChevronRight className="size-4" aria-hidden />
            </span>
          </span>
          <span className="min-h-12 line-clamp-2 font-normal leading-6 text-muted-foreground">
            {description}
          </span>
        </div>
      </div>
    </Link>
  );
}
