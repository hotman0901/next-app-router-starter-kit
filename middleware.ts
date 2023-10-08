// import { createI18nMiddleware } from "next-international/middleware";
// import { NextRequest } from "next/server";

// const I18nMiddleware = createI18nMiddleware({
//   locales: ["en", "fr"],
//   defaultLocale: "en"
// });

// export function middleware(request: NextRequest) {
//   return I18nMiddleware(request);
// }

import { chain } from '@/middlewares/chain';
import withAuth from '@/middlewares/withAuth';
import withI18nMiddleware from '@/middlewares/withI18n';

export default chain([withAuth, withI18nMiddleware]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
