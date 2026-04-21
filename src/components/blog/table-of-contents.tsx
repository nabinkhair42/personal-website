"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, MotionConfig, type MotionValue, motion, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-");
}

type Heading = { text: string; slug: string };
type Section = Heading & { children: Heading[] };

function extractSections(content: string): Section[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const match of content.matchAll(headingRegex)) {
    const depth = match[1].length;
    const text = match[2].replace(/[*_`[\]()]/g, "").trim();
    const slug = slugify(text);
    if (depth === 2) {
      current = { text, slug, children: [] };
      sections.push(current);
    } else if (depth === 3) {
      if (current) {
        current.children.push({ text, slug });
      } else {
        current = { text, slug, children: [] };
        sections.push(current);
      }
    }
  }
  return sections;
}

function useActiveHeading(slugs: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = slugs.join("|");

  useEffect(() => {
    if (slugs.length === 0) return;

    const elements = slugs
      .map((slug) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const states = new Map<string, { active: boolean; t: number }>(
      slugs.map((slug) => [slug, { active: false, t: 0 }])
    );

    const compute = (viewTop: number | null) => {
      let best: { slug: string; t: number } | null = null;
      for (const [slug, s] of states) {
        if (!s.active) continue;
        if (!best || s.t > best.t) best = { slug, t: s.t };
      }
      if (best) {
        setActive(best.slug);
        return;
      }
      if (viewTop === null) return;
      let nearestSlug: string | null = null;
      let nearestDist = Number.POSITIVE_INFINITY;
      for (const el of elements) {
        const d = Math.abs(viewTop - el.getBoundingClientRect().top);
        if (d < nearestDist) {
          nearestDist = d;
          nearestSlug = el.id;
        }
      }
      if (nearestSlug) setActive(nearestSlug);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        let viewTop: number | null = null;
        for (const entry of entries) {
          const s = states.get(entry.target.id);
          if (!s) continue;
          if (s.active !== entry.isIntersecting) {
            s.active = entry.isIntersecting;
            s.t = now;
          }
          if (entry.rootBounds) viewTop = entry.rootBounds.top;
        }
        compute(viewTop);
      },
      { threshold: 0.9 }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [key]);

  return active;
}

const SPRING = { type: "spring" as const, bounce: 0.15, duration: 0.35 };

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const sections = useMemo(() => extractSections(content), [content]);
  const allSlugs = useMemo(
    () => sections.flatMap((s) => [s.slug, ...s.children.map((c) => c.slug)]),
    [sections]
  );
  const activeSlug = useActiveHeading(allSlugs);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const activeTitle = useMemo(() => {
    if (!activeSlug) return sections[0]?.text ?? "Introduction";
    for (const section of sections) {
      if (section.slug === activeSlug) return section.text;
      for (const child of section.children) {
        if (child.slug === activeSlug) return child.text;
      }
    }
    return sections[0]?.text ?? "Introduction";
  }, [sections, activeSlug]);

  useEffect(() => {
    if (!isExpanded) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  if (allSlugs.length < 3) return null;

  return (
    <MotionConfig transition={SPRING}>
      <nav
        aria-label="Table of contents"
        className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
          className="pointer-events-auto"
        >
          <motion.div
            ref={containerRef}
            layout
            animate={{ borderRadius: isExpanded ? 16 : 9999 }}
            className="overflow-hidden border bg-card/95 shadow-lg backdrop-blur-md"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {!isExpanded ? (
                <motion.button
                  key="collapsed"
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-expanded={false}
                  aria-label={`Expand table of contents. Current section: ${activeTitle}`}
                  className="flex items-center gap-2.5 py-2 pr-3 pl-3 text-left cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <ProgressRing progress={scrollYProgress} />
                  <span className="text-sm font-medium truncate max-w-[180px] sm:max-w-[280px]">
                    {activeTitle}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </motion.button>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-[min(90vw,26rem)] p-2"
                >
                  <div className="flex items-center justify-between px-2 py-1">
                    <div className="flex items-center gap-2.5">
                      <span className="">On this page</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      aria-label="Collapse table of contents"
                      className="-mr-1 rounded p-1 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                    >
                      <ChevronDown className="h-3.5 w-3.5 rotate-180" />
                    </button>
                  </div>
                  <ol className="mt-1 flex flex-col gap-0.5">
                    {sections.map((section) => (
                      <SectionItem
                        key={section.slug}
                        section={section}
                        activeSlug={activeSlug}
                        onNavigate={() => setIsExpanded(false)}
                      />
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </nav>
    </MotionConfig>
  );
};

function SectionItem({
  section,
  activeSlug,
  onNavigate,
}: {
  section: Section;
  activeSlug: string | null;
  onNavigate: () => void;
}) {
  const isActive = activeSlug === section.slug;
  return (
    <li>
      <TocLink
        slug={section.slug}
        text={section.text}
        isActive={isActive}
        onNavigate={onNavigate}
      />
      {section.children.length > 0 && (
        <ol className="ml-3 flex flex-col gap-0.5 shadow-[inset_1px_0_0_0_var(--color-border)]">
          {section.children.map((child) => (
            <li key={child.slug}>
              <TocLink
                slug={child.slug}
                text={child.text}
                isActive={activeSlug === child.slug}
                onNavigate={onNavigate}
                nested
              />
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}

function TocLink({
  slug,
  text,
  isActive,
  onNavigate,
  nested = false,
}: {
  slug: string;
  text: string;
  isActive: boolean;
  onNavigate: () => void;
  nested?: boolean;
}) {
  return (
    <a
      href={`#${slug}`}
      data-active={isActive || undefined}
      onClick={onNavigate}
      className={cn(
        "relative block py-1.5 pr-2 text-sm leading-snug transition-colors duration-200",
        nested ? "pl-4" : "pl-3",
        isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="toc-active-indicator"
          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
      {text}
    </a>
  );
}

function ProgressRing({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className="shrink-0 -rotate-90"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        fill="none"
        strokeWidth={1.5}
        className="stroke-muted-foreground/25"
      />
      <motion.circle
        cx="8"
        cy="8"
        r="6"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        className="stroke-foreground"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}
