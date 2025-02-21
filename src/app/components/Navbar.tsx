"use client";

import { ModeToggle } from "@modules/app/components/ModeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="border-b bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container flex h-16 items-center space-x-4 px-4 sm:px-6 lg:px-8 m-auto">
        <div className="flex items-center space-x-2 w-full">
          <Link href="/" className="flex items-center space-x-2">
            {theme === "dark"
              ? (
                  <Image
                    src="/images/akuruAI-LOGO-dark.svg"
                    alt="AkuruAI Logo"
                    width={120}
                    height={31.82}
                    priority
                  />
                )
              : (
                  <Image
                    src="/images/akuruAI-LOGO.svg"
                    alt="AkuruAI Logo"
                    width={120}
                    height={31.82}
                    priority
                  />
                )}
          </Link>
          <div className="flex-1" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
