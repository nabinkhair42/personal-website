"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { PreviewRail, type PreviewRailItem } from "@/components/ui/extended/preview-rail";

function slugify(text: string): string {
  return text.trim().replace(/\s+/g, "-").replace(/'/g, "").replace(/\?/g, "").toLowerCase();
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
    } else if (current) {
      current.children.push({ text, slug });
    } else {
      current = { text, slug, children: [] };
      sections.push(current);
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
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const update = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActive(elements[elements.length - 1].id);
        return;
      }
      const trigger = window.innerHeight * 0.25;
      let next: string | null = null;
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= trigger) next = element.id;
        else break;
      }
      setActive(
        next ?? elements.find((element) => element.getBoundingClientRect().bottom > 0)?.id ?? null
      );
    };

    update();
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const sections = useMemo(() => extractSections(content), [content]);
  const items = useMemo<PreviewRailItem[]>(
    () =>
      sections.flatMap((section) => [
        {
          id: section.slug,
          label: section.text,
          ariaLabel: `Jump to ${section.text}`,
          description: "Article section",
        },
        ...section.children.map((child) => ({
          id: child.slug,
          label: child.text,
          ariaLabel: `Jump to ${child.text}`,
          description: `Subsection of ${section.text}`,
        })),
      ]),
    [sections]
  );
  const slugs = useMemo(() => items.map((item) => item.id), [items]);
  const activeSlug = useActiveHeading(slugs);
  const reduceMotion = useReducedMotion();

  if (items.length < 2) return null;

  const handleSelect = (item: PreviewRailItem) => {
    const element = document.getElementById(item.id);
    if (!element) return;
    element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${item.id}`);
  };

  return (
    <PreviewRail
      label="Table of contents"
      items={items}
      activeId={activeSlug ?? undefined}
      highlightActive
      onItemSelect={handleSelect}
      renderPreview={(item) => (
        <div className="rounded-lg border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur-xl">
          <p className="text-xs font-medium text-card-foreground">{item.label}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{item.description}</p>
        </div>
      )}
      previewSide="before"
      className="pointer-events-none fixed top-1/2 right-0 z-40 w-[min(22rem,calc(100vw-1rem))] -translate-y-1/2 justify-end"
      railClassName="pointer-events-auto"
    />
  );
};
