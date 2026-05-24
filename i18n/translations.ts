type Messages = Record<string, any>;

function getNestedValue(obj: any, path: string): string {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return path;
    current = current[part];
  }
  return typeof current === 'string' ? current : path;
}

function hasNestedValue(obj: any, path: string): boolean {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return false;
    if (!(part in current)) return false;
    current = current[part];
  }
  return true;
}

export async function getTranslations(options: {
  locale: string;
  namespace?: string;
} | string) {
  let locale = 'en';
  let namespace: string | undefined;

  if (typeof options === 'string') {
    namespace = options;
    // Default to 'en' if only namespace string is provided
  } else {
    locale = options.locale;
    namespace = options.namespace;
  }

  let messages: Messages = {};
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (e) {
    try {
      messages = (await import('../messages/en.json')).default;
    } catch (_) {}
  }

  const t = (key: string) => {
    const fullPath = namespace ? `${namespace}.${key}` : key;
    return getNestedValue(messages, fullPath);
  };

  t.has = (key: string) => {
    const fullPath = namespace ? `${namespace}.${key}` : key;
    return hasNestedValue(messages, fullPath);
  };

  return t;
}

export async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (e) {
    try {
      return (await import('../messages/en.json')).default;
    } catch (_) {
      return {};
    }
  }
}

export function setRequestLocale(locale: string) {
  // No-op helper for compatibility with next-intl layout/page patterns
}
