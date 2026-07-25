"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GithubIcon } from "@/icons/social";
import { githubUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    href: "/blog",
    label: "blog",
    tooltip: "Blog",
    shortcut: "B",
    match: (pathname: string) => pathname.startsWith("/blog"),
  },
  {
    href: "/bookmarks",
    label: "links",
    tooltip: "Bookmarks",
    shortcut: "K",
    match: (pathname: string) => pathname.startsWith("/bookmarks"),
  },
] as const;

const SiteHeader = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 -mx-6 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-3xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          aria-label="Home (H)"
          className="shrink-0 font-medium tracking-tight text-foreground"
        >
          devn.
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1 text-sm"
        >
          {NAV_LINKS.map(({ href, label, tooltip, shortcut, match }) => {
            const isActive = match(pathname);

            return (
              <Tooltip key={href}>
                <TooltipTrigger
                  render={
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`${tooltip} (${shortcut})`}
                      className={cn(
                        "rounded-md px-2.5 py-1.5 transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {label}
                    </Link>
                  }
                />
                <TooltipContent className="flex items-center gap-2">
                  {tooltip}
                  <Kbd>{shortcut}</Kbd>
                </TooltipContent>
              </Tooltip>
            );
          })}

          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="View GitHub profile"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubIcon className="size-4" />
                </Link>
              }
            />
            <TooltipContent className="flex items-center gap-2">
              GitHub
              <Kbd>G + H</Kbd>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  onClick={() =>
                    setTheme(resolvedTheme === "light" ? "dark" : "light")
                  }
                  aria-label="Toggle theme (D)"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Sun className="size-4 dark:hidden" />
                  <Moon className="hidden size-4 dark:block" />
                </button>
              }
            />
            <TooltipContent className="flex items-center gap-2">
              Toggle theme
              <Kbd>D</Kbd>
            </TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
