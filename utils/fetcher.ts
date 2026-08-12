import { ofetch } from 'ofetch';

/**
 * server 端的 fetch 不接受相對路徑（會直接丟 Failed to parse URL），
 * 所以在 server 要補上絕對 URL；client 端維持相對路徑即可。
 *
 * 注意：baseURL 只會套用在相對路徑上，
 * 帶 protocol 的絕對網址（例如第三方 API）不受影響。
 */
function getBaseURL() {
  if (typeof window !== 'undefined') return '';

  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    `http://localhost:${process.env.PORT ?? 3000}`
  );
}

export const http = ofetch.create({
  baseURL: getBaseURL(),
  // ofetch 預設會重試 GET 一次，跟 TanStack Query 的 retry 疊加會變成重試兩輪，
  // 這裡關掉，重試策略統一交給 TanStack Query 決定
  retry: 0,
});

export { FetchError } from 'ofetch';
