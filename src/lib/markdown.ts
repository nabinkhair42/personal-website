import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import { promises as fs } from 'fs';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import { visit } from 'unist-util-visit';
import matter from 'gray-matter';

// custom components imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Pre from '@/components/markdown/pre';
import Note from '@/components/markdown/note';
import { Stepper, StepperItem } from '@/components/markdown/stepper';
import Image from '@/components/markdown/image';
import Link from '@/components/markdown/link';
import { BrutalistMinimalismDemo } from '@/components/BrutalistMinimalismDemo';

// add custom components
const components = {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  pre: Pre,
  Note,
  Stepper,
  StepperItem,
  img: Image,
  a: Link,
  BrutalistDemo: BrutalistMinimalismDemo,
};

// can be used for other pages like blogs, Guides etc
async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preProcess,
          rehypeCodeTitles,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postProcess,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  });
}

export type BaseMdxFrontmatter = {
  title: string;
  description: string;
};

// Extract headings from markdown content for table of contents
export function extractHeadings(content: string) {
  const headingRegex = /^(#+)\s+(.+?)(?:\s+#+)?$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ level, text, id });
  }

  return headings;
}

function justGetFrontmatterFromMD<Frontmatter>(rawMd: string): Frontmatter {
  return matter(rawMd).data as Frontmatter;
}

// for copying the code in pre
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children;
      if (codeEl.tagName !== 'code') return;
      node.raw = codeEl.children?.[0].value;
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postProcess = () => (tree: any) => {
  visit(tree, 'element', (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      node.properties['raw'] = node.raw;
    }
  });
};

export type Author = {
  avatar?: string;
  handle: string;
  username: string;
  handleUrl: string;
};

export type BlogMdxFrontmatter = BaseMdxFrontmatter & {
  date: string;
  authors: Author[];
  cover: string;
  slug: string;
};

export async function getAllBlogStaticPaths() {
  try {
    const blogFolder = path.join(process.cwd(), '/src/contents/blogs/');
    const res = await fs.readdir(blogFolder);
    return res.map((file) => file.split('.')[0]);
  } catch (err) {
    console.error('Error in getAllBlogStaticPaths', err);
    return [];
  }
}
export async function getAllBlogs() {
  const blogFolder = path.join(process.cwd(), '/src/contents/blogs/');
  const files = await fs.readdir(blogFolder);
  const uncheckedRes = await Promise.all(
    files.map(async (file) => {
      if (!file.endsWith('.mdx')) return undefined;
      const filepath = path.join(process.cwd(), `/src/contents/blogs/${file}`);
      const rawMdx = await fs.readFile(filepath, 'utf-8');
      return {
        ...justGetFrontmatterFromMD<BlogMdxFrontmatter>(rawMdx),
        slug: file.split('.')[0],
      };
    })
  );
  return uncheckedRes.filter((it) => !!it) as (BlogMdxFrontmatter & {
    slug: string;
  })[];
}

export async function getBlogForSlug(slug: string) {
  const blogFile = path.join(
    process.cwd(),
    '/src/contents/blogs/',
    `${slug}.mdx`
  );
  try {
    const rawMdx = await fs.readFile(blogFile, 'utf-8');
    const { content, frontmatter } = await parseMdx<BlogMdxFrontmatter>(rawMdx);
    const headings = extractHeadings(rawMdx);
    return { content, frontmatter, headings };
  } catch {
    return undefined;
  }
}
