import { FileText, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { DeveloperDetails } from "@/dev-constants/details";
import { ButtonGroup } from "@/components/ui/button-group";

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
            className="rounded-md border object-cover shadow-md"
          />
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
              {name}
            </h1>
            <p className="text-muted-foreground">{designation}</p>
          </div>

          <p className="text-muted-foreground">{bio}</p>

          <ButtonGroup>
            {email && (
              <Button
                nativeButton={false}
                variant="ghost"
                render={
                  <Link href={`mailto:${email}`}>
                    <Mail className="size-4 fill-current/20 dark:text-accent-foreground" />
                    Hire Me
                    <Kbd>E</Kbd>
                  </Link>
                }
              />
            )}
            {resume && (
              <Button
                nativeButton={false}
                variant="ghost"
                render={
                  <Link href={resume} target="_blank" rel="noreferrer noopener">
                    <FileText className="size-4 fill-current/20 dark:text-accent-foreground" />
                    Resume
                    <Kbd>R</Kbd>
                  </Link>
                }
              />
            )}
          </ButtonGroup>
        </div>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperIntro;
