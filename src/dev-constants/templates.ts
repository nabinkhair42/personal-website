interface Template {
  name: string;
  description: string;
  light: string;
  dark: string;
  link: string;
}

export const TEMPLATES: Template[] = [
  {
    name: "Aura",
    description:
      "A clean, luminous template with soft gradients and spacious layouts. Built for portfolios, landing pages, and SaaS sites.",
    light: "/templates/aura-light.png",
    dark: "/templates/aura-dark.png",
    link: "https://aura-agency-nine.vercel.app",
  },
  {
    name: "Onyx",
    description:
      "A bold, dark-first template with sharp contrasts and dense information hierarchy. Built for developer tools and dashboards.",
    light: "/templates/onyx-light.png",
    dark: "/templates/only-dark.png",
    link: "https://onyx-dev-ten.vercel.app",
  },
] as const;
