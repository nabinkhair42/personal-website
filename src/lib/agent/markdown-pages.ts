import { BOOKMARKS } from "@/dev-constants/bookmarks";
import { DeveloperDetails } from "@/dev-constants/details";
import { ExperienceData } from "@/dev-constants/experience";
import { ProjectsData } from "@/dev-constants/projects";
import { TechStacksList } from "@/dev-constants/stack";
import { TEMPLATES } from "@/dev-constants/templates";
import { getNotFoundMarkdown } from "@/lib/agent/not-found-markdown";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/markdown/mdx";

const siteUrl = () => DeveloperDetails.portfolio.replace(/\/$/, "");

function normalizePath(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return "/";
  return `/${slug.join("/")}`;
}

export function getPageMarkdown(slug?: string[]): string | null {
  const pathname = normalizePath(slug);

  if (pathname === "/") return getHomeMarkdown();
  if (pathname === "/blog") return getBlogIndexMarkdown();
  if (pathname === "/bookmarks") return getBookmarksMarkdown();

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch?.[1]) {
    return getBlogPostMarkdown(blogMatch[1]);
  }

  return null;
}

export function getMarkdownOrNotFound(slug?: string[]): {
  body: string;
  status: number;
  pathname: string;
} {
  const pathname = normalizePath(slug);
  const body = getPageMarkdown(slug);
  if (body) return { body, status: 200, pathname };
  return { body: getNotFoundMarkdown(pathname), status: 404, pathname };
}

function getHomeMarkdown(): string {
  const base = siteUrl();
  const { name, designation, bio, email, location } = DeveloperDetails;

  const experience = ExperienceData.map((job) => {
    const bullets = job.description.map((line) => `  - ${line}`).join("\n");
    return `### ${job.company}\n\n${job.designation} · ${job.type} · ${job.startDate} – ${job.endDate}\n\n${bullets}`;
  }).join("\n\n");

  const projects = ProjectsData.map((project) => {
    const title = project.liveLink
      ? `### [${project.title}](${project.liveLink})`
      : `### ${project.title}`;
    return `${title}\n\n${project.tagline}\n\n${project.description}`;
  }).join("\n\n");

  const education = DeveloperDetails.education
    .map(
      (edu) =>
        `### ${edu.institution}\n\n${edu.degree} · ${edu.startDate} – ${edu.endDate} · ${edu.location}`
    )
    .join("\n\n");

  const stack = TechStacksList.map((item) => `- ${item.name}`).join("\n");

  const templates = TEMPLATES.map(
    (template) => `### [${template.name}](${template.link})\n\n${template.description}`
  ).join("\n\n");

  const posts = getAllBlogPosts()
    .slice(0, 8)
    .map(
      (post) =>
        `- [${post.frontmatter.title}](${base}/blog/${post.slug}) (${post.frontmatter.date}) — ${post.frontmatter.description}`
    )
    .join("\n");

  return `# ${name}

${designation}

${bio}

- Location: ${location.city}, ${location.country}
- Email: ${email}
- Portfolio: ${base}/
- Resume: ${base}/nabin_khair.pdf

## Experience

${experience}

## Work

${projects}

## Education

${education}

## Stack

${stack}

## Templates

${templates}

## Writing

${posts}

## Machine-readable

- [llms.txt](${base}/llms.txt)
- [OpenAPI](${base}/openapi.json)
- [Sitemap](${base}/sitemap.xml)
- [RSS](${base}/feed.xml)
`;
}

function getBlogIndexMarkdown(): string {
  const base = siteUrl();
  const posts = getAllBlogPosts()
    .map(
      (post) =>
        `### [${post.frontmatter.title}](${base}/blog/${post.slug})\n\n${post.frontmatter.date} · ${post.readingTime}\n\n${post.frontmatter.description}`
    )
    .join("\n\n");

  return `# Blog | ${DeveloperDetails.name}

Technical articles on React, Next.js, TypeScript, AI tooling, and web development.

${posts}

## Also see

- [Home](${base}/)
- [RSS feed](${base}/feed.xml)
- [llms.txt](${base}/llms.txt)
`;
}

function getBlogPostMarkdown(slug: string): string | null {
  const post = getBlogPostBySlug(slug);
  if (!post || post.frontmatter.published === false) return null;

  const base = siteUrl();
  const tags = post.frontmatter.tags?.length ? `\n\nTags: ${post.frontmatter.tags.join(", ")}` : "";

  return `# ${post.frontmatter.title}

${post.frontmatter.description}

Published: ${post.frontmatter.date} · ${post.readingTime}${tags}

Canonical: ${base}/blog/${post.slug}

---

${post.content}
`;
}

function getBookmarksMarkdown(): string {
  const base = siteUrl();
  const items = BOOKMARKS.map(
    (bookmark) => `- [${bookmark.title}](${bookmark.url}) (${bookmark.category})`
  ).join("\n");

  return `# Bookmarks | ${DeveloperDetails.name}

A curated registry of links, articles, tools, and resources.

${items}

## Also see

- [Home](${base}/)
- [Blog](${base}/blog)
- [llms.txt](${base}/llms.txt)
`;
}
