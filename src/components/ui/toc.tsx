"use client";

import { MenuIcon } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.04,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -6, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 460, damping: 38 },
  },
};

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const key = itemIds.join("|");

  React.useEffect(() => {
    if (itemIds.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size === 0) return;
        let bestId: string | null = null;
        let bestTop = Number.POSITIVE_INFINITY;
        for (const [id, top] of visible) {
          if (top < bestTop) {
            bestTop = top;
            bestId = id;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      { rootMargin: "0px 0px -65% 0px" },
    );

    const observed: HTMLElement[] = [];
    for (const id of itemIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    }

    return () => {
      for (const el of observed) observer.unobserve(el);
      observer.disconnect();
    };
  }, [key]);

  return activeId;
}

function scrollToHeading(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

export function DocsTableOfContents({
  toc,
  variant = "list",
  className,
  hideLabel = false,
}: {
  toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  variant?: "dropdown" | "list";
  className?: string;
  hideLabel?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);

  if (!toc?.length) {
    return null;
  }

  if (variant === "dropdown") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 md:h-7", className)}
          >
            <MenuIcon /> On This Page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="no-scrollbar max-h-[70svh] max-w-[calc(100vw-2rem)] overflow-x-hidden"
        >
          {toc.map((item) => {
            const id = item.url.replace("#", "");
            const isActive = id === activeHeading;
            return (
              <DropdownMenuItem
                key={item.url}
                data-depth={item.depth}
                className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
              >
                <a
                  href={item.url}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading(id);
                    setOpen(false);
                  }}
                >
                  {item.title}
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={listContainerVariants}
      className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}
    >
      {!hideLabel && (
        <motion.p
          variants={listItemVariants}
          className="sticky top-0 h-6 bg-background text-xs font-medium text-muted-foreground"
        >
          On This Page
        </motion.p>
      )}
      {toc.map((item) => {
        const id = item.url.replace("#", "");
        const isActive = id === activeHeading;
        return (
          <motion.a
            key={item.url}
            href={item.url}
            onClick={(e) => {
              e.preventDefault();
              scrollToHeading(id);
            }}
            variants={listItemVariants}
            aria-current={isActive ? "location" : undefined}
            className="relative text-[0.8rem] text-muted-foreground/50 no-underline transition-colors hover:text-muted-foreground data-[active=true]:font-medium data-[active=true]:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6"
            data-active={isActive}
            data-depth={item.depth}
          >
            {isActive && (
              <motion.span
                layoutId="docs-toc-active-indicator"
                className="absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-0.5 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            {item.title}
          </motion.a>
        );
      })}
    </motion.div>
  );
}
