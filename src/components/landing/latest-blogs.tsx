import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import BlogCard from "@/app/blog/_components/BlogCard";
import { getAllBlogs } from "@/lib/markdown";

export default async function LatestBlogs() {
  const allBlogs = await getAllBlogs();
  const latestBlogs = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 border-b px-4">
      <div className="mx-auto">
        <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Latest Blogs</h2>
            <p className="text-muted-foreground">
              Here are some of my latest blog posts where I share my thoughts, experiences, and tips on web development and programming.
            </p>
          </div>
          <Link href="/blogs">
            <Button variant="outline" className="group">
              Explore More
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} slug={blog.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}