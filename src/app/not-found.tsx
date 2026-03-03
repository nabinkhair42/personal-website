import Link from "next/link";
import PageShellWrapper from "@/components/layouts/page-shell";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShellWrapper>
      <section className="relative flex h-screen w-full items-center justify-center px-8 py-16 md:px-0">
        <div className="relative flex max-w-xl flex-col items-left space-y-6">
          <ShellWrapper>
            <span className="text-[clamp(4rem,18vw,10rem)] font-medium leading-none tracking-tight text-foreground/10">
              404
            </span>
          </ShellWrapper>

          <header className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Page missing</p>
            <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              This page took a different route
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              The link you followed is no longer available.
            </p>
          </header>
          <ShellWrapper>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/">Return home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog">Read the blog</Link>
              </Button>
            </div>
          </ShellWrapper>
        </div>
      </section>
    </PageShellWrapper>
  );
}
