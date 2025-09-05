'use client';
import { ReactNode, use } from 'react';

import { I18nProviderClient } from '@/locales/client';

export default function SubLayout(o: {
  children: ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: <reason for ignoring>
  params: any;
}) {
  const { children, params } = o;
  // const ln = params?.locale || 'en';

  const c: { locale: string } = use(params);
  const { locale = 'en' } = c;

  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
