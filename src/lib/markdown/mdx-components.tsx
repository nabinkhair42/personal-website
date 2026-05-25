import { ArrowUpRight, Hash } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { CodeBlock } from "@/lib/markdown/code-block";
import { MermaidDiagram } from "@/lib/markdown/mermaid-diagram";
import { cn } from "@/lib/utils";

type CodeChild = {
  props: {
    children: string;
    className?: string;
    metastring?: string;
    "data-meta"?: string;
  };
};

const LANGUAGE_CLASS_REGEX = /language-([\w-]+)/;

function isCodeChild(node: unknown): node is CodeChild {
  if (typeof node !== "object" || node === null || !("props" in node)) {
    return false;
  }

  const props = (node as { props?: unknown }).props;

  return (
    typeof props === "object" &&
    props !== null &&
    typeof (props as { children?: unknown }).children === "string"
  );
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-");
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    return extractText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

function HeadingAnchor({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      aria-label={`Permalink to ${label}`}
      className={cn(
        "ml-2 inline-flex items-center align-middle text-muted-foreground/40",
        "opacity-0 transition-[opacity,color] duration-200",
        "group-hover/heading:opacity-100 hover:text-primary focus-visible:opacity-100"
      )}
    >
      <Hash className="size-[0.7em]" aria-hidden />
    </a>
  );
}

export function makeMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
      <h1
        className={cn(
          "scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 mt-10 mb-4",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, children, ...props }: React.ComponentProps<"h2">) => {
      const text = extractText(children);
      const id = text ? slugify(text) : undefined;
      return (
        <h2
          id={id}
          className={cn(
            "group/heading scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 mt-12 mb-4",
            className
          )}
          {...props}
        >
          {children}
          {id ? <HeadingAnchor id={id} label={text} /> : null}
        </h2>
      );
    },
    h3: ({ className, children, ...props }: React.ComponentProps<"h3">) => {
      const text = extractText(children);
      const id = text ? slugify(text) : undefined;
      return (
        <h3
          id={id}
          className={cn(
            "group/heading scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 mt-9 mb-3",
            className
          )}
          {...props}
        >
          {children}
          {id ? <HeadingAnchor id={id} label={text} /> : null}
        </h3>
      );
    },
    h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
      <h4
        className={cn(
          "scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 mt-7 mb-2",
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
      <h5
        className={cn(
          "scroll-m-20 text-base font-semibold tracking-tight first:mt-0 mt-6 mb-2",
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
      <h6
        className={cn(
          "scroll-m-20 text-sm font-semibold uppercase tracking-[0.12em] first:mt-0 mt-5 mb-1.5 text-muted-foreground",
          className
        )}
        {...props}
      />
    ),
    a: ({ className, href, children, ...props }: React.ComponentProps<"a">) => {
      const isExternal = href?.startsWith("http") && !href?.includes("nabinkhair.com.np");
      return (
        <a
          href={href}
          className={cn(
            "font-medium text-primary underline underline-offset-[5px] decoration-primary/30 transition-colors hover:decoration-primary",
            className
          )}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...props}
        >
          {children}
          {isExternal ? (
            <ArrowUpRight
              className="ml-0.5 inline-block size-[0.85em] -translate-y-[1px] opacity-60"
              aria-hidden
            />
          ) : null}
        </a>
      );
    },
    p: ({ className, ...props }: React.ComponentProps<"p">) => (
      <p className={cn("leading-7 not-first:mt-5", className)} {...props} />
    ),
    strong: ({ className, ...props }: React.ComponentProps<"strong">) => (
      <strong className={cn("font-semibold text-foreground", className)} {...props} />
    ),
    em: ({ className, ...props }: React.ComponentProps<"em">) => (
      <em className={cn("italic", className)} {...props} />
    ),
    ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
      <ul
        className={cn(
          "my-5 ml-6 list-disc marker:text-muted-foreground/50 [&>li]:mt-2 [&>li]:pl-1",
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
      <ol
        className={cn(
          "my-5 ml-6 list-decimal marker:font-medium marker:text-muted-foreground/60 [&>li]:mt-2 [&>li]:pl-1",
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }: React.ComponentProps<"li">) => (
      <li className={cn("leading-7", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
      <blockquote
        className={cn(
          "relative my-6 rounded-r-md border-l-2 border-foreground/25 bg-muted/30 py-4 pl-6 pr-5 italic text-muted-foreground",
          "[&>p]:m-0 [&>p+p]:mt-3",
          className
        )}
        {...props}
      />
    ),
    table: ({ className, ...props }: React.ComponentProps<"table">) => (
      <div className="my-6 w-full overflow-hidden rounded-lg border border-border/70 shadow-[0_1px_2px_-0.5px_rgb(0_0_0/0.04)]">
        <div className="w-full overflow-x-auto">
          <table className={cn("w-full border-collapse text-sm", className)} {...props} />
        </div>
      </div>
    ),
    thead: ({ className, ...props }: React.ComponentProps<"thead">) => (
      <thead
        className={cn(
          "bg-linear-to-b from-muted/50 to-muted/20 border-b border-border/60",
          className
        )}
        {...props}
      />
    ),
    tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
      <tr
        className={cn(
          "border-b border-border/40 last:border-b-0 transition-colors hover:bg-muted/25",
          className
        )}
        {...props}
      />
    ),
    th: ({ className, ...props }: React.ComponentProps<"th">) => (
      <th
        className={cn(
          "px-4 py-2.5 text-left font-medium uppercase tracking-[0.1em] text-[11px] text-muted-foreground",
          "[[align=center]]:text-center [[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.ComponentProps<"td">) => (
      <td
        className={cn(
          "px-4 py-3 text-left align-top [[align=center]]:text-center [[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    code: ({ children, className }) => {
      if (!className) {
        return (
          <code className="rounded-md border border-border/60 bg-muted/70 px-[0.4em] py-[0.15em] font-mono text-[0.85em] text-foreground">
            {children}
          </code>
        );
      }

      return <code className={className}>{children}</code>;
    },
    pre: ({ children, ...props }) => {
      const child = Array.isArray(children) ? children[0] : children;

      if (isCodeChild(child)) {
        const { children: codeContent, className, metastring } = child.props;
        const langMatch = LANGUAGE_CLASS_REGEX.exec(className ?? "");
        const lang = langMatch?.[1];
        const meta = metastring ?? child.props["data-meta"] ?? undefined;

        if (lang === "mermaid") {
          return <MermaidDiagram code={codeContent} meta={meta} />;
        }

        return <CodeBlock code={codeContent} language={lang} meta={meta} />;
      }

      return (
        <pre
          className="my-6 overflow-x-auto rounded-lg border border-border/70 bg-muted/20 p-4 font-mono text-sm"
          {...props}
        >
          {children}
        </pre>
      );
    },
    img: (props) => (
      <span className="block my-6">
        <Image
          {...(props as ImageProps)}
          width={props.width ? Number(props.width) : 800}
          height={props.height ? Number(props.height) : 400}
          className="rounded border"
          alt={props.alt || "Blog post image"}
        />
        {props.alt ? (
          <span className="block mt-2 text-center text-sm text-muted-foreground">{props.alt}</span>
        ) : null}
      </span>
    ),
    hr: () => (
      <hr className="my-10 h-px border-0 bg-linear-to-r from-transparent via-border to-transparent" />
    ),

    ...components,
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return makeMDXComponents(components);
}
