"use client";

import { AlphabeticalSearch } from "@modules/alphabet/components/AlphabeticalSearch";
import { ModeToggle } from "@modules/app/components/ModeToggle";
import { GlossaryTable } from "@modules/data-table/glossary-table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import Image from "next/image";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  const { theme } = useTheme();
  console.log(333, theme);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <header className="border-b">
          <div className="container flex h-16 items-center space-x-4 px-4 sm:px-6 lg:px-8 m-auto">
            <div className="flex items-center space-x-2 w-full">
              {theme === "dark"
                ? (
                    <Image src="/images/akuruAI-LOGO-DARK.svg" alt="AkuruAI Logo" width={120} height={31.82}></Image>
                  )
                : (
                    <Image src="/images/akuruAI-LOGO.svg" alt="AkuruAI Logo" width={120} height={31.82}></Image>
                  )}
              <div className="flex-1"></div>
              <ModeToggle></ModeToggle>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              AkuruAI Glossary
            </h2>
            <p className="mt-4 text-muted-foreground">
              Unlock the power of language with our fast, intuitive trilingual glossary. Crafted by the AkuruAI team, this tool seamlessly bridges English, Sinhala, and Tamil—making translations and definitions effortless while connecting cultures one word at a time.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold">Sinhala</h3>
                <div className="mt-2 flex items-center justify-center text-3xl font-bold">
                  සිංහල
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold">Tamil</h3>
                <div className="mt-2 flex items-center justify-center text-3xl font-bold">
                  தமிழ்
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold">English</h3>
                <div className="mt-2 flex items-center justify-center text-3xl font-bold">
                  ENG
                </div>
              </div>
            </div>

            {/* Alphabetical Search Component */}
          </section>
          <AlphabeticalSearch />

          {/* Glossary Table */}
          <GlossaryTable />
        </main>
      </div>
    </QueryClientProvider>
  );
}
