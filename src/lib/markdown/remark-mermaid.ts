import { visit } from "unist-util-visit";

export function remarkMermaid() {
  return (tree: Parameters<typeof visit>[0]) => {
    visit(tree, "code", (node, index, parent) => {
      const codeNode = node as { lang?: string | null; value: string };

      if (
        codeNode.lang !== "mermaid" ||
        parent === undefined ||
        index === undefined ||
        !("children" in parent)
      ) {
        return;
      }

      const parentNode = parent as { children: unknown[] };
      parentNode.children[index] = {
        type: "mdxJsxFlowElement",
        name: "MermaidDiagram",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "code",
            value: codeNode.value,
          },
        ],
        children: [],
      };
    });
  };
}
