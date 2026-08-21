import { DeveloperDetails } from "@/dev-constants/details";

const siteUrl = () => DeveloperDetails.portfolio.replace(/\/$/, "");

/** Short markdown recovery body for agent-friendly HTTP 404 responses. */
export function getNotFoundMarkdown(pathname = "/"): string {
  const base = siteUrl();
  return `# 404 — Page not found

The path \`${pathname}\` does not exist on this site.

## Where to look next

- [Home](${base}/)
- [Blog](${base}/blog)
- [Bookmarks](${base}/bookmarks)
- [Sitemap](${base}/sitemap.xml)
- [llms.txt](${base}/llms.txt) — guidance for AI assistants
- [OpenAPI](${base}/openapi.json) — public API surface
- [RSS feed](${base}/feed.xml)

Request pages with \`Accept: text/markdown\` to receive a Markdown representation when available.
`;
}
