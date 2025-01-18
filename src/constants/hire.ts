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
  timeline: string;
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
    title: "Full Website Development",
    description:
      "Complete web application development from concept to deployment.",
    features: [
      "Custom web application",
      "Frontend and backend implementation",
      "Database design and setup",
      "API integration",
      "Responsive design",
      "SEO optimization",
    ],
    timeline: "4-8 weeks",
  },
  {
    icon: "💻",
    title: "Frontend Development",
    description:
      "Modern, responsive frontend development with the latest technologies.",
    features: [
      "Next.js/React implementation",
      "Responsive design",
      "Performance optimization",
      "Animation and interactions",
      "Component development",
      "UI/UX implementation",
    ],
    timeline: "2-4 weeks",
  },
  {
    icon: "🛠️",
    title: "Technical Consultation",
    description: "Expert advice and solutions for your technical challenges.",
    features: [
      "Code review",
      "Architecture planning",
      "Performance optimization",
      "Best practices guidance",
      "Technical documentation",
      "Team mentoring",
    ],
    timeline: "Weekly/Monthly basis",
  },
];

export const process: ProcessStep[] = [
  {
    title: "Discovery",
    description:
      "Understanding your goals, requirements, and project scope through detailed discussion.",
  },
  {
    title: "Planning",
    description:
      "Creating a comprehensive plan including timeline, milestones, and technical specifications.",
  },
  {
    title: "Development",
    description:
      "Iterative development with regular updates and continuous feedback integration.",
  },
  {
    title: "Delivery",
    description:
      "Thorough testing, deployment, and post-launch support to ensure everything runs smoothly.",
  },
];

export const benefits: Benefit[] = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Quick development cycles with regular updates and efficient project management.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Well-structured, maintainable code following best practices and industry standards.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "Regular updates and open communication channels throughout the project lifecycle.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Implementation of security best practices and reliable, scalable solutions.",
  },
  {
    icon: Sparkles,
    title: "Quality Focused",
    description:
      "Attention to detail and commitment to delivering high-quality results.",
  },
  {
    icon: CheckCircle,
    title: "Support Guarantee",
    description:
      "Dedicated post-launch support and maintenance to ensure continued success.",
  },
];
