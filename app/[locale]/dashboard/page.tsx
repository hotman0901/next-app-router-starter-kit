'use client';
import { useRouter } from 'next/navigation';
import { useI18n, useScopedI18n } from '@/locales/client'


export default function page() {
  const router = useRouter();
  const t = useI18n()
  const scopedT = useScopedI18n('hello')
  return (
    <div>
      <p>{t('hello')}</p>
      <p>{scopedT('world')}</p>
      <button onClick={() => router.push('/')}>go to index</button>
    </div>
  );
}
