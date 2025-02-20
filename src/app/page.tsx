"use client";

import { AlphabeticalSearch } from "@modules/alphabet/components/AlphabeticalSearch";
import { GlossaryTable } from "@modules/data-table/glossary-table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mx-auto max-w-4xl text-center relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute left-[50%] top-0 h-[400px] w-[400px] -translate-x-[50%] rounded-full bg-blue-50/50 dark:bg-blue-950/30 blur-3xl" />
            </div>

            <div className="relative space-y-4">
              <div className="inline-flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/20 mb-2">
                <span className="relative">
                  Trilingual Glossary
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700 dark:from-gray-50 dark:to-gray-300">
                AkuruAI Glossary
              </h2>
              <p className="mt-4 text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
                Unlock the power of language with our fast, intuitive trilingual glossary. Crafted by the AkuruAI team, this tool seamlessly bridges English, Sinhala, and Tamil—making translations and definitions effortless while connecting cultures one word at a time.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm dark:bg-gray-900/50 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-200">
                <h3 className="text-lg font-semibold dark:text-gray-100">Sinhala</h3>
                <div className="mt-2 flex items-center justify-center text-3xl font-bold dark:text-gray-50">
                  සිංහල
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm dark:bg-gray-900/50 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800 transition-colors duration-200">
                <h3 className="text-lg font-semibold dark:text-gray-100">Tamil</h3>
                <div className="mt-2 flex items-center justify-center text-3xl font-bold dark:text-gray-50">
                  தமிழ்
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm dark:bg-gray-900/50 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 transition-colors duration-200">
                <h3 className="text-lg font-semibold dark:text-gray-100">English</h3>
                <div className="mt-2 flex items-center justify-center text-3xl font-bold dark:text-gray-50">
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
