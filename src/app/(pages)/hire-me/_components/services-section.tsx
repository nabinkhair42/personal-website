'use client';

import { Code, Database, Globe, Smartphone, Zap, Shield } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Frontend Development',
    description:
      'Modern, responsive web applications using React, Next.js, and TypeScript with pixel-perfect design implementation.',
    features: [
      'React & Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Responsive Design',
    ],
  },
  {
    icon: Database,
    title: 'Backend Development',
    description:
      'Scalable server-side solutions with Node.js, databases, and API development for robust applications.',
    features: [
      'Node.js & Express',
      'Database Design',
      'REST APIs',
      'Authentication',
    ],
  },
  {
    icon: Code,
    title: 'Full Stack Solutions',
    description:
      'End-to-end development combining frontend and backend expertise for complete web applications.',
    features: [
      'Complete Solutions',
      'Database Integration',
      'Deployment',
      'Maintenance',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description:
      'Responsive applications that work flawlessly across all devices and screen sizes.',
    features: [
      'Mobile Optimization',
      'Cross-browser',
      'Performance',
      'Accessibility',
    ],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description:
      'Speed optimization, SEO improvements, and best practices for exceptional user experiences.',
    features: [
      'Speed Optimization',
      'SEO Ready',
      'Core Web Vitals',
      'Lighthouse Scores',
    ],
  },
  {
    icon: Shield,
    title: 'Security & Best Practices',
    description:
      'Secure coding practices, data protection, and industry-standard security implementations.',
    features: ['Secure Code', 'Data Protection', 'HTTPS', 'Best Practices'],
  },
];

export const ServicesSection = () => {
  return (
    <section className="relative px-6 py-20 bg-white dark:bg-zinc-950">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-3 dark:opacity-5">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Services Offered
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
            What I Can Do
            <br />
            <span className="font-serif italic">For You</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Comprehensive development services tailored to bring your vision to
            life with modern technologies and best practices.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-700 hover:border-zinc-300 dark:hover:border-zinc-700 animate-in fade-in duration-700 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Minimal geometric pattern */}
              <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
              </div>

              <div className="relative p-6">
                {/* Service Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 group-hover:w-12 transition-all duration-300"></div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Service Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400"
                    >
                      <div className="w-1 h-1 bg-zinc-400 dark:bg-zinc-600"></div>
                      <span className="font-mono uppercase tracking-wide">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
