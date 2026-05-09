import { ImageResponse } from "next/og";
import { DeveloperDetails } from "@/dev-constants/details";
import { getBlogPostBySlug } from "@/lib/markdown/mdx";

export const alt = "Blog post cover image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  const title = post?.frontmatter.title ?? "Blog Post";
  const description = post?.frontmatter.description ?? "";
  const date = post?.frontmatter.date
    ? new Date(post.frontmatter.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0a0a0a",
        padding: "60px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "",
            color: "#a1a1aa",
          }}
        >
          {DeveloperDetails.name} — Blog
        </div>
        <div
          style={{
            fontSize: title.length > 50 ? "42px" : "52px",
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              lineHeight: 1.5,
              maxWidth: "800px",
            }}
          >
            {description.length > 120 ? `${description.slice(0, 120)}...` : description}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "#27272a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 600,
              color: "#fafafa",
            }}
          >
            {DeveloperDetails.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "18px", fontWeight: 600, color: "#fafafa" }}>
              {DeveloperDetails.name}
            </span>
            <span style={{ fontSize: "14px", color: "#71717a" }}>nabinkhair.com.np</span>
          </div>
        </div>
        {date && <div style={{ fontSize: "16px", color: "#71717a" }}>{date}</div>}
      </div>
    </div>,
    { ...size }
  );
}
