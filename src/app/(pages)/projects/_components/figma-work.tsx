import React from 'react';

const FigmaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 24C10.21 24 12 22.21 12 20V16H8C5.79 16 4 17.79 4 20S5.79 24 8 24Z" fill="#0ACF83"/>
    <path d="M4 12C4 9.79 5.79 8 8 8H12V16H8C5.79 16 4 14.21 4 12Z" fill="#A259FF"/>
    <path d="M4 4C4 1.79 5.79 0 8 0H12V8H8C5.79 8 4 6.21 4 4Z" fill="#F24E1E"/>
    <path d="M12 0H16C18.21 0 20 1.79 20 4S18.21 8 16 8H12V0Z" fill="#FF7262"/>
    <path d="M20 12C20 14.21 18.21 16 16 16S12 14.21 12 12S13.79 8 16 8S20 9.79 20 12Z" fill="#1ABCFE"/>
  </svg>
);

const FigmaWork: React.FC = () => {
  return (
    <div className="w-full py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <a
          href="https://figma.com/@nabinkhair"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-700 hover:border-zinc-300 dark:hover:border-zinc-700">
            {/* Minimal geometric pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
              <div className="absolute top-0 left-20 w-px h-full bg-current"></div>
              <div className="absolute top-0 left-40 w-px h-full bg-current"></div>
              <div className="absolute top-0 right-20 w-px h-full bg-current"></div>
              <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
            </div>

            <div className="relative p-12 md:p-16">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-8">
                    <FigmaIcon />
                    <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
                    <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                      Design Portfolio
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
                    Figma Works
                  </h2>

                  <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mb-8">
                    Curated collection of design systems, prototypes, and user experiences. 
                    From concept to execution, exploring the intersection of form and function.
                  </p>

                  <div className="inline-flex items-center gap-3 text-zinc-900 dark:text-zinc-100 group-hover:gap-5 transition-all duration-300">
                    <span className="text-sm tracking-wide font-mono uppercase">
                      View Collection
                    </span>
                    <div className="w-12 h-px bg-zinc-900 dark:bg-zinc-100 group-hover:w-16 transition-all duration-300"></div>
                    <svg 
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Minimalist visual element */}
                <div className="hidden md:block ml-12">
                  <div className="w-32 h-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 group-hover:rotate-45 transition-transform duration-700 ease-out"></div>
                    <div className="absolute inset-2 bg-zinc-50 dark:bg-zinc-900 group-hover:rotate-12 transition-transform duration-500 ease-out"></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 group-hover:-rotate-12 transition-transform duration-700 ease-out"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default FigmaWork;