'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const wordVariants: Variants = {
  hidden: { y: "150%", rotateZ: 5 },
  visible: { y: 0, rotateZ: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
};

const revealUp: Variants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
};

export function HeroSection() {
  const t = useTranslations('hero');
  const title = t('title');

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 md:px-16 lg:px-24 overflow-hidden">

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
        {/* Text Content */}
        <motion.div
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="overflow-hidden">
            <motion.p
              variants={revealUp}
              className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-secondary"
            >
              {t('greeting')}
            </motion.p>
          </div>
          
          <h1 className="font-heading text-6xl font-bold leading-[1.2] tracking-tight text-primary md:text-8xl lg:text-9xl">
            {title.split(' ').map((word: string, i: number) => (
              <span key={i} className="inline-block overflow-hidden pb-2 me-4 md:me-6">
                <motion.span
                  variants={wordVariants}
                  className="inline-block origin-top-left"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          
          <div className="overflow-hidden mt-6">
            <motion.p
              variants={revealUp}
              className="max-w-lg text-lg leading-relaxed text-secondary md:text-xl"
            >
              {t('subtitle')}
            </motion.p>
          </div>
          
          <div className="overflow-hidden mt-2">
            <motion.p
              variants={revealUp}
              className="text-base text-accent"
            >
              {t('role')}
            </motion.p>
          </div>
          
          <div className="overflow-hidden mt-10">
            <motion.div variants={revealUp} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                data-magnetic
                className="glass-card rounded-full px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-highlight/60"
              >
                {t('cta_projects')}
              </a>
              <a
                href="#contact"
                data-magnetic
                className="rounded-full border border-glass px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-highlight/30"
              >
                {t('cta_contact')}
              </a>
              <a
                href="/Anas_Helles_CV.png"
                download="Anas_Helles_CV.png"
                data-magnetic
                className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/80"
              >
                {t('cta_cv')}
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Portrait with 3D Parallax hover & Social Highlights */}
        <div className="flex flex-col items-center gap-6 flex-shrink-0">
          <div className="relative overflow-hidden rounded-3xl">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
              className="relative h-[350px] w-[280px] md:h-[500px] md:w-[380px] lg:h-[600px] lg:w-[450px]"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5, 
                rotateX: -5,
                transition: { type: 'spring', stiffness: 200, damping: 20 }
              }}
              style={{
                maskImage: 'radial-gradient(ellipse 80% 80% at 50% 45%, black 50%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 45%, black 50%, transparent 100%)',
                perspective: 1000
              }}
            >
              <Image
                src="/images/portrait.png"
                alt={t('portrait_alt')}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 380px, 450px"
                className="object-cover object-top"
                priority
              />
            </motion.div>
          </div>

          {/* Social Icons Highlights from CV */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center gap-6 bg-glass/20 border border-glass/40 rounded-full px-6 py-3 backdrop-blur-md shadow-sm"
          >
            <a 
              href="mailto:cybershield00000@gmail.com" 
              data-magnetic 
              className="text-secondary hover:text-primary transition-colors duration-300"
              title="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/anas.div" 
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic 
              className="text-secondary hover:text-primary transition-colors duration-300"
              title="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.facebook.com/share/19GfshZePu/" 
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic 
              className="text-secondary hover:text-primary transition-colors duration-300"
              title="Facebook"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a 
              href="https://wa.me/972593296420" 
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic 
              className="text-secondary hover:text-primary transition-colors duration-300"
              title="WhatsApp"
            >
              <FaWhatsapp className="h-5 w-5" />
            </a>
            <a 
              href="https://t.me/Anas_div" 
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic 
              className="text-secondary hover:text-primary transition-colors duration-300"
              title="Telegram"
            >
              <FaTelegramPlane className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
