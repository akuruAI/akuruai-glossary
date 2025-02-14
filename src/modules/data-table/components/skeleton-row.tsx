import { Skeleton } from "@modules/shared/components/ui/skeleton";
import { TableCell, TableRow } from "@modules/shared/components/ui/table";

interface SkeletonRowProps {
  columns: number;
}

export function SkeletonRow({ columns }: SkeletonRowProps) {
  return (
    <TableRow className="h-[53px]">
      {Array.from({ length: columns }).map((_, index) => (
        <TableCell key={index} className="p-4">
          <Skeleton className="h-5 w-full" />
        </TableCell>
      ))}
    </TableRow>
  );
}
