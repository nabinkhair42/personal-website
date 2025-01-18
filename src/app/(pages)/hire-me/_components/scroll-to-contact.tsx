"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface ScrollToContactProps {
  children?: React.ReactNode;
}

export const ScrollToContact = ({ children }: ScrollToContactProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact");
  };

  return (
    <Button onClick={handleClick} size="lg" className="gap-2">
      <Mail className="h-4 w-4" />
      {children || "Get in Touch"}
    </Button>
  );
};
