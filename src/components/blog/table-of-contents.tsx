"use client";

import { List, X } from "lucide-react";
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

const APPLE_EASE = [0.32, 0.72, 0, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.8 };
const ITEM_SPRING = { type: "spring" as const, stiffness: 460, damping: 36 };

const sheetVariants = {
  hidden: { opacity: 0, scale: 0.86, y: 12, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...SPRING,
      staggerChildren: 0.028,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 8,
    filter: "blur(8px)",
    transition: { duration: 0.18, ease: APPLE_EASE, staggerChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -6, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: ITEM_SPRING,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1, ease: APPLE_EASE },
  },
};

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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (allSlugs.length < 3) return null;

  return (
    <MotionConfig transition={SPRING}>
      <nav
        aria-label="Table of contents"
        className="fixed bottom-6 right-6 z-50 pointer-events-none"
      >
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24, scale: 0.9, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: APPLE_EASE }}
          className="pointer-events-auto relative"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="sheet"
                variants={sheetVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="dialog"
                aria-label="Table of contents"
                className={cn(
                  "absolute bottom-14 right-0 w-[min(86vw,20rem)]",
                  "origin-bottom-right overflow-hidden rounded-2xl",
                  "border border-border bg-background",
                  "shadow-2xl shadow-black/30"
                )}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between px-3.5 pt-3 pb-2"
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    On this page
                  </span>
                  <span className="text-[11px] tabular-nums text-muted-foreground/70">
                    <ScrollPercent progress={scrollYProgress} />
                  </span>
                </motion.div>
                <div className="max-h-[60vh] overflow-y-auto px-2 pb-2">
                  <ol className="flex flex-col gap-0.5">
                    {sections.map((section) => (
                      <SectionItem
                        key={section.slug}
                        section={section}
                        activeSlug={activeSlug}
                        onNavigate={() => setIsOpen(false)}
                      />
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close table of contents" : "Open table of contents"}
            className={cn(
              "relative flex size-11 items-center justify-center rounded-full cursor-pointer",
              "border border-border bg-background",
              "shadow-lg shadow-black/20 transition-colors hover:bg-accent/40"
            )}
          >
            <ProgressRing progress={scrollYProgress} />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0, scale: 0.6, rotate: isOpen ? -90 : 90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: isOpen ? 90 : -90 }}
                transition={{ duration: 0.2, ease: APPLE_EASE }}
                className="relative inline-flex"
              >
                {isOpen ? (
                  <X className="size-3.5" strokeWidth={2.25} />
                ) : (
                  <List className="size-3.5" strokeWidth={2.25} />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </nav>
    </MotionConfig>
  );
};

function ScrollPercent({ progress }: { progress: MotionValue<number> }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    return progress.on("change", (v) => setPct(Math.round(v * 100)));
  }, [progress]);
  return <>{pct}%</>;
}

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
    <motion.li variants={itemVariants}>
      <TocLink
        slug={section.slug}
        text={section.text}
        isActive={isActive}
        onNavigate={onNavigate}
      />
      {section.children.length > 0 && (
        <ol className="ml-3 flex flex-col gap-0.5 shadow-[inset_1px_0_0_0_var(--color-border)]">
          {section.children.map((child) => (
            <motion.li key={child.slug} variants={itemVariants}>
              <TocLink
                slug={child.slug}
                text={child.text}
                isActive={activeSlug === child.slug}
                onNavigate={onNavigate}
                nested
              />
            </motion.li>
          ))}
        </ol>
      )}
    </motion.li>
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
      viewBox="0 0 44 44"
      className="absolute inset-0 size-full -rotate-90 pointer-events-none"
      aria-hidden="true"
    >
      <motion.circle
        cx="22"
        cy="22"
        r="20"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        className="stroke-foreground/80"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}
