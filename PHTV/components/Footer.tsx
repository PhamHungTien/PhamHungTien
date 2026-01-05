import React from 'react';
import { Icons } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://raw.githubusercontent.com/PhamHungTien/PHTV/main/PHTV/Resources/icon.png" alt="PHTV Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-xl tracking-tight text-white">PHTV</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Bộ gõ tiếng Việt Precision Hybrid Typing Vietnamese.<br/>
              Mã nguồn mở, miễn phí và tôn trọng quyền riêng tư.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/PhamHungTien/PHTV" className="text-slate-400 hover:text-white transition-colors" title="GitHub">
                <Icons.Github size={24} />
              </a>
              <a href="https://www.facebook.com/phamhungtien1404" className="text-slate-400 hover:text-white transition-colors" title="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-h%C3%B9ng-ti%E1%BA%BFn-a1b405327/" className="text-slate-400 hover:text-white transition-colors" title="LinkedIn">
                <Icons.Linkedin size={24} />
              </a>
              <a href="mailto:hungtien10a7@gmail.com" className="text-slate-400 hover:text-white transition-colors" title="Email">
                <span className="sr-only">Email</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Tài liệu</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/INSTALL.md" className="hover:text-brand-400 transition-colors">Hướng dẫn cài đặt</a></li>
              <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/FAQ.md" className="hover:text-brand-400 transition-colors">FAQ</a></li>
              <li><a href="https://github.com/PhamHungTien/PHTV/releases" className="hover:text-brand-400 transition-colors">Lịch sử phiên bản</a></li>
              <li><a href="https://github.com/PhamHungTien/PHTV/issues" className="hover:text-brand-400 transition-colors">Báo lỗi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Dự án</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/LICENSE" className="hover:text-brand-400 transition-colors">Giấy phép GPL v3</a></li>
              <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/SECURITY.md" className="hover:text-brand-400 transition-colors">Bảo mật</a></li>
              <li><a href="https://github.com/PhamHungTien/PHTV/blob/main/CONTRIBUTING.md" className="hover:text-brand-400 transition-colors">Đóng góp</a></li>
              <li><a href="./donate.html" className="hover:text-brand-400 transition-colors flex items-center gap-1">☕ Ủng hộ <span className="text-xs bg-brand-900 text-brand-300 px-1 rounded">Donate</span></a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Pham Hung Tien. Made with love for Vietnamese macOS users.</p>
        </div>
      </div>
    </footer>
  );
};