import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { githubUrl } from "@/lib/site";

const SiteFooter = () => {
  return (
    <footer className="flex flex-col items-center gap-1 py-8 text-center">
      <p className="text-lg font-medium">devn.</p>
      <p className="text-muted-foreground">
        Built by{" "}
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-primary hover:underline underline-offset-2"
          title="Developer GitHub account"
        >
          nabinkhair
          <ArrowUpRight size={15} className="inline-block" />
        </Link>{" "}
        at{" "}
        <Link
          href="https://github.com/codixra"
          className="transition-colors hover:text-primary hover:underline underline-offset-2"
          title="Codixra Lab GitHub account"
          target="_blank"
          rel="noopener noreferrer"
        >
          codixra
          <ArrowUpRight size={15} className="inline-block" />
        </Link>
      </p>
    </footer>
  );
};

export default SiteFooter;
