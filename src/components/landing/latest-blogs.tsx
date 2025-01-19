import { ArrowRight } from "lucide-react";
import Anchor from "../anchor";
import { cn } from "@/lib/utils";
import { getAllBlogs } from "@/lib/markdown";
import { formatDate2 } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function LatestBlogs() {
  const allBlogs = await getAllBlogs();
  const latestBlogs = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-16">
      <div className="mx-auto">
      <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Latest Blogs</h2>
            <p className="text-muted-foreground">
              Here are some of my latest blog posts where I share my thoughts, experiences, and tips on web development and programming.
            </p>
          </div>
          <Link href="/blogs">
            <Button variant="outline" className="group">
              Explore More
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
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