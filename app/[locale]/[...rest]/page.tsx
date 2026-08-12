import { notFound } from 'next/navigation';

/**
 * root layout 位在 [locale] 這個 dynamic segment 底下時，
 * Next 無法為「完全不匹配」的路徑決定要用哪個 locale 渲染，
 * 會直接退回內建的 404 畫面，[locale]/not-found.tsx 不會生效。
 *
 * 用一個 catch-all 把這些路徑接住再主動觸發 notFound()，
 * 就能正常落到 [locale]/not-found.tsx。
 */
export default function CatchAllPage() {
  notFound();
}
