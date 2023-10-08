import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export default function withLogger(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log(`Request Log => [${request.method}] ${request.url}`)
    return middleware(request, event);
  }
}
