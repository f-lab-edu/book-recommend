import { isServer, QueryClient } from "@tanstack/react-query";

let clientQueryClient: QueryClient | null = null;
const defaultOptions = {
  queries: {
    staleTime: 60 * 1000,
    retry: 1,
  },
};

export const createQueryClient = () => {
  if (isServer) {
    return new QueryClient({
      defaultOptions,
    });
  }

  if (clientQueryClient == null) {
    clientQueryClient = new QueryClient({
      defaultOptions,
    });
  }

  return clientQueryClient;
};
