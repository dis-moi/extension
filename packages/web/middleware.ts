import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { localeFromPathname, LOCALE_HEADER } from './lib/notFoundContent';

/**
 * Transmet la langue du chemin demandé dans un en-tête de requête, parce que
 * Next ne passe pas les paramètres de la route à `not-found.tsx`, qui sert
 * pourtant les deux langues.
 *
 * Les fichiers statiques et les images sont écartés : rien ne sert de les
 * traverser.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export const config = {
  matcher: '/((?!_next/|img/|fonts/|favicon|site.webmanifest).*)',
};

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  headers.set(LOCALE_HEADER, localeFromPathname(request.nextUrl.pathname));

  return NextResponse.next({ request: { headers } });
}
