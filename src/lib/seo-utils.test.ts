import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { AI_CRAWLER_USER_AGENTS, generateRobots } from "@/lib/seo-utils";

describe("robots.txt agent policy", () => {
  it("allows all user agents and does not disallow AI crawlers", () => {
    const robots = generateRobots();
    assert.ok(Array.isArray(robots.rules));

    const rules = robots.rules as Array<{
      userAgent?: string | string[];
      allow?: string | string[];
      disallow?: string | string[];
    }>;

    for (const rule of rules) {
      assert.equal(rule.disallow, undefined);
      assert.ok(rule.allow === "/" || (Array.isArray(rule.allow) && rule.allow.includes("/")));
    }

    const agents = rules.flatMap((rule) => {
      if (!rule.userAgent) return [];
      return Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent];
    });

    assert.ok(agents.includes("*"));
    for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
      assert.ok(agents.includes(bot), `expected ${bot} to be explicitly allowed`);
    }

    assert.ok(AI_CRAWLER_USER_AGENTS.includes("GPTBot"));
    assert.match(robots.sitemap as string, /sitemap\.xml$/);
  });
});
