import {
  Code2,
  Database,
  Layout,
  Palette,
  Server,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import {
  SiAmazon,
  SiCloudflare,
  SiGit,
  SiGithub,
  SiVercel,
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
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { IconType } from 'react-icons';

type IconComponent = IconType | LucideIcon;

interface Technology {
  name: string;
  icon: IconComponent;
  color?: string;
}

interface TechnologyCategory {
  category: string;
  icon: LucideIcon;
  technologies: Technology[];
}

export const myTechnologies: TechnologyCategory[] = [
  {
    category: 'Frontend Development',
    icon: Layout,
    technologies: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', icon: TbBrandFramerMotion, color: '#FF0055' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    category: 'Backend Development',
    icon: Server,
    technologies: [
      { name: 'Express.js', icon: SiExpress },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    ],
  },
  {
    category: 'Database',
    icon: Database,
    technologies: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'KV Storage', icon: Database, color: '#0EA5E9' },
    ],
  },
  {
    category: 'UI/UX Design',
    icon: Palette,
    technologies: [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Adobe XD', icon: SiAdobexd, color: '#2e001e' },
      { name: 'Responsive Design', icon: Layout, color: '#0284C7' },
    ],
  },
  {
    category: 'Programming',
    icon: Code2,
    technologies: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'C', icon: SiC, color: '#A8B9CC' },
      { name: 'C++', icon: SiCplusplus, color: '#00599C' },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: Settings,
    technologies: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020' },
      { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
      { name: 'Vercel', icon: SiVercel },
    ],
  },
];
