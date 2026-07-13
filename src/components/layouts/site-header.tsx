"use client";

import { Moon, Sun } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GithubIcon } from "@/icons/social";
import { githubUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const SPRING = {
  type: "spring" as const,
  stiffness: 360,
  damping: 32,
  mass: 0.85,
};
const SCROLL_THRESHOLD = 32;

const SiteHeader = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const isBlog = pathname?.startsWith("/blog");
  const isBookmarks = pathname?.startsWith("/bookmarks");
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [skipLayoutTransition, setSkipLayoutTransition] = useState(false);
  const pathnameRef = useRef(pathname);

  useLayoutEffect(() => {
    const routeChanged = pathnameRef.current !== pathname;
    pathnameRef.current = pathname;

    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

    if (!routeChanged) return;

    setSkipLayoutTransition(true);
    const frame = requestAnimationFrame(() => setSkipLayoutTransition(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex justify-center",
        !skipLayoutTransition && "transition-colors duration-200",
        isScrolled ? "bg-transparent" : "bg-background/85 backdrop-blur-md"
      )}
    >
      <motion.div
        layout={!skipLayoutTransition}
        transition={skipLayoutTransition ? { duration: 0 } : SPRING}
        animate={{ borderRadius: isScrolled ? 999 : 0 }}
        className={cn(
          "flex items-center",
          !skipLayoutTransition &&
            "transition-[background-color,border-color,box-shadow,height] duration-200",
          isScrolled
            ? "mt-3 h-11 gap-2.5 w-76 justify-between border bg-background/85 px-5 shadow-lg shadow-black/15 backdrop-blur-md"
            : "h-14 w-full max-w-200 justify-between gap-3 border-transparent px-4"
        )}
      >
        <motion.div className="shrink-0">
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
        </motion.div>

        <motion.nav layout="position" aria-label="Main navigation" className="shrink-0">
          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    nativeButton={false}
                    variant="outline"
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
                    variant="outline"
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
                    variant="outline"
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
                    variant="outline"
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
        </motion.nav>
      </motion.div>
    </header>
  );
};

export default SiteHeader;
