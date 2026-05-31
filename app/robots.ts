import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/en/admin', '/fr/admin'],
    },
    sitemap: 'https://kiddykode.com/sitemap.xml',
  };
}
