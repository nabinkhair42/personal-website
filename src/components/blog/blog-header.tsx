"use client";

import { Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { itemVariants } from "@/components/motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeveloperDetails } from "@/dev-constants/details";
import type { BlogFrontmatter } from "@/lib/markdown/mdx";

interface BlogHeaderProps {
  frontmatter: BlogFrontmatter;
  readingTime: string;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export function BlogHeader({ frontmatter, readingTime }: BlogHeaderProps) {
  return (
    <ShellWrapper>
      <motion.article
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="space-y-4 p-2 py-6"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-medium md:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="text-muted-foreground">{frontmatter.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <Avatar className="size-6 border">
              <AvatarImage
                src={DeveloperDetails.avatar}
                alt={`${DeveloperDetails.name} avatar`}
              />
              <AvatarFallback>{DeveloperDetails.initials}</AvatarFallback>
            </Avatar>
            {frontmatter.developer}
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" />
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Clock className="size-4" />
            {readingTime}
          </div>
        </div>

        {frontmatter.image && (
          <div className="overflow-hidden border">
            <Image
              src={frontmatter.image}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              alt={`Cover image for ${frontmatter.title}`}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}
      </motion.article>
    </ShellWrapper>
  );
}
