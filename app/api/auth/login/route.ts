import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { COOKIES } from '@/constants';

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;

  if (username !== 'admin' || password !== 'admin') {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  const secret = process.env.JWT_SECRET;

  // 沒有 secret 就不簽章，避免用空字串簽出人人可偽造的 token
  if (!secret) {
    return NextResponse.json(
      { message: 'JWT_SECRET is not configured' },
      { status: 500 },
    );
  }

  const token = sign({ username }, secret, { expiresIn: MAX_AGE });

  const response = NextResponse.json({ message: 'Authenticated!' });

  // 用 Next 內建的 cookies API，不需要額外的 cookie 套件
  response.cookies.set(COOKIES.TOKEN, token, {
    httpOnly: true, // 設定 true 就不能使 client 端取得
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  });

  return response;
}
