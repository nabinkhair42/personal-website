"use client";

import { FileText, Mail } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { itemVariants, sectionVariants } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperIntro = () => {
  const { name, designation, bio, avatar, email, resume } = DeveloperDetails;

  return (
    <ShellWrapper>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="flex flex-col gap-3 p-2 md:flex-row"
      >
        <motion.div
          variants={itemVariants}
          className="relative size-28 shrink-0 self-start md:mt-2.5 md:size-32"
        >
          <Image
            src={avatar}
            alt={`Profile photo of ${name}, ${designation}`}
            fill
            sizes="(min-width: 768px) 128px, 112px"
            priority
            className="rounded-md border object-cover shadow-md"
          />
        </motion.div>

        <div className="space-y-2">
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="typography-title">{name}</h1>
            <p className="text-muted-foreground">{designation}</p>
          </motion.div>

          <motion.p variants={itemVariants} className="text-muted-foreground">
            {bio}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 pt-1">
            {email && (
              <Button
                nativeButton={false}
                render={
                  <Link href={`mailto:${email}`}>
                    <Mail className="size-4 text-white/80 fill-white/50 dark:fill-muted-foreground/20 dark:text-muted-foreground" />
                    Hire Me
                    <Kbd>E</Kbd>
                  </Link>
                }
              ></Button>
            )}
            {resume && (
              <Button
                nativeButton={false}
                variant="outline"
                render={
                  <Link href={resume} target="_blank" rel="noreferrer noopener">
                    <FileText className="size-4 fill-muted-foreground/20 text-muted-foreground" />
                    Resume
                    <Kbd>R</Kbd>
                  </Link>
                }
              ></Button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </ShellWrapper>
  );
};

export default DeveloperIntro;
