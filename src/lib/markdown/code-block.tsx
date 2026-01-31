import { type BundledLanguage, codeToHtml } from "shiki";
import { CopyButton } from "@/lib/markdown/copy-button";

const THEMES = {
  light: "github-light-default",
  dark: "github-dark-default",
} as const;

type HighlightLanguage = BundledLanguage | "text";

const LANGUAGE_ALIASES: Record<string, HighlightLanguage> = {
  bash: "bash",
  c: "c",
  cpp: "cpp",
  css: "css",
  go: "go",
  html: "html",
  javascript: "js",
  js: "js",
  json: "json",
  jsx: "jsx",
  markdown: "md",
  md: "md",
  python: "python",
  rust: "rust",
  sh: "bash",
  shell: "bash",
  sql: "sql",
  text: "text",
  plaintext: "text",
  ts: "ts",
  tsx: "tsx",
  typescript: "ts",
  yaml: "yaml",
  yml: "yaml",
};

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "Shell",
  c: "C",
  cpp: "C++",
  css: "CSS",
  go: "Go",
  html: "HTML",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  markdown: "Markdown",
  md: "Markdown",
  plaintext: "Plaintext",
  python: "Python",
  rust: "Rust",
  sh: "Shell",
  shell: "Shell",
  sql: "SQL",
  text: "Plaintext",
  ts: "TypeScript",
  tsx: "TSX",
  typescript: "TypeScript",
  yaml: "YAML",
  yml: "YAML",
};

const FALLBACK_LANGUAGE: HighlightLanguage = "text";

function resolveLanguage(language?: string): HighlightLanguage {
  if (!language) {
    return FALLBACK_LANGUAGE;
  }

  const normalised = language.toLowerCase();

  if (normalised in LANGUAGE_ALIASES) {
    return LANGUAGE_ALIASES[normalised];
  }

  return normalised as BundledLanguage;
}

function extractTitle(meta?: string | null): string | null {
  if (!meta) {
    return null;
  }

  const match = meta.match(/title\s*=\s*("|')(.*?)(\1)/);

  if (!match) {
    return null;
  }

  return match[2];
}

function formatLanguageLabel(original?: string | null, resolved?: HighlightLanguage): string {
  const source = (original ?? (typeof resolved === "string" ? resolved : null))?.toLowerCase();

  if (!source) {
    return "Code";
  }

  return LANGUAGE_LABELS[source] ?? source.toUpperCase();
}

interface CodeBlockProps {
  code: string;
  language?: string | null;
  meta?: string | null;
}

export async function CodeBlock({ code, language, meta }: CodeBlockProps) {
  const lang = resolveLanguage(language ?? undefined);
  const title = extractTitle(meta);
  const displayLabel = title ?? formatLanguageLabel(language, lang);
  const normalizedCode = code.replace(/[\r\n]*$/u, "");
  const html = await codeToHtml(normalizedCode, {
    lang: lang as unknown as BundledLanguage,
    themes: THEMES,
    defaultColor: false,
  });

  return (
    <figure
      className="not-prose overflow-hidden rounded-sm border border-border bg-muted/20"
      data-language={language ?? lang}
    >
      <figcaption className="flex items-center justify-between border-b bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground">
        <span className="truncate">{displayLabel}</span>
        <CopyButton value={normalizedCode} />
      </figcaption>
      <div className="shiki-container" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
