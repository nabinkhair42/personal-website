import { TechStacksList } from "@/dev-constants/stack";
import ShellWrapper from "../layouts/shell-wrapper";

const DeveloperStack = () => {
  return (
    <ShellWrapper>
      <div className="relative overflow-hidden p-2 space-y-3">
        <header className="space-y-2">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">My Skills</p>
            <h2 className="mt-1 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              The tools I reach for every day
            </h2>
          </div>
          <p className="text-base leading-relaxed text-justify text-muted-foreground">
            A curated mix of frameworks, runtimes, and services that help me craft reliable,
            performant user experiences across the stack.
          </p>
        </header>

        <div
          className="grid gap-0 border-l border-t border-border"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))" }}
        >
          {TechStacksList.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="group flex flex-col items-center justify-center aspect-square p-2 border-r border-b transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <div className="flex items-center justify-center text-foreground/60 group-hover:text-foreground transition-colors duration-200">
                <Icon className="size-6 aspect-square" />
              </div>
              <p className="text-sm font-medium text-foreground/70 text-center group-hover:text-foreground transition-colors duration-200 mt-2">
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperStack;
