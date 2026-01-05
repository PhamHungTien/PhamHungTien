import React from 'react';
import { Icons } from './Icons';
import { FeatureProps } from '../types';

const FeatureCard: React.FC<FeatureProps> = ({ icon: Icon, title, description, color = "text-brand-400" }) => (
  <div className="glass-panel p-6 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 border border-slate-800 hover:border-brand-500/30 group h-full">
    <div className={`w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${color}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </div>
);

export const Features: React.FC = () => {
  const coreFeatures: FeatureProps[] = [
    {
      icon: Icons.Shield,
      title: "Core & Riêng tư",
      description: "Hoàn toàn offline, không cần Internet. Bảo mật tuyệt đối. Hỗ trợ Telex, VNI, Simple Telex và nhiều bảng mã (Unicode, TCVN3, VNI Windows).",
      color: "text-green-400"
    },
    {
      icon: Icons.Zap,
      title: "Swift Native",
      description: "Viết bằng Swift 6.0 & SwiftUI. Giao diện hiện đại, hỗ trợ Dark Mode và tối ưu cho macOS.",
      color: "text-yellow-400"
    },
    {
      icon: Icons.Sparkles,
      title: "Gõ Thông Minh",
      description: "Kiểm tra chính tả, hỗ trợ 'oà, uý', Quick Telex (cc=ch, kk=kh), phụ âm đầu/cuối nhanh (f=ph, j=gi), tự động viết hoa.",
      color: "text-purple-400"
    }
  ];

  const advancedFeatures: FeatureProps[] = [
    {
      icon: Icons.Command,
      title: "Macro & Snippets",
      description: "Gõ tắt thông minh (btw → by the way). Text Snippets động (ngày giờ, clipboard). Tự động viết hoa macro.",
      color: "text-pink-400"
    },
    {
      icon: Icons.Keyboard,
      title: "Emoji & GIF Picker",
      description: "Giao diện Liquid Glass. 1,463 Emoji từ Unicode v17.0. Tích hợp GIF không giới hạn. Auto-paste vào mọi ứng dụng.",
      color: "text-orange-400"
    },
    {
      icon: Icons.Layers,
      title: "Tương thích cao",
      description: "Hỗ trợ Dvorak/Colemak. Claude Code Fix. Safe Mode. Tự động chuyển về English khi dùng bàn phím Nhật, Hàn, Trung.",
      color: "text-blue-400"
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-brand-900/20 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Tính năng nổi bật
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
             Trải nghiệm gõ tiếng Việt mượt mà, ổn định và chuẩn macOS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {coreFeatures.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advancedFeatures.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};