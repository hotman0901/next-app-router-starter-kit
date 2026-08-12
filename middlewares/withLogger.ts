import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

export default function withLogger(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // 每個請求都印一行，正式環境會太吵，只在開發時輸出
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Middleware => [${request.method}] ${request.url}`);
    }

    return middleware(request, event);
  };
}
