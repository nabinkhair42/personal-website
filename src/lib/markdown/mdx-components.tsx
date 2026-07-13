import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import * as React from "react";
import { CopyButton } from "@/lib/markdown/copy-button";
import { getIconForLanguageExtension } from "@/lib/markdown/language-icons";
import { MermaidDiagram } from "@/lib/markdown/mermaid-diagram";
import { cn } from "@/lib/utils";

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => getNodeText(child)).join("");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return "";
}

function getHeadingId(children: React.ReactNode) {
  const id = getNodeText(children)
    .trim()
    .replace(/\s+/g, "-")
    .replace(/'/g, "")
    .replace(/\?/g, "")
    .toLowerCase();

  return id || undefined;
}

function HeadingAnchor({ id, children }: { id?: string; children: React.ReactNode }) {
  if (!id) {
    return children;
  }

  return (
    <a className="group no-underline" href={`#${id}`}>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      <span
        aria-hidden="true"
        className="ml-2 text-muted-foreground opacity-0 group-hover:opacity-100"
      >
        #
      </span>
    </a>
  );
}

const baseMDXComponents = {
  h1: ({ children, id, ...props }: React.ComponentProps<"h1">) => {
    const headingId = id ?? getHeadingId(children);

    return (
      <h1 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h1>
    );
  },
  h2: ({ children, id, ...props }: React.ComponentProps<"h2">) => {
    const headingId = id ?? getHeadingId(children);

    return (
      <h2 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h2>
    );
  },
  h3: ({ children, id, ...props }: React.ComponentProps<"h3">) => {
    const headingId = id ?? getHeadingId(children);

    return (
      <h3 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h3>
    );
  },
  h4: ({ children, id, ...props }: React.ComponentProps<"h4">) => {
    const headingId = id ?? getHeadingId(children);

    return (
      <h4 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h4>
    );
  },
  h5: ({ children, id, ...props }: React.ComponentProps<"h5">) => {
    const headingId = id ?? getHeadingId(children);

    return (
      <h5 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h5>
    );
  },
  h6: ({ children, id, ...props }: React.ComponentProps<"h6">) => {
    const headingId = id ?? getHeadingId(children);

    return (
      <h6 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h6>
    );
  },
  table: (props: React.ComponentProps<"table">) => (
    <div className="typeset-scroll no-scrollbar">
      <table {...props} />
    </div>
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
    return (
      <pre
        data-not-typeset
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    );
  },
  figcaption: ({ className, children, ...props }: React.ComponentProps<"figcaption">) => {
    const iconExtension =
      "data-language" in props && typeof props["data-language"] === "string"
        ? getIconForLanguageExtension(props["data-language"])
        : null;

    return (
      <figcaption
        className={cn(
          "flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70",
          className
        )}
        {...props}
      >
        {iconExtension}
        {children}
      </figcaption>
    );
  },
  code: ({
    className,
    __raw__,
    __src__,
    ...props
  }: React.ComponentProps<"code"> & {
    __raw__?: string;
    __src__?: string;
  }) => {
    if (typeof props.children === "string") {
      return <code className={className} {...props} />;
    }

    return (
      <>
        {__raw__ ? <CopyButton value={__raw__} src={__src__} /> : null}
        <code {...props} />
      </>
    );
  },
  Image: ({ src, className, width, height, alt, ...props }: React.ComponentProps<"img">) => (
    <Image
      {...(props as ImageProps)}
      className={cn("mt-6 rounded-md border", className)}
      src={(src as string) || ""}
      width={width ? Number(width) : 800}
      height={height ? Number(height) : 400}
      alt={alt || "Blog post image"}
    />
  ),
  Link,
  MermaidDiagram,
} satisfies MDXComponents;

export function makeMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...baseMDXComponents,
    ...components,
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return makeMDXComponents(components);
}
