import { FileCode2 } from "lucide-react";
import { type BundledLanguage, codeToHtml } from "shiki";
import { CopyButton } from "@/lib/markdown/copy-button";
import { cn } from "@/lib/utils";

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

function hasShowLineNumbers(meta?: string | null): boolean {
  if (!meta) return false;
  return /\bshowLineNumbers\b/.test(meta);
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
  const showLineNumbers = hasShowLineNumbers(meta);
  const languageLabel = formatLanguageLabel(language, lang);
  const normalizedCode = code.replace(/[\r\n]*$/u, "");
  const html = await codeToHtml(normalizedCode, {
    lang: lang as unknown as BundledLanguage,
    themes: THEMES,
    defaultColor: false,
  });

  return (
    <figure
      className={cn(
        "not-prose group/code relative my-7 overflow-hidden rounded-xl bg-card",
        "ring-1 ring-border/70 ring-inset"
      )}
      data-language={language ?? lang}
      data-line-numbers={showLineNumbers ? "" : undefined}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/35 px-4 py-2.5 dark:bg-muted/20">
        <div className="flex min-w-0 items-center gap-2.5">
          {title ? (
            <>
              <FileCode2 className="size-3.5 shrink-0 text-muted-foreground/80" aria-hidden />
              <span className="truncate font-mono text-[12.5px] font-medium tracking-tight text-foreground/90">
                {title}
              </span>
            </>
          ) : (
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/85">
              {languageLabel}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          {title ? (
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">
              {languageLabel}
            </span>
          ) : null}
          <CopyButton value={normalizedCode} />
        </div>
      </figcaption>
      <div className="shiki-container" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
