import { IconType } from 'react-icons';
import { FaBlogger } from 'react-icons/fa';
import {
  SiAwslambda,
  SiChromewebstore,
  SiCloudflare,
  SiCss3,
  SiExpress,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiJson,
  SiMdx,
  SiMermaid,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiShadcnui,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { RiGeminiFill } from 'react-icons/ri';

interface Technology {
  name: string;
  icon: IconType;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  demoUrl?: string;
  sourceUrl?: string;
  features: string[];
  category: 'webapp' | 'mobileapp' | 'others';
  year: string;
  status?: 'Live' | 'In Development' | 'Completed';
}

export const projects: Project[] = [
  {
    id: 'env-store',
    title: 'Env Store',
    description:
      'ENV Store is a secure, cloud-based environment variable manager that eliminates configuration headaches and keeps your development workflow smooth across all your devices and projects.',
    demoUrl: 'https://envstore.nabinkhair.com.np',
    image: '/projects/env-store.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Shadcn', icon: SiShadcnui },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
    features: [
      'Built a secure, cloud-based environment variable manager using Next.js, Tailwind CSS, and TypeScript.',
      'Integrated Vercel for seamless deployment and scalability.',
      'Deployed the app on Vercel for seamless performance and scalability.',
    ],
    category: 'webapp',
    year: '2025',
  },
  {
    id: 'flow-mint',
    title: 'Flow Mint',
    demoUrl: 'https://flow.nabinkhair.com.np',
    description:
      'Transform ideas into professional diagrams instantly. Just describe what you need our AI handles the rest.',
    image: '/projects/flow-mint.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
      { name: 'Framer Motion', icon: TbBrandFramerMotion },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Shadcn', icon: SiShadcnui },
      { name: 'Mermaid', icon: SiMermaid },
      { name: 'Gemini AI', icon: RiGeminiFill },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
    features: [
      'Built a responsive and user-friendly diagramming tool using Next.js, Tailwind CSS, and Framer Motion.',
      'Integrated Gemini AI for diagram generation.',
      'Deployed the app on Vercel for seamless performance and scalability.',
    ],
    category: 'webapp',
    year: '2025',
  },
  {
    id: 'apex-ui',
    title: 'Apex UI',
    description:
      'Fully customizable templates to craft modern websites and apps exactly as you envision them.',
    image: '/projects/apex-ui.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React.js', icon: SiReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', icon: TbBrandFramerMotion },
    ],
    features: [
      'Build multiple web app templates on React and Next.Js',
      'Designed entire app and build using React and Next.js',
    ],
    category: 'webapp',
    year: '2024',
    status: 'Live',
    demoUrl: 'https://apexui.dev/',
  },
  {
    id: 'juju',
    title: 'JuJu',
    description:
      'Juju is where creativity comes alive. Share your moments, express yourself, and be part of a vibrant community that celebrates originality.',
    image: '/projects/juju.png',
    technologies: [
      { name: 'Express Js', icon: SiExpress },
      { name: 'Node Js', icon: SiNodedotjs },
      { name: 'AWS', icon: SiAwslambda },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
    features: [
      'Builded APIs for the mobile App.',
      'Deployed the entire project using AWS',
      'Designed entire APP UI and written the web version of app using Next.Js',
    ],
    category: 'mobileapp',
    year: '2024',
    status: 'Live',
    demoUrl: 'https://jujuconnect.com',
  },
  {
    id: 'vthemes',
    title: 'V Themes',
    description:
      'A professionally crafted color theme based on advanced color theory principles, designed to reduce eye strain and enhance code readability during long coding sessions',
    image: '/projects/vthemes.png',
    technologies: [{ name: 'JSON', icon: SiJson }],
    features: ['Implemented design principle and color theory.'],
    demoUrl: 'https://vthemes.nabinkhair.com.np/',
    category: 'others',
    year: '2023',
    status: 'Live',
  },
  {
    id: 'algodocs',
    title: 'AlgoDocs',
    description: 'A documentation platform for algorithms and data structures.',
    image: '/projects/algodocs.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'MDX', icon: SiMdx, color: '#ffca28' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Vercel', icon: SiVercel },
    ],
    demoUrl: 'https://algodocs.dev',
    features: [
      'Developed AI Based Document Search',
      'Built a responsive platform for developers',
      'Implemented interactive code demos for better learning',
      'Documented algorithms with MDX',
    ],
    category: 'webapp',
    year: '2024',
    status: 'Live',
  },
  {
    id: 'pro-mcp',
    title: 'Pro MCP',
    description:
      'Discover more than 4k+ protocol-compliant MCP servers to enhance your AI applications with external data and tools.',
    image: '/projects/pro-mcp.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
    ],
    features: [
      'Build Custom Backend Service for onboarding every single MCPs.',
    ],
    category: 'webapp',
    year: '2024',
    status: 'Live',
    demoUrl: 'https://promcp.vercel.app',
  },
  {
    id: 'civen-ai',
    title: 'Civen AI',
    description:
      'Civen AI is a platform that allows you to create AI-powered cover letters that will help you get your dream job',
    image: '/projects/civen-ai.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Gemini AI', icon: SiGooglegemini, color: '#00ADD8' },
    ],
    demoUrl: 'https://civen.vercel.app',
    features: [
      'Generate AI based Cover Letter for job application',
      'Provide AI based Resume Review',
      'Deployed the app on Vercel',
      'Integrated Gemini AI for AI based features',
    ],
    category: 'webapp',
    year: '2024',
    status: 'Live',
  },
  {
    id: 'pira',
    title: 'Pira',
    description: 'A team management system with project tracking features.',
    image: '/projects/pira.png',
    technologies: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Express', icon: SiExpress },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Vercel', icon: SiVercel },
    ],
    demoUrl: 'https://pira.vercel.app',
    features: [
      'Built project and team management modules',
      'Implemented user roles and permissions',
      'Developed dashboards for project tracking',
      'Deployed the app on Vercel',
    ],
    category: 'webapp',
    year: '2023',
    status: 'Live',
  },
  {
    id: 'receipt-vault',
    title: 'Receipt Vault',
    description:
      'Effortlessly store and categorize your receipts. ReceiptVault is your small business partner in smart expense management.',
    image: '/projects/receiptvault.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Express', icon: SiExpress },
    ],
    demoUrl: 'https://receiptvault.co',
    features: [
      'Designed entire application UI/UX and Layout on Figma',
      'Developed the Entire App UI using Next.js and Tailwind CSS and Shadcn',
      'Developed the payment processing system using Stripe in ExpressJs',
      'Deployed Payment gateway backend on AWS and Frontend on Cloudflare workers',
    ],
    category: 'webapp',
    year: '2024',
    status: 'Live',
  },
  {
    id: 'birat-express',
    title: 'Birat Express',
    description:
      'A regional news platform for Koshi Province, offering real-time news updates and a user-friendly interface.',
    image: '/projects/birat-express.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
    ],
    demoUrl: 'https://biratexpress.com',
    features: [
      'Developed a content delivery system with Next.js and Tailwind CSS',
      'Built a user-friendly admin dashboard',
      'Implemented dynamic data fetching with MongoDB',
      'Deployed the entire application on Vercel',
    ],
    category: 'webapp',
    year: '2024',
    status: 'Live',
  },
  {
    id: 'google-bulk-photos-deleter',
    title: 'Google Bulk Photos Deleter',
    description:
      'A Chrome extension to efficiently bulk delete photos from Google Photos, optimized for user-friendly performance.',
    image: '/projects/chrome-extension.png',
    technologies: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Chrome Web Store', icon: SiChromewebstore, color: '#4285F4' },
      { name: 'Stripe', icon: SiStripe, color: '#5167FC' },
    ],
    demoUrl:
      'https://chromewebstore.google.com/detail/google-bulk-photos-delete/ejimjaolhecpjkpbfkbccbigfdmdcpom',
    features: [
      'Built a Chrome extension using JavaScript',
      'Integrated Stripe for payment processing',
      'Optimized the extension for performance and reliability',
      'Designed a user-friendly using CSS and HTML',
    ],
    category: 'others',
    year: '2024',
    status: 'Live',
  },
  {
    id: 'nepali-educate',
    title: 'Nepali Educate',
    description:
      'An educational platform for Nepali learners with rich resources and interactivity.',
    image: '/projects/nepali-educate.png',
    technologies: [
      { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss3, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'jQuery', icon: SiJquery, color: '#0769AD' },
      { name: 'Blogger', icon: FaBlogger, color: '#FF8B38' },
    ],
    demoUrl: 'https://nepalieducate.com',
    features: [
      'Designed and developed the platform with interactive lessons',
      'Achieved over 100,000 monthly visitors through SEO optimization',
      'Built resource-rich pages for learners using HTML and CSS',
      'Integrated jQuery for dynamic interactivity',
    ],
    category: 'webapp',
    year: '2022',
    status: 'Live',
  },
  {
    id: 'unclesams-tech',
    title: 'UncleSams Tech',
    description:
      'A US based tech startup, developed the website using Next.js and Tailwind CSS, and deployed it on Cloudflare Pages.',
    image: '/projects/unclesams-tech.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
      { name: 'Cloudflare Workers', icon: SiCloudflare, color: '#F38020' },
    ],
    demoUrl: 'https://unclesamstech.com',
    features: [
      'Build entire website using Next.js and Tailwind CSS',
      'Developed the AI Chatbot using Cloudflare Workers',
      'Deployed the website on Cloudflare Pages',
    ],
    category: 'webapp',
    year: '2024',
    status: 'Live',
  },
  {
    id: 'bitcoin-calculator',
    title: 'Bitcoin Calculator',
    description:
      'A web application that helps users calculate Bitcoin values based on the latest market rates. It provides an intuitive interface for tracking and converting Bitcoin amounts.',
    image: '/projects/trackyourbtc.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
    ],
    demoUrl: 'https://trackyourbtc.com',
    features: [
      'Developed the frontend using Next.js and Tailwind CSS for a clean, responsive design.',
      'Implemented logic for real-time Bitcoin value calculation with TypeScript.',
      'Integrated APIs to fetch and display live Bitcoin rates.',
      'Deployed the app on Vercel for seamless performance and scalability.',
    ],
    category: 'webapp',
    year: '2024',
    status: 'Live',
  },
  {
    id: 'auto-inspector',
    title: 'Auto Inspector',
    description:
      'A vehicle inspection automation platform for streamlined processes.',
    image: '/projects/autoinspector.png',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#007ACC' },
      { name: 'Express', icon: SiExpress, color: '#000000' },
      { name: 'Vercel', icon: SiVercel },
    ],
    demoUrl: 'https://autoinspector.com.au',
    features: [
      'Developed the frontend using Next.js and Tailwind CSS for a clean, responsive design.',
      'Integrated APIs for vehicle data and inspection reports.',
      'Deployed the app on Vercel for Client part and Render for Server part.',
    ],
    category: 'webapp',
    year: '2024',
    status: 'Live',
  },
];
