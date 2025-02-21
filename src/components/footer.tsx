import { Logo } from "./navbar";

export function Footer() {
  return (
    <footer className="flex h-16 items-center justify-center border-t border-dashed">
      <div className="flex flex-1 items-center justify-center gap-2 ">
        Build by
        <Logo />
      </div>
    </footer>
  );
}
