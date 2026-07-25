import type { IconComponent } from "@/types";

interface StackBadgeProps {
  name: string;
  icon: IconComponent;
}

const StackBadge = ({ name, icon: Icon }: StackBadgeProps) => {
  return (
    <div
      title={name}
      className="inline-flex h-6 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border bg-muted/70 px-1.5 text-xs font-medium"
    >
      <Icon className="size-3.5 rounded" aria-hidden />
      <span>{name}</span>
    </div>
  );
};

export default StackBadge;
