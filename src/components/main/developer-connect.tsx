import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperConnect = () => {
  return (
    <ShellWrapper>
      <SectionHeader title="Connect" description="Pick the channel that fits." />

      <div className="grid grid-cols-2 overflow-hidden rounded-xl border *:border-r *:border-b [&>*:nth-child(2n)]:border-r-0 [&>*:nth-last-child(-n+2)]:border-b-0">
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
                className="group flex min-h-14 items-stretch transition-colors hover:bg-muted/40"
              >
                <div className="flex w-12 shrink-0 items-center justify-center border-r">
                  <Icon
                    className="size-8 rounded-md border bg-muted p-0.5 outline-1 outline-foreground/10"
                    aria-hidden
                  />
                </div>
                <span className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-2 py-2">
                  <span className="truncate font-medium leading-snug">{link.name}</span>
                  <span className="truncate text-sm leading-relaxed text-muted-foreground">
                    {link.handle}
                  </span>
                </span>
                <ArrowUpRight className="mr-3 size-4 shrink-0 self-center text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
            </div>
          );
        })}
      </div>
    </ShellWrapper>
  );
};

export default DeveloperConnect;
