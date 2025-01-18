import Link from "next/link";
import { SiApacheopenoffice } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center  justify-center  h-full text-sm">
        <div className="flex items-center gap-3">
          <SiApacheopenoffice className="h-5 w-5" />
          <p className="text-center text-muted-foreground">
            Build by{" "}
            <Link
              className="px-1 underline underline-offset-2 hover:text-primary transition-colors"
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
