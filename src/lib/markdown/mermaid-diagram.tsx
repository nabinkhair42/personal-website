"use client";

import { Workflow } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CopyButton } from "@/lib/markdown/copy-button";

interface MermaidDiagramProps {
  code: string;
  meta?: string | null;
}

function extractTitle(meta?: string | null): string | null {
  if (!meta) return null;
  const match = meta.match(/title\s*=\s*("|')(.*?)(\1)/);
  return match?.[2] ?? null;
}

export function MermaidDiagram({ code, meta }: MermaidDiagramProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  const title = extractTitle(meta);
  const displayLabel = title ?? "Diagram";

  const renderDiagram = useCallback(async () => {
    try {
      const mermaid = (await import("mermaid")).default;

      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "default",
        securityLevel: "strict",
        fontFamily: "inherit",
      });

      // mermaid.render needs a valid DOM id (no colons from useId)
      const safeId = `mermaid-${id.replace(/:/g, "")}`;
      const { svg: rendered } = await mermaid.render(safeId, code.trim());
      setSvg(rendered);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to render diagram");
      setSvg(null);
    }
  }, [code, id, resolvedTheme]);

  useEffect(() => {
    renderDiagram();
  }, [renderDiagram]);

  return (
    <figure
      className="not-prose my-6 overflow-hidden rounded-lg border border-border/70 shadow-[0_1px_2px_-0.5px_rgb(0_0_0/0.04),0_2px_6px_-3px_rgb(0_0_0/0.04)] transition-[box-shadow,border-color] duration-200 hover:border-border hover:shadow-[0_2px_4px_-0.5px_rgb(0_0_0/0.06),0_8px_20px_-4px_rgb(0_0_0/0.06)]"
      role="img"
      aria-label={title ?? "Mermaid diagram"}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-border/60 bg-linear-to-b from-muted/45 to-muted/15 px-3.5 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Workflow className="size-3.5 shrink-0 text-muted-foreground/70" aria-hidden />
          <span className="truncate font-mono text-[12px] text-foreground/85">{displayLabel}</span>
        </div>
        <CopyButton value={code.trim()} />
      </figcaption>

      {error ? (
        <div className="p-4 font-mono text-sm text-destructive">{error}</div>
      ) : svg ? (
        <div
          ref={containerRef}
          className="flex items-center justify-center overflow-x-auto p-6 [&>svg]:max-w-full [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="flex items-center justify-center p-6">
          <div className="h-48 w-full animate-pulse rounded-md bg-muted/50" />
        </div>
      )}
    </figure>
  );
}
