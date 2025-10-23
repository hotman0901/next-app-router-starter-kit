import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export default function withAuth(middleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    if (
      req.nextUrl.pathname.startsWith('/_next') ||
      req.nextUrl.pathname.includes('/api/') ||
      PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
      return;
    }
    return middleware(req, event);
  };
}
