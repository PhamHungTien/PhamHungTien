import React from 'react';
import { Icons } from './Icons';

const donateImg = new URL('../src/assets/donate.webp', import.meta.url).href;

export const DonateModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-[#1e293b] border border-slate-700/50 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 ring-1 ring-white/10">
        
        {/* Header Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-brand-600/30 via-purple-600/20 to-pink-600/30 blur-xl pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white/70 hover:text-white rounded-full transition-all z-10 backdrop-blur-md border border-white/5"
        >
          <Icons.X size={20} />
        </button>

        <div className="relative p-8 text-center pt-10">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/30 mb-6 rotate-3 ring-4 ring-[#1e293b]">
                <Icons.Heart className="text-white" size={32} fill="currentColor" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Cảm ơn bạn đã ủng hộ! ❤️</h3>
            <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                Mọi đóng góp của bạn đều là động lực to lớn để mình duy trì server và phát triển tính năng mới cho PHTV.
            </p>

            {/* QR Code Container */}
            <div className="bg-white p-4 rounded-2xl shadow-xl shadow-black/20 mx-auto w-fit mb-8 transform transition-transform hover:scale-105 duration-300 ring-4 ring-white/50">
                <img 
                    src={donateImg} 
                    alt="QR Code Donate" 
                    className="w-48 h-48 object-contain rounded-lg"
                />
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-2">
                   <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">VietQR</span>
                   <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                   <span className="text-xs text-slate-500">Mọi ngân hàng</span>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
                <a 
                    href="https://www.paypal.com/paypalme/phamhungtien1404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 w-full py-3.5 bg-[#0070BA] hover:bg-[#003087] text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 border border-white/10"
                >
                    <Icons.Coffee size={20} />
                    <span>Donate qua PayPal</span>
                </a>
                
                <p className="text-xs text-slate-500 px-4">
                    PHTV luôn miễn phí, donation là tùy tâm và không bắt buộc.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};