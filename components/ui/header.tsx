import Link from "next/link";
import Image from "next/image";

import LogoImage from "@/public/images/logo-dark.png";

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
              <Image
                className="rounded-full"
                src={LogoImage}
                width={96}
                height={96}
                alt="Rashtan Soft"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
