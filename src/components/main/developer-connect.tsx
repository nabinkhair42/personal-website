import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperConnect = () => {
  return (
    <ShellWrapper>
      <section className="space-y-3 p-2">
        <SectionHeader title="Connect" description="Pick the channel that fits." />

        <div className="grid grid-cols-2 border *:border-r *:border-b [&>*:nth-child(2n)]:border-r-0 [&>*:nth-last-child(-n+2)]:border-b-0">
          {DeveloperDetails.socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div key={link.name}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${link.handle} on ${link.name}`}
                  title={`${link.name} (${link.handle})`}
                  className="group flex h-full min-h-11 items-center gap-2"
                >
                  <div className="flex size-12 items-center justify-center border-r">
                    <Icon
                      className="size-8 rounded-md border bg-muted p-0.5 outline-1 outline-black/10 dark:outline-white/10"
                      aria-hidden
                    />
                  </div>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate font-medium">{link.name}</span>
                    <span className="truncate text-sm text-muted-foreground">{link.handle}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </ShellWrapper>
  );
};

export default DeveloperConnect;
