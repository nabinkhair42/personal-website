import { ArrowUpRight, FileText, Mail } from "lucide-react";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Button } from "@/components/ui/button";
import ThemedIcon from "@/components/ui/extended/themed-icon";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperConnect = () => {
  const SocialLinks = DeveloperDetails.socialLinks;
  return (
    <>
      <ShellWrapper>
        <div className="space-y-3 p-2">
          <header className="space-y-2">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Connect</p>
              <h2 className="mt-1 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                Let&apos;s build together
              </h2>
            </div>
            <p className="text-base leading-relaxed text-justify text-muted-foreground">
              Pick the channel that fits best every link here stays in sync with my latest work.
            </p>
          </header>

          <div className="grid grid-cols-2 border *:border-r *:border-b [&>*:nth-child(2n)]:border-r-0 [&>*:nth-last-child(-n+2)]:border-b-0">
            {Object.entries(SocialLinks).map(([key, link]) => (
              <Link
                key={key}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${link.handle} on ${key}`}
                className="flex items-center gap-2 group"
              >
                <span className="flex size-12 items-center justify-center border-r border-dashed">
                  <ThemedIcon
                    src={link.icon}
                    alt={link.handle}
                    size={32}
                    hasDarkVariant={link.hasDarkIcon}
                    className="size-8"
                    title={`Open ${link.handle} on ${link.name}`}
                  />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-foreground">{link.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{link.handle}</span>
                </div>
                <div className="text-muted-foreground transition-colors group-hover:text-foreground">
                  <ArrowUpRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ShellWrapper>
      <ShellWrapper>
        <section className="space-y-4 p-2 bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]">
          <div className="flex flex-col space-y-2">
            <div className="space-y-1">
              <h2 className="text-2xl font-medium text-foreground">Prefer a direct line?</h2>
              <p className="text-sm text-muted-foreground">
                Email lands straight in my inbox and my resume is updated with every new engagement.
              </p>
            </div>
            <ShellWrapper>
              <div className="flex flex-wrap gap-2">
                {DeveloperDetails.email && (
                  <Button asChild>
                    <Link href={`mailto:${DeveloperDetails.email}`}>
                      <Mail className="size-4" />
                      Email Me
                    </Link>
                  </Button>
                )}
                {DeveloperDetails.resume && (
                  <Button variant="outline" asChild>
                    <Link href={DeveloperDetails.resume} target="_blank" rel="noreferrer noopener">
                      <FileText className="size-4" />
                      Download Resume
                    </Link>
                  </Button>
                )}
              </div>
            </ShellWrapper>
          </div>
        </section>
      </ShellWrapper>
    </>
  );
};

export default DeveloperConnect;
