import { FigmaIcon } from "@/icons";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/icons/social";
import type { DeveloperConfig } from "@/types";

export const DeveloperDetails: DeveloperConfig = {
  name: "Nabin Khair",
  initials: "NK",
  designation: "Founding Engineer | AI Systems",
  portfolio: "https://nabinkhair.com.np",
  email: "nabinkhair12@gmail.com",
  bio: "I ship production AI products end to end. Frontend, backend, LLM orchestration, edge infrastructure, multi-cloud ops. Whatever the product needs, I can own from architecture through live debugging. I work comfortably across OpenAI, Anthropic, Gemini, and Perplexity, with backends on AWS, GCP, and Cloudflare. Currently open to founding engineer roles at AI-native startups.",
  avatar: "/nabin_khair.webp",
  resume: "https://nabinkhair.com.np/nabin_khair.pdf",
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nabinkhair42/",
      icon: LinkedinIcon,
      handle: "nabinkhair42",
    },
    {
      name: "GitHub",
      url: "https://github.com/nabinkhair42",
      icon: GithubIcon,
      handle: "nabinkhair42",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/khairnabin",
      icon: TwitterIcon,
      handle: "khairnabin",
    },
    {
      name: "Figma",
      url: "http://figma.com/@nabinkhair",
      icon: FigmaIcon,
      handle: "nabinkhair",
    },
  ],
  location: {
    city: "Dharan",
    country: "Nepal",
  },
  seo: {
    title: "Nabin Khair | Full Stack Developer from Nepal",
    description:
      "Nabin Khair is a Full Stack Developer from Nepal specializing in React, Next.js, and TypeScript. Building accessible, high-performance web applications.",
    keywords: [
      "Nabin Khair",
      "nabinkhair",
      "nabinkhair42",
      "Full Stack Developer",
      "Full Stack Developer Nepal",
      "React Developer Nepal",
      "Next.js Developer",
      "TypeScript Developer",
      "MERN Stack Developer",
      "Web Developer Nepal",
      "Software Engineer Nepal",
      "Freelance Developer Nepal",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "JavaScript",
      "Dharan Developer",
    ],
  },
  education: [
    {
      degree: "Bachelor of Computer Engineering",
      institution: "IOE Purwanchal Campus",
      logo: "/education/ioepc.png",
      startDate: "2023",
      endDate: "2027",
      location: "Dharan, Nepal",
    },
    {
      degree: "Higher Secondary Education (10+2)",
      institution: "Galaxy Secondary School",
      logo: "/education/galaxy.png",
      startDate: "2021",
      endDate: "2023",
      location: "Dhangadhi, Nepal",
    },
  ],
};
