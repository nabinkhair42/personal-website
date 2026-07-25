"use client";

import { Workflow } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useId, useState } from "react";
import { CopyButton } from "@/lib/markdown/copy-button";
import { cn } from "@/lib/utils";

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
      data-not-typeset
      className={cn(
        "relative my-6 overflow-hidden rounded-xl border border-border bg-code text-code-foreground"
      )}
      role="img"
      aria-label={title ?? "Mermaid diagram"}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <Workflow className="size-4 shrink-0 opacity-70" aria-hidden />
          <span className="truncate">{displayLabel}</span>
        </div>
      </figcaption>
      <CopyButton value={code.trim()} className="top-2.5" />

      {error ? (
        <div className="p-4 font-mono text-sm text-destructive">{error}</div>
      ) : svg ? (
        <div
          className="flex items-center justify-center overflow-x-auto p-6 [&>svg]:h-auto [&>svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="flex items-center justify-center p-6">
          <div className="h-48 w-full rounded-md bg-muted/50" />
        </div>
      )}
    </figure>
  );
}
