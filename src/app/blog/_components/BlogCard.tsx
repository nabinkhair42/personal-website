import Link from "next/link";
import Image from "next/image";
import { BlogMdxFrontmatter } from "@/lib/markdown";
import { formatDate2 } from "@/lib/utils";
import AvatarGroup from "./AvatarGroup";

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
      className="flex flex-col gap-4 border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
    >
      <div className="relative h-48">
        <Image
          src={cover}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-xs text-muted-foreground">
            {formatDate2(date)}
          </p>
          <AvatarGroup users={authors} />
        </div>
      </div>
    </Link>
  );
}

