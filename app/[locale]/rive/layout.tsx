'use client';
import { type ReactNode, use } from 'react';

import { I18nProviderClient } from '@/locales/client';

export default function SubLayout({
  children,
  params,
}: {
  children: ReactNode;
  // Next 16 的 params 是 Promise，用 use() 解開
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
