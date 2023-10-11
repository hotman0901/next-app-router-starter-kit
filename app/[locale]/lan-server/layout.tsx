import { ReactElement } from 'react';

export default function SubLayout({
  children,
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  return <div>{children}</div>;
}
