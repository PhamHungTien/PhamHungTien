import React from 'react';
import { Icons } from './Icons';

interface ShortcutItem {
  keys: string[];
  action: string;
  desc: string;
}

export const Shortcuts: React.FC = () => {
  const shortcuts: ShortcutItem[] = [
    { 
      keys: ['⌃', '⇧'], 
      action: 'Chuyển Việt/Anh', 
      desc: 'Phím tắt mặc định để chuyển đổi nhanh giữa hai ngôn ngữ.' 
    },
    { 
      keys: ['ESC'], 
      action: 'Hoàn tác dấu', 
      desc: 'Khôi phục ký tự gốc ngay lập tức khi gõ sai dấu.' 
    },
    { 
      keys: ['⌥'], 
      action: 'Tạm tắt tiếng Việt', 
      desc: 'Nhấn giữ phím Option để gõ tiếng Anh mà không cần chuyển đổi.' 
    },
    { 
      keys: ['⌘', 'E'], 
      action: 'Mở Picker', 
      desc: 'Mở trình chọn Emoji, GIF và Kaomoji tích hợp.' 
    },
  ];

  return (
    <section id="shortcuts" className="py-32 bg-slate-950/20 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Thao tác nhanh</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Tối ưu hóa tốc độ làm việc với các phím tắt được thiết kế chuẩn macOS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shortcuts.map((item, index) => (
            <div 
              key={index} 
              className="glass-panel p-8 rounded-[2rem] hover:bg-white/5 transition-all duration-500 border border-white/5 hover:border-brand-500/20 flex flex-col justify-between group"
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">{item.action}</h3>
                  <Icons.Zap size={20} className="text-slate-600 group-hover:text-yellow-500 transition-all group-hover:scale-110" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {item.keys.map((key, i) => (
                  <React.Fragment key={i}>
                    <kbd className="min-w-[44px] h-11 px-3 flex items-center justify-center bg-slate-900 border border-white/10 rounded-xl text-white font-sans text-xl font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.3)] group-hover:shadow-[0_2px_0_0_rgba(0,0,0,0.3)] group-hover:translate-y-[2px] transition-all">
                      {key}
                    </kbd>
                    {i < item.keys.length - 1 && <span className="text-slate-600 font-bold">+</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};