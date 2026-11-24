import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { localeFromPathname, LOCALE_HEADER } from './lib/notFoundContent';

// Next does not pass the route parameters to not-found.tsx, which serves
// both locales nonetheless: the locale reaches it through a header.
export const config = {
  matcher:
    '/((?!_next/|img/|fonts/|uploads/|media/|favicon|site.webmanifest).*)',
};

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  headers.set(LOCALE_HEADER, localeFromPathname(request.nextUrl.pathname));

  return NextResponse.next({ request: { headers } });
}
