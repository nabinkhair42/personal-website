import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  BlogCard,
  BlogCardContent,
  BlogCardDescription,
  BlogCardFooter,
  BlogCardImage,
  BlogCardTitle,
} from "@/components/blog/blogs-card";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeveloperDetails } from "@/dev-constants/details";
import type { BlogPost } from "@/lib/markdown/mdx";

interface BlogsGridProps {
  posts: BlogPost[];
  maxPosts?: number;
}

export const BlogsGrid = ({ posts, maxPosts }: BlogsGridProps) => {
  const displayPosts = maxPosts ? posts.slice(0, maxPosts) : posts;

  return (
    <ShellWrapper>
      <div className="space-y-3 p-2">
        <header className="space-y-2">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              From the blog
            </p>
            <h2 className="mt-1 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Latest Posts
            </h2>
          </div>
        </header>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayPosts.map((post, index) => {
              const { slug, frontmatter } = post;
              return (
                <BlogCard key={slug} link={`/blog/${slug}`} className="group">
                  <BlogCardImage
                    src={frontmatter.image || "/image.png"}
                    alt={frontmatter.title}
                    priority={index === 0}
                  />
                  <BlogCardContent className="space-y-2">
                    <BlogCardTitle
                      className="group-hover:underline group-hover:underline-offset-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300 truncate line-clamp-2"
                      title={frontmatter.title}
                    >
                      {frontmatter.title}
                    </BlogCardTitle>
                    <BlogCardDescription className="truncate line-clamp-2">
                      {frontmatter.description}
                    </BlogCardDescription>
                  </BlogCardContent>
                  <BlogCardFooter className="flex justify-between pb-5">
                    <div className="flex items-center gap-2">
                      <Avatar className="border">
                        <AvatarImage src={DeveloperDetails.avatar} alt={DeveloperDetails.name} />
                        <AvatarFallback>{DeveloperDetails.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start justify-start">
                        <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          {DeveloperDetails.name}
                        </p>
                        <time dateTime={frontmatter.date} className="text-sm text-muted-foreground">
                          {new Date(frontmatter.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    </div>
                    <div className="flex gap-px items-center justify-center">
                      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-500">
                        Read More
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                      />
                    </div>
                  </BlogCardFooter>
                </BlogCard>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-medium mb-2">No blog posts found</h2>
            <p className="text-muted-foreground">Check back later for new content!</p>
          </div>
        )}
        {maxPosts && posts.length > maxPosts && (
          <div className="flex items-center pt-1">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all posts
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        )}
      </div>
    </ShellWrapper>
  );
};
