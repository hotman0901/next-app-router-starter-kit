'use client';
import { ReactNode, use } from 'react';

import { I18nProviderClient } from '@/locales/client';

export default function SubLayout(o: {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}) {
  const { children, params } = o;
  // const ln = params?.locale || 'en';

  const c: { locale: string} = use(params)
  const { locale = 'en' } = c

  return (
    <I18nProviderClient locale={locale}>
      <div>123123</div>
      {children}
    </I18nProviderClient>
  );
}
