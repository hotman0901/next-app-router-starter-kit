import { chain } from '@/middlewares/chain';
import withAuth from '@/middlewares/withAuth';
import withI18nMiddleware from '@/middlewares/withI18n';
import withLogger from '@/middlewares/withLogger';

// i18n 會決定要不要 redirect / rewrite，必須放在鏈的最後
export default chain([withLogger, withAuth, withI18nMiddleware]);

export const config = {
  matcher: [
    // 排除 api、Next 內部資源，以及 public/ 底下的靜態檔案。
    // 靜態檔案改用明確的副檔名清單，
    // 先前用 /\.(.*)$/ 判斷會把 /user/john.doe 這種路徑誤判成靜態檔
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|webmanifest)$).*)',
  ],
};
