import Link from "next/link";
import Image from "next/image";
import { BlogMdxFrontmatter } from "@/lib/markdown";
import { formatDate2 } from "@/lib/utils";
import AvatarGroup from "./AvatarGroup";
import { Calendar } from "lucide-react";

export default function BlogCard({
  date,
  title,
  description,
  slug,
  cover,
  authors,
}: BlogMdxFrontmatter & { slug: string }) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative bg-card rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={cover}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate2(date)}
          </p>
          <AvatarGroup users={authors} />
        </div>
      </div>
    </Link>
  );
}
