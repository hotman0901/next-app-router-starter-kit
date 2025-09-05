import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function SubLayout({ children }: Props) {
  return <div>{children}</div>;
}
