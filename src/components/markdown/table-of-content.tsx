"use client";

import { cn, getScrollProgress } from "@/lib/utils";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ListChecks,
  Menu,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export type Heading = {
  id: string;
  text: string;
  level: number;
};

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  
  // Use ref to prevent unnecessary re-renders
  const progressRef = useRef(0);

  // Filter out headings that are too deep (h4+)
  const filteredHeadings = headings.filter((heading) => heading.level <= 3);

  useEffect(() => {
    if (!filteredHeadings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0.1 }
    );

    filteredHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      filteredHeadings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [filteredHeadings]);

  // Track scroll position for more accurate progress with debouncing
  useEffect(() => {
    const handleScroll = () => {
      const calculatedPercentage = getScrollProgress();
      // Only update if the change is significant
      if (Math.abs(calculatedPercentage - progressRef.current) > 1) {
        progressRef.current = calculatedPercentage;
      }
    };

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on component mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate and update progress with minimal renders
  useEffect(() => {
    // Calculate reading progress based on both scroll position and active heading
    const activeIndex = filteredHeadings.findIndex(
      (heading) => heading.id === activeId
    );
    const headingProgress =
      activeIndex >= 0
        ? Math.round((activeIndex / (filteredHeadings.length - 1)) * 100)
        : 0;

    // Use a weighted average of both progress indicators
    const calculatedProgress = Math.min(
      Math.round(headingProgress * 0.7 + progressRef.current * 0.3),
      100
    );
    
    setProgress(calculatedProgress);
  }, [activeId, filteredHeadings]);

  if (!filteredHeadings.length) return null;

  const TableOfContentsContent = () => (
    <div className={cn("relative", className)}>
      <div className="sticky top-20">
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <div className="flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold">Table of Contents</h2>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {progress}% read
              </Badge>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                {isCollapsed ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {!isCollapsed && (
            <>
              <div className="mt-2 w-full bg-muted rounded-full h-1 overflow-hidden">
                <div
                  className="bg-primary h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 border-l border-border pl-3 space-y-1.5 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 py-1">
                {filteredHeadings.map((heading, index) => {
                  const isActive = activeId === heading.id;
                  return (
                    <a
                      key={index}
                      href={`#${heading.id}`}
                      className={cn(
                        "block text-sm py-1 hover:text-primary transition-colors relative",
                        {
                          "text-primary font-medium": isActive,
                          "text-muted-foreground": !isActive,
                          "pl-3": heading.level === 3,
                        }
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(heading.id)?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      {isActive && (
                        <div className="absolute left-[-13px] top-0 h-full w-[2px] bg-primary rounded-full" />
                      )}
                      <span className="line-clamp-2">{heading.text}</span>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile floating button and sheet - simplified
  const MobileTableOfContents = () => (
    <div className="lg:hidden fixed bottom-6 right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Table of contents</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[90vw] sm:w-[385px] p-0">
          <div className="p-4 h-full overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Table of Contents</h2>
              </div>
              <Badge variant="outline">{progress}% read</Badge>
            </div>

            <div className="w-full bg-muted rounded-full h-1 mb-4 overflow-hidden">
              <div
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="border-l border-border pl-4 space-y-3">
              {filteredHeadings.map((heading, index) => {
                const isActive = activeId === heading.id;
                return (
                  <a
                    key={`mobile-${index}`}
                    href={`#${heading.id}`}
                    className={cn(
                      "block text-sm py-1.5 hover:text-primary transition-colors relative",
                      {
                        "text-primary font-medium": isActive,
                        "text-muted-foreground": !isActive,
                        "pl-4": heading.level === 3,
                      }
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: "smooth",
                      });
                      // Close the sheet when clicking a heading
                      const closeButton = document.querySelector(
                        "[data-radix-collection-item]"
                      );
                      if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                      }
                    }}
                  >
                    {isActive && (
                      <div className="absolute left-[-13px] top-0 h-full w-[2px] bg-primary rounded-full" />
                    )}
                    {heading.text}
                  </a>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <>
      {/* Desktop version */}
      <div className="hidden lg:block sticky top-20">
        <TableOfContentsContent />
      </div>

      {/* Mobile floating button and sheet */}
      <MobileTableOfContents />
    </>
  );
}
