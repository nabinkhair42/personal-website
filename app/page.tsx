import { buttonVariants } from "@/components/ui/button";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex sm:min-h-[85.5vh] min-h-[85vh] flex-col items-center justify-center text-center px-2 sm:py-8 py-12">
      <Link
        href="https://github.com/nabinkhair42"
        target="_blank"
        className="mb-5 text-sm flex items-center gap-2 underline underline-offset-4 sm:-mt-12"
      >
        Let&apos;s Chat
        <MoveUpRightIcon className="w-3 h-3 font-extrabold" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 sm:text-6xl">
        Hi there, I&apos;m Nabin Khair
      </h1>
      <p className="mb-8 text-sm max-w-[800px] text-muted-foreground">
        Full Stack Developer with a passion for building web applications.
      </p>
      <div className="flex flex-row items-center gap-5">
        <Link
          href="/projects"
          className={buttonVariants({
            variant: "default",
            className: "px-6",
            size: "lg",
          })}
        >
          Hire Me
        </Link>
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
