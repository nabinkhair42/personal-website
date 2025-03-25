// Activity type from react-activity-calendar
export interface Activity {
  date: string;
  count: number;
  level: number;
}

// GitHub GraphQL API response types
export interface GitHubContributionDay {
  contributionCount: number;
  date: string;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

export interface GitHubGraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: GitHubContributionCalendar;
      };
    };
  };
}

export interface ApiErrorResponse {
  error: string;
}
