'use client'

import { ReactElement } from 'react'

import { I18nProviderClient } from '@/locales/client'

// import en from '@/locales/en';


export default function SubLayout({
  children,
  params: { locale = 'en' },
}: {
  children: ReactElement
  params: { locale: string }
}) {
  return (
    <I18nProviderClient locale={locale}>
      <div>123123</div>
      {children}
    </I18nProviderClient>
  )
}
