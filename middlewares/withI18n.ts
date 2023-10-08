import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import { createI18nMiddleware } from "next-international/middleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
  resolveLocaleFromRequest: request => {
    // 如果 cookies 沒有才會 trigger 這個 function 直接塞 en
    return 'en'
  }
});

export default function withI18nMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // 如果要讓他 chain middleware 目前解法是把 i18n 放在最後一個，
    // 或是把下面打開
    // middleware(request, event)
    return I18nMiddleware(request);
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
