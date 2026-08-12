import { dehydrate } from '@tanstack/query-core';

import { getUsers } from '@/apis/user';
import { QUERY_KEYS } from '@/constants';
import getQueryClient from '@/utils/getQueryClient';
import Hydrate from '@/utils/hydrate.client';

import ListUsers from './list-users';

// 這個做法比較推薦
export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: getUsers,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}
