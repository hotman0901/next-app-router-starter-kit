import { cookies } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { Suspense } from 'react';

import { COOKIES } from '@/constants';
import Counter from './counter';
import ListUsers from './list-users';
import Loading from './loading';

export default async function Page() {
  // token 是 httpOnly cookie，只能在 server 端讀取
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIES.TOKEN);

  if (!token) {
    unauthorized();
  }

  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      <Counter />
      <Suspense fallback={<Loading />}>
        <ListUsers />
      </Suspense>
    </main>
  );
}
