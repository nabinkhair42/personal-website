import { getAllBlogs } from "@/lib/markdown";

export default async function sitemap() {
  const blogs = await getAllBlogs();
  const baseUrl = "https://www.nabinkhair.com.np";

  const routes = [
    "",
    "/about",
    "/projects",
    "/hire-me",
    "/contact",
    "/blog"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === "" ? 1 : 0.8,
  }));

  // Blog routes
  const blogRoutes = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
} 