export const COOKIE_NAME = 'tokenJWT';

export const COOKIES = {
  TOKEN: 'tokenJWT',
  LOCALE: 'Next-Locale',
};

export const API = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
};

export const QUERY_KEYS = {
  ME: ['auth', 'me'] as const,
  USERS: ['users'] as const,
};

export const PROTECTED_URL = {
  DASHBOARD: '/dashboard',
};
