import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { TechStacksList } from "@/dev-constants/stack";

const DeveloperStack = () => {
  return (
    <ShellWrapper>
      <section className="space-y-3 p-2">
        <SectionHeader
          label="My Skills"
          title="The tools I reach for every day"
          description="A curated mix of frameworks, runtimes, and services that help me craft reliable, performant user experiences across the stack."
        />

        <div
          className="grid border-l border-t"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))" }}
        >
          {TechStacksList.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="group flex aspect-square flex-col items-center justify-center gap-2 border-r border-b p-2"
            >
              <Icon className="size-6" />
              <p className="w-full truncate text-center text-sm">{name}</p>
            </div>
          ))}
        </div>
      </section>
    </ShellWrapper>
  );
};

export default DeveloperStack;
