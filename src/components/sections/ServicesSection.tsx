'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ServicesSection() {
  const t = useTranslations('services');
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  // 6 items based on the new messages
  const servicesList = Array.from({ length: 6 }).map((_, i) => t(`items.${i}`));

  return (
    <section id="services" className="relative flex flex-col items-center justify-center py-32 px-6 md:px-16 lg:px-24 min-h-screen">
      <div className="w-full max-w-6xl mx-auto">
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
          className="font-heading text-4xl font-bold text-primary md:text-6xl mb-20"
        >
          {t('title')}
        </motion.h2>

        <div className="flex flex-col border-t border-glass/30" onMouseLeave={() => setHoveredExp(null)}>
          {servicesList.map((service, i) => {
            const isHovered = hoveredExp === i;
            const isOtherHovered = hoveredExp !== null && hoveredExp !== i;
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredExp(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative flex cursor-pointer items-center justify-between border-b border-glass/30 py-6 md:py-12 transition-all duration-500 ${
                  isOtherHovered ? 'opacity-30 blur-[2px] scale-[0.98]' : 'opacity-100 scale-100'
                }`}
                data-magnetic
              >
                <div className="flex items-center gap-4 md:gap-12 transition-transform duration-500 group-hover:translate-x-6">
                  <span className="font-mono text-lg md:text-2xl text-accent/50 group-hover:text-accent transition-colors">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-primary transition-colors leading-snug">
                    {service}
                  </h3>
                </div>
                <div className="hidden md:block overflow-hidden">
                  <motion.div
                    animate={{ x: isHovered ? 0 : -50, opacity: isHovered ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
