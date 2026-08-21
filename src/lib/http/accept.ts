/**
 * RFC 9110 §12.5.1 Accept parsing for content negotiation.
 * Adapted from https://acceptmarkdown.com/recipes/nextjs
 */

export type AcceptEntry = {
  type: string;
  q: number;
  specificity: number;
};

export const HTML_MARKDOWN_TYPES = ["text/html", "text/markdown"] as const;

export function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((s) => s.trim());
    const type = (parts[0] ?? "*/*").toLowerCase();
    let q = 1;
    for (const param of parts.slice(1)) {
      const [name, value] = param.split("=").map((s) => s.trim());
      if (name === "q") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
      }
    }
    const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
    return { type, q, specificity };
  });
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

/** Pick the preferred type from `produces`, or null when every candidate is rejected. */
export function preferredType(
  header: string | null,
  produces: readonly string[] = HTML_MARKDOWN_TYPES
): string | null {
  if (!header) return produces[0] ?? null;
  const entries = parseAccept(header);
  if (entries.length === 0) return produces[0] ?? null;

  let bestType: string | null = null;
  let bestQ = -1;
  let bestPosition = Number.POSITIVE_INFINITY;

  for (const candidate of produces) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Number.POSITIVE_INFINITY;

    for (let idx = 0; idx < entries.length; idx++) {
      const entry = entries[idx];
      if (!entry || !matches(entry, candidate)) continue;
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = idx;
      }
    }

    if (matched === null || matched.q <= 0) continue;

    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

export function prefersMarkdown(header: string | null): boolean {
  return preferredType(header) === "text/markdown";
}

/** Agents/SDKs often send  or JSON — prefer JSON errors unless HTML is explicit. */
export function prefersJsonError(accept: string | null): boolean {
  if (!accept) return true;
  return !accept.toLowerCase().includes("text/html");
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  const required = ["Accept", "Accept-Encoding"];
  if (!existing) {
    headers.set("Vary", required.join(", "));
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim());
  const lower = new Set(tokens.map((t) => t.toLowerCase()));
  for (const token of required) {
    if (!lower.has(token.toLowerCase())) {
      tokens.push(token);
    }
  }
  headers.set("Vary", tokens.join(", "));
}

export function markdownHeaders(extra?: HeadersInit): Headers {
  const headers = new Headers(extra);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/markdown; charset=utf-8");
  }
  appendVaryAccept(headers);
  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=86400");
  }
  return headers;
}
