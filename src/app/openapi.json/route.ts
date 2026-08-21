import { getOpenApiDocument } from "@/lib/api/openapi";

export function GET() {
  const document = getOpenApiDocument();

  return Response.json(document, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
