"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useWordsQuery } from "./hooks/use-words-query";

export function GlossaryTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useWordsQuery(page, pageSize);

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
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        isLoading={isLoading}
      />
    </section>
  );
}
