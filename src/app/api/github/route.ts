import { NextResponse } from 'next/server';
import {
  Activity,
  GitHubContributionWeek,
  GitHubContributionDay,
} from '@/types/github';

// GitHub GraphQL API endpoint
const GITHUB_API = 'https://api.github.com/graphql';

export async function GET() {
  try {
    // Get username from environment variable
    const username = process.env.GITHUB_USERNAME;

    if (!username) {
      console.error('GITHUB_USERNAME environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // GitHub Personal Access Token should be stored in environment variables
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.error('GITHUB_TOKEN environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // GraphQL query to fetch contribution data
    const query = `
      query userContributions($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      cache: 'no-store',
    });

    const responseData = await response.json();

    // Check for GraphQL errors
    if (responseData.errors) {
      console.error('GraphQL errors:', responseData.errors);
      return NextResponse.json(
        { error: responseData.errors[0]?.message || 'GitHub API error' },
        { status: 422 }
      );
    }

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(
        'GitHub API request failed with status: ' + response.status
      );
    }

    // Handle case where user data might not be found
    if (!responseData.data || !responseData.data.user) {
      return NextResponse.json(
        { error: 'GitHub user not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the expected Activity[] format
    const weeks =
      responseData.data.user.contributionsCollection.contributionCalendar.weeks;
    const contributions: Activity[] = [];

    weeks.forEach((week: GitHubContributionWeek) => {
      week.contributionDays.forEach((day: GitHubContributionDay) => {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
          level: calculateLevel(day.contributionCount),
        });
      });
    });

    return NextResponse.json({ data: contributions });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contribution data' },
      { status: 500 }
    );
  }
}

// Helper function to calculate level (0-4) based on contribution count
function calculateLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}
