export type MenuItem = {
  label: string;
  icon?: string;
  onClick?: () => void;
  href?: string;
} | {
  type: 'divider';
};

export const navigationMenuItems: MenuItem[] = [
  { type: 'divider' },
  {
    label: "About Me",
    icon: "👨‍💻",
    href: "/about",
  },
  {
    label: "My Projects",
    icon: "🚀",
    href: "/projects",
  },
  {
    label: "Blog",
    icon: "📝",
    href: "/blog",
  },
  {
    label: "Contact",
    icon: "📧",
    href: "/contact",
  },
];

export const defaultMenuItems: MenuItem[] = [
  {
    label: "Go Back",
    icon: "←",
    onClick: () => window.history.back(),
  },
  {
    label: "Refresh Page",
    icon: "↻",
    onClick: () => window.location.reload(),
  },
  {
    label: "Scroll to Top",
    icon: "↑",
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  },
  {
    label: "Copy Selection",
    icon: "📋",
    onClick: () => {
      const selection = window.getSelection()?.toString();
      if (selection) {
        navigator.clipboard.writeText(selection);
      }
    },
  },
  { type: 'divider' },
  
];
