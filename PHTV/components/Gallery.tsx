import React from 'react';
import { Icons } from './Icons';

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 max-w-7xl mx-auto px-6">
       <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-400 font-bold mb-4 uppercase tracking-wider text-sm">
            <Icons.Layers size={16} />
            <span>Giao diện</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Screenshots
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
             Giao diện trực quan, tinh tế và dễ sử dụng.
          </p>
       </div>

       <div className="space-y-16">
          {/* Menu Bar Images */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-brand-500 rounded-full"></span>
              Menu Bar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative">
                 <div className="absolute inset-0 bg-brand-500/10 rounded-2xl blur-xl group-hover:bg-brand-500/20 transition-all"></div>
                 <img 
                    src="https://raw.githubusercontent.com/PhamHungTien/PHTV/main/PHTV/Resources/UI/menu-input-methods.png" 
                    alt="Menu Input Methods" 
                    className="relative rounded-xl border border-slate-700 shadow-2xl w-full"
                 />
                 <p className="text-center text-slate-500 mt-2 text-sm italic">Các kiểu gõ trên menu bar</p>
              </div>
              <div className="group relative">
                 <div className="absolute inset-0 bg-brand-500/10 rounded-2xl blur-xl group-hover:bg-brand-500/20 transition-all"></div>
                 <img 
                    src="https://raw.githubusercontent.com/PhamHungTien/PHTV/main/PHTV/Resources/UI/menu-charset.png" 
                    alt="Menu Charset" 
                    className="relative rounded-xl border border-slate-700 shadow-2xl w-full"
                 />
                 <p className="text-center text-slate-500 mt-2 text-sm italic">Các bảng mã trên menu bar</p>
              </div>
            </div>
          </div>

          {/* Picker */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-purple-500 rounded-full"></span>
              Emoji Picker
            </h3>
            <div className="group relative max-w-2xl">
              <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-xl group-hover:bg-purple-500/20 transition-all"></div>
              <img 
                src="./UI/phtv_picker.webp" 
                alt="Emoji Picker" 
                className="relative rounded-xl border border-slate-700 shadow-2xl w-full"
              />
              <p className="text-center text-slate-500 mt-2 text-sm italic">Bộ chọn Emoji tích hợp</p>
            </div>
          </div>

          {/* Settings Images */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
              Cài đặt (Settings)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { src: "https://raw.githubusercontent.com/PhamHungTien/PHTV/main/PHTV/Resources/UI/settings-typing.png", label: "Typing Settings" },
                 { src: "https://raw.githubusercontent.com/PhamHungTien/PHTV/main/PHTV/Resources/UI/settings-macros.png", label: "Macros Settings" },
                 { src: "https://raw.githubusercontent.com/PhamHungTien/PHTV/main/PHTV/Resources/UI/settings-system.png", label: "System Settings" }
               ].map((item, idx) => (
                 <div key={idx} className="group relative">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl group-hover:bg-blue-500/20 transition-all"></div>
                    <img 
                       src={item.src} 
                       alt={item.label} 
                       className="relative rounded-xl border border-slate-700 shadow-2xl w-full"
                    />
                    <p className="text-center text-slate-500 mt-2 text-sm italic">{item.label}</p>
                 </div>
               ))}
            </div>
          </div>
       </div>
    </section>
  );
};