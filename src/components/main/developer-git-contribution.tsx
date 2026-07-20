"use client";

import { format, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Button } from "@/components/ui/button";
import {
  type Activity,
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/ui/extended/contribution-graph";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const LEVEL_FILLS = [
  'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
  'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
  'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
  'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
  'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]',
].join(" ");

const LEGEND_BG = [
  "bg-[#ebedf0] dark:bg-[#161b22]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

const fetchContributions = async (): Promise<{
  data: Activity[];
  total: number;
}> => {
  const response = await fetch("/api/github-contributions");
  if (!response.ok) throw new Error(`Failed to load contributions: ${response.status}`);
  return response.json();
};

const DeveloperGitContribution = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadContributions = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const { data, total } = await fetchContributions();
      setActivities(data);
      setTotalCount(total);
    } catch (err) {
      console.error("Error fetching GitHub contributions", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContributions();
  }, [loadContributions]);

  if (isLoading) {
    return (
      <ShellWrapper>
        <div
          role="status"
          aria-busy="true"
          aria-label="Loading GitHub contribution graph"
          className="h-[11.9rem] border bg-muted"
        />
      </ShellWrapper>
    );
  }

  if (hasError || activities.length === 0) {
    return (
      <ShellWrapper>
        <div className="flex flex-col items-start gap-3 border border-dashed p-4">
          <p className="text-sm text-muted-foreground">
            {hasError
              ? "Could not load GitHub contributions right now."
              : "No contribution data available yet."}
          </p>
          <Button size="sm" variant="outline" onClick={loadContributions}>
            Try again
          </Button>
        </div>
      </ShellWrapper>
    );
  }

  return (
    <ShellWrapper>
      <ContributionGraph
        data={activities}
        totalCount={totalCount}
        className="p-2"
        labels={{ totalCount: "{{count}} activities in past 12 months" }}
      >
        <ContributionGraphCalendar scrollToEnd>
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger
                render={
                  <ContributionGraphBlock
                    activity={activity}
                    className={cn("cursor-pointer", LEVEL_FILLS)}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                }
              />
              <TooltipContent>
                {activity.count} contributions on {format(parseISO(activity.date), "MMM d, yyyy")}
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount />
          <ContributionGraphLegend>
            {({ level }) => (
              <div
                className={cn(
                  "h-3 w-3 rounded border border-border",
                  LEGEND_BG[level] ?? LEGEND_BG[0]
                )}
              />
            )}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>
    </ShellWrapper>
  );
};

export default DeveloperGitContribution;
