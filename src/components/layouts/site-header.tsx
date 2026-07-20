"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GithubIcon } from "@/icons/social";
import { githubUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 32;

const SiteHeader = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const isBlog = pathname?.startsWith("/blog");
  const isBookmarks = pathname?.startsWith("/bookmarks");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex justify-center",
        isScrolled ? "bg-transparent" : "bg-background/85 backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "flex items-center",
          isScrolled
            ? "mt-3 h-11 w-76 justify-between gap-2.5 rounded-full border bg-background/85 px-5 shadow-lg shadow-black/15 backdrop-blur-md"
            : "h-14 w-full max-w-200 justify-between gap-3 border-transparent px-4"
        )}
      >
        <div className="shrink-0">
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  href="/"
                  aria-label="Home (H)"
                  className="flex items-center px-1 font-medium tracking-tight"
                >
                  devn.
                </Link>
              }
            />
            <TooltipContent className="flex items-center gap-2">
              Home
              <Kbd>H</Kbd>
            </TooltipContent>
          </Tooltip>
        </div>

        <nav aria-label="Main navigation" className="shrink-0">
          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    nativeButton={false}
                    variant={isScrolled ? "outline" : "ghost"}
                    size="sm"
                    className={cn(isBlog && "bg-muted text-foreground")}
                    render={
                      <Link
                        href="/blog"
                        aria-current={isBlog ? "page" : undefined}
                        aria-label="Blog (B)"
                      >
                        blog
                      </Link>
                    }
                  />
                }
              />
              <TooltipContent className="flex items-center gap-2">
                Blog
                <Kbd>B</Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    nativeButton={false}
                    variant={isScrolled ? "outline" : "ghost"}
                    size="sm"
                    className={cn(isBookmarks && "bg-muted text-foreground")}
                    render={
                      <Link
                        href="/bookmarks"
                        aria-current={isBookmarks ? "page" : undefined}
                        aria-label="Bookmarks (K)"
                      >
                        links
                      </Link>
                    }
                  />
                }
              />
              <TooltipContent className="flex items-center gap-2">
                Bookmarks
                <Kbd>K</Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    nativeButton={false}
                    variant={isScrolled ? "outline" : "ghost"}
                    size="icon-sm"
                    render={
                      <Link
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="View GitHub profile"
                      >
                        <GithubIcon />
                      </Link>
                    }
                  />
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
                  <Button
                    variant={isScrolled ? "outline" : "ghost"}
                    size="icon-sm"
                    onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
                    aria-label="Toggle theme (D)"
                  >
                    <Sun className="dark:hidden" />
                    <Moon className="hidden dark:block" />
                  </Button>
                }
              />
              <TooltipContent className="flex items-center gap-2">
                Toggle theme
                <Kbd>D</Kbd>
              </TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
