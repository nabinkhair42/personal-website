"use client";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { defaultMenuItems, type MenuItem } from "@/constants/menu-items";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface RightClickProps {
  children: ReactNode;
  customMenuItems?: MenuItem[];
  className?: string;
}

export function RightClick({ children, customMenuItems, className = "" }: RightClickProps) {
  const { theme, setTheme } = useTheme();
  const [hasSelection, setHasSelection] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check for text selection
  useEffect(() => {
    const checkSelection = () => {
      const selection = window.getSelection();
      setHasSelection(!!selection && selection.toString().length > 0);
    };

    document.addEventListener('selectionchange', checkSelection);
    return () => document.removeEventListener('selectionchange', checkSelection);
  }, []);

  // Check scroll position
  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setShowScrollTop(scrollPosition > 100); // Show after 100px scroll
    };

    checkScrollPosition(); // Initial check
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const themeMenuItem: MenuItem = {
    label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
    icon: theme === 'dark' ? Sun : Moon,
    onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };

  const menuItems = [...defaultMenuItems, themeMenuItem, ...(customMenuItems || [])];

  const renderMenuItem = (item: MenuItem) => {
    if ('type' in item && item.type === 'divider') {
      return <ContextMenuSeparator />;
    }

    if (!('label' in item)) return null;

    // Special handling for Copy Selection menu item
    if (item.label === "Copy Selection" && !hasSelection) {
      return (
        <ContextMenuItem disabled className="text-muted-foreground">
          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
          {item.label}
        </ContextMenuItem>
      );
    }

    // Special handling for Scroll to Top menu item
    if (item.label === "Scroll to Top" && !showScrollTop) {
      return (
        <ContextMenuItem disabled className="text-muted-foreground">
          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
          {item.label}
        </ContextMenuItem>
      );
    }

    const content = (
      <>
        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
        {item.label}
      </>
    );

    if (item.href) {
      return (
        <ContextMenuItem asChild>
          <Link href={item.href} className="w-full cursor-pointer">
            {content}
          </Link>
        </ContextMenuItem>
      );
    }

    return (
      <ContextMenuItem onClick={item.onClick}>
        {content}
      </ContextMenuItem>
    );
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className={className}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        {menuItems.map((item, index) => (
          <div key={index}>{renderMenuItem(item)}</div>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
