import Link from "next/link";
import { CommandIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center  justify-center  h-full text-muted-foreground text-sm">
        <div className="flex items-center gap-3">
          <CommandIcon className="sm:block hidden w-5 h-5 text-muted-foreground" />
          <p className="text-center">
            Build by{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/nabinkhair42"
            >
              nabinkhair42
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
