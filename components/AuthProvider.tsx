'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth'
import { getCookie, setCookie } from 'cookies-next';



export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // Getting the token value from a cookie
  const token = getCookie('token')
  // Getting the setAuthentication function from the authentication store
  const setAuthentication = useAuthStore((state) => state.setAuthentication)
  // Running a side effect whenever the token value changes
  useEffect(() => {
    if (token) {
      setAuthentication(true) // Setting the authentication status to true if a token exists
    } else {
      setAuthentication(false) 
    }
  }, [token])

  // Rendering the layout with the Navbar, main content, and Footer components
  return (
    <>
      {children}
    </>
  )
}
