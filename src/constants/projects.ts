import { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiChromewebstore,
  SiTypescript,
  SiStripe,
  SiJquery,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMdx,
  SiCloudflare,
  SiGooglegemini,
} from "react-icons/si";

interface Technology {
  name: string;
  icon: IconType;
  color: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  category: "client" | "personal" | "collaborative";
}

export const projects: Project[] = [
  {
    title: "Receipt Vault",
    description: "A receipt management application with robust backend and intuitive UI.",
    image: "/projects/receiptvault.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    liveUrl: "https://receiptvault.co",
    features: [
      "Designed a comprehensive receipt digitization system",
      "Integrated advanced filtering and search options",
      "Implemented a robust user authentication system",
      "Built an analytics dashboard for user insights",
    ],
    category: "collaborative",
  },{
    title: "Express News",
    description: "A regional news platform for Koshi Province, offering real-time news updates and Stripe integration for monetization.",
    image: "/projects/birat-express.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
    ],
    liveUrl: "https://biratexpress.com",
    features: [
      "Developed a content delivery system with Next.js and Tailwind CSS",
      "Integrated Stripe for payment processing",
      "Implemented dynamic data fetching with MongoDB",
      "Built a user-friendly admin dashboard",
    ],
    category: "client",
  },
  {
    title: "Google Bulk Photos Deleter",
    description: "A Chrome extension to efficiently bulk delete photos from Google Photos, optimized for user-friendly performance.",
    image: "/projects/chrome-extension.png",
    technologies: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Chrome API", icon: SiChromewebstore, color: "#4285F4" },
      { name: "Stripe", icon: SiStripe, color: "#5167FC" },
    ],
    features: [
      "Built a Chrome extension using JavaScript and Chrome API",
      "Designed a user-friendly interface for bulk photo deletion",
      "Integrated Stripe for premium features",
      "Optimized the extension for performance and reliability",
    ],
    category: "client",
  },
  {
    title: "Nepali Educate",
    description: "An educational platform for Nepali learners with rich resources and interactivity.",
    image: "/projects/nepali-educate.png",
    technologies: [
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss3, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "jQuery", icon: SiJquery, color: "#0769AD" },
    ],
    liveUrl: "https://nepalieducate.com",
    features: [
      "Designed and developed the platform with interactive lessons",
      "Achieved over 100,000 monthly visitors through SEO optimization",
      "Built resource-rich pages for learners using HTML and CSS",
      "Integrated jQuery for dynamic interactivity",
    ],
    category: "personal",
  },{
    title: "UncleSams Tech",
    description: "A tech blog and resource platform with Cloudflare KV storage for AI-powered real-time features.",
    image: "/projects/unclesams-tech.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
      { name: "Cloudflare Workers", icon: SiCloudflare, color: "#F38020" },
    ],
    liveUrl: "https://unclesamstech.com",
    features: [
      "Integrated Cloudflare Workers for real-time AI chatbot",
      "Designed an SEO-optimized blog platform",
      "Built a scalable backend system using KV storage",
      "Implemented performance metrics tracking",
    ],
    category: "client",
  },
  {
    title: "Bitcoin Calculator",
    description: "A platform for tracking Bitcoin investments and calculating returns with user-friendly UI.",
    image: "/projects/trackyourbtc.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
    ],
    liveUrl: "https://trackyourbtc.com",
    features: [
      "Designed a Bitcoin investment tracking interface",
      "Integrated real-time Bitcoin price tracking",
      "Developed historical data visualization",
      "Built a portfolio management dashboard",
    ],
    category: "client",
  },
  {
    title: "Predict My Fitness",
    description: "A fitness tracking and prediction platform offering personalized workout plans.",
    image: "/projects/predictmyfitness.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
      { name: "Gemini AI", icon: SiGooglegemini, color: "#00ADD8" },
    ],
    liveUrl: "https://predictmyfitness.com",
    features: [
      "Implemented AI-powered analytics for progress tracking",
      "Developed a system for personalized workout plans",
      "Built dashboards to visualize user performance metrics",
      "Integrated responsive UI for a seamless experience",
    ],
    category: "client",
  },
 
  {
    title: "Auto Inspector",
    description: "A vehicle inspection automation platform for streamlined processes.",
    image: "/projects/autoinspector.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
    ],
    liveUrl: "https://autoinspector.com.au",
    features: [
      "Developed vehicle inspection modules with automated reporting",
      "Created a client management system",
      "Designed interactive dashboards for data visualization",
      "Collaborated with a team for continuous updates",
    ],
    category: "collaborative",
  },
  
  {
    title: "AlgoDocs",
    description: "A documentation platform for algorithms and data structures.",
    image: "/projects/algodocs.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "MDX", icon: SiMdx, color: "#ffca28" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
    liveUrl: "https://algodocs.nepalieducate.com",
    features: [
      "Documented algorithms with MDX",
      "Built a responsive platform for developers",
      "Implemented interactive code demos for better learning",
      "Enhanced search for quick resource access",
    ],
    category: "personal",
  },
  {
    title: "Pira",
    description: "A team management system with project tracking features.",
    image: "/projects/pira.png",
    technologies: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Express", icon: SiExpress, color: "#000000" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    liveUrl: "https://pira.vercel.app",
    features: [
      "Built project and team management modules",
      "Integrated real-time notifications",
      "Implemented user roles and permissions",
      "Developed dashboards for project tracking",
    ],
    category: "collaborative",
  },
];
