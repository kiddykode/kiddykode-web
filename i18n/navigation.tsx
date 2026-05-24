'use client';

import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname as useNextPathname, useRouter as useNextRouter, redirect as nextRedirect } from 'next/navigation';
import { useLocale } from './context';

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href'> {
  href: string;
}

export function Link({ href, ...props }: LinkProps) {
  const locale = useLocale();

  let localizedHref = href;
  const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:');
  const isHash = href.startsWith('#');
  const isAlreadyLocalized = href.startsWith('/en') || href.startsWith('/fr');

  if (!isExternal && !isHash && !isAlreadyLocalized) {
    if (href.startsWith('/')) {
      localizedHref = `/${locale}${href === '/' ? '' : href}`;
    }
  }

  return <NextLink href={localizedHref} {...props} />;
}

export function usePathname() {
  const pathname = useNextPathname() || '';
  if (pathname.startsWith('/en')) {
    return pathname.substring(3) || '/';
  }
  if (pathname.startsWith('/fr')) {
    return pathname.substring(3) || '/';
  }
  return pathname;
}

export function useRouter() {
  const router = useNextRouter();
  const currentLocale = useLocale();

  return {
    ...router,
    push(href: string, options?: { locale?: string }) {
      const locale = options?.locale || currentLocale;
      const target = href.startsWith('/') ? `/${locale}${href === '/' ? '' : href}` : href;
      router.push(target);
    },
    replace(href: string, options?: { locale?: string }) {
      const locale = options?.locale || currentLocale;
      const target = href.startsWith('/') ? `/${locale}${href === '/' ? '' : href}` : href;
      router.replace(target);
    },
  };
}

export function redirect(href: string, locale: string = 'en') {
  const target = href.startsWith('/') ? `/${locale}${href === '/' ? '' : href}` : href;
  nextRedirect(target);
}

export function getPathname({ href, locale }: { href: string; locale: string }) {
  return href.startsWith('/') ? `/${locale}${href === '/' ? '' : href}` : href;
}
