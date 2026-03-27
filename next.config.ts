import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  async redirects() {
    return [
      // Consolidate www → non-www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nabinkhair.com.np" }],
        destination: "https://nabinkhair.com.np/:path*",
        permanent: true,
      },
      // Strip legacy Blogger ?m= parameter
      {
        source: "/:path*",
        has: [{ type: "query", key: "m" }],
        destination: "/:path*",
        permanent: true,
      },
      // Old Blogger date-based post URLs (e.g., /2023/01/some-post.html)
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug.html",
        destination: "/blog",
        permanent: true,
      },
      // Old Blogger static page URLs (e.g., /p/random-image-generator.html)
      {
        source: "/p/:slug.html",
        destination: "/",
        permanent: true,
      },
      // Blogger RSS/Atom feed URLs
      {
        source: "/feeds/:path*",
        destination: "/feed.xml",
        permanent: true,
      },
      // Blogger search/label pages
      {
        source: "/search/:path*",
        destination: "/blog",
        permanent: true,
      },
      // Blogger root .html pages (e.g., /some-page.html)
      {
        source: "/:slug(.*)\\.html",
        destination: "/",
        permanent: true,
      },
      // Catch favicon.ico requests from old Blogger setup
      {
        source: "/favicon.ico",
        destination: "/icon.png",
        permanent: true,
      },
      // --- GSC 404 cleanup: old routes that no longer exist ---
      // Old standalone pages → home
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      { source: "/background-images", destination: "/", permanent: true },
      { source: "/en-US", destination: "/", permanent: true },
      // Old/phantom blog slugs that never existed or were removed → blog index
      { source: "/blog/ui-ux-guide", destination: "/blog", permanent: true },
      {
        source: "/blog/introducing-civen-ai",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/brutalist-minimalism-architectural-web-design",
        destination: "/blog",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(isDev
            ? []
            : [
                {
                  key: "Content-Security-Policy",
                  value:
                    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.github.com;",
                },
              ]),
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*\\.(?:webp|png|svg|jpg|jpeg|ico|woff2|woff|pdf))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
