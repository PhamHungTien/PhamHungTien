import React from 'react';
import { Icons } from './Icons';
import { FeatureProps } from '../types';

const FeatureCard: React.FC<FeatureProps> = ({ icon: Icon, title, description, color = "text-brand-400" }) => (
  <div className="glass-panel p-8 rounded-[2rem] hover:bg-white/5 transition-all duration-500 border border-white/5 hover:border-brand-500/20 group h-full flex flex-col relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none ${color}`}>
      <Icon size={120} strokeWidth={1} />
    </div>
    
    <div className={`w-14 h-14 rounded-2xl bg-slate-900/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5 ${color} shadow-lg`}>
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-extrabold text-white mb-4 tracking-tight group-hover:text-brand-400 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm font-medium">{description}</p>
  </div>
);

export const Features: React.FC = () => {
  const allFeatures: FeatureProps[] = [
    {
      icon: Icons.Shield,
      title: "Core & Riêng tư",
      description: "Hoàn toàn offline, không cần Internet. Bảo mật tuyệt đối. Hỗ trợ Telex, VNI, Simple Telex và nhiều bảng mã chuyên dụng.",
      color: "text-rose-400"
    },
    {
      icon: Icons.Zap,
      title: "Swift Native",
      description: "Viết bằng Swift 6.0 & SwiftUI. Tối ưu hóa hiệu năng cực cao, tiết kiệm pin và hỗ trợ Native Dark Mode chuẩn macOS.",
      color: "text-red-400"
    },
    {
      icon: Icons.Sparkles,
      title: "Gõ Thông Minh",
      description: "Kiểm tra chính tả thông minh, hỗ trợ Quick Telex (cc=ch, kk=kh), tự động viết hoa và sửa lỗi gõ sai thông dụng.",
      color: "text-pink-400"
    },
    {
      icon: Icons.Command,
      title: "Macro & Snippets",
      description: "Gõ tắt thông minh (btw → by the way). Hỗ trợ Text Snippets động với ngày giờ, clipboard và biến tự định nghĩa.",
      color: "text-rose-500"
    },
    {
      icon: Icons.Keyboard,
      title: "Emoji & GIF Picker",
      description: "Giao diện Liquid Glass tuyệt đẹp. Tìm kiếm nhanh hơn 1,400 emoji. Tích hợp GIF Klipy không giới hạn.",
      color: "text-red-500"
    },
    {
      icon: Icons.Layers,
      title: "Tương thích cao",
      description: "Hỗ trợ bàn phím vật lý Dvorak/Colemak. Tự động chuyển đổi ngôn ngữ khi phát hiện các ứng dụng đặc biệt.",
      color: "text-pink-500"
    }
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-900/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 tracking-tight">
            Sức mạnh vượt trội
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
             Sự kết hợp hoàn hảo giữa công nghệ hiện đại và trải nghiệm người dùng bản địa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFeatures.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};