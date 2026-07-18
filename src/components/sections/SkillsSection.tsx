'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  FaJs, FaPython, FaPhp, FaRust, FaReact, FaDatabase, FaGitAlt, FaServer,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiSupabase, SiVercel, SiFirebase,
} from 'react-icons/si';
import {
  Globe, Ear, Clock, Zap, ShieldAlert, Users, BrainCircuit, Languages, Hash,
  MessageSquare, Shuffle, Target, AlertTriangle, Handshake, Shield, BarChart3,
  Palette, Layout, Pen,
} from 'lucide-react';

/* ─── Brand Icon Helper ──────────────────────────────────────── */
const BrandIcon = ({ name, type = 'original' }: { name: string; type?: string }) => (
  <img 
    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${type}.svg`} 
    alt={name} 
    style={{ width: '1em', height: '1em', objectFit: 'contain' }} 
  />
);

/* ─── Icon Map ─────────────────────────────────────────────── */
const iconMap: Record<string, ReactNode> = {
  // Programming
  js:         <BrandIcon name="javascript" />,
  python:     <BrandIcon name="python" />,
  php:        <BrandIcon name="php" />,
  csharp:     <BrandIcon name="csharp" />,
  rust:       <BrandIcon name="rust" type="plain" />,
  react:      <BrandIcon name="react" />,
  nextjs:     <BrandIcon name="nextjs" />,
  sql:        <BrandIcon name="postgresql" />,
  supabase:   <BrandIcon name="supabase" />,
  git:        <BrandIcon name="git" />,
  api:        <FaServer />,
  // Soft
  communicate:<MessageSquare />,
  problem:    <BrainCircuit />,
  team:       <Users />,
  flexible:   <Shuffle />,
  time:       <Clock />,
  // Leadership
  strategy:   <Target />,
  risk:       <AlertTriangle />,
  lead:       <Users />,
  negotiate:  <Handshake />,
  // Specialized
  cyber:      <Shield />,
  cloud:      <SiVercel />,
  firebase:   <BrandIcon name="firebase" type="plain" />,
  data:       <BarChart3 />,
  // Languages
  arabic:     <Languages />,
  english:    <Globe />,
  // Design
  uidesign:   <Layout />,
  graphic:    <Palette />,
  poster:     <Pen />,
};

/* ─── Category Colors ──────────────────────────────────────── */
interface CatColor {
  tw: string;
  css: string;
  bgCss: string;        // full-section background tint
  chipBg: string;       // chip hover bg
  chipBorder: string;   // chip hover border
}

const categoryColors: Record<string, CatColor> = {
  soft: {
    tw: 'text-rose-500',
    css: '#f43f5e',
    bgCss: 'rgba(244,63,94,0.04)',
    chipBg: 'bg-rose-500/10',
    chipBorder: 'border-rose-500/30',
  },
  programming: {
    tw: 'text-blue-500',
    css: '#3b82f6',
    bgCss: 'rgba(59,130,246,0.04)',
    chipBg: 'bg-blue-500/10',
    chipBorder: 'border-blue-500/30',
  },
  leadership: {
    tw: 'text-violet-500',
    css: '#8b5cf6',
    bgCss: 'rgba(139,92,246,0.04)',
    chipBg: 'bg-violet-500/10',
    chipBorder: 'border-violet-500/30',
  },
  specialized: {
    tw: 'text-cyan-500',
    css: '#06b6d4',
    bgCss: 'rgba(6,182,212,0.04)',
    chipBg: 'bg-cyan-500/10',
    chipBorder: 'border-cyan-500/30',
  },
  languages: {
    tw: 'text-emerald-500',
    css: '#10b981',
    bgCss: 'rgba(16,185,129,0.04)',
    chipBg: 'bg-emerald-500/10',
    chipBorder: 'border-emerald-500/30',
  },
  design: {
    tw: 'text-amber-500',
    css: '#f59e0b',
    bgCss: 'rgba(245,158,11,0.04)',
    chipBg: 'bg-amber-500/10',
    chipBorder: 'border-amber-500/30',
  },
};

/* Category order for rendering */
const CATEGORY_ORDER = ['soft', 'programming', 'leadership', 'specialized', 'languages', 'design'] as const;
const CATEGORY_COUNTS: Record<string, number> = {
  soft: 5,
  programming: 11,
  leadership: 4,
  specialized: 4,
  languages: 2,
  design: 3,
};

/* ─── Skill Chip ───────────────────────────────────────────── */
function SkillChip({
  name,
  iconKey,
  catKey,
  onEnter,
  onLeave,
}: {
  name: string;
  iconKey: string;
  catKey: string;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const icon = iconMap[iconKey];
  const c = categoryColors[catKey] || categoryColors.programming;

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-glass/40 px-5 py-3.5 cursor-pointer select-none"
      onMouseEnter={() => { setHovered(true); onEnter(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      data-magnetic
    >
      {/* Chip bg tint */}
      <motion.div
        className={`absolute inset-0 ${c.chipBg} pointer-events-none rounded-2xl`}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className={`absolute inset-0 rounded-2xl border-2 ${c.chipBorder} pointer-events-none`}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      <div className="relative z-10 flex items-center gap-2.5">
        {icon && (
          <span className={`text-base transition-all duration-300 ${hovered ? c.tw + ' grayscale-0 opacity-100' : 'text-secondary/50 grayscale opacity-60'}`}>
            {icon}
          </span>
        )}
        <span className={`text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${hovered ? 'text-primary' : 'text-primary/75'}`}>
          {name}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Category Block ───────────────────────────────────────── */
function CategoryBlock({
  title,
  items,
  catKey,
  delay,
  onSkillEnter,
  onSkillLeave,
}: {
  title: string;
  items: { name: string; icon: string }[];
  catKey: string;
  delay: number;
  onSkillEnter: (iconKey: string, catKey: string) => void;
  onSkillLeave: () => void;
}) {
  const c = categoryColors[catKey] || categoryColors.programming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="mb-10"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <span className={`h-px flex-1 max-w-12 ${c.tw} opacity-50`} style={{ background: 'currentColor' }} />
        <h3 className={`text-xs font-bold uppercase tracking-[0.3em] ${c.tw}`}>
          {title}
        </h3>
        <span className={`h-px flex-1 ${c.tw} opacity-15`} style={{ background: 'currentColor' }} />
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2.5 md:gap-3">
        {items.map((item, i) => (
          <SkillChip
            key={`${catKey}-${i}`}
            name={item.name}
            iconKey={item.icon}
            catKey={catKey}
            onEnter={() => onSkillEnter(item.icon, catKey)}
            onLeave={onSkillLeave}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Large Side Icon ──────────────────────────────────────── */
function SideIcon({ iconKey, catKey }: { iconKey: string; catKey: string }) {
  const icon = iconMap[iconKey];
  const c = categoryColors[catKey];
  if (!icon) return null;

  return (
    <motion.div
      className="fixed left-0 top-1/2 pointer-events-none"
      style={{ zIndex: 0 }}
      initial={{ opacity: 0, x: '-100%', y: '-50%', scale: 0.8 }}
      animate={{ opacity: 1, x: '-50%', y: '-50%', scale: 1 }}
      exit={{ opacity: 0, x: '-100%', y: '-50%', scale: 0.8 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative rounded-full"
        style={{
          width: '80vh',
          height: '80vh',
          maxWidth: '800px',
          maxHeight: '800px',
          background: `radial-gradient(circle at center, ${c.css}33 0%, ${c.css}15 50%, transparent 70%)`,
        }}
      >
        <div
          className="absolute"
          style={{
            left: '75%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(12rem, 30vh, 22rem)',
            color: c.css,
            opacity: 0.85,
            filter: `drop-shadow(0px 0px 20px ${c.css}80)`,
          }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════════════ */
export function SkillsSection() {
  const t = useTranslations('skills');
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const [hovered, setHovered] = useState<{ iconKey: string; catKey: string } | null>(null);

  const activeBg = hovered ? categoryColors[hovered.catKey]?.bgCss : 'transparent';

  /* Parse experiences */
  const experiences = Array.from({ length: 6 }).map((_, i) => t(`experiences.${i}`));

  /* Parse categories */
  const categories = CATEGORY_ORDER.map((key) => ({
    key,
    title: t(`categories.${key}.title`),
    items: Array.from({ length: CATEGORY_COUNTS[key] }).map((_, i) => ({
      name: t(`categories.${key}.items.${i}.name`),
      icon: t(`categories.${key}.items.${i}.icon`),
    })),
  }));

  return (
    <section
      id="skills"
      className="relative flex flex-col justify-center overflow-hidden py-32 transition-colors duration-700"
      style={{ backgroundColor: activeBg }}
    >
      {/* ── Large side background icon ──────────────────────── */}
      <AnimatePresence mode="wait">
        {hovered && (
          <SideIcon key={hovered.iconKey} iconKey={hovered.iconKey} catKey={hovered.catKey} />
        )}
      </AnimatePresence>

      {/* ── Section Header ──────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 lg:px-24 mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-secondary"
        >
          {t('label')}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-5xl font-bold text-primary md:text-7xl mb-16"
        >
          {t('title')}
        </motion.h2>

        {/* Category blocks */}
        {categories.map((cat, i) => (
          <CategoryBlock
            key={cat.key}
            title={cat.title}
            items={cat.items}
            catKey={cat.key}
            delay={i * 0.12}
            onSkillEnter={(icon, ck) => setHovered({ iconKey: icon, catKey: ck })}
            onSkillLeave={() => setHovered(null)}
          />
        ))}
      </div>

      {/* ── Experiences Accordion ───────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 lg:px-24 mb-32">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 font-heading text-3xl font-bold text-primary md:text-5xl"
        >
          {t('experiencesTitle')}
        </motion.h3>
        <div className="flex flex-col border-t border-glass/30" onMouseLeave={() => setHoveredExp(null)}>
          {experiences.map((exp, i) => {
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
                className={`group relative flex cursor-pointer items-center justify-between border-b border-glass/30 py-8 md:py-12 transition-all duration-500 ${
                  isOtherHovered ? 'opacity-30 blur-[2px] scale-[0.98]' : 'opacity-100 scale-100'
                }`}
                data-magnetic
              >
                <div className="flex items-center gap-6 md:gap-12 transition-transform duration-500 group-hover:translate-x-6">
                  <span className="font-mono text-xl md:text-2xl text-accent/50 group-hover:text-accent transition-colors">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading text-2xl md:text-4xl lg:text-5xl font-semibold text-primary transition-colors">
                    {exp}
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
