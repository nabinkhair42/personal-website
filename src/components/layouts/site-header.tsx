"use client";

import { Moon, Sun } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DeveloperDetails } from "@/dev-constants/details";
import { GithubIcon } from "@/icons/social";
import { cn } from "@/lib/utils";

const githubUrl =
  DeveloperDetails.socialLinks.find((l) => l.name === "GitHub")?.url ??
  "https://github.com/nabinkhair42";

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
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex justify-center transition-colors duration-200",
        isScrolled ? "bg-transparent" : "bg-background/85 backdrop-blur-md"
      )}
    >
      <motion.div
        layout
        transition={SPRING}
        animate={{ borderRadius: isScrolled ? 999 : 0 }}
        className={cn(
          "flex items-center transition-[background-color,border-color,box-shadow,height] duration-200",
          isScrolled
            ? "mt-3 h-11 gap-2.5 w-76 justify-between border bg-background/85 px-5 shadow-lg shadow-black/15 backdrop-blur-md"
            : "h-14 w-full max-w-200 justify-between gap-3 border-transparent px-4"
        )}
      >
        <motion.div layout="position" className="shrink-0">
          <Tooltip>
            <TooltipTrigger>
              <Link
                href="/"
                aria-label="Home (H)"
                className="flex items-center px-1 font-medium tracking-tight"
              >
                devn.
              </Link>
            </TooltipTrigger>
            <TooltipContent className="flex items-center gap-2">
              Home
              <Kbd>H</Kbd>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.nav
          layout="position"
          aria-label="Main navigation"
          className="flex shrink-0 items-center gap-0.5"
        >
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  href="/blog"
                  aria-current={isBlog ? "page" : undefined}
                  aria-label="Blog (B)"
                  className={cn(
                    "flex h-8 items-center rounded-full px-3 text-sm transition-colors",
                    isBlog ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  blog
                </Link>
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
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="View GitHub profile"
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
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
                  onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
                  aria-label="Toggle theme (D)"
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
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
        </motion.nav>
      </motion.div>
    </header>
  );
};

export default SiteHeader;
