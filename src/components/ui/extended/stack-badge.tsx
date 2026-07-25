import type { IconComponent } from "@/types";

interface StackBadgeProps {
  name: string;
  icon: IconComponent;
}

const StackBadge = ({ name, icon: Icon }: StackBadgeProps) => {
  return (
    <div
      title={name}
      className="inline-flex h-7 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-muted/70 px-2 text-xs font-medium"
    >
      <Icon className="size-3.5 rounded" aria-hidden />
      <span>{name}</span>
    </div>
  );
};

export default StackBadge;
