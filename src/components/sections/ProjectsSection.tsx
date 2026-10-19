'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { X } from 'lucide-react';

const projects = [
  { key: 'snapGaza', image: '/images/snap-gaza.png', hasImage: true },
  { key: 'portfolio', image: '/images/portfolio.png', hasImage: true },
  { key: 'eliteAcademy', image: '/images/elite-academy.png', hasImage: true },
];

const TiltCard = ({ 
  project, 
  index, 
  t, 
  setSelected 
}: { 
  project: typeof projects[0]; 
  index: number;
  t: any;
  setSelected: (key: string) => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth the motion values for the tilt
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(smoothY, [-100, 100], [4, -4]);
  const rotateY = useTransform(smoothX, [-100, 100], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } 
        }
      }}
      layoutId={`project-card-${project.key}`}
      onClick={() => setSelected(project.key)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="group cursor-pointer will-change-transform w-full"
      data-magnetic
    >
      <motion.div 
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.01 }}
        className="glass-card overflow-hidden rounded-3xl transition-shadow hover:shadow-2xl flex flex-col lg:flex-row gap-8 p-6 lg:p-8 items-center"
      >
        <div className="relative w-full lg:w-3/5 h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden rounded-2xl bg-highlight/20 dark:bg-white/[0.03] border border-glass/30 dark:border-white/10 flex-shrink-0">
          {project.hasImage ? (
            <>
              {/* Blurred background fill */}
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover blur-xl opacity-25 scale-110 pointer-events-none"
                aria-hidden="true"
              />
              {/* Uncropped sharp image */}
              <Image
                src={project.image}
                alt={t(`items.${project.key}.title`)}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-2 sm:p-4 transition-transform duration-700 group-hover:scale-105"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-highlight via-white to-accent/20 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
              <span className="font-heading text-4xl font-bold text-accent">{'</>'}</span>
            </div>
          )}
          
          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent dark:via-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay pointer-events-none" />
        </div>
        <div className="flex-1 flex flex-col justify-between text-start w-full py-2">
          <div>
            <span className="font-mono text-xs font-semibold text-accent mb-2 block tracking-widest uppercase">PROJECT 0{index + 1}</span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
              {t(`items.${project.key}.title`)}
            </h3>
            <p className="text-sm md:text-base text-secondary leading-relaxed mb-6">
              {t(`items.${project.key}.short`)}
            </p>
          </div>
          <div className="mt-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
              {t('techStack')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {t(`items.${project.key}.tech`).split(', ').map((tech: string, i: number) => (
                <span key={i} className="text-xs bg-highlight/50 dark:bg-white/[0.06] border border-glass/40 dark:border-white/10 text-primary px-3 py-1 rounded-full font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function ProjectsSection() {
  const t = useTranslations('projects');
  const [selected, setSelected] = useState<string | null>(null);
  const selectedProject = projects.find(p => p.key === selected);

  return (
    <section id="projects" className="flex min-h-screen flex-col items-center justify-center px-6 md:px-16 lg:px-24">
      <div className="w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-secondary"
        >
          {t('label')}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading text-4xl font-bold text-primary md:text-5xl lg:text-6xl"
        >
          {t('title')}
        </motion.h2>

        <motion.div 
          className="mt-16 flex flex-col gap-12 md:gap-16 w-full"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <TiltCard 
              key={project.key} 
              project={project} 
              index={index} 
              t={t}
              setSelected={setSelected}
            />
          ))}
        </motion.div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selected && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/80 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`project-card-${selected}`}
              className="glass-card relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl p-8 md:p-12"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute end-4 top-4 z-20 rounded-full bg-highlight/50 dark:bg-white/10 p-2 text-primary transition-colors hover:bg-accent hover:text-primary-foreground backdrop-blur-md"
                data-magnetic
              >
                <X className="h-5 w-5" />
              </button>

              {selectedProject.hasImage && (
                <div className="relative mb-8 h-[360px] sm:h-[460px] md:h-[520px] w-full overflow-hidden rounded-2xl bg-neutral-900/5 dark:bg-black/50 border border-glass/30 dark:border-white/10">
                  {/* Ambient blurred background */}
                  <Image
                    src={selectedProject.image}
                    alt=""
                    fill
                    className="object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                    aria-hidden="true"
                  />
                  {/* Full sharp uncropped image */}
                  <Image
                    src={selectedProject.image}
                    alt={t(`items.${selected}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain p-3 sm:p-5"
                    priority
                  />
                </div>
              )}

              <h2 className="font-heading text-3xl font-bold text-primary md:text-4xl">
                {t(`items.${selected}.title`)}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-secondary">
                {t(`items.${selected}.description`)}
              </p>

              <div className="mt-8">
                <h4 className="text-sm font-medium uppercase tracking-wider text-accent">
                  {t('techStack')}
                </h4>
                <p className="mt-2 text-sm text-secondary">
                  {t(`items.${selected}.tech`)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
