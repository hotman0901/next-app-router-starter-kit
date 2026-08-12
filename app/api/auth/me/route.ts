import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { COOKIES } from '@/constants';

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIES.TOKEN);

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: 'JWT_SECRET is not configured' },
      { status: 500 },
    );
  }

  try {
    verify(token.value, secret);
  } catch {
    // token 過期或被竄改，一律視為未登入
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ user: 'Super Top Secret User' });
}
