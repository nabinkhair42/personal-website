import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { apiError, apiMethodNotAllowed, apiNotFound, buildApiError } from "@/lib/api/errors";

describe("api error helpers", () => {
  it("builds structured error payloads", () => {
    assert.deepEqual(buildApiError(500, "misconfigured", "Missing token", "Set GITHUB_TOKEN."), {
      status: 500,
      body: {
        error: {
          code: "misconfigured",
          message: "Missing token",
          hint: "Set GITHUB_TOKEN.",
        },
      },
    });
  });

  it("returns JSON Response bodies", async () => {
    const response = apiError(500, "misconfigured", "Missing token", "Set GITHUB_TOKEN.");
    assert.equal(response.status, 500);
    assert.equal(response.headers.get("Content-Type"), "application/json; charset=utf-8");
    assert.deepEqual(await response.json(), {
      error: {
        code: "misconfigured",
        message: "Missing token",
        hint: "Set GITHUB_TOKEN.",
      },
    });
  });

  it("builds not_found and method_not_allowed helpers", async () => {
    const missing = apiNotFound("/api/unknown");
    assert.equal(missing.status, 404);
    assert.equal((await missing.json()).error.code, "not_found");

    const method = apiMethodNotAllowed("POST", ["GET"]);
    assert.equal(method.status, 405);
    const methodBody = await method.json();
    assert.equal(methodBody.error.code, "method_not_allowed");
    assert.match(methodBody.error.hint, /GET/);
  });
});
