"use client";

import { List } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  type MotionValue,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

// Active heading = the last heading whose top has crossed ~25% of the viewport.
// Predictable on both short and long sections, and never jumpy on long titles.
function useActiveHeading(slugs: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = slugs.join("|");

  useEffect(() => {
    if (slugs.length === 0) return;
    const elements = slugs
      .map((slug) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const update = () => {
      // At the bottom of the document, the trailing sections may never cross
      // the 25vh trigger because the page can't scroll any further. Force the
      // last heading active so the indicator matches what the reader sees.
      const docEl = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= docEl.scrollHeight - 2;
      if (atBottom) {
        setActive(elements[elements.length - 1].id);
        return;
      }

      const trigger = window.innerHeight * 0.25;
      let activeId: string | null = null;
      for (const el of elements) {
        const top = el.getBoundingClientRect().top;
        if (top - trigger <= 0) {
          activeId = el.id;
        } else {
          break;
        }
      }
      if (!activeId) {
        for (const el of elements) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            activeId = el.id;
            break;
          }
        }
      }
      if (activeId) setActive(activeId);
    };

    update();
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [key]);

  return active;
}

const APPLE_EASE = [0.32, 0.72, 0, 1] as const;
const ISLAND_SPRING = { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.8 };
const EXPAND_EASE = { duration: 0.34, ease: APPLE_EASE };
const COLLAPSE_EASE = { duration: 0.22, ease: APPLE_EASE };
const INDICATOR_SPRING = { type: "spring" as const, stiffness: 520, damping: 44 };
const ITEM_SPRING = { type: "spring" as const, stiffness: 480, damping: 36 };

const listVariants = {
  hidden: { transition: { staggerChildren: 0.004, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.018, delayChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: APPLE_EASE },
  },
};

type IndicatorRect = { top: number; height: number; left: number };

function useIndicatorPosition(
  listRef: React.RefObject<HTMLOListElement | null>,
  activeSlug: string | null,
  isOpen: boolean,
) {
  const [rect, setRect] = useState<IndicatorRect | null>(null);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list || !activeSlug) {
      setRect(null);
      return;
    }
    const link = list.querySelector<HTMLElement>(`a[data-slug="${activeSlug}"]`);
    if (!link) {
      setRect(null);
      return;
    }
    const nested = link.dataset.nested === "true";
    const listRect = list.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setRect({
      top: linkRect.top - listRect.top + list.scrollTop,
      height: linkRect.height,
      left: nested ? 12 : 8,
    });
  }, [listRef, activeSlug]);

  useEffect(() => {
    if (!isOpen) return;
    measure();
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    list.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      list.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [isOpen, activeSlug, measure, listRef]);

  return rect;
}

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
  const activeTitle = useMemo(() => {
    if (!activeSlug) return null;
    for (const s of sections) {
      if (s.slug === activeSlug) return s.text;
      for (const c of s.children) {
        if (c.slug === activeSlug) return c.text;
      }
    }
    return null;
  }, [sections, activeSlug]);
  const [isOpen, setIsOpen] = useState(false);
  const [pct, setPct] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const indicatorRect = useIndicatorPosition(listRef, activeSlug, isOpen);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Always-on subscription so the percentage stays in sync regardless of sheet state.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPct(Math.round(v * 100));
  });

  useEffect(() => {
    setPct(Math.round(scrollYProgress.get() * 100));
  }, [scrollYProgress]);

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // After the morph completes, focus the active link (falls back to first).
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      const target = activeSlug
        ? (containerRef.current?.querySelector<HTMLAnchorElement>(`a[data-slug="${activeSlug}"]`) ??
          firstLinkRef.current)
        : firstLinkRef.current;
      target?.focus({ preventScroll: true });
    }, 220);
    return () => clearTimeout(t);
  }, [isOpen, activeSlug]);

  const handleNavigate = useCallback(
    (slug: string) => {
      const el = document.getElementById(slug);
      if (!el) return;
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `#${slug}`);
      setIsOpen(false);
    },
    [reduceMotion]
  );

  if (allSlugs.length < 2) return null;

  return (
    <MotionConfig transition={ISLAND_SPRING}>
      <nav
        aria-label="Table of contents"
        className={cn(
          "fixed z-50 flex items-end gap-2 pointer-events-none",
          "right-[max(1rem,env(safe-area-inset-right))]",
          "bottom-[max(1.25rem,env(safe-area-inset-bottom))]"
        )}
      >
        <AnimatePresence>
          {!isOpen && activeTitle && (
            <motion.button
              key="active-pill"
              type="button"
              layout
              onClick={() => setIsOpen(true)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 24, scale: 0.85, filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: { delay: 0.18, ...ISLAND_SPRING },
              }}
              exit={{
                opacity: 0,
                x: 24,
                scale: 0.85,
                filter: "blur(6px)",
                transition: { duration: 0.16, ease: APPLE_EASE },
              }}
              aria-label={`Currently reading: ${activeTitle}. Open table of contents.`}
              className={cn(
                "pointer-events-auto inline-flex h-11 max-w-[min(50vw,18rem)] items-center gap-2",
                "rounded-full border border-border bg-background/95 px-4 backdrop-blur-xl",
                "shadow-2xl shadow-black/30 cursor-pointer transition-colors hover:bg-accent/40",
                "outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span className="relative block min-w-0 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={activeTitle}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={ITEM_SPRING}
                    className="block truncate text-sm font-medium text-foreground"
                  >
                    {activeTitle}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          ref={containerRef}
          layout
          transition={ISLAND_SPRING}
          animate={{ borderRadius: isOpen ? 20 : 999 }}
          className={cn(
            "pointer-events-auto relative overflow-hidden",
            "border border-border bg-background/95 backdrop-blur-xl",
            "shadow-2xl shadow-black/30"
          )}
          style={{ originX: 1, originY: 1 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isOpen ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.94, y: 6 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: EXPAND_EASE,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: 4,
                  transition: COLLAPSE_EASE,
                }}
                role="region"
                aria-labelledby="toc-heading"
                className="flex w-[min(86vw,20rem)] origin-bottom-right flex-col"
              >
                <motion.header
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.05, ...EXPAND_EASE } }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  className="flex items-center justify-between px-4 pt-3 pb-2"
                >
                  <span
                    id="toc-heading"
                    className="text-[11px] font-medium tracking-[0.08em] text-muted-foreground"
                  >
                    On this page
                  </span>
                  <span className="text-[11px] text-muted-foreground/70">{pct}%</span>
                </motion.header>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={listVariants}
                  className="max-h-[60vh] overflow-y-auto px-2 pb-2"
                >
                  <ol ref={listRef} className="relative flex flex-col gap-0.5">
                    {indicatorRect && (
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute z-10 w-px rounded-full bg-foreground"
                        initial={false}
                        animate={{
                          top: indicatorRect.top,
                          height: indicatorRect.height,
                          left: indicatorRect.left,
                        }}
                        transition={INDICATOR_SPRING}
                      />
                    )}
                    {sections.map((section, sIdx) => (
                      <SectionItem
                        key={section.slug}
                        section={section}
                        activeSlug={activeSlug}
                        firstLinkRef={sIdx === 0 ? firstLinkRef : undefined}
                        onNavigate={handleNavigate}
                      />
                    ))}
                  </ol>
                </motion.div>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.04, ...EXPAND_EASE } }}
                exit={{ opacity: 0, scale: 0.9, transition: COLLAPSE_EASE }}
                aria-expanded={false}
                aria-label={`Open table of contents — ${pct}% read`}
                className={cn(
                  "relative grid size-11 place-items-center cursor-pointer",
                  "transition-colors hover:bg-accent/40"
                )}
              >
                <ProgressRing progress={scrollYProgress} />
                <List className="relative size-3.5" strokeWidth={2.25} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>
    </MotionConfig>
  );
};

function SectionItem({
  section,
  activeSlug,
  onNavigate,
  firstLinkRef,
}: {
  section: Section;
  activeSlug: string | null;
  onNavigate: (slug: string) => void;
  firstLinkRef?: React.Ref<HTMLAnchorElement>;
}) {
  return (
    <motion.li variants={itemVariants}>
      <TocLink
        slug={section.slug}
        text={section.text}
        isActive={activeSlug === section.slug}
        onNavigate={onNavigate}
        linkRef={firstLinkRef}
      />
      {section.children.length > 0 && (
        <NestedList>
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
        </NestedList>
      )}
    </motion.li>
  );
}

function NestedList({ children }: { children: React.ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [guide, setGuide] = useState<{ top: number; height: number } | null>(null);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const items = list.querySelectorAll<HTMLElement>(":scope > li");
    if (items.length === 0) return;
    const listRect = list.getBoundingClientRect();
    const first = items[0].getBoundingClientRect();
    const last = items[items.length - 1].getBoundingClientRect();
    setGuide({
      top: first.top - listRect.top + list.scrollTop + 6,
      height: last.bottom - first.top - 12,
    });
  }, []);

  useEffect(() => {
    measure();
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    for (const li of list.querySelectorAll("li")) ro.observe(li);
    return () => ro.disconnect();
  }, [measure, children]);

  return (
    <ol ref={listRef} className="relative ml-3 flex flex-col gap-0.5">
      {guide && guide.height > 0 && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 w-px bg-border/70"
          style={{ top: guide.top, height: guide.height }}
        />
      )}
      {children}
    </ol>
  );
}

function TocLink({
  slug,
  text,
  isActive,
  onNavigate,
  nested = false,
  linkRef,
}: {
  slug: string;
  text: string;
  isActive: boolean;
  onNavigate: (slug: string) => void;
  nested?: boolean;
  linkRef?: React.Ref<HTMLAnchorElement>;
}) {
  return (
    <a
      ref={linkRef}
      href={`#${slug}`}
      data-slug={slug}
      data-nested={nested || undefined}
      data-active={isActive || undefined}
      aria-current={isActive ? "location" : undefined}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(slug);
      }}
      className={cn(
        "block rounded-md py-1.5 pr-2 text-sm leading-snug outline-none transition-colors duration-200",
        "focus-visible:bg-accent/40",
        nested ? "pl-5" : "pl-4",
        isActive ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {text}
    </a>
  );
}

function ProgressRing({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className="pointer-events-none absolute inset-0 size-full -rotate-90"
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
