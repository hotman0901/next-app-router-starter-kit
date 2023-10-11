import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

export default function withLogger(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log(`Middleware => [${request.method}] ${request.url}`);
    return middleware(request, event);
  };
}
