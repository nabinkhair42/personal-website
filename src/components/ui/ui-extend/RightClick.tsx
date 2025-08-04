"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { defaultMenuItems, type MenuItem } from "@/constants/menu-items";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

interface RightClickProps {
  children: ReactNode;
  customMenuItems?: MenuItem[];
  className?: string;
}

export function RightClick({ children, customMenuItems, className = "" }: RightClickProps) {
  // const { theme, setTheme } = useTheme();
  const [hasSelection, setHasSelection] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [clickedLink, setClickedLink] = useState<string | null>(null);

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
      setShowScrollTop(scrollPosition > 100);
    };

    checkScrollPosition();
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    setClickedLink(null);
    
    let element = e.target as HTMLElement;
    while (element) {
      if (element.tagName === 'A') {
        const href = element.getAttribute('href');
        if (href) {
          setClickedLink(href);
          break;
        }
      }
      element = element.parentElement!;
      if (!element) break;
    }
  };

  useEffect(() => {
    const handleClick = () => setClickedLink(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // const themeMenuItem: MenuItem = {
  //   label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
  //   icon: theme === 'dark' ? Sun : Moon,
  //   onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  // };

  const menuItems = [
    ...(clickedLink ? [
      {
        label: "Open in New Tab",
        icon: ExternalLink,
        onClick: () => window.open(clickedLink, '_blank'),
      },
      { type: 'divider' as const }
    ] : []),
    ...defaultMenuItems,
    // themeMenuItem,
    ...(customMenuItems || []),
  ];

  const renderMenuItem = (item: MenuItem) => {
    if ('type' in item && item.type === 'divider') {
      return (
        <ContextMenuSeparator className="bg-zinc-200 dark:bg-zinc-800 my-1" />
      );
    }

    if (!('label' in item)) return null;

    // Special handling for Copy Selection menu item
    if (item.label === "Copy Selection" && !hasSelection) {
      return (
        <ContextMenuItem 
          disabled 
          className="text-zinc-400 dark:text-zinc-600 cursor-not-allowed font-mono text-xs uppercase tracking-wide opacity-50"
        >
          <div className="flex items-center gap-3">
            {item.icon && <item.icon className="h-3 w-3" />}
            <span>{item.label}</span>
          </div>
        </ContextMenuItem>
      );
    }

    // Special handling for Scroll to Top menu item
    if (item.label === "Scroll to Top" && !showScrollTop) {
      return (
        <ContextMenuItem 
          disabled 
          className="text-zinc-400 dark:text-zinc-600 cursor-not-allowed font-mono text-xs uppercase tracking-wide opacity-50"
        >
          <div className="flex items-center gap-3">
            {item.icon && <item.icon className="h-3 w-3" />}
            <span>{item.label}</span>
          </div>
        </ContextMenuItem>
      );
    }

    const content = (
      <div className="flex items-center gap-3">
        {item.icon && (
          <div className="flex items-center justify-center w-4 h-4">
            <item.icon className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
          </div>
        )}
        <span className="font-mono text-xs uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
          {item.label}
        </span>
      </div>
    );

    if (item.href) {
      return (
        <ContextMenuItem 
          asChild 
          className="focus:bg-zinc-100 dark:focus:bg-zinc-800 focus:text-zinc-900 dark:focus:text-zinc-100 transition-colors duration-200 py-2.5 px-3"
        >
          <Link href={item.href} className="w-full cursor-pointer flex">
            {content}
          </Link>
        </ContextMenuItem>
      );
    }

    return (
      <ContextMenuItem 
        onClick={item.onClick}
        className="focus:bg-zinc-100 dark:focus:bg-zinc-800 focus:text-zinc-900 dark:focus:text-zinc-100 transition-colors duration-200 py-2.5 px-3 cursor-pointer"
      >
        {content}
      </ContextMenuItem>
    );
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className={className} onContextMenu={handleContextMenu}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-lg backdrop-blur-sm">
        {/* Enhanced header with geometric pattern */}
        <div className="relative p-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          </div>
          <div className="relative flex items-center gap-2">
            <div className="w-2 h-2 bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Context Menu
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
          </div>
        </div>

        {/* Menu items */}
        <div className="py-1">
          {menuItems.map((item, index) => (
            <div key={index}>{renderMenuItem(item)}</div>
          ))}
        </div>

        {/* Enhanced footer */}
        <div className="relative p-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
}