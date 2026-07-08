"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { SectionHeader } from "@/components/layouts/section-header";
import { Button } from "@/components/ui/button";
import { DeveloperDetails } from "@/dev-constants/details";
import { TEMPLATES } from "@/dev-constants/templates";
import { itemVariants, sectionVariants, VIEWPORT } from "../motion";

const buildMail = (name: string) =>
  `mailto:${DeveloperDetails.email}?subject=${encodeURIComponent(
    `Template Purchase Inquiry — ${name}`
  )}&body=${encodeURIComponent(
    `Hi Nabin,\n\nI'm interested in purchasing the ${name} template.\n\nPlease share the details.\n\nThanks!`
  )}`;

const DeveloperTemplates = () => {
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
            label="Templates"
            title="Structural Grid Templates"
            description="Production-ready templates built on the Structural Grid design system — the exposed grid aesthetic used by Linear, Vercel, and Resend."
          />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:auto-rows-fr">
          {TEMPLATES.map((template) => (
            <motion.article
              key={template.name}
              variants={itemVariants}
              className="group flex h-full flex-col overflow-hidden rounded-md border transition-colors hover:border-foreground/40"
            >
              <div className="relative aspect-video shrink-0 overflow-hidden border-b">
                <Image
                  src={template.light}
                  alt={`${template.name} preview — light`}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] dark:hidden"
                />
                <Image
                  src={template.dark}
                  alt={`${template.name} preview — dark`}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="hidden object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] dark:block"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium leading-tight">{template.name}</h3>
                  <p className="line-clamp-3 text-muted-foreground">{template.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    nativeButton={false}
                    variant="outline"
                    render={
                      <Link href={buildMail(template.name)}>
                        <Mail className="fill-current/20 text-muted-foreground" />
                        Get {template.name}
                      </Link>
                    }
                  />
                  <Button
                    size="sm"
                    nativeButton={false}
                    variant="link"
                    render={
                      <Link href={template.link} target="_blank" rel="noopener noreferrer">
                        Live Demo
                        <ArrowUpRight className="size-4 text-muted-foreground" />
                      </Link>
                    }
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
          <Link
            href="https://github.com/nabinkhair42/structural-grid-skill"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 underline underline-offset-4 text-muted-foreground transition-colors hover:text-foreground"
          >
            View Design System
            <ArrowUpRight className="size-3" />
          </Link>
          <Link
            href="https://skills.nabinkhair.com.np"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 underline underline-offset-4 text-muted-foreground transition-colors hover:text-foreground"
          >
            skills
            <ArrowUpRight className="size-3" />
          </Link>
        </motion.div>
      </motion.section>
    </ShellWrapper>
  );
};

export default DeveloperTemplates;
