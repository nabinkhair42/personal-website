"use client";

import { ReactNode } from "react";
import Link from "next/link";
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
  const menuItems = [...defaultMenuItems, ...(customMenuItems || [])];

  const renderMenuItem = (item: MenuItem) => {
    if ('type' in item && item.type === 'divider') {
      return <ContextMenuSeparator />;
    }

    if (!('label' in item)) return null;

    const content = (
      <>
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
      </>
    );

    if (item.href) {
      return (
        <ContextMenuItem asChild>
          <Link href={item.href} target="_blank" className="w-full cursor-pointer">
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
