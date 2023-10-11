'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

import { getUsers } from '@/apis/user';
import { User } from '@/types/types';
import request from '@/utils/request';

// async function getUsers() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = (await res.json()) as User[];

//   const ff = await request('https://jsonplaceholder.typicode.com/users')
//   console.log('ff:', ff.json())

//   return users;
// }

export default function ListUsers({ users }: { users: User[] }) {
  const [count, setCount] = React.useState(0);

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    // cacheTime: 0,
    // staleTime: 0,
    initialData: users,
  });

  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
        <button
          onClick={() => setCount((prev) => prev - 1)}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>

      {
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 20,
          }}
        >
          {data.map((user) => (
            <div
              key={user.id}
              style={{ border: '1px solid #ccc', textAlign: 'center' }}
            >
              <Image
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                style={{ height: 180, width: 180 }}
              />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      }
    </main>
  );
}
