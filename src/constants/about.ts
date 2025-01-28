import {
  Code2,
  Database,
  Layout,
  Palette,
  Server,
  Trophy,
  Users,
  BookOpen,
  Settings,
  type LucideIcon,
} from "lucide-react";
import {
  SiAmazon,
  SiCloudflare,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
} from "react-icons/si";
import { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiExpress,
  SiNodedotjs,
  SiMongodb,
  SiFigma,
  SiAdobexd,
  SiJavascript,
  SiTypescript,
  SiC,
  SiCplusplus,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

export const aboutMe = {
  intro:
    "MERN and Next.js Developer with hands-on experience in DevOps, cloud platforms like AWS and Cloudflare, and a strong foundation in full-stack development.",
  description:
    "3+ years of expertise in UI/UX design and one and half year of full-stack development, collaborating with clients to deliver high-quality projects. Adept at deploying, managing, and scaling applications using Vercel, Cloudflare Pages, and AWS.",
};

export const education = [
  {
    degree: "Bachelor of Computer Engineering",
    institution: "IOE Purwanchal Campus, Dharan",
    duration: "2023 - 2027",
    current: true,
  },
  {
    degree: "High School (+2)",
    institution: "Galaxy Secondary School, Dhangadhi",
    duration: "2021 - 2023",
    current: false,
  },
];

type IconComponent = IconType | LucideIcon;

interface SkillCategory {
  category: string;
  icon: LucideIcon;
  skills: Array<{
    name: string;
    icon: IconComponent;
    color?: string;
  }>;
}

interface Platform {
  name: string;
  icon: IconType;
  color?: string;
  services: string[];
}

interface Achievement {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: Layout,
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: TbBrandFramerMotion, color: "#FF0055" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    skills: [
      { name: "Express.js", icon: SiExpress },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "KV Storage", icon: Database, color: "#0EA5E9" },
    ],
  },
  {
    category: "UI/UX Design",
    icon: Palette,
    skills: [
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Adobe XD", icon: SiAdobexd, color: "#2e001e" },
      { name: "Responsive Design", icon: Layout, color: "#0284C7" },
    ],
  },
  {
    category: "Programming",
    icon: Code2,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
    ],
  },
  {
    category: "Tools",
    icon: Settings,
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman, color: "#FF6C6C" },
      { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
      { name: "AWS", icon: SiAmazon, color: "#FF9900" },
    ],
  },
];

export const platforms: Platform[] = [
  {
    name: "AWS",
    icon: SiAmazon,
    color: "#FF9900",
    services: [
      "EC2 (Virtual Servers)",
      "S3 (Object Storage)",
      "CloudFront (CDN)",
    ],
  },
  {
    name: "Cloudflare",
    icon: SiCloudflare,
    color: "#F38020",
    services: [
      "Workers (Serverless)",
      "Pages (Static/JAMstack)",
      "KV Storage (Key-Value)",
      "R2 (Object Storage)",
      "DNS Management",
    ],
  },
  {
    name: "Vercel",
    icon: SiVercel,
    services: [
      "Edge Functions",
      "Serverless Functions",
      "CI/CD Pipeline",
      "Analytics & Monitoring",
      "Image Optimization",
    ],
  },
];

export const achievements: Achievement[] = [
  {
    title: "Nepali Educate Platform",
    description: "Built a content platform achieving 100,000+ monthly visits",
    icon: Trophy,
  },
  {
    title: "Chrome Extension",
    description:
      "Successfully developed and published Google Bulk Photos Deleter with Stripe integration",
    icon: Code2,
  },
  {
    title: "Client Projects",
    description:
      "Delivered multiple successful projects including Express News, UncleSams Tech, and Receipt Vault",
    icon: Users,
  },
  {
    title: "Technical Writing",
    description:
      "Published comprehensive technical documentation and tutorials",
    icon: BookOpen,
  },
];
