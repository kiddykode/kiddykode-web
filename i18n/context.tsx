'use client';

import React, { createContext, useContext } from 'react';

type Messages = Record<string, any>;

interface TranslationContextType {
  locale: string;
  messages: Messages;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}) {
  return (
    <TranslationContext.Provider value={{ locale, messages }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useLocale must be used within a TranslationProvider');
  }
  return context.locale;
}

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

export function useTranslations(namespace?: string) {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }

  const { messages } = context;

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
