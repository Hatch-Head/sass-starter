'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { getBaseUrl } from '../../../config';
import { trpc } from '../../../trpc/client';

const TrpcProvider: React.FC<{ children: React.ReactNode }> = (p) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getBaseUrl() + '/api/trpc',
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TrpcProvider;