import { FileCode2 } from "lucide-react";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const Icons = {
  json: (props: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"
      />
    </svg>
  ),
  ts: (props: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="currentColor" d="M3 3h18v18H3V3zm10.5 13.5v1.5h-3v-1.5h3zm0-3v1.5h-3V9h3v4.5z" />
    </svg>
  ),
  bash: (props: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="currentColor" d="M4 4h16v16H4V4zm2 4 3 3-3 3v-2l1-1-1-1V8zm5 6h6v2H11v-2z" />
    </svg>
  ),
};

export function getIconForLanguageExtension(language: string) {
  switch (language) {
    case "json":
      return <Icons.json />;
    case "css":
      return <FileCode2 className="size-4 opacity-70" />;
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "typescript":
    case "javascript":
      return <Icons.ts className="fill-foreground" />;
    case "bash":
    case "sh":
    case "shell":
      return <Icons.bash />;
    default:
      return <FileCode2 className="size-4 opacity-70" />;
  }
}
