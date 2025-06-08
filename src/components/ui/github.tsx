"use client";
import { useCallback, useEffect, useState } from "react";
import { Activity, ActivityCalendar } from "react-activity-calendar";
import {  Calendar, TrendingUp } from "lucide-react";
import { SiGithub } from "react-icons/si";

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

  // Calculate stats from contribution data
  const totalContributions = contribution.reduce((sum, day) => sum + day.count, 0);
  const maxContributionsDay = contribution.reduce((max, day) => Math.max(max, day.count), 0);
  const activeDays = contribution.filter(day => day.count > 0).length;

  const label = {
    totalCount: `{{count}} contributions in the last year`,
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Principle 5: Geometric Patterns - Header structure */}
        <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        <div className="relative z-10 p-6">
          {/* Header with icon */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950">
              <SiGithub className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
            </div>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Development Activity
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-light text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
            GitHub
            <span className="font-serif italic"> Contributions</span>
          </h3>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div className="relative text-center">
              {/* Principle 5: Geometric Patterns - Stat dividers */}
              <div className="absolute top-0 right-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
              <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                {loading ? "---" : totalContributions.toLocaleString()}
              </div>
              <div className="text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Total Commits
              </div>
            </div>

            <div className="relative text-center">
              <div className="absolute top-0 right-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
              <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                {loading ? "---" : activeDays}
              </div>
              <div className="text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Active Days
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                {loading ? "---" : maxContributionsDay}
              </div>
              <div className="text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Best Day
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="relative bg-white dark:bg-zinc-950 border-l border-r border-b border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Principle 5: Geometric Patterns - Calendar structure */}
        <div className="absolute inset-0 opacity-[0.005] dark:opacity-[0.008] pointer-events-none">
          {/* Grid pattern for calendar area */}
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="border-r border-zinc-300 dark:border-zinc-700 last:border-r-0 opacity-30"
              />
            ))}
          </div>
          
          {/* Horizontal divisions */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-full h-px bg-zinc-300 dark:bg-zinc-700 opacity-30"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-300 dark:bg-zinc-700 opacity-40"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-zinc-300 dark:bg-zinc-700 opacity-30"></div>
          </div>
        </div>

        <div className="relative z-10 p-6">
          {/* Error State */}
          {error && (
            <div className="relative mb-4 p-4 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
              {/* Error geometric pattern */}
              <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none">
                <div className="absolute top-0 left-4 w-px h-full bg-red-400"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-red-400"></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-1 border border-red-400 bg-red-100 dark:bg-red-900">
                  <TrendingUp className="h-3 w-3 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-sm font-mono uppercase tracking-wide text-red-600 dark:text-red-400">
                  {error}
                </span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="relative mb-4 p-4 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              {/* Loading geometric pattern */}
              <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none">
                <div className="absolute top-0 left-4 w-px h-full bg-zinc-400"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-400"></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-1 border border-zinc-400 bg-zinc-100 dark:bg-zinc-800">
                  <Calendar className="h-3 w-3 text-zinc-600 dark:text-zinc-400 animate-pulse" />
                </div>
                <span className="text-sm font-mono uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
                  Loading Contributions...
                </span>
              </div>
            </div>
          )}

          {/* Activity Calendar with BrutalCN styling */}
          <div className="relative">
            {/* Calendar wrapper with geometric overlay */}
            <div className="relative overflow-hidden">
              <ActivityCalendar
              data={contribution}
              maxLevel={4}
              blockMargin={blockMargin ?? 2}
              loading={loading}
              labels={label}
              theme={{
                light: colorPalette ?? [
                "#ebedf0",  // empty cells
                "#9be9a8",  // level 1
                "#40c463",  // level 2
                "#30a14e",  // level 3
                "#216e39",  // level 4
                ],
                dark: colorPalette ?? [
                "#161b22",  // dark mode empty cells
                "#0e4429",  // level 1
                "#006d32",  // level 2
                "#26a641",  // level 3
                "#39d353",  // level 4
                ],
              }}
              style={{
                color: 'rgb(113 113 122)', // zinc-500
                fontSize: '12px',
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              }}
              blockSize={12}
              blockRadius={0} // Principle 1: Structural Honesty - no rounded corners
              />
            </div>

            {/* Subtle overlay pattern on calendar */}
            <div className="absolute inset-0 opacity-[0.003] dark:opacity-[0.005] pointer-events-none">
              <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
              <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wide">
              Last 365 days of development activity
            </p>
          </div>
        </div>
      </div>
    </div>
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