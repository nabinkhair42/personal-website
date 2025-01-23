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
  SiVercel,
} from "react-icons/si";
import { FaBlogger } from "react-icons/fa";

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
    description:
      "Effortlessly store and categorize your receipts. ReceiptVault is your small business partner in smart expense management.",
    image: "/projects/receiptvault.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      // express
      { name: "Express", icon: SiExpress, color: "#000000" },
    ],
    liveUrl: "https://receiptvault.co",
    features: [
      "Designed entire application UI/UX and Layout on Figma",
      "Developed the Entire App UI using Next.js and Tailwind CSS and Shadcn",
      "Developed the payment processing system using Stripe in ExpressJs",
      "Deployed Payment gateway backend on AWS and Frontend on Cloudflare workers",
    ],
    category: "collaborative",
  },
  {
    title: "Birat Express",
    description:
      "A regional news platform for Koshi Province, offering real-time news updates and a user-friendly interface.",
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
      "Built a user-friendly admin dashboard",
      "Implemented dynamic data fetching with MongoDB",
      "Deployed the entire application on Vercel",
    ],
    category: "client",
  },
  {
    title: "Google Bulk Photos Deleter",
    description:
      "A Chrome extension to efficiently bulk delete photos from Google Photos, optimized for user-friendly performance.",
    image: "/projects/chrome-extension.png",
    technologies: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Chrome Web Store", icon: SiChromewebstore, color: "#4285F4" },
      { name: "Stripe", icon: SiStripe, color: "#5167FC" },
    ],
    liveUrl: "https://chromewebstore.google.com/detail/google-bulk-photos-delete/ejimjaolhecpjkpbfkbccbigfdmdcpom",
    features: [
      "Built a Chrome extension using JavaScript",
      "Integrated Stripe for payment processing",
      "Optimized the extension for performance and reliability",
      "Designed a user-friendly using CSS and HTML",
    ],
    category: "client",
  },
  {
    title: "Nepali Educate",
    description:
      "An educational platform for Nepali learners with rich resources and interactivity.",
    image: "/projects/nepali-educate.png",
    technologies: [
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss3, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "jQuery", icon: SiJquery, color: "#0769AD" },
      {name: "Blogger", icon: FaBlogger, color: "#FF8B38"}
    ],
    liveUrl: "https://nepalieducate.com",
    features: [
      "Designed and developed the platform with interactive lessons",
      "Achieved over 100,000 monthly visitors through SEO optimization",
      "Built resource-rich pages for learners using HTML and CSS",
      "Integrated jQuery for dynamic interactivity",
    ],
    category: "personal",
  },
  {
    title: "UncleSams Tech",
    description:
      "A US based tech startup, developed the website using Next.js and Tailwind CSS, and deployed it on Cloudflare Pages.",
    image: "/projects/unclesams-tech.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
      { name: "Cloudflare Workers", icon: SiCloudflare, color: "#F38020" },
    ],
    liveUrl: "https://unclesamstech.com",
    features: [
      "Build entire website using Next.js and Tailwind CSS",
      "Developed the AI Chatbot using Cloudflare Workers",
      "Deployed the website on Cloudflare Pages",
    ],
    category: "client",
  },
  {
    title: "Bitcoin Calculator",
    description:
      "A web application that helps users calculate Bitcoin values based on the latest market rates. It provides an intuitive interface for tracking and converting Bitcoin amounts.",
    image: "/projects/trackyourbtc.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
    ],
    liveUrl: "https://trackyourbtc.com",
    features: [
      "Developed the frontend using Next.js and Tailwind CSS for a clean, responsive design.",
      "Implemented logic for real-time Bitcoin value calculation with TypeScript.",
      "Integrated APIs to fetch and display live Bitcoin rates.",
      "Deployed the app on Vercel for seamless performance and scalability.",
    ],
    category: "client",
  },  
  {
    title: "Predict My Fitness",
    description:
      "A fitness tracking and prediction platform offering personalized workout plans.",
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
    description:
      "A vehicle inspection automation platform for streamlined processes.",
    image: "/projects/autoinspector.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
      {name: "Express", icon: SiExpress, color: "#000000"},
      {name: "Vercel", icon: SiVercel, color: "#000000"}

    ],
    liveUrl: "https://autoinspector.com.au",
    features: [
      "Developed the frontend using Next.js and Tailwind CSS for a clean, responsive design.",
      "Integrated APIs for vehicle data and inspection reports.",
      "Deployed the app on Vercel for Client part and Render for Server part.",
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
      {name: "Vercel", icon: SiVercel, color: "#000000"}
    ],
    liveUrl: "https://algodocs.nepalieducate.com",
    features: [
      "Developed AI Based Document Search",
      "Built a responsive platform for developers",
      "Implemented interactive code demos for better learning",
      "Documented algorithms with MDX",
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
      {name: "Vercel", icon: SiVercel, color: "#000000"}
    ],
    liveUrl: "https://pira.vercel.app",
    features: [
      "Built project and team management modules",
      "Implemented user roles and permissions",
      "Developed dashboards for project tracking",
      "Deployed the app on Vercel",
    ],
    category: "collaborative",
  },
];
