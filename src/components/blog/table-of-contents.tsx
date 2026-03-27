"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface TocItem {
  text: string;
  slug: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-");
}

function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];

  for (const match of content.matchAll(headingRegex)) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`[\]()]/g, "").trim();
    headings.push({ text, slug: slugify(text), level });
  }

  return headings;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const headings = extractHeadings(content);
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="p-2 bg-muted/50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-normal text-xl cursor-pointer select-none flex items-center justify-between w-full"
      >
        <p>On this page</p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ol
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-1 mt-2 overflow-hidden"
          >
            {headings.map((heading) => (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  className={`block text-muted-foreground hover:text-primary transition-colors ease-in-out duration-300 hover:underline underline-offset-4 ${
                    heading.level === 3 ? "pl-6" : "pl-3"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </nav>
  );
};
