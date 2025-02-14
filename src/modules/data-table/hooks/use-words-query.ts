"use client";

import { supabase } from "@modules/shared/db";
import { useQuery } from "@tanstack/react-query";
import { WordWithCategory } from "../types";

interface FetchWordsParams {
  page: number;
  pageSize: number;
}

export async function fetchWords({ page, pageSize }: FetchWordsParams) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, count, error } = await supabase
    .from("words")
    .select(`
      id,
      english,
      sinhala,
      tamil,
      category (
        name
      )
    `, { count: "exact" })
    .range(start, end)
    .order("english");

  if (error) {
    throw error;
  }

  return {
    words: data as WordWithCategory[] || [],
    totalCount: count || 0,
    pageCount: Math.ceil((count || 0) / pageSize),
  };
}

export function useWordsQuery(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["words", page, pageSize],
    queryFn: () => fetchWords({ page, pageSize }),
    keepPreviousData: true,
  });
}
