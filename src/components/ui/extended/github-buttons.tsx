"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DeveloperDetails } from "@/dev-constants/details";
import { GithubIcon } from "@/icons/social";

export const GitHubButtons = () => {
  const githubUrl =
    DeveloperDetails.socialLinks.find((l) => l.name === "GitHub")?.url ??
    "https://github.com/nabinkhair42";
  const handleClick = () => {
    window.open(githubUrl, "_blank");
  };
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded h-7 w-7"
            onClick={handleClick}
            aria-label="View GitHub profile"
            title="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </Button>
        }
      />
      <TooltipContent className="flex gap-1 items-center justify-between">
        View GitHub profile
        <Kbd>G + H</Kbd>
      </TooltipContent>
    </Tooltip>
  );
};
