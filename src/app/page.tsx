"use client";

import { AlphabeticalSearch } from "@modules/alphabet/components/AlphabeticalSearch";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b">
        <div className="container flex h-16 items-center space-x-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tighter">
              AkuruAI Glossary
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trilingual Dictionary
          </h2>
          <p className="mt-4 text-muted-foreground">
            Discover words and their meanings in Sinhala, Tamil, and English. Access a comprehensive
            collection of over 384,000 terms.
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
          <AlphabeticalSearch />
        </section>
      </main>
    </div>
  );
}
