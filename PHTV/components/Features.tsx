import React from 'react';
import { Icons } from './Icons';
import { FeatureProps } from '../types';

const FeatureCard: React.FC<FeatureProps> = ({ icon: Icon, title, description, color = 'text-amber-300' }) => (
  <article className="glass-card min-w-0 h-full p-5 md:p-6">
    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 ${color}`}>
      <Icon size={22} />
    </div>
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
  </article>
);

export const Features: React.FC = () => {
  const allFeatures: FeatureProps[] = [
    {
      icon: Icons.Shield,
      title: 'Offline và riêng tư',
      description: 'Xử lý hoàn toàn trên máy, không phụ thuộc dịch vụ bên ngoài cho trải nghiệm gõ tiếng Việt hằng ngày.',
      color: 'text-amber-300'
    },
    {
      icon: Icons.Zap,
      title: 'Nhanh và native',
      description: 'Viết bằng Swift và C/C++, tối ưu cho macOS với hiệu năng ổn định và phản hồi rất nhanh.',
      color: 'text-rose-300'
    },
    {
      icon: Icons.Sparkles,
      title: 'Gõ thông minh',
      description: 'Spell check, quick telex, tự động khôi phục và nhiều tinh chỉnh hữu ích cho người gõ song ngữ.',
      color: 'text-orange-300'
    },
  ];

  return (
    <section id="features" className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-7 max-w-2xl">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Phần cốt lõi của PHTV
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Ba điểm cần biết trước khi cài bộ gõ trên máy Mac.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {allFeatures.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
