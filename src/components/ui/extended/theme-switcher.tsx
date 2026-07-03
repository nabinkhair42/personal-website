"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            aria-label="Toggle theme (D)"
            title="Toggle theme"
            className="h-7 w-7"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </Button>
        }
      />
      <TooltipContent className="flex gap-1 items-center justify-between">
        Toggle theme
        <Kbd>D</Kbd>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeSwitcher;
