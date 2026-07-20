import { SectionHeader } from "@/components/layouts/section-header";

export function BookmarksIntroduction() {
  return (
    <section className="space-y-2 p-2 py-6">
      <SectionHeader
        label="Bookmarks"
        title="Links worth keeping."
        headingLevel="h1"
        description="A collection of interesting links, articles, tools, and resources I've saved and keep coming back to."
      />
    </section>
  );
}
