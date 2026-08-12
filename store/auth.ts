// Importing create function from the Zustand library
import { create } from 'zustand';

/**
 * ⚠️ 這是模組層級的單例，在 server 端會跨請求共享。
 *
 * 目前是安全的：只有 AuthProvider 在 useEffect 裡寫入，
 * 那只會在 client 執行，server 端的 store 永遠維持初始值。
 *
 * 但如果之後想在 server component 直接把使用者資料填進 store，
 * A 使用者的資料就可能被 B 使用者讀到。屆時必須改成 per-request 的寫法：
 * 用 createStore() 在每個請求建立一份，再透過 Context 往下傳，
 * 不要繼續用模組層級的 create()。
 */

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
