"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export function FooterLogo() {
  const { theme } = useTheme();

  return (
    <Link href="/" className="flex items-center space-x-2">
      {theme === "dark"
        ? (
            <Image
              src="/images/akuruAI-LOGO-DARK.svg"
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
  );
}
