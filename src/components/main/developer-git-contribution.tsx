"use client";

import { format, parseISO } from "date-fns";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import ShellWrapper from "@/components/layouts/shell-wrapper";
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
import { sectionVariants, VIEWPORT } from "../motion";

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

  useEffect(() => {
    let active = true;
    fetchContributions()
      .then(({ data, total }) => {
        if (!active) return;
        setActivities(data);
        setTotalCount(total);
      })
      .catch((err) => {
        console.error("Error fetching GitHub contributions", err);
        if (active) setHasError(true);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (isLoading) {
    return (
      <ShellWrapper>
        <div className="h-[11.9rem] border bg-muted" />
      </ShellWrapper>
    );
  }

  if (hasError || activities.length === 0) {
    return (
      <ShellWrapper>
        <div className="h-12 border border-destructive bg-[repeating-linear-gradient(-45deg,var(--color-destructive),var(--color-destructive)_1px,transparent_1px,transparent_6px)]" />
      </ShellWrapper>
    );
  }

  return (
    <ShellWrapper>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={sectionVariants}
      >
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
      </motion.div>
    </ShellWrapper>
  );
};

export default DeveloperGitContribution;
