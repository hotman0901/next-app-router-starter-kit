import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIES, PROTECTED_URL } from '@/constants';

const PROTECTED_PATHS = Object.values(PROTECTED_URL);

// 路徑會帶 locale 前綴（/en/dashboard），比對前先去掉
function stripLocale(pathname: string) {
  return pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
}

export default function withAuth(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = stripLocale(request.nextUrl.pathname);
    const isProtected = PROTECTED_PATHS.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );

    // middleware 只檢查 cookie 是否存在，不驗簽章：
    // Edge runtime 不支援 jsonwebtoken，真正的驗證留在 route handler / server component
    if (isProtected && !request.cookies.get(COOKIES.TOKEN)) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    return middleware(request, event);
  };
}
