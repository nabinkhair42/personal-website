import { apiMethodNotAllowed, apiNotFound } from "@/lib/api/errors";

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, context: RouteContext) {
  const { path } = await context.params;
  return apiNotFound(`/api/${path.join("/")}`);
}

export async function POST(request: Request, context: RouteContext) {
  return methodFallback(request, context);
}

export async function PUT(request: Request, context: RouteContext) {
  return methodFallback(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return methodFallback(request, context);
}

export async function DELETE(request: Request, context: RouteContext) {
  return methodFallback(request, context);
}

async function methodFallback(request: Request, context: RouteContext) {
  const { path } = await context.params;
  // Unknown API paths are always not_found; known paths with wrong methods
  // should define their own handlers. This catch-all only covers misses.
  if (path.length > 0) {
    return apiNotFound(`/api/${path.join("/")}`);
  }
  return apiMethodNotAllowed(request.method, ["GET"]);
}
