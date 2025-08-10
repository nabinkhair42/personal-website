'use client';

import { socialLinks } from '@/constants/contact';

export const ContactInfo = () => {
  return (
    <section className="relative px-6 py-12 bg-zinc-50 dark:bg-zinc-900">
      <div className="relative z-10 max-w-lg mx-auto">
        <div className="flex flex-wrap gap-4 justify-center">
          {socialLinks.map((social, index) => (
            <div
              key={index}
              className="animate-in fade-in duration-700 slide-in-from-bottom-4 min-w-20"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center h-16 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:scale-105"
                title={social.name}
              >
                <social.icon className="h-6 w-6 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
