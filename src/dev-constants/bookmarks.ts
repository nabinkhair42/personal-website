import type { Bookmark, BookmarkCategory } from "@/types";

export const BOOKMARK_CATEGORIES: Record<BookmarkCategory, { label: string }> = {
  tools: { label: "Tools" },
  articles: { label: "Articles" },
  engineering: { label: "Engineering" },
  design: { label: "Design" },
  products: { label: "Products" },
};

export const BOOKMARKS: Bookmark[] = [
  // Articles
  {
    title: "Simon Willison's Blog",
    url: "https://simonwillison.net",
    category: "articles",
  },
  {
    title: "Subtraction",
    url: "https://www.subtraction.com",
    category: "articles",
  },
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
  { title: "Are.na", url: "https://www.are.na", category: "design" },
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
  { title: "Land-book", url: "https://land-book.com", category: "design" },
  { title: "Mobbin", url: "https://mobbin.com", category: "design" },
  {
    title: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "design",
  },

  // Engineering
  {
    title: "Ahead of AI",
    url: "https://magazine.sebastianraschka.com",
    category: "engineering",
  },
  {
    title: "Awesome GEO",
    url: "https://github.com/amplifying-ai/awesome-generative-engine-optimization",
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
    url: "https://www.letta.com",
    category: "engineering",
  },
  {
    title: "Lilian Weng's Blog",
    url: "https://lilianweng.github.io",
    category: "engineering",
  },

  // Products
  {
    title: "Langfuse",
    url: "https://langfuse.com",
    category: "products",
  },
  {
    title: "Peerlist",
    url: "https://peerlist.io",
    category: "products",
  },
  {
    title: "VS Code",
    url: "https://code.visualstudio.com",
    category: "products",
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
