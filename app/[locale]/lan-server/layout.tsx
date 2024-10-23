import { ReactElement } from 'react';

export default function SubLayout(o: {
  children: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Promise<{ locale: any }>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, params } = o;
  return <div>{children}</div>;
}
