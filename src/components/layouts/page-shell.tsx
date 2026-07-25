import type { ReactNode } from "react";

const PageShellWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full flex-1 flex-col space-y-6">{children}</div>;
};

export default PageShellWrapper;
