import type { Bookmark, BookmarkCategory } from "@/types";

export const BOOKMARK_CATEGORIES: Record<BookmarkCategory, { label: string }> =
  {
    tools: { label: "Tools" },
    articles: { label: "Articles" },
    engineering: { label: "Engineering" },
    design: { label: "Design" },
    products: { label: "Products" },
  };

export const BOOKMARKS: Bookmark[] = [
  {
    title: "Vercel",
    url: "https://vercel.com",
    category: "tools",
  },
  {
    title: "Excalidraw",
    url: "https://excalidraw.com",
    category: "tools",
  },
  { title: "FumaDocs", url: "https://www.fumadocs.dev", category: "tools" },
  { title: "svgl", url: "https://svgl.app/", category: "tools" },
  {
    title: "How To Be Successful",
    url: "https://blog.samaltman.com/how-to-be-successful",
    category: "articles",
  },
  {
    title: "Developer Marketing",
    url: "https://leerob.com/developer-marketing",
    category: "articles",
  },
  {
    title: "Things You're Allowed To Do",
    url: "https://milan.cvitkovic.net/writing/things_youre_allowed_to_do/",
    category: "articles",
  },
  {
    title: "On Being A Senior Engineer",
    url: "https://www.kitchensoap.com/2012/10/25/on-being-a-senior-engineer/",
    category: "engineering",
  },
  {
    title: "Skills",
    url: "https://skills.sh",
    category: "engineering",
  },
  {
    title: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "design",
  },
  {
    title: "Evil Charts",
    url: "https://evilcharts.com/",
    category: "design",
  },
  {
    title: "Fancy Components",
    url: "https://fancycomponents.dev",
    category: "design",
  },
  {
    title: "VS Code",
    url: "https://code.visualstudio.com",
    category: "products",
  },
];

const CATEGORY_ORDER: BookmarkCategory[] = [
  "tools",
  "articles",
  "engineering",
  "design",
  "products",
];

export const getBookmarkGroups = () =>
  CATEGORY_ORDER.map((category) => ({
    category,
    label: BOOKMARK_CATEGORIES[category].label,
    items: BOOKMARKS.filter((bookmark) => bookmark.category === category),
  })).filter((group) => group.items.length > 0);
