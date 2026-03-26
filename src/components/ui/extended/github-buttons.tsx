"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/icons/social";
import { DeveloperDetails } from "@/dev-constants/details";

export const GitHubButtons = () => {
  const githubUrl =
    DeveloperDetails.socialLinks.find((l) => l.name === "GitHub")?.url ??
    "https://github.com/nabinkhair42";
  const handleClick = () => {
    window.open(githubUrl, "_blank");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full min-h-12 min-w-12"
      onClick={handleClick}
      aria-label="View GitHub profile"
      title="GitHub"
    >
      <GithubIcon className="h-5 w-5" />
    </Button>
  );
};
