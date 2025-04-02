import { getAllBlogStaticPaths, getBlogForSlug } from "@/lib/markdown";
import { notFound } from "next/navigation";

import Image from "next/image";
import { Title } from "../_components/title";
import { Typography } from "@/components/typography";
import { TableOfContents } from "@/components/markdown/table-of-content";
import { calculateReadingTime } from "@/lib/utils";
import { Clock } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { slug } = params;
  const res = await getBlogForSlug(slug);
  if (!res) return null;
  const { frontmatter } = res;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: [
        {
          url: frontmatter.cover,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [frontmatter.cover],
    },
  };
}

export async function generateStaticParams() {
  const val = await getAllBlogStaticPaths();
  if (!val) return [];
  return val.map((it) => ({ slug: it }));
}

export default async function BlogPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;

  const res = await getBlogForSlug(slug);
  if (!res) notFound();

  const { frontmatter, content, headings } = res;
  const currentURL = process.env.PORTFOLIO_URL + `/blog/` + slug;
  
  // Calculate reading time
  const readingTimeMinutes = calculateReadingTime(content.toString());

  return (
    <div className="max-w-5xl mx-auto border-l border-r border-dashed">
      <Title
        formatter={frontmatter}
        slug={slug}
        currentURL={currentURL}
      />
      <div className="!w-full py-12 px-4">
        <div className="w-full mb-7 relative">
          <Image
            src={frontmatter.cover}
            alt={frontmatter.title}
            width={1920}
            height={1080}
            className="w-full rounded-md border border-dashed object-cover"
            priority
          />
          
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border flex items-center gap-1.5 text-sm">
            <Clock className="w-4 h-4" />
            <span>{readingTimeMinutes} min read</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8">
            <Typography>{content}</Typography>
          </div>
          
          {/* Table of Contents sidebar */}
          <div className="lg:col-span-4">
            <TableOfContents headings={headings} className="lg:mb-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
