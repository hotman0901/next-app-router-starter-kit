import { User } from '@/types/types';
import request from '@/utils/request';

export async function getUsers() {
  const res = await request(`https://jsonplaceholder.typicode.com/users/`);
  const users = (await res.json()) as User[];
  return users;
}
