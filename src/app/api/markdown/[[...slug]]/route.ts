import { getMarkdownOrNotFound } from "@/lib/agent/markdown-pages";
import { markdownHeaders } from "@/lib/http/accept";

export async function GET(_request: Request, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const { body, status } = getMarkdownOrNotFound(slug);

  return new Response(body, {
    status,
    headers: markdownHeaders(),
  });
}
