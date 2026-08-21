import type { MetadataRoute } from "next";
import { DeveloperDetails } from "@/dev-constants/details";
import { getAllBlogPosts } from "@/lib/markdown";

const normalizeSiteUrl = (url: string) => {
  return url.replace(/\/$/, "");
};

const SITE_LAUNCH_DATE = "2024-01-01";

export const generateSitemap = (): MetadataRoute.Sitemap => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);

  const staticRoutes = ["/", "/blog", "/bookmarks"];
  const posts = getAllBlogPosts();

  const mostRecentPostDate = posts[0]?.frontmatter.date
    ? new Date(posts[0].frontmatter.date)
    : new Date(SITE_LAUNCH_DATE);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: route === "/blog" ? mostRecentPostDate : new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.frontmatter.date ? new Date(post.frontmatter.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
};

/** AI / agent crawlers that should be explicitly welcomed (not blocked). */
export const AI_CRAWLER_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Googlebot",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "Bytespider",
  "CCBot",
  "Diffbot",
  "FacebookBot",
  "cohere-ai",
] as const;

export const generateRobots = (): MetadataRoute.Robots => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicit allow for major AI crawlers (overrides any prior Disallow habits
      // and makes agent-policy audits unambiguous).
      {
        userAgent: [...AI_CRAWLER_USER_AGENTS],
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
};

export const blogMetadata = () => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);
  const ogImage = `${siteUrl}/og-image.png`;

  return {
    title: "Blog",
    description:
      "Technical articles on React, Next.js, TypeScript, and web development by Nabin Khair. Tips, tutorials, and insights for developers.",
    keywords: [
      "Nabin Khair Blog",
      "Web Development Blog",
      "React Tutorials",
      "Next.js Tips",
      "TypeScript Guide",
      "Developer Blog Nepal",
      "Programming Articles",
    ],
    openGraph: {
      title: "Blog | Nabin Khair",
      description:
        "Technical articles on React, Next.js, TypeScript, and web development by Nabin Khair.",
      url: `${siteUrl}/blog`,
      siteName: DeveloperDetails.name,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Blog | Nabin Khair",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "Blog | Nabin Khair",
      description:
        "Technical articles on React, Next.js, TypeScript, and web development by Nabin Khair.",
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/blog`,
      types: {
        "application/rss+xml": `${siteUrl}/feed.xml`,
      },
    },
  };
};

export const bookmarksMetadata = () => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);
  const ogImage = `${siteUrl}/og-image.png`;

  return {
    title: "Bookmarks",
    description:
      "A curated registry of links, articles, tools, and resources saved by Nabin Khair — pages worth returning to.",
    keywords: [
      "Nabin Khair Bookmarks",
      "Developer Bookmarks",
      "Curated Links",
      "Web Development Resources",
      "Programming Articles",
      "Design Resources",
      "Tools",
    ],
    openGraph: {
      title: "Bookmarks | Nabin Khair",
      description:
        "A curated registry of links, articles, tools, and resources saved by Nabin Khair.",
      url: `${siteUrl}/bookmarks`,
      siteName: DeveloperDetails.name,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Bookmarks | Nabin Khair",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "Bookmarks | Nabin Khair",
      description:
        "A curated registry of links, articles, tools, and resources saved by Nabin Khair.",
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/bookmarks`,
    },
  };
};
