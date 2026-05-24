import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, api, static files, favicon, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a valid locale prefix
  const pathnameHasLocale = 
    pathname.startsWith('/en/') || 
    pathname === '/en' || 
    pathname.startsWith('/fr/') || 
    pathname === '/fr';

  if (!pathnameHasLocale) {
    // Default to 'en'
    const locale = 'en';
    
    // Redirect to the locale-prefixed URL
    // e.g. / -> /en, /about -> /en/about
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    // Keep query parameters
    redirectUrl.search = request.nextUrl.search;
    
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all pathnames except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
