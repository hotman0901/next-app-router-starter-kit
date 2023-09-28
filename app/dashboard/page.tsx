'use client';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push('/')}>go to index</button>
    </div>
  );
}
