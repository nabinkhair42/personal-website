import { DeveloperDetails } from "@/dev-constants/details";
import { getAllBlogPosts } from "@/lib/markdown";
import type { MetadataRoute } from "next";

const normalizeSiteUrl = (url: string) => {
  return url.replace(/\/$/, "");
};

export const generateSitemap = (): MetadataRoute.Sitemap => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);

  const staticRoutes = ["/", "/blog"];
  const posts = getAllBlogPosts();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
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
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
};

export const blogMetadata = () => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);

  return {
    title: "Blog | Nabin Khair",
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
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Nabin Khair",
      description:
        "Technical articles on React, Next.js, TypeScript, and web development by Nabin Khair.",
    },
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
  };
};
