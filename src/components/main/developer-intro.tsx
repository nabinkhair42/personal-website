import { FileText, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Kbd } from "@/components/ui/kbd";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperIntro = () => {
  const { name, designation, bio, avatar, email, resume } = DeveloperDetails;

  return (
    <ShellWrapper>
      <div className="flex flex-col gap-3 p-2 md:flex-row">
        <div className="relative size-28 shrink-0 self-start md:mt-2.5 md:size-32">
          <Image
            src={avatar}
            alt={`Profile photo of ${name}, ${designation}`}
            fill
            sizes="(min-width: 768px) 128px, 112px"
            priority
            className="rounded-md border object-cover shadow-md outline-1 outline-black/10 dark:outline-white/10"
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-medium tracking-tight text-balance leading-[1.1] md:text-4xl">
              {name}
            </h1>
            <p className="text-sm text-muted-foreground">{designation}</p>
          </div>

          <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">{bio}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
            {email ? (
              <Link
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-3.5" aria-hidden />
                Email
                <Kbd>E</Kbd>
              </Link>
            ) : null}
            {resume ? (
              <Link
                href={resume}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <FileText className="size-3.5" aria-hidden />
                CV
                <Kbd>R</Kbd>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperIntro;
