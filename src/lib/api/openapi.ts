import { DeveloperDetails } from "@/dev-constants/details";

const siteUrl = () => DeveloperDetails.portfolio.replace(/\/$/, "");

/** OpenAPI 3.1 document for the public HTTP API surface. */
export function getOpenApiDocument() {
  const base = siteUrl();

  return {
    openapi: "3.1.0",
    info: {
      title: `${DeveloperDetails.name} Public API`,
      version: "1.0.0",
      summary: "Machine-readable endpoints for nabinkhair.com.np",
      description:
        "Public read-only API for this personal site. Prefer Accept: text/markdown on HTML pages for agent-friendly content. See /llms.txt for assistant guidance.",
      contact: {
        name: DeveloperDetails.name,
        email: DeveloperDetails.email,
        url: base,
      },
    },
    servers: [{ url: base }],
    tags: [
      { name: "content", description: "Content and discovery" },
      { name: "github", description: "GitHub contribution data" },
    ],
    paths: {
      "/api/github-contributions": {
        get: {
          tags: ["github"],
          operationId: "getGithubContributions",
          summary: "GitHub contribution calendar for the past 12 months",
          description:
            "Returns daily contribution counts and intensity levels used by the homepage contribution graph.",
          responses: {
            "200": {
              description: "Contribution calendar payload",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["data", "total"],
                    properties: {
                      total: {
                        type: "integer",
                        description: "Total contributions in the window",
                      },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          required: ["date", "count", "level"],
                          properties: {
                            date: {
                              type: "string",
                              format: "date",
                              description: "ISO calendar date (YYYY-MM-DD)",
                            },
                            count: {
                              type: "integer",
                              minimum: 0,
                              description: "Contributions on that date",
                            },
                            level: {
                              type: "integer",
                              minimum: 0,
                              maximum: 4,
                              description: "Intensity bucket 0–4",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Server misconfiguration",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            "502": {
              description: "Upstream GitHub API failure",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/openapi.json": {
        get: {
          tags: ["content"],
          operationId: "getOpenApi",
          summary: "This OpenAPI document",
          responses: {
            "200": {
              description: "OpenAPI 3.1 document",
              content: {
                "application/json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
          },
        },
      },
      "/feed.xml": {
        get: {
          tags: ["content"],
          operationId: "getRssFeed",
          summary: "Blog RSS 2.0 feed",
          responses: {
            "200": {
              description: "RSS feed",
              content: {
                "application/rss+xml": {
                  schema: { type: "string" },
                },
              },
            },
          },
        },
      },
      "/sitemap.xml": {
        get: {
          tags: ["content"],
          operationId: "getSitemap",
          summary: "XML sitemap",
          responses: {
            "200": {
              description: "Sitemap",
              content: {
                "application/xml": {
                  schema: { type: "string" },
                },
              },
            },
          },
        },
      },
      "/llms.txt": {
        get: {
          tags: ["content"],
          operationId: "getLlmsTxt",
          summary: "Guidance for AI assistants and agents",
          responses: {
            "200": {
              description: "Plain-text agent instructions",
              content: {
                "text/plain": {
                  schema: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Error: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["code", "message"],
              properties: {
                code: {
                  type: "string",
                  description: "Stable machine-readable error code",
                  examples: ["not_found", "upstream_error", "misconfigured"],
                },
                message: {
                  type: "string",
                  description: "Human-readable error summary",
                },
                hint: {
                  type: "string",
                  description: "Optional resolution guidance for clients",
                },
              },
            },
          },
        },
      },
    },
  } as const;
}
