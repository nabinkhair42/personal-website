"use client";

import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/layouts/section-header";
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

const SKELETON_WEEKS = 53;
const SKELETON_BLOCK_SIZE = 12;
const SKELETON_BLOCK_GAP = 4;
const SKELETON_LABEL_HEIGHT = 22;
const SKELETON_GRAPH_WIDTH =
  SKELETON_WEEKS * (SKELETON_BLOCK_SIZE + SKELETON_BLOCK_GAP) - SKELETON_BLOCK_GAP;
const SKELETON_GRAPH_HEIGHT =
  SKELETON_LABEL_HEIGHT + 7 * (SKELETON_BLOCK_SIZE + SKELETON_BLOCK_GAP) - SKELETON_BLOCK_GAP;

const ContributionGraphSkeleton = () => (
  <ShellWrapper>
    <SectionHeader
      title="GitHub Contributions"
      description="My contributions to GitHub repositories in the past 12 months"
    />
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading GitHub contribution graph"
      className="flex w-max max-w-full flex-col gap-2 text-sm"
    >
      <div className="max-w-full overflow-hidden rounded-md border p-2">
        <svg
          aria-hidden="true"
          className="block"
          height={SKELETON_GRAPH_HEIGHT}
          viewBox={`0 0 ${SKELETON_GRAPH_WIDTH} ${SKELETON_GRAPH_HEIGHT}`}
          width={SKELETON_GRAPH_WIDTH}
        >
          <defs>
            <pattern
              id="contribution-loading-grid"
              height={SKELETON_BLOCK_SIZE + SKELETON_BLOCK_GAP}
              patternUnits="userSpaceOnUse"
              width={SKELETON_BLOCK_SIZE + SKELETON_BLOCK_GAP}
            >
              <rect
                className="fill-muted"
                height={SKELETON_BLOCK_SIZE}
                rx="2"
                width={SKELETON_BLOCK_SIZE}
              />
            </pattern>
          </defs>
          <g className="fill-muted">
            {Array.from({ length: 12 }, (_, month) => (
              <rect key={month} x={month * 70} y="2" width="20" height="10" rx="2" />
            ))}
          </g>
          <rect
            fill="url(#contribution-loading-grid)"
            height={7 * (SKELETON_BLOCK_SIZE + SKELETON_BLOCK_GAP)}
            width={SKELETON_GRAPH_WIDTH}
            y={SKELETON_LABEL_HEIGHT}
          />
        </svg>
      </div>
      <div className="flex min-h-5 flex-wrap items-center gap-1 whitespace-nowrap sm:gap-x-4">
        <div className="h-4 w-48 rounded-sm bg-muted" />
        <div className="ml-auto flex items-center gap-0.75">
          <div className="mr-1 h-4 w-7 rounded-sm bg-muted" />
          {Array.from({ length: 5 }, (_, level) => (
            <div className="h-3 w-3 rounded border bg-muted" key={level} />
          ))}
          <div className="ml-1 h-4 w-8 rounded-sm bg-muted" />
        </div>
      </div>
    </div>
  </ShellWrapper>
);

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

  const loadContributions = async () => {
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
  };

  useEffect(() => {
    void loadContributions();
  }, []);

  if (isLoading) {
    return <ContributionGraphSkeleton />;
  }

  if (hasError || activities.length === 0) {
    return (
      <ShellWrapper>
        <div className="flex flex-col items-start gap-3 border border-dashed">
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
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
      <SectionHeader
        title="GitHub Contributions"
        description="My contributions to GitHub repositories in the past 12 months"
      />
      <ContributionGraph
        data={activities}
        totalCount={totalCount}
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
              <TooltipContent className="tabular-nums">
                {activity.count} contributions on {format(parseISO(activity.date), "MMM d, yyyy")}
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount />
          <ContributionGraphLegend>
            {({ level }) => (
              <div className={cn("h-3 w-3 rounded border", LEGEND_BG[level] ?? LEGEND_BG[0])} />
            )}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>
    </ShellWrapper>
  );
};

export default DeveloperGitContribution;
