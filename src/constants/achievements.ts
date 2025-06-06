import { BookOpen, Code2, Trophy, Users, type LucideIcon } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  date: string;
  icon: LucideIcon;
}

export const achievements: Achievement[] = [
  {
    title: "Nepali Educate Platform",
    description: "Built a content platform achieving 100,000+ monthly visits",
    date: "2023",
    icon: Trophy,
  },
  {
    title: "Chrome Extension",
    description: "Successfully developed and published Google Bulk Photos Deleter with Stripe integration",
    date: "2024",
    icon: Code2,
  },
  {
    title: "Client Projects",
    description: "Delivered multiple successful projects including Express News, UncleSams Tech, and Receipt Vault",
    date: "2023-2024",
    icon: Users,
  },
  {
    title: "Technical Writing",
    description: "Published comprehensive technical documentation and tutorials",
    date: "2024",
    icon: BookOpen,
  },
];