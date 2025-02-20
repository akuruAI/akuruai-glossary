"use client";

import { Button } from "@modules/shared/components/ui/button";
import { Input } from "@modules/shared/components/ui/input";
import { supabase } from "@modules/shared/db";
import { detectLanguage } from "@modules/shared/utils/language-detection";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { columns } from "./columns";
import { CategoryFilter } from "./components/category-filter";
import { DataTable } from "./data-table";

interface WordWithCategory {
  id: number;
  english: string;
  sinhala: string[] | null;
  tamil: string[] | null;
  categoryId: number;
  category: {
    name: string | null;
  };
}

export function GlossaryTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;
  const searchQuery = searchParams.get("search") || "";
  const categoryId = searchParams.get("category") || "all";

  const [searchInput, setSearchInput] = useState(searchQuery);

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          current.delete(key);
        }
        else {
          current.set(key, String(value));
        }
      }

      return current.toString();
    },
    [searchParams],
  );

  const { data, isLoading } = useQuery({
    queryKey: ["words", currentPage, pageSize, searchQuery, categoryId],
    queryFn: async () => {
      let query = supabase
        .from("words")
        .select("id, english, sinhala, tamil, categoryId, category!inner(name)", {
          count: "exact",
        });

      if (searchQuery) {
        // Use the optimized trigram search function and chain the query
        const searchResults = await supabase
          .rpc("search_words_trgm", {
            search_query: searchQuery,
          });

        if (searchResults.error)
          throw searchResults.error;

        // Continue with filtering and pagination
        query = supabase
          .from("words")
          .select("id, english, sinhala, tamil, categoryId, category!inner(name)", {
            count: "exact",
          })
          .in("id", (searchResults.data || []).map(row => row.id))
          .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

        // Apply category filter after search if needed
        if (categoryId !== "all") {
          query = query.eq("categoryId", Number.parseInt(categoryId, 10));
        }
      }
      else {
        // If no search query, use normal pagination with category filter
        if (categoryId !== "all") {
          query = query.eq("categoryId", Number.parseInt(categoryId, 10));
        }

        query = query
          .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
          .order("english");
      }

      const { data, count, error } = await query;

      if (error)
        throw error;

      return {
        data: data as WordWithCategory[],
        count: count || 0,
      };
    },
  });

  const handleSearch = useCallback(
    (value: string) => {
      router.push(
        `${pathname}?${createQueryString({
          search: value || null,
          page: 1,
        })}`,
        { scroll: false },
      );
    },
    [router, pathname, createQueryString],
  );

  const handleSearchSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      handleSearch(searchInput);
    },
    [handleSearch, searchInput],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearchSubmit();
      }
    },
    [handleSearchSubmit],
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      router.push(
        `${pathname}?${createQueryString({
          category: value,
          page: 1,
        })}`,
        { scroll: false },
      );
    },
    [router, pathname, createQueryString],
  );

  return (
    <div className="space-y-4 mt-5 pt-5">
      <div className="flex items-center justify-between">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center space-x-2"
        >
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                placeholder="Search words..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-[300px]"
              />
              {searchInput && (
                <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {detectLanguage(searchInput)}
                </span>
              )}
            </div>
            <Button
              type="submit"
              size="icon"
              variant="outline"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <CategoryFilter value={categoryId} onChange={handleCategoryChange} />
        </form>
      </div>

      <DataTable<WordWithCategory, unknown>
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        columns={columns}
        data={data?.data ?? []}
        pageCount={Math.ceil((data?.count ?? 0) / pageSize)}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => {
          router.push(
            `${pathname}?${createQueryString({ page })}`,
            { scroll: false },
          );
        }}
        onPageSizeChange={(size) => {
          router.push(
            `${pathname}?${createQueryString({ size, page: 1 })}`,
            { scroll: false },
          );
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
