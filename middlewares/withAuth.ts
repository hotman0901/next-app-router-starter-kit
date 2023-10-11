import { cookies } from 'next/headers';
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

import { COOKIES } from '@/constants';

// export default function middleware(req) {
//   const token = req.cookies.token

//   // if (userStatus !== requiredStatus) {
//   //   if (userStatus === 'guest') {
//   //     return NextResponse.redirect('/login')
//   //   } else {
//   //     return NextResponse.redirect('/error')
//   //   }
//   }
// }

// export const withLogging: MiddlewareFactory = (next) => {
//   return async (request: NextRequest, _next: NextFetchEvent) => {
//     console.log("Log some data here", request.nextUrl.pathname);
//     return next(request, _next);
//   };
// };

export default function withAuth(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const cookieStore = cookies();
    // const locale = cookieStore.get(COOKIES.LOCALE);
    // console.log('locale:', locale)
    const token = cookieStore.get(COOKIES.TOKEN);
    // console.log('token:', token?.value)
    // console.log('token:', token)
    // console.log('locale =>',  request.nextUrl['locale'])
    // console.log('locale =>',  request.nextUrl)
    // console.log('token:', token?.value)

    // const checkUrl = locale?.value + request.nextUrl.pathname
    // console.log('checkUrl:', checkUrl)
    // console.log("path => ", request.nextUrl.pathname)
    // console.log('middleware1 =>', request.url)
    return middleware(request, event);
  };
}
