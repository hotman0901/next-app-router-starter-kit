import { getUsers } from '@/apis/user'

// import { User } from "@/types/types";
import ListUsers from "./list-users";

// async function getUsers() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = (await res.json()) as User[];
//   return users;
// }

export default async function InitialData() {
  const users = await getUsers();

  return <ListUsers users={users} />;
}
