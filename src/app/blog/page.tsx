import { getAllBlogs } from "@/lib/markdown";
import { stringToDate } from "@/lib/utils";
import BlogCard from "@/app/blog/_components/BlogCard";
import BlogHero from "./_components/hero-section";
import { blogMetadata } from "@/config/metadata";

export const metadata = blogMetadata;

export default async function BlogIndexPage() {
  const blogs = (await getAllBlogs()).sort(
    (a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime()
  );

  return (
    <main className="max-w-5xl flex flex-col justify-center mx-auto border-l border-r border-dashed">
      <BlogHero />
      <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 ">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} {...blog} slug={blog.slug} />
        ))}
      </div>
    </main>
  );
}
