'use client';
import { getCookie } from 'cookies-next';
import React, { useEffect } from 'react';

import { COOKIES } from '@/constants';
import { useAuthStore } from '@/store/auth';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // Getting the token value from a cookie
  const token = getCookie(COOKIES.TOKEN);
  // Getting the setAuthentication function from the authentication store
  const setAuthentication = useAuthStore((state) => state.setAuthentication);
  // Running a side effect whenever the token value changes
  useEffect(() => {
    if (token) {
      console.log('token update');
      setAuthentication(true); // Setting the authentication status to true if a token exists
    } else {
      setAuthentication(false);
    }
  }, [token, setAuthentication]);

  // Rendering the layout with the Navbar, main content, and Footer components
  return <>{children}</>;
}
