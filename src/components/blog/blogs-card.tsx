import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/markdown/mdx";
import { DEFAULT_OG_IMAGE } from "@/lib/site";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export const BlogCard = ({ post, priority }: BlogCardProps) => {
  const { slug, frontmatter, readingTime } = post;
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-md border transition-colors hover:border-foreground/30"
    >
      <div className="relative aspect-video shrink-0 overflow-hidden border-b">
        <Image
          src={frontmatter.image || DEFAULT_OG_IMAGE}
          alt={frontmatter.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 font-medium leading-snug" title={frontmatter.title}>
          {frontmatter.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-muted-foreground">{frontmatter.description}</p>
        <p className="flex items-center gap-3 pt-1 text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" aria-hidden />
            <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            {readingTime}
          </span>
        </p>
      </div>
    </Link>
  );
};
