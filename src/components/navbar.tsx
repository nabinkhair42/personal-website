"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import Anchor from "./anchor";
import { SiApacheopenoffice } from "react-icons/si";
import { Menu, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { NAVLINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import React from "react";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b bg-background">
      <div className="mx-auto flex h-full  items-center justify-between px-6 max-w-5xl">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden items-center gap-6 md:flex">
            {NAVLINKS.map((navlink) => (
              <Anchor
                key={navlink.title}
                href={navlink.href}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-accent-foreground",
                  pathname === navlink.href && "text-foreground"
                )}
              >
                {navlink.title}
              </Anchor>
            ))}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/hire-me"
            className={cn(
              buttonVariants(),
              "gap-2 ",
              pathname === "/hire-me" && "bg-primary/90"
            )}
          >
            <Mail className="h-4 w-4" />
            Hire Me
          </Link>
          <ThemeToggle />
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-4">
                  {NAVLINKS.map((navlink) => (
                    <Link
                      key={navlink.title}
                      href={navlink.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-sm font-medium text-muted-foreground transition-colors hover:text-accent-foreground",
                        pathname === navlink.href && "text-foreground"
                      )}
                    >
                      {navlink.title}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <SiApacheopenoffice className="h-6 w-6" />
      <span className="font-code font-bold">nKhair</span>
    </Link>
  );
}
