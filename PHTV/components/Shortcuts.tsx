import React from 'react';

interface ShortcutItem {
  keys: string[];
  action: string;
  desc: string;
}

export const Shortcuts: React.FC = () => {
  const shortcuts: ShortcutItem[] = [
    { keys: ['⌃', '⇧'], action: 'Chuyển Việt/Anh', desc: 'Phím mặc định để đổi nhanh ngôn ngữ.' },
    { keys: ['ESC'], action: 'Hoàn tác dấu', desc: 'Khôi phục lại ký tự gốc khi cần.' },
    { keys: ['⌥'], action: 'Tạm tắt tiếng Việt', desc: 'Giữ Option để gõ tiếng Anh tạm thời.' },
    { keys: ['⌘', 'E'], action: 'Mở Picker', desc: 'Mở emoji, GIF và sticker ngay lập tức.' },
  ];

  return (
    <section id="shortcuts" className="border-y border-white/6 bg-black/10 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-300/80">Thao tác nhanh</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">Những phím tắt chính để bắt đầu</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            Những thao tác cơ bản nhất để bắt đầu nhanh và không bị gián đoạn khi đang gõ.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {shortcuts.map((item, index) => (
            <div key={index} className="glass-card rounded-[1.5rem] p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-2">
                {item.keys.map((key, i) => (
                  <React.Fragment key={i}>
                    <kbd className="flex h-11 min-w-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 text-lg font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      {key}
                    </kbd>
                    {i < item.keys.length - 1 && <span className="text-slate-500">+</span>}
                  </React.Fragment>
                ))}
              </div>
              <h3 className="mt-5 text-lg font-black tracking-tight text-white">{item.action}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
