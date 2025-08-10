import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import BlogCard from '@/app/(pages)/blog/_components/BlogCard';
import { getAllBlogs } from '@/lib/markdown';
import { BG, SECTION, TYPO, ANIM, GEOMETRY } from '@/constants/ui';

export default async function LatestBlogs() {
  const blogs = await getAllBlogs();
  // short being based on data and date is in MMDDYYYY
  const allBlogs = blogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className={`${SECTION.base} ${BG.gradient}`}>
      {/* Minimal geometric pattern */}
      <div className={GEOMETRY.verticalLines}>
        {GEOMETRY.positions.map((pos) => (
          <div key={pos} className={`${GEOMETRY.vertLine} ${pos}`} />
        ))}
      </div>

      <div className={SECTION.container}>
        {/* Section Header */}
        <div className="flex items-start justify-between mb-16 flex-wrap gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
              <span className={TYPO.sectionKicker}>Latest Articles</span>
            </div>
            <h2 className={TYPO.sectionTitle}>
              Recent
              <br />
              <span className="font-serif italic">Blog Posts</span>
            </h2>
            <p className={TYPO.paragraph}>
              Insights, tutorials, and thoughts on web development, design, and
              technology trends.
            </p>
          </div>

          <div className={`${ANIM.in} ${ANIM.delay(300)}`}>
            <Link href="/blog">
              <Button
                variant="outline"
                className="group px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-sm uppercase tracking-wider transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Explore More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.slice(0, 3).map((blog, index) => (
            <div
              key={blog.slug}
              className={`${ANIM.in} ${ANIM.slideUp}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <BlogCard {...blog} slug={blog.slug} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {allBlogs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-6 border border-zinc-300 dark:border-zinc-700 rotate-45 opacity-30"></div>
            <h3 className="text-2xl font-light text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
              No Articles Yet
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-light">
              Check back soon for exciting content and insights.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
