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
    <div className="w-full">
      <div className="mb-12 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">The Latest Blogs</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Discover insights and stories, straight from Nabin.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} {...blog} slug={blog.slug} />
        ))}
      </div>
    </div>
  );
}
