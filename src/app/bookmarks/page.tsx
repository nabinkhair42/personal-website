import { BookmarksIntroduction, BookmarksList } from "@/components/bookmarks";
import PageShellWrapper from "@/components/layouts/page-shell";
import { BOOKMARKS } from "@/dev-constants/bookmarks";
import { DeveloperDetails } from "@/dev-constants/details";
import { bookmarksMetadata } from "@/lib/seo-utils";
import type { Metadata } from "next";

export const metadata: Metadata = bookmarksMetadata();

const BookmarksPage = () => {
  const siteUrl = DeveloperDetails.portfolio.replace(/\/$/, "");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bookmarks",
        item: `${siteUrl}/bookmarks`,
      },
    ],
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bookmarks | Nabin Khair",
    description:
      "A curated registry of links, articles, tools, and resources saved by Nabin Khair.",
    url: `${siteUrl}/bookmarks`,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: DeveloperDetails.name,
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BOOKMARKS.map((bookmark, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: bookmark.url,
        name: bookmark.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />
      <PageShellWrapper>
        <BookmarksIntroduction />
        <BookmarksList />
      </PageShellWrapper>
    </>
  );
};

export default BookmarksPage;
