"use client";
import { useCallback, useEffect, useState } from "react";
import { Activity, ActivityCalendar } from "react-activity-calendar";

// Define a custom error interface for API responses
interface ApiError {
  error: string;
}

type GithubGraphProps = {
  blockMargin?: number;
  colorPalette?: string[];
};

export const GithubGraph = ({
  blockMargin,
  colorPalette,
}: GithubGraphProps) => {
  const [contribution, setContribution] = useState<Activity[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const contributions = await fetchContributionData();
      setContribution(contributions);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to load GitHub contributions");
      setContribution([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const label = {
    totalCount: `{{count}} contributions in the last year`,
  };

  return (
    <>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ActivityCalendar
        data={contribution}
        maxLevel={4}
        blockMargin={blockMargin ?? 2}
        loading={loading}
        labels={label}
        theme={{
          dark: colorPalette ?? [
            "#ebedf0",
            "#9be9a8",
            "#40c463",
            "#30a14e",
            "#216e39",
          ],
        }}
      />
    </>
  );
};

async function fetchContributionData(): Promise<Activity[]> {
  const response = await fetch('/api/github');
  const responseBody = await response.json();

  if (!response.ok) {
    const errorMessage = (responseBody as ApiError).error || "Error fetching contribution data";
    throw new Error(errorMessage);
  }
  
  return responseBody.data as Activity[];
}
