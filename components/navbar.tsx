import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon, TwitterIcon, CommandIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Anchor from "./anchor";

export const NAVLINKS = [
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

export function Navbar() {
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-6">
            <div className="">
              <Logo />
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
              {NAVLINKS.map((navlink) => (
                <Anchor
                  key={navlink.title}
                  href={navlink.href}
                  className="hover:text-accent-foreground"
                >
                  {navlink.title}
                </Anchor>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex ml-2.5 sm:ml-0">
              <Link
                href="https://github.com/nabinkhair42"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <GithubIcon className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <TwitterIcon className="h-4 w-4" />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <CommandIcon className="w-6 h-6 text-muted-foreground" strokeWidth={2} />
      <h2 className="text-md font-bold font-code">nKhair</h2>
    </Link>
  );
}
