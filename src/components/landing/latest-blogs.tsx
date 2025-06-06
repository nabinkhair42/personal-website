import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import BlogCard from "@/app/blog/_components/BlogCard";
import { getAllBlogs } from "@/lib/markdown";

export default async function LatestBlogs() {
  const allBlogs = await getAllBlogs();
  const latestBlogs = allBlogs
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);

  return (
    <section className="relative px-6 py-20 bg-zinc-50 dark:bg-zinc-900">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-3 dark:opacity-5">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-16 flex-wrap gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
              <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Latest Articles
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
              Recent
              <br />
              <span className="font-serif italic">Blog Posts</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Insights, tutorials, and thoughts on web development, design, and technology trends.
            </p>
          </div>
          
          <div className="animate-in fade-in duration-700 delay-300">
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
          {latestBlogs.map((blog, index) => (
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
        {latestBlogs.length === 0 && (
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