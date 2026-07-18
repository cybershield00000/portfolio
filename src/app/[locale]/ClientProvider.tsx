'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState, type ReactNode } from 'react';

interface ClientProviderProps {
  children: ReactNode;
  locale: string;
}

export function ClientProviderComponent({ children, locale }: ClientProviderProps) {
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    import(`../../messages/${locale}.json`).then((mod) => {
      setMessages(mod.default);
    });
  }, [locale]);

  if (!messages) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
