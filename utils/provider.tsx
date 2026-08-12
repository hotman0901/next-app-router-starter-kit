'use client';
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { useEffect, useState } from 'react';

import { I18nProviderClient } from '@/locales/client';

// 集中所有 client-side provider。
// I18nProviderClient 帶著 client-only，不能直接在 server layout 引入，
// 所以由這個 'use client' 檔案代為包裝
function Providers({
  children,
  locale,
}: React.PropsWithChildren<{ locale: string }>) {
  // 必須用 lazy initializer，否則每次 render 都會 new 一個 QueryClient
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
  );

  // onblur 畫面不要觸發重新 call api
  useEffect(() => {
    focusManager.setFocused(false);
  }, []);

  return (
    <QueryClientProvider client={client}>
      <I18nProviderClient locale={locale}>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      </I18nProviderClient>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default Providers;
