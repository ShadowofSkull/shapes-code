'use client';

import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) => fetch(url).then((res) => res.json()),
          onError: (error) => {
            console.error('🔴 SWR Error:', error);
          },
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  );
}
