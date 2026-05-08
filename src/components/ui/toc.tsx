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

const APPLE_EASE = [0.32, 0.72, 0, 1] as const;

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

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds]);

  return activeId;
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
  const itemIds = React.useMemo(() => toc.map((item) => item.url.replace("#", "")), [toc]);
  const activeHeading = useActiveItem(itemIds);

  if (!toc?.length) {
    return null;
  }

  if (variant === "dropdown") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn("h-8 md:h-7", className)}>
            <MenuIcon /> On This Page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="no-scrollbar max-h-[70svh] max-w-[calc(100vw-2rem)] overflow-x-hidden"
        >
          {toc.map((item) => (
            <DropdownMenuItem
              key={item.url}
              asChild
              onClick={() => {
                setOpen(false);
              }}
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
            >
              <a href={item.url}>{item.title}</a>
            </DropdownMenuItem>
          ))}
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
        const isActive = item.url === `#${activeHeading}`;
        return (
          <motion.a
            key={item.url}
            href={item.url}
            variants={listItemVariants}
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
