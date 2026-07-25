import type { ShikiTransformer } from "shiki";

export const transformers: ShikiTransformer[] = [
  {
    code(node) {
      if (node.tagName === "code") {
        node.properties.__raw__ = this.source;
      }
    },
  },
];
