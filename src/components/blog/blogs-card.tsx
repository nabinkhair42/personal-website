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
  const thumbnail = frontmatter.image || DEFAULT_OG_IMAGE;

  return (
    <Link
      href={`/blog/${slug}`}
      aria-label={frontmatter.title}
      title={frontmatter.title}
      className={cn(
        // Outer frame: rounded-2xl + p-1 → inner rounded-xl (concentric)
        "group flex h-full flex-col overflow-hidden rounded-2xl border p-1 shadow-sm",
        "transition-[box-shadow,border-color] duration-200 ease-out",
        "hover:border-foreground/20 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-background transition-[border-color] duration-200 ease-out group-hover:border-foreground/30">
        <div className="relative aspect-192/100 w-full shrink-0 bg-muted">
          <Image
            src={thumbnail}
            alt={frontmatter.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover outline-1 outline-foreground/10"
          />
        </div>

        <div className="flex flex-1 flex-col px-4 pt-2 pb-4 font-medium">
          <span className="flex min-h-11 w-full items-center justify-between gap-1">
            <span className="line-clamp-2 flex-1 text-balance leading-snug">
              {frontmatter.title}
            </span>
            <span className="flex shrink-0 -translate-x-0.5 scale-75 items-center justify-center text-foreground opacity-0 transition-[opacity,translate,scale] duration-300 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
              <ChevronRight className="size-4" aria-hidden />
            </span>
          </span>
          <span className="line-clamp-2 min-h-12 text-pretty font-normal leading-relaxed text-muted-foreground">
            {frontmatter.description}
          </span>
        </div>
      </div>
    </Link>
  );
}
