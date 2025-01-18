import { ArrowRight } from "lucide-react";
import Anchor from "../anchor";
import { cn } from "@/lib/utils";
import { getAllBlogs } from "@/lib/markdown";
import { formatDate2 } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default async function LatestBlogs() {
  const allBlogs = await getAllBlogs();
  const latestBlogs = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Blogs</h2>
          <Anchor
            href="/blog"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            View all blogs
            <ArrowRight className="w-4 h-4" />
          </Anchor>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map((blog) => (
            <Anchor
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className={cn(
                "group block p-6 rounded-lg border bg-card transition-all duration-200",
                "hover:shadow-lg hover:-translate-y-1"
              )}
            >
              {blog.cover && (
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                  <Image
                    height={300}
                    width={300}
                    src={blog.cover}
                    alt={blog.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-2">
                  {blog.authors.map((author) => (
                    <Avatar key={author.handle} className="w-6 h-6 border-2 border-background">
                      {author.avatar ? (
                        <AvatarImage src={author.avatar} alt={author.username} />
                      ) : (
                        <AvatarFallback>
                          {author.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate2(blog.date)}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                {blog.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {blog.description}
              </p>
            </Anchor>
          ))}
        </div>
      </div>
    </section>
  );
}