import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getMarkdownOrNotFound, getPageMarkdown } from "@/lib/agent/markdown-pages";
import { getNotFoundMarkdown } from "@/lib/agent/not-found-markdown";
import { getOpenApiDocument } from "@/lib/api/openapi";
import {
  appendVaryAccept,
  preferredType,
  prefersJsonError,
  prefersMarkdown,
} from "@/lib/http/accept";

describe("preferredType / Accept parsing", () => {
  it("defaults to text/html when Accept is missing", () => {
    assert.equal(preferredType(null), "text/html");
  });

  it("prefers text/markdown when listed first", () => {
    assert.equal(preferredType("text/markdown, text/html, */*"), "text/markdown");
    assert.equal(prefersMarkdown("text/markdown, text/html"), true);
  });

  it("honors q-values", () => {
    assert.equal(preferredType("text/html;q=0.9, text/markdown;q=0.1"), "text/html");
    assert.equal(preferredType("text/markdown;q=0.8, text/html;q=0.5"), "text/markdown");
  });

  it("returns null when every produced type is rejected", () => {
    assert.equal(preferredType("text/html;q=0, text/markdown;q=0, application/pdf"), null);
  });

  it("appends Accept to an existing Vary header", () => {
    const headers = new Headers({ Vary: "Accept-Encoding" });
    appendVaryAccept(headers);
    assert.equal(headers.get("Vary"), "Accept-Encoding, Accept");
  });

  it("sets Accept and Accept-Encoding when Vary is empty", () => {
    const headers = new Headers();
    appendVaryAccept(headers);
    assert.equal(headers.get("Vary"), "Accept, Accept-Encoding");
  });

  it("detects JSON-error preference for non-HTML Accept", () => {
    assert.equal(prefersJsonError(null), true);
    assert.equal(prefersJsonError("*/*"), true);
    assert.equal(prefersJsonError("application/json"), true);
    assert.equal(prefersJsonError("text/html,application/xhtml+xml"), false);
  });
});

describe("agent markdown pages", () => {
  it("renders homepage markdown with hierarchy and discovery links", () => {
    const body = getPageMarkdown([]);
    assert.ok(body);
    assert.match(body, /^# Nabin Khair/m);
    assert.match(body, /^## Experience/m);
    assert.match(body, /^## Work/m);
    assert.match(body, /openapi\.json/);
    assert.ok(body.length > 500);
  });

  it("renders blog index and individual posts", () => {
    const index = getPageMarkdown(["blog"]);
    assert.ok(index);
    assert.match(index, /^# Blog/m);

    const post = getPageMarkdown(["blog", "git-recovery-guide"]);
    assert.ok(post);
    assert.match(post, /Canonical:/);
  });

  it("returns markdown 404 recovery body for unknown paths", () => {
    const result = getMarkdownOrNotFound(["does-not-exist-xyz"]);
    assert.equal(result.status, 404);
    assert.match(result.body, /^# 404/m);
    assert.match(result.body, /sitemap\.xml/);
    assert.match(result.body, /llms\.txt/);
    assert.match(result.body, /openapi\.json/);
  });
});

describe("not-found markdown", () => {
  it("includes recovery links", () => {
    const body = getNotFoundMarkdown("/missing");
    assert.match(body, /\/missing/);
    assert.match(body, /sitemap\.xml/);
    assert.match(body, /llms\.txt/);
  });
});

describe("openapi document", () => {
  it("publishes OpenAPI 3.1 with the contributions endpoint", () => {
    const doc = getOpenApiDocument();
    assert.equal(doc.openapi, "3.1.0");
    assert.ok(doc.paths["/api/github-contributions"]);
    assert.ok(doc.paths["/openapi.json"]);
    assert.equal(doc.components.schemas.Error.type, "object");
  });
});
