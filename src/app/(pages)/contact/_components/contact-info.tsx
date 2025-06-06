"use client";

import { contactInfo, socialLinks } from "@/constants/contact";

export const ContactInfo = () => {
  return (
    <section className="relative px-6 py-20 bg-zinc-50 dark:bg-zinc-900">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-20 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto space-y-12">
        {/* Contact Information */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Contact Info
            </span>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group animate-in fade-in duration-700 slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <a
                  href={info.link}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors duration-300">
                    <info.icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono mb-1">
                      {info.title}
                    </div>
                    <div className="text-zinc-900 dark:text-zinc-100 font-light group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
                      {info.value}
                    </div>
                  </div>
                  <div className="w-4 h-px bg-zinc-300 dark:bg-zinc-700 group-hover:w-6 transition-all duration-300"></div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Social Links
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="animate-in fade-in duration-700 slide-in-from-bottom-4"
                style={{ animationDelay: `${(index + contactInfo.length) * 150}ms` }}
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

        {/* Additional Note */}
        <div className="text-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            I typically respond within 24 hours. Looking forward to hearing from you!
          </p>
        </div>
      </div>
    </section>
  );
};