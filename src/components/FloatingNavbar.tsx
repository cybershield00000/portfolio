'use client';

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Sun, Moon } from 'lucide-react';

interface FloatingNavbarProps {
  activeSection: number;
  onNavigate: (index: number) => void;
}

const sections = ['hero', 'services', 'skills', 'projects', 'contact'] as const;

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('storage', callback);
  return () => {
    observer.disconnect();
    window.removeEventListener('storage', callback);
  };
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getThemeServerSnapshot() {
  return 'dark';
}

export function FloatingNavbar({ activeSection, onNavigate }: FloatingNavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = useLocale();
  const otherLocale = currentLocale === 'en' ? 'ar' : 'en';

  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        // ignore
      }
    } else {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {
        // ignore
      }
    }
  };

  const switchLanguage = () => {
    router.replace(pathname, { locale: otherLocale });
  };

  return (
    <motion.nav
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2 md:top-8"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <motion.div
        className="glass-navbar flex items-center gap-0.5 rounded-full px-1.5 py-1.5 md:gap-2 md:px-4 md:py-2"
        data-magnetic
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {sections.map((key, index) => (
          <motion.button
            key={key}
            onClick={() => onNavigate(index)}
            className={`relative rounded-full px-2 py-1.5 text-[10px] sm:px-3 sm:py-2 sm:text-xs font-medium transition-all duration-300 md:px-5 md:text-sm ${
              activeSection === index
                ? 'text-primary-foreground font-semibold'
                : 'text-secondary hover:text-primary'
            }`}
            data-magnetic
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeSection === index && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t(key)}</span>
          </motion.button>
        ))}

        <div className="mx-1 h-5 w-px bg-glass/40 md:h-6" />

        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          className="rounded-full bg-highlight/40 p-1.5 text-primary transition-all hover:bg-accent hover:text-primary-foreground sm:p-2"
          data-magnetic
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
          ) : (
            <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
        </motion.button>

        {/* Language Switcher */}
        <motion.button
          onClick={switchLanguage}
          className="rounded-full bg-highlight/40 px-2 py-1.5 text-[10px] sm:px-3 sm:py-2 sm:text-xs font-semibold text-primary transition-all hover:bg-accent hover:text-primary-foreground md:px-4 md:text-sm"
          data-magnetic
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentLocale === 'en' ? 'عربي' : 'EN'}
        </motion.button>
      </motion.div>
    </motion.nav>
  );
}
