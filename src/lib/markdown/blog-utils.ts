import type { BlogPost } from "@/lib/markdown/mdx";
import { getAllBlogPosts } from "@/lib/markdown/mdx";

export function getRecentPosts(count = 4): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.slice(0, count);
}
