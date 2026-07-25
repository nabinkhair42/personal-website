import type { ReactNode } from "react";

const PageShellWrapper = ({ children }: { children: ReactNode }) => {
  // Soft top inset — content starts a bit below the nav (not flush, not dead-centered).
  return <div className="flex w-full flex-1 flex-col gap-16 mt-16">{children}</div>;
};

export default PageShellWrapper;
