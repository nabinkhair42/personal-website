import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { githubUrl } from "@/lib/site";

const SiteFooter = () => {
  return (
    <footer className="flex h-24 flex-col items-center justify-center space-y-1 text-center">
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
          className="transition-colors hover:text-amber-400 hover:underline underline-offset-2"
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
