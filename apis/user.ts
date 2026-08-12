import type { User } from '@/types/types';
import { http } from '@/utils/fetcher';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export function getUsers() {
  return http<User[]>(USERS_URL);
}
