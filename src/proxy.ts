import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DeveloperDetails } from "@/dev-constants/details";
import { getNotFoundMarkdown } from "@/lib/agent/not-found-markdown";
import { appendVaryAccept, markdownHeaders, preferredType } from "@/lib/http/accept";

const siteUrl = () => DeveloperDetails.portfolio.replace(/\/$/, "");

/** RFC 8288 Link header advertising machine-readable discovery surfaces. */
function discoveryLinkHeader(): string {
  const base = siteUrl();
  return [
    `<${base}/llms.txt>; rel="describedby"; type="text/plain"`,
    `<${base}/openapi.json>; rel="service-desc"; type="application/json"`,
    `<${base}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
    `<${base}/feed.xml>; rel="alternate"; type="application/rss+xml"`,
    `<${base}/>; rel="alternate"; type="text/markdown"`,
  ].join(", ");
}

function withDiscoveryHeaders(response: NextResponse): NextResponse {
  appendVaryAccept(response.headers);
  response.headers.set("Link", discoveryLinkHeader());
  return response;
}

/**
 * Network-boundary transforms for agent readiness:
 * - Accept: text/markdown → rewrite to /api/markdown
 * - Unsupported Accept → 406
 * - Explicit .md URLs → markdown representation
 * - Link discovery headers for llms.txt / OpenAPI / sitemap / RSS
 *
 * Vary: Accept is set on markdown responses in the route handler (Next can
 * overwrite Vary on HTML/RSC responses from proxy alone).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Explicit sibling .md URLs always serve Markdown.
  if (pathname.endsWith(".md")) {
    const url = request.nextUrl.clone();
    const withoutExt = pathname.slice(0, -3) || "/";
    url.pathname = `/api/markdown${withoutExt === "/" ? "" : withoutExt}`;
    return withDiscoveryHeaders(NextResponse.rewrite(url));
  }

  const acceptHeader = request.headers.get("accept");
  const chosen = preferredType(acceptHeader);

  if (chosen === "text/markdown") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/api/markdown" : `/api/markdown${pathname}`;
    return withDiscoveryHeaders(NextResponse.rewrite(url));
  }

  if (chosen === null && acceptHeader) {
    return new Response("Not Acceptable\n\nAvailable: text/html, text/markdown\n", {
      status: 406,
      headers: markdownHeaders({
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        Link: discoveryLinkHeader(),
      }),
    });
  }

  // Soft agent recovery for an explicit markdown 404 twin.
  if (pathname === "/.well-known/agent-404.md") {
    return new Response(getNotFoundMarkdown(pathname), {
      status: 404,
      headers: markdownHeaders({ Link: discoveryLinkHeader() }),
    });
  }

  return withDiscoveryHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/|.*\\..*).*)", "/(.*)\\.md"],
};
