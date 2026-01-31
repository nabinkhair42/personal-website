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
      return (
        <h2
          id={text ? slugify(text) : undefined}
          className={cn(
            "scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 mt-10 mb-4",
            className
          )}
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ className, children, ...props }: React.ComponentProps<"h3">) => {
      const text = extractText(children);
      return (
        <h3
          id={text ? slugify(text) : undefined}
          className={cn(
            "scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 mt-8 mb-3",
            className
          )}
          {...props}
        >
          {children}
        </h3>
      );
    },
    h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
      <h4
        className={cn(
          "scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 mt-6 mb-2",
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
          "scroll-m-20 text-sm font-semibold tracking-tight first:mt-0 mt-4 mb-1.5 text-muted-foreground",
          className
        )}
        {...props}
      />
    ),
    a: ({ className, href, ...props }: React.ComponentProps<"a">) => {
      const isExternal = href?.startsWith("http") && !href?.includes("nabinkhair.com.np");
      return (
        <a
          href={href}
          className={cn(
            "font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors",
            className
          )}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...props}
        />
      );
    },
    p: ({ className, ...props }: React.ComponentProps<"p">) => (
      <p className={cn("leading-7 not-first:mt-5", className)} {...props} />
    ),
    strong: ({ className, ...props }: React.ComponentProps<"strong">) => (
      <strong className={cn("font-semibold", className)} {...props} />
    ),
    em: ({ className, ...props }: React.ComponentProps<"em">) => (
      <em className={cn("italic", className)} {...props} />
    ),
    ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
      <ul className={cn("my-5 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
      <ol className={cn("my-5 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
    ),
    li: ({ className, ...props }: React.ComponentProps<"li">) => (
      <li className={cn("leading-7", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
      <blockquote
        className={cn(
          "my-5 border-l-4 border-border pl-5 italic text-muted-foreground [&>p]:mt-2",
          className
        )}
        {...props}
      />
    ),
    table: ({ className, ...props }: React.ComponentProps<"table">) => (
      <div className="my-5 w-full overflow-hidden rounded-lg border">
        <table className={cn("w-full border-collapse text-sm", className)} {...props} />
      </div>
    ),
    tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
      <tr className={cn("border-b last:border-b-0", className)} {...props} />
    ),
    th: ({ className, ...props }: React.ComponentProps<"th">) => (
      <th
        className={cn(
          "px-4 py-2.5 text-left font-semibold bg-muted/50 [[align=center]]:text-center [[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.ComponentProps<"td">) => (
      <td
        className={cn(
          "px-4 py-2.5 text-left [[align=center]]:text-center [[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    code: ({ children, className }) => {
      if (!className) {
        return (
          <code className="relative rounded-md border border-border/50 bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
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
          className="my-5 overflow-x-auto rounded-lg border bg-muted/20 p-4 font-mono text-sm"
          {...props}
        >
          {children}
        </pre>
      );
    },
    img: (props) => (
      <figure className="my-6">
        <Image
          {...(props as ImageProps)}
          width={props.width ? Number(props.width) : 800}
          height={props.height ? Number(props.height) : 400}
          className="rounded-lg border"
          alt={props.alt || "Blog post image"}
        />
        {props.alt ? (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {props.alt}
          </figcaption>
        ) : null}
      </figure>
    ),
    hr: () => <hr className="my-8 border-t border-border" />,

    ...components,
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return makeMDXComponents(components);
}
