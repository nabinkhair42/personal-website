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

  if (headings.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="p-2">
      <p className="text-normal">On this page</p>
      <ol className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className={`block text-sm text-muted-foreground hover:text-normal transition-colors ${
                heading.level === 3 ? "pl-6" : "pl-3"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
