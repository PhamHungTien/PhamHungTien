import React from 'react';
import { Icons } from './Icons';
import { FeatureProps } from '../types';
import { useI18n } from '../i18n';

const FeatureCard: React.FC<FeatureProps> = ({ icon: Icon, title, description, color = 'text-amber-300' }) => (
  <article className="phtv-feature min-w-0 h-full py-5 md:px-6 md:py-6">
    <div className={`phtv-feature-icon mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 ${color}`}>
      <Icon size={22} />
    </div>
    <div className="phtv-feature-copy">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  </article>
);

export const Features: React.FC = () => {
  const { t } = useI18n();

  const allFeatures: FeatureProps[] = [
    {
      icon: Icons.Shield,
      title: t('features.offline_title'),
      description: t('features.offline_desc'),
      color: 'text-amber-300'
    },
    {
      icon: Icons.Zap,
      title: t('features.native_title'),
      description: t('features.native_desc'),
      color: 'text-rose-300'
    },
    {
      icon: Icons.Sparkles,
      title: t('features.smart_title'),
      description: t('features.smart_desc'),
      color: 'text-orange-300'
    },
  ];

  return (
    <section id="features" className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-7 max-w-2xl">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            {t('features.title')}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {t('features.desc')}
          </p>
        </div>

        <div className="phtv-feature-grid grid grid-cols-1 md:grid-cols-3">
          {allFeatures.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
