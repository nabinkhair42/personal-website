import type { MetadataRoute } from "next";
import { DeveloperDetails } from "@/dev-constants/details";
import { getAllBlogPosts } from "@/lib/markdown";

const normalizeSiteUrl = (url: string) => {
  return url.replace(/\/$/, "");
};

const SITE_LAST_UPDATED = "2026-02-09";

export const generateSitemap = (): MetadataRoute.Sitemap => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);

  const staticRoutes = ["/", "/blog"];
  const posts = getAllBlogPosts();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(SITE_LAST_UPDATED),
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

export const generateRobots = (): MetadataRoute.Robots => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "Bytespider",
          "CCBot",
          "Amazonbot",
          "meta-externalagent",
          "Applebot-Extended",
        ],
        disallow: "/",
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
