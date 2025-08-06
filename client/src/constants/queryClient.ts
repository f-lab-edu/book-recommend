import { isServer, QueryClient, QueryClientConfig } from "@tanstack/react-query";

let clientQueryClient: QueryClient | null = null;
const defaultOptions = {
  queries: {
    staleTime: 60 * 1000,
    retry: 1,
  },
};

type CreateQueryClientOptions = {
  customDefaultOptions?: QueryClientConfig['defaultOptions'];
}

export const createQueryClient = ({ customDefaultOptions }: CreateQueryClientOptions = {}) => {
  if (isServer) {
    return new QueryClient({
      defaultOptions,
      ...customDefaultOptions,
    });
  }

  if (clientQueryClient == null) {
    clientQueryClient = new QueryClient({
      defaultOptions,
      ...customDefaultOptions,
    });
  }

  return clientQueryClient;
};
