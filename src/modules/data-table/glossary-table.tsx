"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useWordsQuery } from "./hooks/use-words-query";

export function GlossaryTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL or use defaults
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialPageSize = Number(searchParams.get("size")) || 10;

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const { data, isLoading } = useWordsQuery(page, pageSize);

  // Create URLSearchParams object for manipulation
  const createQueryString = useCallback(
    (params: Record<string, string | number>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        newSearchParams.set(key, value.toString());
      });

      return newSearchParams.toString();
    },
    [searchParams],
  );

  // Update URL when page or pageSize changes
  useEffect(() => {
    const queryString = createQueryString({
      page,
      size: pageSize,
    });

    router.push(`?${queryString}`, { scroll: false });
  }, [page, pageSize, createQueryString, router]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1); // Reset to first page when changing page size
  };

  return (
    <section className="container mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Glossary</h2>
        <p className="text-muted-foreground">
          Browse through all words in our database
        </p>
      </div>
      <DataTable
        columns={columns}
        data={data?.words || []}
        pageCount={data?.pageCount || 0}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
      />
    </section>
  );
}
