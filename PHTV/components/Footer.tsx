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
              <img src={iconImg} alt="PHTV Logo" className="w-12 h-12 rounded-2xl shadow-xl" />
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                ), href: "https://www.facebook.com/PHTVInput/", label: "Facebook" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-none" 
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
              <a
                href="mailto:phamhungtien.contact@gmail.com"
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-none"
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
                <li><a href="https://github.com/PhamHungTien/PHTV/releases" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">Lịch sử phiên bản</a></li>
                <li><a href="https://github.com/PhamHungTien/PHTV/issues" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors">Báo lỗi</a></li>
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
                className="group flex items-center gap-3 px-5 py-3 bg-brand-600/10 hover:bg-brand-600/20 text-brand-400 rounded-xl transition-all border border-brand-500/20 font-bold text-sm"
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