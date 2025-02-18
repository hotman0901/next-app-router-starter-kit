'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image'
import React from 'react';

import { User } from './types';

async function getUsers() {
  return (await fetch('https://jsonplaceholder.typicode.com/users').then(
    (res) => res.json()
  )) as User[];
}

export default function ListUsers() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = React.useState(0);
  const { data } = useSuspenseQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: 5 * 1000,
  });

  // React.useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCount((prev) => prev + 1);
  //   }, 100);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <>
      <p>{count}</p>
      {
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 20,
          }}
        >
          {data?.map((user) => (
            <div
              key={user.id}
              style={{ border: '1px solid #ccc', textAlign: 'center' }}
            >
              <Image
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                width="180"
                height="180"
              />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      }
    </>
  );
}
