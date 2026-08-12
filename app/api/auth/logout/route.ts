import { NextResponse } from 'next/server';

import { COOKIES } from '@/constants';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  // 屬性要跟 login 設定時一致，否則瀏覽器會當成另一個 cookie 而清不掉
  response.cookies.set(COOKIES.TOKEN, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return response;
}
