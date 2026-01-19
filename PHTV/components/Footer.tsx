import React from 'react';
import { Icons } from './Icons';

const iconImg = '/PHTV/phtv-icon.webp';

interface FooterProps {
  onDonateClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDonateClick }) => {
  return (
    <footer className="relative border-t border-white/5 bg-[#020617] pt-24 pb-12 overflow-hidden transition-colors duration-500">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand-900/10 blur-[120px] -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <img src={iconImg} alt="PHTV Logo" className="w-12 h-12 object-contain" />
              <span className="font-black text-3xl tracking-tighter text-white">PHTV</span>
            </div>
            <p className="text-slate-400 mb-8 max-w-md leading-relaxed text-lg font-medium">
              Precision Hybrid Typing Vietnamese.<br/>
              Bộ gõ tiếng Việt hiện đại, mã nguồn mở và bảo mật tuyệt đối cho macOS.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Icons.Github, href: "https://github.com/PhamHungTien/PHTV", label: "GitHub" },
                { icon: Icons.Linkedin, href: "https://www.linkedin.com/in/ph%E1%BA%A1m-h%C3%B9ng-ti%E1%BA%BFn-a1b405327/", label: "LinkedIn" },
                { icon: () => (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.946-2.419 2.157-2.419 1.21 0 2.175 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                ), href: "https://discord.gg/hm2C4tbaDz", label: "Discord" },
                { icon: () => (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                ), href: "https://www.facebook.com/PHTVInput/", label: "Facebook" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all shadow-none" 
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
              <a
                href="mailto:phamhungtien.contact@gmail.com"
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all shadow-none"
                title="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Tài liệu</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/INSTALL.md" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">Hướng dẫn cài đặt</a></li>
                <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/FAQ.md" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">Câu hỏi thường gặp</a></li>
                <li><a href="https://discord.gg/hm2C4tbaDz" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">Discord Báo lỗi</a></li>
                <li><a href="https://github.com/PhamHungTien/PHTV/releases" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">Lịch sử phiên bản</a></li>
                <li><a href="https://github.com/PhamHungTien/PHTV/issues" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">GitHub Issues</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Dự án</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">Giấy phép GPL v3</a></li>
                <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">Chính sách bảo mật</a></li>
                <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">Đóng góp mã nguồn</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Hỗ trợ</h4>
              <button 
                onClick={onDonateClick} 
                className="group flex items-center gap-3 px-5 py-3 bg-brand-600/10 hover:bg-brand-600/20 text-brand-400 rounded-xl transition-all font-bold text-sm"
              >
                <Icons.Coffee size={18} className="group-hover:animate-bounce" />
                Mua cho mình cafe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Pham Hung Tien. Designed for macOS enthusiasts.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};