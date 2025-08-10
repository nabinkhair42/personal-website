import { Metadata } from 'next';
import { siteConfig } from './site';

// Shared metadata that's common across pages
export const sharedMetadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  twitter: {
    card: 'summary_large_image',
    creator: '@khairnabin',
  },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
};

// Home page metadata
export const homeMetadata: Metadata = {
  ...sharedMetadata,
  title: {
    default: `${siteConfig.name} - ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'Full Stack Developer specializing in modern web technologies. Expert in React, Next.js, Node.js, and cloud platforms.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.baseUrl,
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: 'Full Stack Developer specializing in modern web technologies',
    siteName: 'Nabin Khair Portfolio',
    images: [
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.title}`,
      },
    ],
  },
};

// About page metadata
export const aboutMetadata: Metadata = {
  ...sharedMetadata,
  title: 'About Me | Nabin Khair - Full Stack Developer',
  description:
    "Learn about Nabin Khair's journey, skills, and experience as a Full Stack Developer. Discover my technical expertise, education, and professional achievements.",
  openGraph: {
    type: 'profile',
    title: 'About Me | Nabin Khair - Full Stack Developer',
    description:
      "Learn about Nabin Khair's journey, skills, and experience as a Full Stack Developer",
    images: [
      {
        url: '/og/about.png',
        width: 1200,
        height: 630,
        alt: 'About Nabin Khair',
      },
    ],
  },
};

// Projects page metadata
export const projectsMetadata: Metadata = {
  ...sharedMetadata,
  title: 'Projects | Nabin Khair - Full Stack Developer Portfolio',
  description:
    'Explore my portfolio of web applications, client projects, and personal works. See how I leverage modern technologies to build innovative solutions.',
  keywords: [
    'portfolio',
    'web development',
    'full stack',
    'projects',
    'React',
    'Next.js',
    'TypeScript',
  ],
  openGraph: {
    type: 'website',
    title: 'Projects | Nabin Khair - Full Stack Developer Portfolio',
    description: 'Explore my portfolio of web applications and projects',
    images: [
      {
        url: '/og/projects.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}'s Projects`,
      },
    ],
  },
};

// Blog page metadata
export const blogMetadata: Metadata = {
  ...sharedMetadata,
  title: 'Blog | Nabin Khair - Web Development Insights',
  description:
    'Read my latest thoughts and insights on web development, programming best practices, and technology trends.',
  keywords: [
    'blog',
    'web development',
    'programming',
    'React',
    'Next.js',
    'tutorials',
  ],
  openGraph: {
    type: 'website',
    title: 'Blog | Nabin Khair - Web Development Insights',
    description: 'Web development insights and tutorials',
    images: [
      {
        url: '/og/blogs.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}'s Blog`,
      },
    ],
  },
};

// Contact page metadata
export const contactMetadata: Metadata = {
  ...sharedMetadata,
  title: 'Contact | Nabin Khair - Get in Touch',
  description:
    "Have a project in mind? Get in touch with me to discuss your web development needs. I'm available for freelance projects and collaborations.",
  keywords: ['contact', 'hire developer', 'freelance', 'web development'],
  openGraph: {
    type: 'website',
    title: 'Contact | Nabin Khair - Get in Touch',
    description: 'Get in touch with Nabin Khair',
    images: [
      {
        url: '/og/contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact Nabin Khair',
      },
    ],
  },
};
