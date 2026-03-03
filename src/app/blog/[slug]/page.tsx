import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogHeader } from "@/components/blog/blog-header";
import PageShellWrapper from "@/components/layouts/page-shell";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { DeveloperDetails } from "@/dev-constants/details";
import { getAllBlogSlugs, getBlogPostBySlug, mdxOptions } from "@/lib/markdown/mdx";
import { useMDXComponents } from "@/lib/markdown/mdx-components";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const siteUrl = DeveloperDetails.portfolio.replace(/\/$/, "");

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = post.frontmatter.image
    ? `${siteUrl}${post.frontmatter.image}`
    : `${siteUrl}/og-image.png`;
  const modifiedTime = post.frontmatter.updatedDate ?? post.frontmatter.date;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags || [],
    authors: [{ name: post.frontmatter.developer }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: postUrl,
      siteName: DeveloperDetails.name,
      type: "article",
      publishedTime: post.frontmatter.date,
      modifiedTime,
      authors: [post.frontmatter.developer],
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = DeveloperDetails.portfolio.replace(/\/$/, "");
  const publishedDate = new Date(post.frontmatter.date).toISOString();
  const modifiedDate = post.frontmatter.updatedDate
    ? new Date(post.frontmatter.updatedDate).toISOString()
    : publishedDate;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image
      ? `${siteUrl}${post.frontmatter.image}`
      : `${siteUrl}/og-image.png`,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    inLanguage: "en",
    keywords: post.frontmatter.tags || [],
    author: {
      "@type": "Person",
      name: post.frontmatter.developer,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: DeveloperDetails.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${DeveloperDetails.avatar}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: `${siteUrl}/blog/${slug}`,
      },
    ],
  };

  const components = useMDXComponents({});
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageShellWrapper>
        <ShellWrapper>
          <BlogHeader frontmatter={post.frontmatter} readingTime={post.readingTime} />
        </ShellWrapper>
        <ShellWrapper>
          <article className="p-2 text-justify">
            <MDXRemote source={post.content} components={components} options={mdxOptions} />
          </article>
        </ShellWrapper>
      </PageShellWrapper>
    </>
  );
};

export default BlogPostPage;
