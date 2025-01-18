import { buttonVariants } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex sm:min-h-[85.5vh] min-h-[85vh] flex-col items-center justify-center text-center px-2 sm:py-8 py-12">


      <h1 className="text-3xl font-bold mb-4 sm:text-6xl">
        Hi there, I&apos;m Nabin Khair
      </h1>
      <p className="mb-8 text-sm max-w-[800px] text-muted-foreground">
        Full Stack Developer with a passion for building web applications.
      </p>
      <div className="flex flex-row items-center gap-5">
        <Link
          href="/nkhair.cv.pdf"
          target="_blank"
          download="Nabin Khair CV.pdf"
          className={buttonVariants({
            variant: "default",
            className: "px-6",
            size: "lg",
          })}
        >
          <Download className="w-6 h-6 mr-1" />
          Download CV
        </Link>

        {/* Regular Link to Blog */}
        <Link
          href="/blog"
          className={buttonVariants({
            variant: "secondary",
            className: "px-6",
            size: "lg",
          })}
        >
          Read Blog
        </Link>
      </div>
    </div>
  );
}
