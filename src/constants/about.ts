import {
  Code2,
  Database,
  Layout,
  Palette,
  Server,
  Trophy,
  Users,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { SiAmazon, SiCloudflare, SiVercel } from "react-icons/si";
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

export const aboutMe = {
  intro: "MERN and Next.js Developer with hands-on experience in DevOps, cloud platforms like AWS and Cloudflare, and a strong foundation in full-stack development.",
  description: "3+ years of expertise in UI/UX design and 1+ year of full-stack development, collaborating with clients to deliver high-quality projects. Adept at deploying, managing, and scaling applications using Vercel, Cloudflare Pages, and AWS."
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
  }>;
}

interface Platform {
  name: string;
  icon: IconType;
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
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    skills: [
      { name: "Express.js", icon: SiExpress },
      { name: "Node.js", icon: SiNodedotjs },
    ],
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    category: "UI/UX Design",
    icon: Palette,
    skills: [
      { name: "Figma", icon: SiFigma },
      { name: "Adobe XD", icon: SiAdobexd },
      { name: "Responsive Design", icon: Layout },
    ],
  },
  {
    category: "Programming",
    icon: Code2,
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "C", icon: SiC },
      { name: "C++", icon: SiCplusplus },
    ],
  },
];

export const platforms: Platform[] = [
  {
    name: "AWS",
    icon: SiAmazon,
    services: [
      "EC2 (Virtual Servers)",
      "S3 (Object Storage)",
      "CloudFront (CDN)",
      "Route 53 (DNS)",
      "Lambda (Serverless)",
      "RDS (Databases)"
    ],
  },
  {
    name: "Cloudflare",
    icon: SiCloudflare,
    services: [
      "Workers (Serverless)",
      "Pages (Static/JAMstack)",
      "KV Storage (Key-Value)",
      "R2 (Object Storage)",
      "DNS Management",
      "DDoS Protection"
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
      "Zero Config Deployments"
    ],
  },
];

export const achievements: Achievement[] = [
  {
    title: "Nepali Educate Platform",
    description: "Built a content platform from scratch achieving 100,000+ monthly visits",
    icon: Trophy,
  },
  {
    title: "Client Success",
    description: "Delivered multiple high-quality projects as a freelance developer, exceeding client expectations",
    icon: Users,
  },
  {
    title: "Technical Writing",
    description: "Published comprehensive technical documentation and tutorials",
    icon: BookOpen,
  },
];
