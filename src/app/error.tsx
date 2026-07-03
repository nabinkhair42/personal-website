"use client";

import Link from "next/link";
import { useEffect } from "react";
import PageShellWrapper from "@/components/layouts/page-shell";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <PageShellWrapper>
      <ShellWrapper>
        <div className="flex min-h-72 items-end p-2 md:min-h-88">
          <span
            aria-hidden="true"
            className="select-none font-medium leading-none tracking-tight text-foreground/10 text-[clamp(6rem,22vw,12rem)]"
          >
            500
          </span>
        </div>
      </ShellWrapper>

      <ShellWrapper>
        <header className="space-y-3 p-2">
          <p className="text-sm  text-muted-foreground">Something went wrong</p>
          <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            An unexpected error occurred
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Don&apos;t worry, these things happen. Try again, or head back home to keep exploring.
          </p>
          {error?.digest ? (
            <p className="font-mono text-xs text-muted-foreground/80">Reference: {error.digest}</p>
          ) : null}
        </header>
      </ShellWrapper>

      <ShellWrapper>
        <div className="flex flex-wrap items-center gap-2 p-2">
          <Button size="sm" onClick={reset} render={<span>Try again</span>} />
          Try again
          <Button size="sm" variant="outline" render={<Link href="/">Return home</Link>} />
        </div>
      </ShellWrapper>
    </PageShellWrapper>
  );
}
