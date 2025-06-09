import { getAllBlogs } from "@/lib/markdown";
import { stringToDate } from "@/lib/utils";
import BlogCard from "@/app/(pages)/blog/_components/BlogCard";
import BlogHero from "./_components/hero-section";
import { blogMetadata } from "@/config/metadata";

export const metadata = blogMetadata;

export default async function BlogIndexPage() {
  const blogs = (await getAllBlogs()).sort(
    (a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime()
  );

  return (
    <>
      <BlogHero />
      
      {/* Blog Grid Section */}
      <section className="relative px-6 py-20 bg-white dark:bg-zinc-950">
        {/* Minimal geometric pattern */}
        <div className="absolute inset-0 opacity-3 dark:opacity-5">
          <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
          <div className="absolute top-0 left-40 w-px h-full bg-current"></div>
          <div className="absolute top-0 right-40 w-px h-full bg-current"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
              <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                {blogs.length} Article{blogs.length !== 1 ? 's' : ''}
              </span>
              <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <div
                key={blog.slug}
                className="animate-in fade-in duration-700 slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <BlogCard {...blog} slug={blog.slug} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {blogs.length === 0 && (
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
    </>
  );
}