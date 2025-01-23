import { PropsWithChildren } from "react";
export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <div className="max-w-5xl flex flex-col justify-center mx-auto items-start w-full relative">
      {children}
    </div>
  );
}
