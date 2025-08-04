import { getAllBlogStaticPaths, getBlogForSlug } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Title } from '../_components/title';
import { Typography } from '@/components/typography';
import { calculateReadingTime } from '@/lib/utils';
import { Clock } from 'lucide-react';

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

  const { frontmatter, content } = res;
  const currentURL = process.env.PORTFOLIO_URL + `/blog/` + slug;

  // Calculate reading time
  const readingTimeMinutes = calculateReadingTime(content.toString());

  return (
    <>
      <Title formatter={frontmatter} slug={slug} currentURL={currentURL} />

      {/* Article Content Section */}
      <section className="relative px-6 py-12 bg-white dark:bg-zinc-950">
        {/* Enhanced geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-current"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-current"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Article Cover Image with enhanced styling */}
          <div className="w-full mb-16 relative animate-in fade-in duration-700 group">
            <div className="relative overflow-hidden rounded-none border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <Image
                src={frontmatter.cover}
                alt={frontmatter.title}
                width={1920}
                height={1080}
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Enhanced reading time badge */}
            <div className="absolute -bottom-4 right-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 shadow-lg backdrop-blur-sm flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <span className="text-zinc-700 dark:text-zinc-300 font-mono font-medium">
                {readingTimeMinutes} min read
              </span>
            </div>
          </div>

          {/* Enhanced Content Grid */}
          {/* Main Article Content */}
          <div className="xl:col-span-8 animate-in fade-in duration-700 delay-200">
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-lg">
              <Typography>{content}</Typography>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
