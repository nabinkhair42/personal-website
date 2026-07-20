import Link from "next/link";
import PageShellWrapper from "@/components/layouts/page-shell";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShellWrapper>
      <ShellWrapper>
        <div className="flex min-h-72 items-end p-2 md:min-h-88">
          <span
            aria-hidden="true"
            className="select-none font-medium leading-none tracking-tight text-foreground/10 text-[clamp(6rem,22vw,12rem)]"
          >
            404
          </span>
        </div>
      </ShellWrapper>

      <ShellWrapper>
        <header className="flex flex-col gap-3 p-2">
          <p className="text-sm text-muted-foreground">Page missing</p>
          <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
            This page took a different route
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            The link you followed is no longer available.
          </p>
        </header>
      </ShellWrapper>

      <ShellWrapper>
        <div className="flex flex-wrap items-center gap-2 p-2">
          <Button size="sm" nativeButton={false} render={<Link href="/">Return home</Link>} />
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            render={<Link href="/blog">Read the blog</Link>}
          />
        </div>
      </ShellWrapper>
    </PageShellWrapper>
  );
}
