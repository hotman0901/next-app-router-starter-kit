import { serialize } from 'cookie';
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

  // Always check this
  const secret = process.env.JWT_SECRET || '';
  console.log('secret:', secret);

  const token = sign(
    {
      username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    },
  );

  // 設置 cookies
  const seralized = serialize(COOKIES.TOKEN, token, {
    httpOnly: true, // 設定 true 就不能使 client 端取得
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  });

  const response = {
    message: 'Authenticated!',
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Set-Cookie': seralized },
  });
}
