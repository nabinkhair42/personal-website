"use client";
import { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  RotateCcw,
  ArrowUp,
  Copy,
  User,
  Rocket,
  FileText,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

export type MenuItem = {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  href?: string;
} | {
  type: 'divider';
};

export const navigationMenuItems: MenuItem[] = [
  { type: 'divider' },
  {
    label: "About Me",
    icon: User,
    href: "/about",
  },
  {
    label: "My Projects",
    icon: Rocket,
    href: "/projects",
  },
  {
    label: "Blog",
    icon: FileText,
    href: "/blog",
  },
  {
    label: "Contact",
    icon: Mail,
    href: "/contact",
  },
];

export const defaultMenuItems: MenuItem[] = [
  {
    label: "Go Back",
    icon: ArrowLeft,
    onClick: () => window.history.back(),
  },
  {
    label: "Refresh Page",
    icon: RotateCcw,
    onClick: () => window.location.reload(),
  },
  {
    label: "Scroll to Top",
    icon: ArrowUp,
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  },
  {
    label: "Copy Selection",
    icon: Copy,
    onClick: () => {
      const selection = window.getSelection()?.toString();
      if (selection) {
        navigator.clipboard.writeText(selection);
        toast.success("Copied to clipboard");
      }
    },
  },
  { type: 'divider' },
];
