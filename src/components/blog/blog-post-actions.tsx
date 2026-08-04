"use client";

import { ArrowLeft, Check, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function BlogPostActions() {
  const router = useRouter();
  const [shared, setShared] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/blog");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 1600);
    } catch {}
  };

  return (
    <div className="flex items-center justify-between">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button aria-label="Go back" onClick={handleBack} size="icon" variant="ghost">
              <ArrowLeft />
            </Button>
          }
        />
        <TooltipContent>Go back</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              aria-label={shared ? "Link copied" : "Share this post"}
              onClick={handleShare}
              size="icon"
              variant="ghost"
            >
              {shared ? <Check /> : <Link2 />}
            </Button>
          }
        />
        <TooltipContent>{shared ? "Link copied" : "Share this post"}</TooltipContent>
      </Tooltip>
    </div>
  );
}
