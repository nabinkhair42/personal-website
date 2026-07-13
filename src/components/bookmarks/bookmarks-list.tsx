"use client";

import {
  itemVariants,
  sectionVariants,
  tightStaggerVariants,
  VIEWPORT,
} from "@/components/motion";
import { getBookmarkGroups } from "@/dev-constants/bookmarks";
import { getFaviconUrl } from "@/lib/bookmarks";
import type { Bookmark } from "@/types";
import { motion } from "motion/react";
import Link from "next/link";

function BookmarkGroupDivider({ label }: { label: string }) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-3">
      <span className="typography-label">{label}</span>
      <div className="h-px flex-1 bg-linear-to-r from-(--pattern-fg) to-transparent" />
    </motion.div>
  );
}

function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  return (
    <motion.li variants={itemVariants}>
      <Link
        href={bookmark.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open ${bookmark.title}`}
        className="group flex items-center gap-2"
      >
        <img
          className="size-4"
          src={getFaviconUrl(bookmark.url)}
          alt={`${bookmark.title} favicon`}
        />
        <h3 className="text-muted-foreground group-hover:text-foreground truncate group-hover:underline">
          {bookmark.title}
        </h3>
      </Link>
    </motion.li>
  );
}

export function BookmarksList() {
  const groups = getBookmarkGroups();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={sectionVariants}
      className="flex flex-col gap-12 p-2"
    >
      {groups.map((group) => (
        <section key={group.category} className="space-y-4">
          <BookmarkGroupDivider label={group.label} />
          <motion.ul
            variants={tightStaggerVariants}
            className="flex flex-col gap-2"
          >
            {group.items.map((bookmark) => (
              <BookmarkItem key={bookmark.url} bookmark={bookmark} />
            ))}
          </motion.ul>
        </section>
      ))}
    </motion.div>
  );
}
