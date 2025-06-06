"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function Copy({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard", {
        style: {
          background: "rgb(244 244 245)",
          border: "1px solid rgb(212 212 216)",
          color: "rgb(39 39 42)",
        },
      });
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  }

  return (
    <Button
      variant="outline"
      size="xs"
      onClick={handleCopy}
      className="group h-7 w-7 p-0 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300"
    >
      {isCopied ? (
        <CheckIcon className="w-3 h-3 text-green-600 dark:text-green-400" />
      ) : (
        <CopyIcon className="w-3 h-3 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300" />
      )}
      <span className="sr-only">{isCopied ? "Copied!" : "Copy code"}</span>
    </Button>
  );
}