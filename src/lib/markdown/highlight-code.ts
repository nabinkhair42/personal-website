import type { ShikiTransformer } from "shiki";

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source;
        node.properties.__raw__ = raw;
      }
    },
  },
] as ShikiTransformer[];
