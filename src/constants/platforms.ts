import { SiAmazon, SiCloudflare, SiVercel } from 'react-icons/si';
import { IconType } from 'react-icons';

interface Platform {
  name: string;
  description: string;
  url: string;
  icon: IconType;
  color?: string;
  services?: string[];
}

export const platforms: Platform[] = [
  {
    name: 'AWS',
    description: 'Cloud infrastructure and services for scalable applications',
    url: 'https://aws.amazon.com',
    icon: SiAmazon,
    color: '#FF9900',
    services: [
      'EC2 (Virtual Servers)',
      'S3 (Object Storage)',
      'CloudFront (CDN)',
    ],
  },
  {
    name: 'Cloudflare',
    description: 'Edge computing and security solutions for modern web',
    url: 'https://cloudflare.com',
    icon: SiCloudflare,
    color: '#F38020',
    services: [
      'Workers (Serverless)',
      'Pages (Static/JAMstack)',
      'KV Storage (Key-Value)',
      'R2 (Object Storage)',
      'DNS Management',
    ],
  },
  {
    name: 'Vercel',
    description: 'Frontend cloud platform for modern web development',
    url: 'https://vercel.com',
    icon: SiVercel,
    services: [
      'Edge Functions',
      'Serverless Functions',
      'CI/CD Pipeline',
      'Analytics & Monitoring',
      'Image Optimization',
    ],
  },
];
