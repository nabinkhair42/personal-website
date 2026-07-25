import { BlogsGrid } from "@/components/blog/blogs-grid";
import PageShellWrapper from "@/components/layouts/page-shell";
import DeveloperConnect from "@/components/main/developer-connect";
import DeveloperEducation from "@/components/main/developer-education";
import DeveloperExperience from "@/components/main/developer-experience";
import DeveloperGitContribution from "@/components/main/developer-git-contribution";
import DeveloperIntro from "@/components/main/developer-intro";
import DeveloperProjects from "@/components/main/developer-projects";
import DeveloperStack from "@/components/main/developer-stack";
import DeveloperTemplates from "@/components/main/developer-templates";
import { DeveloperDetails } from "@/dev-constants/details";
import { ProjectsData } from "@/dev-constants/projects";
import { getRecentPosts } from "@/lib/markdown";

const siteUrl = DeveloperDetails.portfolio.replace(/\/$/, "");

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteUrl,
  dateCreated: "2024-01-01T00:00:00.000Z",
  dateModified: new Date().toISOString(),
  inLanguage: "en",
  mainEntity: {
    "@type": "Person",
    name: DeveloperDetails.name,
    url: siteUrl,
    image: `${siteUrl}${DeveloperDetails.avatar}`,
    jobTitle: DeveloperDetails.designation,
    description: DeveloperDetails.bio,
    sameAs: DeveloperDetails.socialLinks.map((link) => link.url),
  },
};

const PROGRAMMING_LANGUAGES = new Set([
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "Go",
  "Rust",
  "JSON",
  "SQL",
]);

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@graph": ProjectsData.map((project) => ({
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.tagline,
    url: project.liveLink,
    ...(project.repo ? { codeRepository: project.repo } : {}),
    programmingLanguage: project.techStack
      .map((tech) => tech.name)
      .filter((name) => PROGRAMMING_LANGUAGES.has(name)),
    runtimePlatform: project.techStack
      .map((tech) => tech.name)
      .filter((name) => !PROGRAMMING_LANGUAGES.has(name)),
    author: {
      "@type": "Person",
      name: DeveloperDetails.name,
      url: siteUrl,
    },
  })),
};

const templatesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Aura — Structural Grid Template",
      description:
        "A clean, luminous template with soft gradients and spacious layouts. Built for portfolios, landing pages, and SaaS sites.",
      image: `${siteUrl}/templates/aura-light.png`,
      brand: {
        "@type": "Brand",
        name: "Structural Grid",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Person",
          name: DeveloperDetails.name,
          url: siteUrl,
        },
      },
    },
    {
      "@type": "Product",
      name: "Onyx — Structural Grid Template",
      description:
        "A bold, dark-first template with sharp contrasts and dense information hierarchy. Built for developer tools and dashboards.",
      image: `${siteUrl}/templates/onyx-light.png`,
      brand: {
        "@type": "Brand",
        name: "Structural Grid",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Person",
          name: DeveloperDetails.name,
          url: siteUrl,
        },
      },
    },
  ],
};

const Page = () => {
  const recentPosts = getRecentPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templatesJsonLd) }}
      />
      <PageShellWrapper>
        <DeveloperIntro />
        <DeveloperExperience />
        <DeveloperProjects />
        <DeveloperEducation />
        <DeveloperStack />
        <DeveloperGitContribution />
        <DeveloperTemplates />
        <DeveloperConnect />
        <BlogsGrid maxPosts={4} posts={recentPosts} showHeader />
      </PageShellWrapper>
    </>
  );
};

export default Page;
