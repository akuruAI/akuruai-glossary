"use client";

import { TooltipProvider } from "@modules/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>

      <TooltipProvider>
        <NextTopLoader showSpinner={false} />
        <Toaster richColors closeButton />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
