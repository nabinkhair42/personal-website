import { ArrowUpRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Button } from "@/components/ui/button";
import { DeveloperDetails } from "@/dev-constants/details";

const TEMPLATES = [
  {
    name: "Aura",
    description:
      "A clean, luminous template with soft gradients and spacious layouts. Built for portfolios, landing pages, and SaaS sites.",
    light: "/templates/aura-light.png",
    dark: "/templates/aura-dark.png",
  },
  {
    name: "Onyx",
    description:
      "A bold, dark-first template with sharp contrasts and dense information hierarchy. Built for developer tools and dashboards.",
    light: "/templates/onyx-light.png",
    dark: "/templates/only-dark.png",
  },
] as const;

const DeveloperTemplates = () => {
  return (
    <ShellWrapper>
      <div className="space-y-3 p-2">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Templates</p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Structural Grid Templates
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Production-ready templates built on the Structural Grid design system — the exposed grid
            aesthetic used by Linear, Vercel, and Resend.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEMPLATES.map((template) => (
            <div key={template.name} className="rounded-md border hover:shadow-md transition">
              <div className="relative h-47.5 w-full rounded-t-md overflow-hidden mb-3">
                <Image
                  src={template.light}
                  alt={`${template.name} template preview — light mode`}
                  fill
                  className="object-cover object-top dark:hidden"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <Image
                  src={template.dark}
                  alt={`${template.name} template preview — dark mode`}
                  fill
                  className="object-cover object-top hidden dark:block"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="px-3 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium leading-tight">{template.name}</h3>
                  <p className="text-sm text-muted-foreground pb-2 line-clamp-3">{template.description}</p>
                </div>
                <Button asChild size="sm">
                  <Link
                    href={`mailto:${DeveloperDetails.email}?subject=${encodeURIComponent(`Template Purchase Inquiry — ${template.name}`)}&body=${encodeURIComponent(`Hi Nabin,\n\nI'm interested in purchasing the ${template.name} template.\n\nPlease share the details.\n\nThanks!`)}`}
                  >
                    <Mail className="size-4" />
                    Purchase {template.name}
                    <ArrowUpRight className="size-3" />
                  </Link>
                </Button>
              </div>
              <div className="px-3 py-2" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Link
            href="https://github.com/nabinkhair42/structural-grid-skill"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View Design System
            <ArrowUpRight className="size-3" />
          </Link>
          <Link
            href="https://skills.sh"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            skills.sh
            <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperTemplates;
