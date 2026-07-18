'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

const services = ['architecture', 'database', 'uiux', 'cybersecurity'];

const fadeIn = (direction: 'left' | 'right'): Variants => ({
  hidden: { opacity: 0, x: direction === 'left' ? -60 : 60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
  }
});

export function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 md:px-16 lg:px-24">
      <div className="w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-accent"
        >
          {t('label')}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl font-bold text-primary md:text-6xl"
        >
          {t('title')}
        </motion.h2>

        <div className="mt-20 space-y-16">
          {services.map((key, i) => (
            <motion.div
              key={key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeIn(i % 2 === 0 ? 'left' : 'right')}
              className="group flex items-start gap-8 border-b border-glass/30 pb-12"
            >
              <span className="font-heading text-5xl font-bold text-highlight md:text-7xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h3 className="font-heading text-2xl font-semibold text-primary md:text-3xl">
                  <span className="relative">
                    {t(`items.${key}.title`)}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                  </span>
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-secondary">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
