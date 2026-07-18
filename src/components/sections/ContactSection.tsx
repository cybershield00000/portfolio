'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Globe, UserCircle, Mail, Send } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } }
};

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="flex min-h-screen flex-col items-center justify-center px-6 md:px-16 lg:px-24">
      <motion.div
        className="glass-card w-full max-w-2xl rounded-3xl p-8 md:p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } }
        }}
      >
        <motion.p variants={fadeUp} className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          {t('label')}
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl font-bold text-primary md:text-5xl">
          {t('title')}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-base text-secondary">
          {t('subtitle')}
        </motion.p>

        <motion.form
          variants={fadeUp}
          action="https://formsubmit.co/cybershield00000@gmail.com"
          method="POST"
          className="mt-10 space-y-6"
        >
          {/* Prevent captcha to keep it smooth, but FormSubmit might require it on first run anyway */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="رسالة جديدة من البورتفوليو الخاص بك!" />
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-primary">
              {t('form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t('form.namePlaceholder')}
              className="w-full rounded-xl border border-glass/50 bg-white/30 px-5 py-3 text-primary backdrop-blur-sm placeholder:text-accent/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-primary">
              {t('form.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('form.emailPlaceholder')}
              className="w-full rounded-xl border border-glass/50 bg-white/30 px-5 py-3 text-primary backdrop-blur-sm placeholder:text-accent/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-primary">
              {t('form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder={t('form.messagePlaceholder')}
              className="w-full resize-none rounded-xl border border-glass/50 bg-white/30 px-5 py-3 text-primary backdrop-blur-sm placeholder:text-accent/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>
          <motion.button
            type="submit"
            data-magnetic
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Send className="h-4 w-4" />
            {t('form.submit')}
          </motion.button>
        </motion.form>

        <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 border-t border-glass/30 pt-8">
          <a href="#" data-magnetic className="text-secondary transition-colors hover:text-primary"><Globe className="h-5 w-5" /></a>
          <a href="#" data-magnetic className="text-secondary transition-colors hover:text-primary"><UserCircle className="h-5 w-5" /></a>
          <a href="#" data-magnetic className="text-secondary transition-colors hover:text-primary"><Mail className="h-5 w-5" /></a>
        </motion.div>
      </motion.div>
    </section>
  );
}
