import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  console.log('[proxy.ts] Incoming request:', request.method, request.nextUrl?.pathname || request.url);
  try {
    const res = intlMiddleware(request);
    console.log('[proxy.ts] Middleware returned successfully.');
    return res;
  } catch (err) {
    console.error('[proxy.ts] Middleware threw an error:', err);
    throw err;
  }
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
