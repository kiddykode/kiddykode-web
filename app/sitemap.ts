import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kiddykode.com';
  
  // List of static paths in the app (excluding the /[locale] prefix)
  const paths = [
    '', // Home page
    '/about',
    '/contact',
    '/partners',
    '/privacy',
    '/terms',
    '/stories',
    '/programs',
    '/programs/explorer-live',
    '/programs/next-cohort',
    '/programs/portfolio',
    '/programs/yil-campaign',
  ];

  // We generate entries with localized alternates for 'en' and 'fr'
  return paths.flatMap((path) => {
    return {
      url: `${baseUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1.0 : path.startsWith('/programs/') ? 0.8 : 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en${path}`,
          fr: `${baseUrl}/fr${path}`,
        },
      },
    };
  });
}
