"use client";

import { Badge } from "@modules/shared/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { WordWithCategory } from "./types";

export const columns: ColumnDef<WordWithCategory>[] = [
  {
    accessorKey: "english",
    header: "English",
  },
  {
    accessorKey: "sinhala",
    header: "සිංහල",
    cell: ({ row }) => {
      const sinhala = row.getValue("sinhala") as string[];
      return (
        <div className="font-['Noto_Sans_Sinhala',serif] font-medium text-xs">
          {sinhala?.join(", ") || "Not available"}
        </div>
      );
    },
  },
  {
    accessorKey: "tamil",
    header: "தமிழ்",
    cell: ({ row }) => {
      const tamil = row.getValue("tamil") as string[];
      return (
        <div className="font-tamil">
          {tamil?.join(", ") || "Not available"}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;

      return (
        <div className="min-w-[200px]">
          <Badge variant="secondary" className="capitalize">
            {category.name}
          </Badge>
        </div>
      );
    },
  },
];
