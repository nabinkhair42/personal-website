import { ArrowUpRight, ChevronRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Button } from "@/components/ui/button";
import { SoftLink } from "@/components/ui/extended/soft-link";
import { DeveloperDetails } from "@/dev-constants/details";
import { TEMPLATES } from "@/dev-constants/templates";

const buildMail = (name: string) =>
  `mailto:${DeveloperDetails.email}?subject=${encodeURIComponent(
    `Template Purchase Inquiry — ${name}`,
  )}&body=${encodeURIComponent(
    `Hi Nabin,\n\nI'm interested in purchasing the ${name} template.\n\nPlease share the details.\n\nThanks!`,
  )}`;

const DeveloperTemplates = () => {
  return (
    <ShellWrapper>
      <SectionHeader
        title="Templates"
        description="Production-ready starters on the Structural Grid system."
      />

      <div className="grid gap-4 sm:grid-cols-2 sm:auto-rows-fr">
        {TEMPLATES.map((template) => (
          <article
            key={template.name}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border p-1 shadow-sm transition-[box-shadow,border-color] duration-200 ease-out hover:border-foreground/20 hover:shadow-md"
          >
            <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-background transition-[border-color] duration-200 ease-out group-hover:border-foreground/30">
              <Link
                href={template.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${template.name}`}
                title={template.name}
                className="relative aspect-192/100 w-full shrink-0 bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Image
                  src={template.light}
                  alt={`${template.name} preview — light`}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover object-top outline-1 outline-foreground/10 dark:hidden"
                />
                <Image
                  src={template.dark}
                  alt={`${template.name} preview — dark`}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="hidden object-cover object-top outline-1 outline-foreground/10 dark:block"
                />
              </Link>

              <div className="flex flex-1 flex-col px-4 pt-2 pb-4">
                <div className="flex min-h-11 w-full items-center justify-between gap-1 font-medium">
                  <h3 className="line-clamp-2 flex-1 text-balance leading-snug">
                    {template.name}
                  </h3>
                  <span className="flex shrink-0 -translate-x-0.5 scale-75 items-center justify-center text-foreground opacity-0 transition-[opacity,translate,scale] duration-300 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
                    <ChevronRight className="size-4" aria-hidden />
                  </span>
                </div>

                <p
                  className="line-clamp-2 min-h-12 text-pretty font-normal leading-relaxed text-muted-foreground"
                  title={template.description}
                >
                  {template.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                  <Button
                    size="sm"
                    nativeButton={false}
                    variant="outline"
                    render={
                      <Link href={buildMail(template.name)}>
                        <Mail className="size-4 fill-current/20 text-muted-foreground" />
                        Get {template.name}
                      </Link>
                    }
                  />
                  <Button
                    size="sm"
                    nativeButton={false}
                    variant="ghost"
                    render={
                      <Link
                        href={template.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                        <ArrowUpRight className="size-4 text-muted-foreground" />
                      </Link>
                    }
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SoftLink
          href="https://github.com/nabinkhair42/structural-grid-skill"
          target="_blank"
          rel="noreferrer noopener"
          underline
        >
          View Design System
          <ArrowUpRight className="size-3" />
        </SoftLink>
        <SoftLink
          href="https://skills.nabinkhair.com.np"
          target="_blank"
          rel="noreferrer noopener"
          underline
        >
          skills
          <ArrowUpRight className="size-3" />
        </SoftLink>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperTemplates;
