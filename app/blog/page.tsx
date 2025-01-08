import { Metadata } from "next";
import { getAllBlogs } from "@/lib/markdown";
import { stringToDate } from "@/lib/utils";
import BlogCard from "@/app/blog/_components/BlogCard";

export const metadata: Metadata = {
  title: "Blogs | Nabin Khair",
  description: "The latest blogs and news, straight from the team.",
};

export default async function BlogIndexPage() {
  const blogs = (await getAllBlogs()).sort(
    (a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          The Latest Blogs
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover insights and stories, straight from Nabin.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} {...blog} slug={blog.slug} />
        ))}
      </div>
    </div>
  );
}
