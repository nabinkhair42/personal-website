import type { Bookmark, BookmarkCategory } from "@/types";

const BOOKMARK_CATEGORIES: Record<BookmarkCategory, { label: string }> = {
  tools: { label: "Tools" },
  articles: { label: "Articles" },
  engineering: { label: "Engineering" },
  design: { label: "Design" },
  products: { label: "Products" },
};

export const BOOKMARKS: Bookmark[] = [
  // Articles
  {
    title: "Things You're Allowed To Do",
    url: "https://milan.cvitkovic.net/writing/things_youre_allowed_to_do/",
    category: "articles",
  },
  {
    title: "Your AI Product Needs Evals",
    url: "https://hamel.dev/blog/posts/evals/",
    category: "articles",
  },

  // Design
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
    title: "React NumberFlow",
    url: "https://number-flow.barvian.me/",
    category: "design",
  },
  {
    title: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "design",
  },
  {
    title: "Vengeance UI",
    url: "https://www.vengenceui.com/",
    category: "design",
  },
  // Engineering
  {
    title: "Ahead of AI",
    url: "https://magazine.sebastianraschka.com",
    category: "engineering",
  },
  {
    title: "Building Effective Agents",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    category: "engineering",
  },
  {
    title: "GEO: Generative Engine Optimization",
    url: "https://arxiv.org/abs/2311.09735",
    category: "engineering",
  },
  {
    title: "Letta (MemGPT)",
    url: "https://www.letta.com/research/",
    category: "engineering",
  },
  {
    title: "Lilian Weng's Blog",
    url: "https://lilianweng.github.io",
    category: "engineering",
  },

  // Tools
  {
    title: "Excalidraw",
    url: "https://excalidraw.com",
    category: "tools",
  },
  {
    title: "FumaDocs",
    url: "https://www.fumadocs.dev",
    category: "tools",
  },
  {
    title: "svgl",
    url: "https://svgl.app/",
    category: "tools",
  },
  {
    title: "UnJS",
    url: "https://unjs.io",
    category: "tools",
  },
  {
    title: "Vercel",
    url: "https://vercel.com",
    category: "tools",
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
