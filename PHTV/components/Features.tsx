import React from 'react';
import { Icons } from './Icons';
import { FeatureProps } from '../types';

const FeatureCard: React.FC<FeatureProps> = ({ icon: Icon, title, description, color = 'text-amber-300' }) => (
  <article className="glass-card rounded-[1.75rem] p-6 md:p-7 h-full">
    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] ${color}`}>
      <Icon size={22} />
    </div>
    <h3 className="text-lg font-black tracking-tight text-white">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
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
    {
      icon: Icons.Command,
      title: 'Macro và snippets',
      description: 'Tạo cụm gõ tắt, chèn ngày giờ và nội dung động để tăng tốc các thao tác lặp lại.',
      color: 'text-amber-200'
    },
    {
      icon: Icons.Keyboard,
      title: 'Picker tích hợp',
      description: 'Emoji, GIF và sticker được gom vào một bộ chọn gọn, dễ dùng và đồng nhất với phần còn lại.',
      color: 'text-rose-200'
    },
    {
      icon: Icons.Layers,
      title: 'Tương thích tốt',
      description: 'Hỗ trợ nhiều ứng dụng, nhiều kiểu bàn phím và các tình huống gõ pha tiếng Việt, tiếng Anh.',
      color: 'text-red-300'
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-300/80">Điểm nổi bật</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            Tập trung vào tốc độ, độ chính xác và cảm giác native trên macOS
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-400 md:text-lg">
            Tập trung vào những điểm quan trọng nhất cho trải nghiệm gõ tiếng Việt hằng ngày trên macOS.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {allFeatures.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
