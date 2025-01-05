"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size={"icon"}
      variant={"ghost"}
    >
      {isDark ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
    </Button>
  );
}
