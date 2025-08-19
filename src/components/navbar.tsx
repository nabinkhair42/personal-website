// filepath: src/components/navbar.tsx
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Anchor from './anchor';
import MyProfileImage from '@/app/icon.png';
import Image from 'next/image';
import { Menu, Mail } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { NAVLINKS } from '@/constants/navigation';
import { cn } from '@/lib/utils';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContactForm } from '@/app/(pages)/contact/_components/contact-form';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isHireMeOpen, setIsHireMeOpen] = React.useState(false);

  const handleHireMeClick = () => {
    setIsHireMeOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        <div className="relative mx-auto flex h-full items-center justify-between px-6 max-w-5xl">
          <div className="flex items-center gap-8">
            <Logo />
            <div className="hidden items-center gap-6 md:flex">
              {NAVLINKS.map((navlink) => (
                <Anchor
                  key={navlink.title}
                  href={navlink.href}
                  className={cn(
                    'relative text-sm font-light text-zinc-600 dark:text-zinc-400 transition-all duration-300 hover:text-zinc-900 dark:hover:text-zinc-100 font-mono uppercase tracking-wide',
                    pathname === navlink.href &&
                      'text-zinc-900 dark:text-zinc-100'
                  )}
                  activeClassName="after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-zinc-900 dark:after:bg-zinc-100"
                >
                  {navlink.title}
                </Anchor>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleHireMeClick}
              className="bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 border-0 px-6 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300"
            >
              <Mail className="mr-2 h-4 w-4" />
              Hire Me
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden h-9 w-9"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                  <SheetHeader className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <SheetTitle className="text-left font-light text-zinc-900 dark:text-zinc-100">
                      Navigation
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-6">
                    {NAVLINKS.map((navlink) => (
                      <Link
                        key={navlink.title}
                        href={navlink.href}
                        onClick={handleMobileMenuClose}
                        className={cn(
                          'flex items-center gap-3 text-sm font-light font-mono uppercase tracking-wide text-zinc-600 dark:text-zinc-400 transition-all duration-300 hover:text-zinc-900 dark:hover:text-zinc-100 py-2 border-b border-zinc-100 dark:border-zinc-800',
                          pathname === navlink.href &&
                            'text-zinc-900 dark:text-zinc-100'
                        )}
                      >
                        <div className="w-2 h-2 bg-zinc-300 dark:bg-zinc-700"></div>
                        {navlink.title}
                      </Link>
                    ))}

                    <Button
                      className="w-full font-mono text-xs uppercase tracking-wider bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                      onClick={handleHireMeClick}
                    >
                      <Mail className="h-3 w-3 mr-2" />
                      Hire Me
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hire Me Dialog */}
      <Dialog open={isHireMeOpen} onOpenChange={setIsHireMeOpen}>
        <DialogContent className="w-full max-w-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
              Let&apos;s Work Together
            </DialogTitle>
            <DialogDescription className="text-zinc-600 dark:text-zinc-400 font-light">
              Send me a message and I&apos;ll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group transition-all duration-300"
    >
      <div className="relative p-1 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors duration-300">
        <Image
          src={MyProfileImage}
          height={24}
          width={24}
          alt="Nabin Khair"
          className="grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100 text-sm tracking-wide">
          nKhair
        </span>
        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600 transition-colors duration-300"></div>
      </div>
    </Link>
  );
}
