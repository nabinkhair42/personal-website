import { BlogIntroduction, BlogsGrid, NoMoreBlogs } from "@/components/blog";
import PageShellWrapper from "@/components/layouts/page-shell";
import { DeveloperDetails } from "@/dev-constants/details";
import { getAllBlogPosts } from "@/lib/markdown";
import { blogMetadata } from "@/lib/seo-utils";
import type { Metadata } from "next";

export const metadata: Metadata = blogMetadata();

const BlogPage = () => {
  const posts = getAllBlogPosts();
  const siteUrl = DeveloperDetails.portfolio.replace(/\/$/, "");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageShellWrapper>
        <BlogIntroduction />
        <BlogsGrid posts={posts} />
        <NoMoreBlogs />
      </PageShellWrapper>
    </>
  );
};

export default BlogPage;
