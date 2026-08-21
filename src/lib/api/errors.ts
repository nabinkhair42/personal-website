export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    hint?: string;
  };
};

export function buildApiError(
  status: number,
  code: string,
  message: string,
  hint?: string
): { status: number; body: ApiErrorBody } {
  return {
    status,
    body: {
      error: {
        code,
        message,
        ...(hint ? { hint } : {}),
      },
    },
  };
}

export function apiError(status: number, code: string, message: string, hint?: string): Response {
  const { body } = buildApiError(status, code, message, hint);

  return Response.json(body, {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export function apiNotFound(path: string): Response {
  return apiError(
    404,
    "not_found",
    `No API route matches ${path}.`,
    "See /openapi.json for the published API surface, or /llms.txt for site guidance."
  );
}

export function apiMethodNotAllowed(method: string, allowed: string[]): Response {
  return apiError(
    405,
    "method_not_allowed",
    `HTTP ${method} is not supported on this endpoint.`,
    `Allowed methods: ${allowed.join(", ")}.`
  );
}
