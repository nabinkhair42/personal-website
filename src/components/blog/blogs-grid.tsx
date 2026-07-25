import { BlogCard } from "@/components/blog/blogs-card";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { SoftLink } from "@/components/ui/extended/soft-link";
import type { BlogPost } from "@/lib/markdown/mdx";

interface BlogsGridProps {
  posts: BlogPost[];
  maxPosts?: number;
}

export const BlogsGrid = ({ posts, maxPosts }: BlogsGridProps) => {
  const displayPosts = maxPosts ? posts.slice(0, maxPosts) : posts;
  const hasMore = maxPosts !== undefined && posts.length > maxPosts;

  return (
    <ShellWrapper>
      <div className="space-y-3 p-2">
        <SectionHeader title="Writing" />

        {posts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 sm:auto-rows-fr">
            {displayPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-pretty text-sm text-muted-foreground">
            No posts yet — check back soon.
          </p>
        )}

        {hasMore && (
          <div className="flex justify-center pt-2">
            <SoftLink href="/blog">View all</SoftLink>
          </div>
        )}
      </div>
    </ShellWrapper>
  );
};
