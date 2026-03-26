import type { IconComponent } from "@/types";

interface StackBadgeProps {
  name: string;
  icon: IconComponent;
}

const StackBadge = ({ name, icon: Icon }: StackBadgeProps) => {
  return (
    <div className="inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 hover:bg-cardColorForeground py-2 border border-border h-5.5 gap-1.5 bg-muted/40 px-1.5 pr-2 text-xs hover:text-brand">
      <Icon className="h-4 w-4 rounded" />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default StackBadge;
