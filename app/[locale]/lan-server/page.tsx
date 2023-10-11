import { getCurrentLocale,getI18n, getScopedI18n } from '@/locales/server';

export default async function Page() {
  const t = await getI18n();
  const scopedT = await getScopedI18n('hello');
  const locale = getCurrentLocale()


  return (
    <div>
      <p className="red">Current locale: {locale}</p>
      <p>{t('hello')}</p>
      {/* Both are equivalent: */}
      <p>{t('hello.world')}</p>
      <p>{scopedT('world')}</p>

      <p>{t('welcome', { name: 'John' })}</p>
      <p>{t('welcome', { name: <strong>John</strong> })}</p>
    </div>
  );
}
