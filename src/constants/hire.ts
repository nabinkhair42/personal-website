import {
  Zap,
  Code2,
  MessageSquare,
  Shield,
  Sparkles,
  CheckCircle,
  LucideIcon,
} from 'lucide-react';
import { IconType } from 'react-icons';
import { FaReact } from 'react-icons/fa';
import { MdDesignServices } from 'react-icons/md';
import { SiJfrogpipelines } from 'react-icons/si';

interface ServicePackage {
  icon: IconType;
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
    icon: FaReact, // Changed to React icon for Full-stack development
    title: 'Full-Stack Development',
    description:
      'Build modern, scalable, and high-performance web applications tailored to your business needs using the MERN stack and modern tools like Next.js and TypeScript.',
    features: [
      'Custom web application development',
      'Responsive design and mobile optimization',
      'Backend API development with Node.js and Express.js',
      'Database integration with MongoDB',
      'Cloud deployment (AWS, Vercel, Cloudflare)',
      'Third-party service integrations (Stripe, AuthJS, etc.)',
    ],
  },
  {
    icon: MdDesignServices, // Changed to Design services icon for UI/UX
    title: 'UI/UX Design',
    description:
      'Craft intuitive and visually appealing user interfaces to provide seamless user experiences across devices.',
    features: [
      'Wireframes and prototypes using Figma and Adobe XD',
      'User-centric design with a focus on usability',
      'Interactive mockups for better project visualization',
      'Responsive design for mobile and desktop',
      'Design systems and component libraries using Tailwind CSS',
      'Collaboration with developers for smooth implementation',
    ],
  },
  {
    icon: SiJfrogpipelines, // Changed to AWS icon for DevOps/Cloud
    title: 'DevOps and Cloud Services',
    description:
      'Streamline your development and deployment processes with reliable cloud services and DevOps strategies.',
    features: [
      'AWS setup (EC2, S3, CloudFront)',
      'Cloudflare configuration (Workers, KV Storage, Pages)',
      'CI/CD pipeline setup for seamless deployments',
      'Scalability and performance optimization',
      'Domain and DNS management',
      'Monitoring and troubleshooting production environments',
    ],
  },
];

export const process: ProcessStep[] = [
  {
    title: 'Discovery',
    description:
      'Collaborative discussions to understand your business goals, technical requirements, and project scope.',
  },
  {
    title: 'Planning',
    description:
      'Developing a detailed project roadmap, including timelines, milestones, and technology stack.',
  },
  {
    title: 'Development',
    description:
      'Iterative development with frequent updates, incorporating feedback to ensure quality and alignment with goals.',
  },
  {
    title: 'Delivery',
    description:
      'Comprehensive testing, deployment, and post-launch support for seamless project handover and success.',
  },
];

export const benefits: Benefit[] = [
  {
    icon: Zap,
    title: 'Efficient Delivery',
    description:
      'Timely development cycles with a focus on delivering high-quality work within agreed deadlines.',
  },
  {
    icon: Code2,
    title: 'Maintainable Code',
    description:
      'Clean, modular, and maintainable code following industry best practices for scalability and reliability.',
  },
  {
    icon: MessageSquare,
    title: 'Transparent Communication',
    description:
      'Regular updates and transparent communication throughout the project lifecycle to keep you informed.',
  },
  {
    icon: Shield,
    title: 'Secure Applications',
    description:
      'Implementation of security best practices to protect data and ensure application reliability.',
  },
  {
    icon: Sparkles,
    title: 'Detail-Oriented',
    description:
      'Meticulous attention to detail, ensuring a polished and professional outcome for every project.',
  },
  {
    icon: CheckCircle,
    title: 'Dedicated Support',
    description:
      'Post-launch support and maintenance to address any issues and keep your application running smoothly.',
  },
];
