// Importing create function from the Zustand library
import { create } from 'zustand';

// Defining an interface for the store's state
interface AuthStoreInterface {
  authenticated: boolean; // a boolean value indicating whether the user is authenticated or not
  setAuthentication: (val: boolean) => void; // a function to set the authentication status
  user: string | null; // 目前 /api/auth/me 只回傳使用者名稱
  setUser: (user: string | null) => void; // a function to set user information
}

// create our store
export const useAuthStore = create<AuthStoreInterface>((set) => ({
  authenticated: false, // initial value of authenticated property
  user: null, // initial value of user property
  setAuthentication: (val) => set({ authenticated: val }), // function to set the authentication status
  setUser: (user) => set({ user }), // function to set user information
}));
