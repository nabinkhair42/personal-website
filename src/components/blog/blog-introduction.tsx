import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { DeveloperDetails } from "@/dev-constants/details";

export function BlogIntroduction() {
  const { name, designation } = DeveloperDetails;

  return (
    <ShellWrapper>
      <SectionHeader
        label="Blog"
        title="Something worth reading."
        headingLevel="h1"
        description={`Notes I've written by hand — not generated. Web development, design, the messy middle of building things, and what I'm learning as a ${designation}. Written by ${name}.`}
      />
    </ShellWrapper>
  );
}
