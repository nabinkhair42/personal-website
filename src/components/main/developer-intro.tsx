import { FileText, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { DeveloperDetails } from "@/dev-constants/details";
import ShellWrapper from "../layouts/shell-wrapper";

const DeveloperIntro = () => {
  const { name, designation, bio, avatar, email, resume } = DeveloperDetails;

  return (
    <ShellWrapper>
      <div className="relative p-2 pattern-hatch">
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-3 space-y-3 md:space-y-0 ">
          <Image
            src={avatar}
            alt={`Profile photo of ${name}, ${designation}`}
            width={1000}
            height={1000}
            className="h-28 w-28 md:h-32 md:w-32 md:mt-2.5 shrink-0 rounded-md border object-cover shadow-md"
            title={`Avatar of ${name}`}
          />
          <div className="space-y-2">
            <div className="space-y-1">
              <h1 className="mt-1 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                {name}
              </h1>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {designation}
              </p>
            </div>
            <p className="text-base leading-relaxed text-left text-muted-foreground">{bio}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {email && (
                <Button asChild size="sm">
                  <Link href={`mailto:${email}`}>
                    <Mail className="size-4" />
                    Email Me
                    <Kbd>E</Kbd>
                  </Link>
                </Button>
              )}
              {resume && (
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={resume}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bg-background"
                  >
                    <FileText className="size-4" />
                    Resume
                    <Kbd>R</Kbd>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperIntro;
