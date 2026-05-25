"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { DeveloperDetails } from "@/dev-constants/details";
import { itemVariants, sectionVariants, tightStaggerVariants, VIEWPORT } from "../motion";

const DeveloperConnect = () => {
  const links = Object.entries(DeveloperDetails.socialLinks);

  return (
    <ShellWrapper>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={sectionVariants}
        className="space-y-3 p-2"
      >
        <motion.header variants={itemVariants} className="space-y-2">
          <p className="text-sm  tracking-[0.2em] text-muted-foreground">Connect</p>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            Let&apos;s build together
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Pick the channel that fits best — every link here stays in sync with my latest work.
          </p>
        </motion.header>

        <motion.div
          variants={tightStaggerVariants}
          className="grid grid-cols-2 border *:border-r *:border-b [&>*:nth-child(2n)]:border-r-0 [&>*:nth-last-child(-n+2)]:border-b-0"
        >
          {links.map(([key, link]) => {
            const Icon = link.icon;
            return (
              <motion.div key={key} variants={itemVariants}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${link.handle} on ${key}`}
                  className="group flex h-full items-center gap-2"
                >
                  <span className="flex size-10 items-center justify-center border-r border-dashed">
                    <Icon className="size-8 rounded-md border bg-muted p-0.5" aria-hidden />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium">{link.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{link.handle}</span>
                  </span>
                  <ArrowUpRight className="mr-2 size-4 text-muted-foreground transition-[transform,color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>
    </ShellWrapper>
  );
};

export default DeveloperConnect;
