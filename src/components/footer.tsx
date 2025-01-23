import Link from "next/link";
import { SiApacheopenoffice } from "react-icons/si";

export function Footer() {
  return (
    <footer className="flex h-16 items-center justify-center border-t">
      <div className="flex flex-1 items-center justify-center gap-2 ">
        <SiApacheopenoffice className="h-5 w-5" />

        Build by

        <Link className=" hover:underline"
          href="https://github.com/nabinkhair42"
        >
          nabinkhair42
        </Link>


      </div>
    </footer>
  );
}
