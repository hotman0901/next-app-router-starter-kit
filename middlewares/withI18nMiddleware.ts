import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import { createI18nMiddleware } from "next-international/middleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en"
});

export default function withI18nMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    return  I18nMiddleware(request);
  }
}


// example  https://github.com/HamedBahram/next-middleware-chain
// export function withMiddleware2(middleware: NextMiddleware) {
//   return async (request: NextRequest, event: NextFetchEvent) => {
//     const pathname = request.nextUrl.pathname
//     console.log('middleware2 =>', { pathname })

//     return middleware(request, event)
//   }
// }
