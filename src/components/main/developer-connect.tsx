import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperConnect = () => {
  const SocialLinks = DeveloperDetails.socialLinks;
  return (
    <ShellWrapper>
      <div className="space-y-3 p-2">
        <header className="space-y-2">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Connect</p>
            <h2 className="mt-1 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Let&apos;s build together
            </h2>
          </div>
          <p className="text-base leading-relaxed text-left text-muted-foreground">
            Pick the channel that fits best — every link here stays in sync with my latest work.
          </p>
        </header>

        <div className="grid grid-cols-2 border *:border-r *:border-b [&>*:nth-child(2n)]:border-r-0 [&>*:nth-last-child(-n+2)]:border-b-0">
          {Object.entries(SocialLinks).map(([key, link]) => {
            const Icon = link.icon;
            return (
              <Link
                key={key}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${link.handle} on ${key}`}
                className="flex items-center gap-2 group"
              >
                <span className="flex size-10  items-center justify-center border-r border-dashed">
                  <Icon className="size-8 border rounded-md p-0.5 bg-muted" aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-foreground">{link.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{link.handle}</span>
                </div>
                <div className="text-muted-foreground transition-colors group-hover:text-foreground">
                  <ArrowUpRight className="size-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperConnect;
