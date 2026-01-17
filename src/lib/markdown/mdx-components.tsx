import { CodeBlock } from "@/lib/markdown/code-block";
import { cn } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

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

export function makeMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
      <h1
        className={cn(
          "font-heading mt-2 scroll-m-28 text-3xl font-medium tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: React.ComponentProps<"h2">) => {
      return (
        <h2
          id={props.children
            ?.toString()
            .replace(/ /g, "-")
            .replace(/'/g, "")
            .replace(/\?/g, "")
            .toLowerCase()}
          className={cn(
            "font-heading [&+]*:[code]:text-xl mt-10 scroll-m-28 text-xl font-medium tracking-tight first:mt-0 lg:mt-16 [&+.steps]:mt-0! [&+.steps>h3]:mt-4! [&+h3]:mt-6! [&+p]:mt-4!",
            className
          )}
          {...props}
        />
      );
    },
    h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn(
          "font-heading mt-12 scroll-m-28 text-lg font-medium tracking-tight [&+p]:mt-4! *:[code]:text-xl",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
      <h4
        className={cn(
          "font-heading mt-8 scroll-m-28 text-base font-medium tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
      <h5
        className={cn("mt-8 scroll-m-28 text-base font-medium tracking-tight", className)}
        {...props}
      />
    ),
    h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
      <h6
        className={cn("mt-8 scroll-m-28 text-base font-medium tracking-tight", className)}
        {...props}
      />
    ),
    a: ({ className, ...props }: React.ComponentProps<"a">) => (
      <a className={cn("font-medium underline underline-offset-4", className)} {...props} />
    ),
    p: ({ className, ...props }: React.ComponentProps<"p">) => (
      <p className={cn("leading-relaxed not-first:mt-6", className)} {...props} />
    ),
    strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <strong className={cn("font-medium", className)} {...props} />
    ),
    ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
      <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
      <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.ComponentProps<"li">) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
      <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props} />
    ),
    table: ({ className, ...props }: React.ComponentProps<"table">) => (
      <div className="no-scrollbar my-6 w-full overflow-y-auto rounded-lg border">
        <table
          className={cn(
            "relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0",
            className
          )}
          {...props}
        />
      </div>
    ),
    tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
      <tr className={cn("m-0 border-b", className)} {...props} />
    ),
    th: ({ className, ...props }: React.ComponentProps<"th">) => (
      <th
        className={cn(
          "px-4 py-2 text-left font-medium bg-muted/50 [[align=center]]:text-center [[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.ComponentProps<"td">) => (
      <td
        className={cn(
          "px-4 py-2 text-left whitespace-nowrap [[align=center]]:text-center [[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),

    code: ({ children, className }) => {
      if (!className) {
        return (
          <code className="relative rounded bg-muted px-0.75 py-px font-mono text-sm font-medium">
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

        return <CodeBlock code={codeContent} language={lang} meta={meta} />;
      }

      return <pre {...props}>{children}</pre>;
    },
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        width={props.width ? Number(props.width) : 800}
        height={props.height ? Number(props.height) : 400}
        className="rounded"
        alt={props.alt || "Blog post image"}
      />
    ),
    hr: () => <hr className="border" />,

    ...components,
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return makeMDXComponents(components);
}
