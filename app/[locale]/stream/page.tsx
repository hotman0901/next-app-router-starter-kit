import { Suspense } from "react";

import Counter from "./counter";
import ListUsers from "./list-users";
import Loading from "./loading";
import { unauthorized } from 'next/navigation'
// import { getCookie } from 'cookies-next';
import { COOKIES } from '@/constants';
import { cookies } from 'next/headers'

export default async function Page() {
  // server side 取得，用 clinet side 取不到
  const cookieStore = cookies();
  const token = (await cookieStore)?.get(COOKIES.TOKEN);
  if (!token) {
    unauthorized();
  }
  
  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <Counter />
      <Suspense fallback={<Loading />}>
        <ListUsers />
      </Suspense>
    </main>
  );
}
