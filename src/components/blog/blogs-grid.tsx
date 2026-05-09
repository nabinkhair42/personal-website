"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { BlogCard } from "@/components/blog/blogs-card";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { itemVariants, VIEWPORT } from "@/components/motion";
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
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={itemVariants}
          className="space-y-1"
        >
          <p className="text-sm  tracking-[0.2em] text-muted-foreground">From the blog</p>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Latest Posts</h2>
        </motion.header>

        {posts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 sm:auto-rows-fr">
            {displayPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No posts yet — check back soon.
          </p>
        )}

        {hasMore && (
          <div className="pt-1">
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
