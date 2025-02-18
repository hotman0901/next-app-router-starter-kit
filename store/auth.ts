/* eslint-disable @typescript-eslint/no-explicit-any */
// Importing create function from the Zustand library
import { create } from "zustand";

// Defining an interface for the store's state
interface AuthStoreInterface {
  authenticated: boolean; // a boolean value indicating whether the user is authenticated or not
  setAuthentication: (val: boolean) => void; // a function to set the authentication status
  user: any; // an object that stores user information
  setUser: (user: any) => void; // a function to set user information
}

// create our store
export const useAuthStore = create<AuthStoreInterface>((set) => ({
  authenticated: false, // initial value of authenticated property
  user: {}, // initial value of user property
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAuthentication: (val) => set((state) => ({ authenticated: val })), // function to set the authentication status
  setUser: (user) => set({ user }), // function to set user information
}));
