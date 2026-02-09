import type { NextConfig } from "next";

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
        ],
      },
    ];
  },
};

export default nextConfig;
