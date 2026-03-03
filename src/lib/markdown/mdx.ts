import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";

const contentDirectory = path.join(process.cwd(), "/blog-content");

export interface BlogFrontmatter {
  title: string;
  description: string;
  developer: string;
  date: string;
  updatedDate?: string;
  image: string;
  published?: boolean;
  tags?: string[];
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
}

/**
 * MDX options with remark-gfm for table support
 */
export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

/**
 * Get all blog post slugs
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const readingTimeResult = readingTime(content);

    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
      readingTime: readingTimeResult.text,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => post.frontmatter.published !== false)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA; // Sort by date descending
    });

  return posts;
}
