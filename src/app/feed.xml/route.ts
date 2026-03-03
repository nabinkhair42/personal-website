import { DeveloperDetails } from "@/dev-constants/details";
import { getAllBlogPosts } from "@/lib/markdown";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const siteUrl = DeveloperDetails.portfolio.replace(/\/$/, "");
  const posts = getAllBlogPosts();

  const items = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();

      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(DeveloperDetails.email)} (${escapeXml(DeveloperDetails.name)})</author>${
        post.frontmatter.tags
          ? post.frontmatter.tags
              .map((tag) => `\n      <category>${escapeXml(tag)}</category>`)
              .join("")
          : ""
      }
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(DeveloperDetails.name)} - Blog</title>
    <link>${siteUrl}/blog</link>
    <description>${escapeXml(DeveloperDetails.seo.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/og-image.png</url>
      <title>${escapeXml(DeveloperDetails.name)} - Blog</title>
      <link>${siteUrl}/blog</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
