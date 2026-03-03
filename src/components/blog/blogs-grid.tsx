import { ArrowUpRight } from "lucide-react";
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
      <div className="p-2">
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
                      className="group-hover:underline group-hover:underline-offset-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      title={frontmatter.title}
                    >
                      {frontmatter.title}
                    </BlogCardTitle>
                    <BlogCardDescription>{frontmatter.description}</BlogCardDescription>
                  </BlogCardContent>
                  <BlogCardFooter className="flex justify-between pb-5">
                    <div className="flex items-center gap-2">
                      <Avatar className="border">
                        <AvatarImage src={DeveloperDetails.avatar} alt={DeveloperDetails.name} />
                        <AvatarFallback>{DeveloperDetails.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flx flex-col items-start justify-start">
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
      </div>
    </ShellWrapper>
  );
};
