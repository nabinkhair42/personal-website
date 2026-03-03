import { NextResponse } from "next/server";
import { DeveloperDetails } from "@/dev-constants/details";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const USERNAME = DeveloperDetails.socialLinks.find((l) => l.name === "GitHub")?.handle ?? "";

type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
};

type GraphQLResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: ContributionDay[];
          }[];
        };
      };
    };
  };
};

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN not configured" }, { status: 500 });
  }

  const now = new Date();
  const from = new Date(now);
  from.setFullYear(from.getFullYear() - 1);

  const query = `
    query {
      user(login: "${USERNAME}") {
        contributionsCollection(from: "${from.toISOString()}", to: "${now.toISOString()}") {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: `GitHub API error: ${res.status}` }, { status: 502 });
  }

  const json = (await res.json()) as GraphQLResponse;
  const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;

  let total = 0;
  const data: { date: string; count: number; level: number }[] = [];

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      total += day.contributionCount;
      data.push({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_MAP[day.contributionLevel] ?? 0,
      });
    }
  }

  return NextResponse.json(
    { data, total },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
