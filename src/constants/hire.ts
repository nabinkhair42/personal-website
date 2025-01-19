import {
  Zap,
  Code2,
  MessageSquare,
  Shield,
  Sparkles,
  CheckCircle,
  LucideIcon,
} from "lucide-react";

interface ServicePackage {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface ProcessStep {
  title: string;
  description: string;
}

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const packages: ServicePackage[] = [
  {
    icon: "🚀",
    title: "Full-Stack Development",
    description: "End-to-end web development solutions using MERN stack and Next.js, focusing on scalability and performance.",
    features: [
      "Custom web application development",
      "Modern UI with Next.js and ShadCN",
      "Database integration (MongoDB/Cloudflare KV)",
      "RESTful API development",
      "Payment integration with Stripe",
      "Deployment on Vercel/Cloudflare/AWS",
    ],
   
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Professional UI/UX design services with 3+ years of experience using Figma and Adobe XD.",
    features: [
      "User interface design",
      "Wireframing and prototyping",
      "Responsive design",
      "User experience optimization",
      "Design system creation",
      "Interactive prototypes",
    ],
  
  },
];

export const process: ProcessStep[] = [
  {
    title: "Discovery",
    description:
      "Collaborative discussions to understand your business goals, technical requirements, and project scope.",
  },
  {
    title: "Planning",
    description:
      "Developing a detailed project roadmap, including timelines, milestones, and technology stack.",
  },
  {
    title: "Development",
    description:
      "Iterative development with frequent updates, incorporating feedback to ensure quality and alignment with goals.",
  },
  {
    title: "Delivery",
    description:
      "Comprehensive testing, deployment, and post-launch support for seamless project handover and success.",
  },
];

export const benefits: Benefit[] = [
  {
    icon: Zap,
    title: "Efficient Delivery",
    description:
      "Timely development cycles with a focus on delivering high-quality work within agreed deadlines.",
  },
  {
    icon: Code2,
    title: "Maintainable Code",
    description:
      "Clean, modular, and maintainable code following industry best practices for scalability and reliability.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description:
      "Regular updates and transparent communication throughout the project lifecycle to keep you informed.",
  },
  {
    icon: Shield,
    title: "Secure Applications",
    description:
      "Implementation of security best practices to protect data and ensure application reliability.",
  },
  {
    icon: Sparkles,
    title: "Detail-Oriented",
    description:
      "Meticulous attention to detail, ensuring a polished and professional outcome for every project.",
  },
  {
    icon: CheckCircle,
    title: "Dedicated Support",
    description:
      "Post-launch support and maintenance to address any issues and keep your application running smoothly.",
  },
];
