import Link from "next/link";
import { getBookmarkGroups } from "@/dev-constants/bookmarks";
import { getFaviconUrl } from "@/lib/bookmarks";
import type { Bookmark } from "@/types";

function BookmarkGroupDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
    </div>
  );
}

function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  return (
    <li>
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
    </li>
  );
}

export function BookmarksList() {
  const groups = getBookmarkGroups();

  return (
    <div className="flex flex-col gap-12 p-2">
      {groups.map((group) => (
        <section key={group.category} className="space-y-4">
          <BookmarkGroupDivider label={group.label} />
          <ul className="flex flex-col gap-2">
            {group.items.map((bookmark) => (
              <BookmarkItem key={bookmark.url} bookmark={bookmark} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
