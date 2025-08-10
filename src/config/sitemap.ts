import { getAllBlogs } from '@/lib/markdown';
import { siteConfig } from '@/config/site';

export default async function sitemap() {
  const blogs = await getAllBlogs();
  const currentDate = new Date().toISOString();

  // Base routes
  const routes = ['', '/about', '/projects', '/contact', '/blog'].map(
    (route) => ({
      url: `${siteConfig.baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Blog routes - with safe date handling
  const blogRoutes = blogs.map((post) => {
    // Ensure we have a valid date
    let lastModified;
    try {
      lastModified = new Date(post.date).toISOString();
    } catch (e) {
      lastModified = currentDate;
      console.log(e);
    }

    return {
      url: `${siteConfig.baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    };
  });

  return [...routes, ...blogRoutes];
}
