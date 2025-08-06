import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { theme } from "@/theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createQueryClient } from "@/constants/queryClient";
import { useState } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}