import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { TechStacksList } from "@/dev-constants/stack";

const DeveloperStack = () => {
  return (
    <ShellWrapper>
      <section className="space-y-3 p-2">
        <SectionHeader title="Stack" description="Tools I reach for most days." />

        <div
          className="grid border-l border-t"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))" }}
        >
          {TechStacksList.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="group flex aspect-square flex-col items-center justify-center gap-2 border-r border-b p-2 transition-colors hover:bg-muted/40"
            >
              <Icon className="size-6 shrink-0" aria-hidden />
              <p
                title={name}
                className="w-full min-w-0 truncate text-center text-sm leading-tight text-muted-foreground"
              >
                {name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </ShellWrapper>
  );
};

export default DeveloperStack;
