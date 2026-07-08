"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { SectionHeader } from "@/components/layouts/section-header";
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
        <motion.div variants={itemVariants}>
          <SectionHeader
            label="Connect"
            title="Let's build together"
            description="Pick the channel that fits best — every link here stays in sync with my latest work."
          />
        </motion.div>

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
                  <div className="flex size-12 items-center justify-center border-r border-dashed">
                    <Icon className="size-8 rounded-md border bg-muted p-0.5" aria-hidden />
                  </div>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate font-medium">{link.name}</span>
                    <span className="truncate text-muted-foreground">{link.handle}</span>
                  </span>
                  <ArrowUpRight className="inline-flex items-center gap-1 text-muted-foreground underline underline-offset-4 transition-colors group-hover:text-foreground" />
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
