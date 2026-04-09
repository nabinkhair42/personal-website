import type { IconComponent } from "@/types";

interface StackBadgeProps {
  name: string;
  icon: IconComponent;
}

const StackBadge = ({ name, icon: Icon }: StackBadgeProps) => {
  return (
    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors py-2 border border-border h-5.5 gap-1.5 bg-muted/70 p-1.5 text-xs">
      <Icon className="size-4 rounded" />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default StackBadge;
