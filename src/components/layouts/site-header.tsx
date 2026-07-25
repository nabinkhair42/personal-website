"use client";

import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GithubIcon } from "@/icons/social";
import { githubUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 32;

const PILL_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 36,
  mass: 0.85,
};

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

const INSTANT = { duration: 0 } as const;

const SiteHeader = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  // Skip morph while Next.js jumps scroll to top on navigation.
  const [suppressMotion, setSuppressMotion] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSuppressMotion(true);
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

    const timeout = window.setTimeout(() => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      setSuppressMotion(false);
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  const animateShell = !shouldReduceMotion && !suppressMotion;
  const shellTransition = animateShell ? PILL_SPRING : INSTANT;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex justify-center",
        animateShell && "transition-colors duration-300",
        isScrolled ? "bg-transparent" : "bg-background/85 backdrop-blur-md",
      )}
    >
      <motion.div
        layout={animateShell}
        initial={false}
        animate={{
          borderRadius: isScrolled ? 999 : 0,
          boxShadow: isScrolled
            ? "0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
            : "0 0 0 0 rgb(0 0 0 / 0)",
        }}
        transition={{
          layout: shellTransition,
          borderRadius: shellTransition,
          boxShadow: animateShell
            ? { duration: 0.25, ease: [0.32, 0.72, 0, 1] }
            : INSTANT,
        }}
        className={cn(
          "flex items-center justify-between border backdrop-blur-md",
          isScrolled
            ? "mt-3 h-11 w-76 gap-2.5 border-border bg-background/85 px-5"
            : "h-14 w-full gap-3 border-transparent",
        )}
      >
        <motion.div
          layout={animateShell ? "position" : false}
          className="shrink-0"
        >
          <Link
            href="/"
            aria-label="Home (H)"
            className="flex items-center px-1 font-medium tracking-tight"
          >
            devn.
          </Link>
        </motion.div>

        <motion.nav
          layout={animateShell ? "position" : false}
          aria-label="Main navigation"
          className="shrink-0"
        >
          <ButtonGroup>
            {NAV_LINKS.map(({ href, label, tooltip, shortcut, match }) => {
              const isActive = match(pathname);

              return (
                <Tooltip key={href}>
                  <TooltipTrigger
                    render={
                      <Button
                        nativeButton={false}
                        variant={isScrolled ? "outline" : "ghost"}
                        size="sm"
                        className={cn(isActive && "bg-muted text-foreground")}
                        render={
                          <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            aria-label={`${tooltip} (${shortcut})`}
                          >
                            {label}
                          </Link>
                        }
                      />
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
                    onClick={() =>
                      setTheme(resolvedTheme === "light" ? "dark" : "light")
                    }
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
