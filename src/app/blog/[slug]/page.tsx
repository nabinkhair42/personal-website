import { getAllBlogStaticPaths, getBlogForSlug } from "@/lib/markdown";
import { notFound } from "next/navigation";

import Image from "next/image";
import { Title } from "../_components/title";
import { Typography } from "@/components/typography";
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  const {
    slug
  } = params;

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

  const {
    slug
  } = params;

  const res = await getBlogForSlug(slug);
  if (!res) notFound();
  return (
    <div className="max-w-5xl mx-auto border-l border-r">
      <Title title={res.frontmatter.title} date={res.frontmatter.date} authors={res.frontmatter.authors} />
      <div className="!w-full py-12 px-4">
        <div className="w-full mb-7">
          <Image
            src={res.frontmatter.cover}
            alt={res.frontmatter.title}
            width={1920}
            height={1080}
            className="w-full rounded-md border object-cover"
          />
        </div>
        <Typography>{res.content}</Typography>
      </div>
    </div>
  );
}
