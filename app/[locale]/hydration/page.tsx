import { dehydrate } from "@tanstack/query-core";

import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";

import ListUsers from "./list-users";
import { User } from "./types";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
}

// 這個做法比較推薦
export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["users"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}
