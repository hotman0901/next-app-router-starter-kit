'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { API, QUERY_KEYS } from '@/constants';
import { useAuthStore } from '@/store/auth';
import { FetchError, http } from '@/utils/fetcher';

// token cookie 是 httpOnly，client 端讀不到，
// 只能透過 /api/auth/me 由 server 回報登入狀態
async function fetchMe(): Promise<string | null> {
  try {
    const { user } = await http<{ user: string }>(API.ME);
    return user;
  } catch (error) {
    // 401 是「未登入」這個正常狀態，不該當成錯誤往上拋
    if (error instanceof FetchError && error.status === 401) return null;
    throw error;
  }
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAuthentication = useAuthStore((state) => state.setAuthentication);
  const setUser = useAuthStore((state) => state.setUser);

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.ME,
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // 把 query 結果同步到 zustand，讓其他元件不必各自打 API
  useEffect(() => {
    if (isPending) return;

    setAuthentication(Boolean(data));
    setUser(data ?? null);
  }, [data, isPending, setAuthentication, setUser]);

  return <>{children}</>;
}
