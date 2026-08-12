import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createI18nMiddleware } from 'next-international/middleware';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  // cookies 沒有 locale 時才會呼叫這個 function，直接給預設值
  resolveLocaleFromRequest: () => 'en',
});

export default function withI18nMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const i18nResponse = I18nMiddleware(request);

    // i18n 決定要 redirect（補上 locale 前綴）或 rewrite 時，
    // 這個請求就到此為止，不需要再往下走
    const isTerminal =
      i18nResponse.headers.has('location') ||
      i18nResponse.headers.has('x-middleware-rewrite');

    if (isTerminal) return i18nResponse;

    // 否則繼續執行鏈上的下一個 middleware，
    // 並把 i18n 設定的 cookie（Next-Locale）帶到最終的 response 上，
    // 否則那些設定會隨著被丟棄的 i18nResponse 一起消失
    const response = (await middleware(request, event)) ?? NextResponse.next();

    if (response instanceof NextResponse) {
      for (const cookie of i18nResponse.cookies.getAll()) {
        response.cookies.set(cookie);
      }
    }

    return response;
  };
}
