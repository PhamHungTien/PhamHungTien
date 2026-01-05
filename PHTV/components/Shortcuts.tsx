import React from 'react';
import { Icons } from './Icons';

export const Shortcuts: React.FC = () => {
  const shortcuts = [
    { key: 'Control + Shift', action: 'Chuyển Việt/Anh (tùy chỉnh được)' },
    { key: 'ESC', action: 'Khôi phục ký tự gốc (hoàn tác dấu)' },
    { key: 'Giữ Option', action: 'Tạm tắt tiếng Việt (tùy chỉnh được)' },
  ];

  return (
    <section id="shortcuts" className="py-24 bg-slate-900/30 border-y border-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Phím tắt mặc định</h2>
          <p className="text-slate-400">Các phím tắt cơ bản giúp bạn thao tác nhanh hơn.</p>
        </div>

        <div className="grid gap-4">
          {shortcuts.map((item, index) => (
            <div 
              key={index} 
              className="group flex items-center justify-between p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 group-hover:text-brand-400 transition-colors">
                  <Icons.Keyboard size={20} />
                </div>
                <span className="text-slate-200 font-medium text-lg">{item.action}</span>
              </div>
              <code className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-brand-400 font-mono text-base font-bold shadow-sm min-w-[120px] text-center">
                {item.key}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};