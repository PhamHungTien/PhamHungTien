import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Features } from './components/Features';
import { TerminalBlock } from './components/TerminalBlock';
import { Shortcuts } from './components/Shortcuts';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { Icons } from './components/Icons';

const CopyBlock = ({ code, className = "", colorClass = "text-slate-300" }: { code: string, className?: string, colorClass?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group bg-black/50 rounded-lg border border-white/5 ${className}`}>
      <div className={`p-3 pr-10 font-mono text-sm break-all ${colorClass}`}>
        {code}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Sao chép"
      >
        {copied ? <Icons.Check size={14} className="text-green-400" /> : <Icons.Copy size={14} />}
      </button>
    </div>
  );
};

const CommandRow = ({ icon: Icon, label, code, color }: { icon: any, label: string, code: string, color: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-600 rounded-lg transition-all duration-200">
      <div className="flex items-center gap-3 min-w-fit">
        <div className={`p-2 rounded-md bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
          <Icon size={16} className={color} />
        </div>
        <span className="text-sm font-medium text-slate-300">{label}</span>
      </div>
      
      <div className="relative flex-1 min-w-0 w-full">
        <code className="block w-full px-3 py-2 pr-9 bg-black/40 border border-slate-800 rounded text-xs font-mono text-slate-400 break-all">
          {code}
        </code>
        <button 
          onClick={handleCopy}
          className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded transition-colors z-10"
          title="Sao chép lệnh"
        >
          {copied ? <Icons.Check size={14} className="text-green-500" /> : <Icons.Copy size={14} />}
        </button>
      </div>
    </div>
  );
};

interface StatBadgeProps {
  icon: any;
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
  colorClass?: string;
}

const StatBadge = ({ icon: Icon, label, value, href, onClick, colorClass = "text-slate-300" }: StatBadgeProps) => {
  const content = (
    <>
      <div className={`p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${colorClass}`}>
        <Icon size={18} />
      </div>
      <div className="flex flex-col items-start leading-none gap-1">
        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 group-hover:text-slate-400 transition-colors">{label}</span>
        <span className="text-base font-bold text-slate-200 group-hover:text-white transition-colors">{value}</span>
      </div>
    </>
  );

  const className = "flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/80 transition-all duration-300 group hover:-translate-y-0.5 cursor-pointer";

  if (onClick) {
    return (
      <button onClick={onClick} className={className} type="button">
        {content}
      </button>
    );
  }

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
};

// Donate Modal Component
const DonateModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
                    src="https://phamhungtien.com/PHTV/donate.webp" 
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

// Helper component for the Hero Acronym
const AcronymRow = ({ letter, word }: { letter: string, word: string }) => (
  <div className="flex items-baseline group/row cursor-default select-none relative">
    {/* Fixed Width Container for Letter */}
    {/* Mobile w-8, Desktop w-16 */}
    <div className="w-8 sm:w-12 md:w-16 flex justify-center shrink-0">
        <span className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 leading-none drop-shadow-[0_0_12px_rgba(239,68,68,0.6)] group-hover/row:scale-110 group-hover/row:brightness-125 transition-all duration-300 z-10">
        {letter}
        </span>
    </div>
    
    {/* Word text: Pure White, brighter glow */}
    <span className="text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-white group-hover/row:text-white group-hover/row:tracking-[0.25em] group-hover/row:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] transition-all duration-500 ease-out text-left pl-3 md:pl-5">
      {word}
    </span>
  </div>
);

function App() {
  const [downloadUrl, setDownloadUrl] = useState("https://github.com/PhamHungTien/PHTV/releases/latest");
  const [version, setVersion] = useState("v1.0.0");
  const [totalDownloads, setTotalDownloads] = useState("0");
  const [showDonate, setShowDonate] = useState(false);

  useEffect(() => {
    // Caching logic
    const CACHE_KEY = 'phtv_releases_data_v2';
    const CACHE_DURATION = 3600000; // 1 hour

    const fetchReleases = async () => {
      const now = Date.now();
      
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { url, version: cachedVer, downloads, timestamp } = JSON.parse(cached);
          if (now - timestamp < CACHE_DURATION) {
            setDownloadUrl(url);
            setVersion(cachedVer);
            setTotalDownloads(downloads);
            return;
          }
        }
      } catch (e) {
        localStorage.removeItem(CACHE_KEY);
      }

      try {
        // Increase per_page to 100 to get a more accurate download count
        const res = await fetch('https://api.github.com/repos/PhamHungTien/PHTV/releases?per_page=100');
        if (!res.ok) throw new Error('Network error');

        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const latest = data[0]; // Assuming API returns sorted desc
          const latestVer = latest.tag_name;
          const dmgAsset = latest.assets?.find((asset: any) => asset.name.endsWith('.dmg'));
          const url = dmgAsset ? dmgAsset.browser_download_url : "https://github.com/PhamHungTien/PHTV/releases/latest";

          // Calculate total downloads
          let dlCount = 0;
          data.forEach((rel: any) => {
            if (rel.assets) {
              rel.assets.forEach((asset: any) => {
                dlCount += asset.download_count;
              });
            }
          });
          
          // Better formatting
          const formattedDownloads = new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
          }).format(dlCount);

          setVersion(latestVer);
          setDownloadUrl(url);
          setTotalDownloads(formattedDownloads);

          localStorage.setItem(CACHE_KEY, JSON.stringify({
            url,
            version: latestVer,
            downloads: formattedDownloads,
            timestamp: now
          }));
        }
      } catch (err) {
        console.error("Failed to fetch GitHub data", err);
      }
    };

    fetchReleases();
  }, []);

  const faqData = [
    {
      category: "Cài đặt & Cấu hình",
      items: [
        {
          q: "PHTV có tương thích với phiên bản macOS nào?",
          a: "PHTV hỗ trợ macOS 13.0+ (Ventura trở lên). Universal Binary - hoạt động trên cả Intel và Apple Silicon (M1/M2/M3/M4/...). Tương thích với mọi Mac chạy macOS 13.0+."
        },
        {
          q: "Cách nào dễ nhất để cài đặt PHTV?",
          a: (
            <div>
              <p className="mb-2">Dùng Homebrew (khuyến khích):</p>
              <CopyBlock code="brew install --cask phamhungtien/tap/phtv" className="mb-3" colorClass="text-brand-300" />
              
              <p className="mb-2 text-sm text-slate-300 font-semibold">Lệnh quản lý:</p>
              <div className="space-y-2 mb-3">
                 <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Cập nhật:</span>
                    <CopyBlock code="brew upgrade --cask phtv" />
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Gỡ cài đặt:</span>
                    <CopyBlock code="brew uninstall --cask phtv" />
                 </div>
              </div>

              <p className="text-sm">Hoặc tải trực tiếp từ <a href="https://phamhungtien.com/PHTV/" className="text-brand-400 hover:underline">phamhungtien.com/PHTV</a> hoặc <a href="https://github.com/PhamHungTien/PHTV/releases" className="text-brand-400 hover:underline">GitHub Releases</a>.</p>
            </div>
          )
        },
        {
          q: "Làm sao để chuyển đổi giữa tiếng Anh và tiếng Việt?",
          a: "Nhấn phím tắt được cấu hình (mặc định Ctrl + Shift). Hoặc click vào Status Bar icon để chọn ngôn ngữ."
        },
        {
          q: "Phương pháp gõ nào phù hợp nhất?",
          a: (
             <ul className="list-disc list-inside space-y-1">
               <li><strong>Telex</strong>: Phổ biến, dễ học (ơ=ow, ư=uw, â=aa, v.v.)</li>
               <li><strong>VNI</strong>: Gõ bằng số (1-9 cho các dấu)</li>
               <li><strong>Simple Telex 1/2</strong>: Biến thể đơn giản của Telex. Hãy thử từng cái để tìm phù hợp nhất!</li>
             </ul>
          )
        },
        {
          q: "Sử dụng font nào để xem tiếng Việt đúng nhất?",
          a: (
             <ul className="list-disc list-inside space-y-1">
               <li><strong>Unicode</strong>: Mọi font hiện đại (khuyến khích)</li>
               <li><strong>TCVN3</strong>: Các font cũ hơn</li>
               <li><strong>VNI Windows</strong>: Nếu dùng các app cũ</li>
             </ul>
          )
        }
      ]
    },
    {
      category: "Sử dụng",
      items: [
        {
          q: "Làm sao để tắt PHTV cho một ứng dụng cụ thể?",
          a: (
            <ol className="list-decimal list-inside space-y-1">
              <li>Mở Settings → Ứng dụng → Excluded Apps</li>
              <li>Nhấn "+" và chọn ứng dụng</li>
              <li>Khi sử dụng app đó, PHTV sẽ tự động tắt</li>
            </ol>
          )
        },
        {
          q: "Macro (gõ tắt) hoạt động như thế nào?",
          a: (
            <div>
              <ol className="list-decimal list-inside space-y-1 mb-2">
                <li>Settings → Gõ tắt → "+"</li>
                <li>Nhập từ viết tắt (VD: "tks") và nội dung (VD: "cảm ơn")</li>
                <li>Khi gõ "tks" + Space, tự động thay thế bằng "cảm ơn"</li>
              </ol>
              <p className="mb-1 text-sm font-semibold">Text Snippets hỗ trợ nội dung động:</p>
              <ul className="list-disc list-inside text-sm text-slate-400 grid grid-cols-1 md:grid-cols-2 gap-1">
                <li><code>{`{date}`}</code> - Ngày hiện tại</li>
                <li><code>{`{time}`}</code> - Giờ hiện tại</li>
                <li><code>{`{clipboard}`}</code> - Nội dung clipboard</li>
                <li><code>{`{random:A,B,C}`}</code> - Random từ danh sách</li>
                <li><code>{`{counter}`}</code> - Số tự động tăng</li>
              </ul>
            </div>
          )
        },
        {
          q: "Có thể bỏ dấu khi gõ không?",
          a: "Có! Gõ bình thường mà không cần phím dấu. Ví dụ: ao → ào, áo, ảo, v.v. (gõ thêm phím để thêm dấu)"
        },
        {
          q: "Làm sao để reset cài đặt về mặc định?",
          a: (
            <div>
               <p className="mb-2">Chạy lệnh sau trong Terminal:</p>
               <CopyBlock code="defaults delete com.phtv.app" className="mb-2" />
               <p>Hoặc trong Settings → Reset All (nếu có button này).</p>
            </div>
          )
        }
      ]
    },
    {
       category: "Tính năng & Hiệu năng",
       items: [
         {
           q: "PHTV tiêu thụ bao nhiêu tài nguyên?",
           a: (
             <ul className="list-disc list-inside space-y-1">
               <li><strong>CPU</strong>: &lt; 1% khi không dùng</li>
               <li><strong>Memory</strong>: ~30-50 MB</li>
               <li><strong>Disk</strong>: ~50 MB</li>
             </ul>
           )
         },
         {
           q: "Có thể tùy chỉnh phím tắt được không?",
           a: (
             <div>
               <p>Có! Settings → Phím tắt</p>
               <ul className="list-disc list-inside space-y-1 text-sm mt-1 text-slate-400">
                 <li>Thay đổi phím chuyển ngôn ngữ (Ctrl, Option, Cmd, Shift)</li>
                 <li>Tạm tắt tiếng Việt (giữ phím)</li>
                 <li>PHTV Picker hotkey (mặc định Cmd+E)</li>
               </ul>
             </div>
           )
         },
         {
           q: "Ngoài tiếng Việt, có hỗ trợ ngôn ngữ khác không?",
           a: "Hiện tại chỉ hỗ trợ tiếng Việt. Tiếng Anh là ngôn ngữ mặc định của hệ thống."
         },
         {
           q: "Spell checking hoạt động như thế nào?",
           a: (
             <div>
               <p>PHTV có từ điển tiếng Việt tích hợp:</p>
               <ul className="list-disc list-inside space-y-1 text-sm mt-1 text-slate-400">
                 <li>Tự động kiểm tra chính tả</li>
                 <li>Gợi ý từ sai (khi bật tính năng này)</li>
                 <li>Hỗ trợ cả từ địa phương</li>
               </ul>
             </div>
           )
         }
       ]
    },
    {
      category: "GIF & Emoji Picker",
      items: [
        {
          q: "Làm sao để mở GIF/Emoji picker?",
          a: "Nhấn phím tắt Cmd+E (mặc định) hoặc click vào menu bar icon → \"Emoji & GIF Picker\"."
        },
        {
          q: "GIF picker có miễn phí không?",
          a: "Có! Hoàn toàn miễn phí nhờ quảng cáo từ Klipy. Không giới hạn số lượng GIF."
        },
        {
          q: "Tại sao GIF không paste được vào Zalo/Messenger?",
          a: "PHTV phiên bản mới nhất đã hỗ trợ multi-format clipboard. Đảm bảo bạn đang dùng phiên bản mới nhất. Nếu vẫn gặp lỗi, đợi 0.2 giây sau khi click GIF để PHTV có thời gian copy vào clipboard."
        },
        {
          q: "Emoji picker có hỗ trợ tìm kiếm không?",
          a: "Có! PHTV Picker có 1,463 emoji từ Unicode v17.0 (2024). Gõ tên emoji bằng tiếng Anh hoặc tiếng Việt để tìm kiếm nhanh. Con trỏ tự động focus vào ô tìm kiếm khi mở."
        },
        {
          q: "GIF có hoạt động offline không?",
          a: "Không. GIF picker cần Internet để tải GIF từ Klipy API. Emoji picker hoạt động offline."
        }
      ]
    },
    {
      category: "Bảo mật & Quyền riêng tư",
      items: [
        {
          q: "PHTV có gửi dữ liệu lên Internet không?",
          a: "PHTV hoàn toàn offline và không thu thập dữ liệu cá nhân. GIF picker cần Internet để tải GIF từ Klipy API."
        },
        {
          q: "Dữ liệu được lưu ở đâu?",
          a: (
            <ul className="list-disc list-inside space-y-1">
               <li>Settings: <code>~/Library/Preferences/com.phtv.app.plist</code></li>
               <li>Macros: <code>~/Library/Application Support/PHTV/</code></li>
            </ul>
          )
        },
        {
          q: "Tại sao PHTV cần quyền Accessibility?",
          a: "Để giám sát phím gõ, chuyển ngôn ngữ, hoạt động trên mọi ứng dụng. Yêu cầu chuẩn của macOS."
        }
      ]
    },
    {
      category: "Khắc phục sự cố & Phát triển",
      items: [
        {
          q: "Không mở được ứng dụng sau khi tải về?",
          a: (
            <div>
              <p className="mb-2">Nếu macOS báo lỗi <strong>"PHTV is damaged"</strong> hoặc <strong>"can't be opened"</strong>:</p>
              <ol className="list-decimal list-inside space-y-1 mb-2">
                <li>Mở <strong>Terminal</strong></li>
                <li>
                  Copy và chạy lệnh:
                  <CopyBlock code="xattr -cr /Applications/PHTV.app" className="my-2" colorClass="text-yellow-400" />
                </li>
                <li>Mở lại PHTV</li>
              </ol>
              <p className="text-sm italic text-slate-500">Giải thích: Lệnh này xóa thuộc tính quarantine mà macOS Gatekeeper gán cho file tải từ Internet.</p>
            </div>
          )
        },
        {
          q: "PHTV không hoạt động?",
          a: (
             <ol className="list-decimal list-inside space-y-1">
               <li>Kiểm tra quyền Accessibility</li>
               <li>Tắt/bật lại PHTV</li>
               <li>Restart ứng dụng gặp lỗi</li>
               <li>Tạo issue trên GitHub</li>
             </ol>
          )
        },
        {
           q: "Phím tắt không hoạt động?",
           a: (
             <ol className="list-decimal list-inside space-y-1">
               <li>Kiểm tra Settings → Keyboard Shortcuts</li>
               <li>Kiểm tra System Preferences → Keyboard → Shortcuts</li>
               <li>Tìm xung đột với ứng dụng khác</li>
             </ol>
           )
        },
        {
           q: "Tiếng Việt gõ ra sai?",
           a: "Kiểm tra Input Method (Telex/VNI) và Character Set (Unicode/TCVN3)."
        },
        {
          q: "Làm sao để đóng góp?",
          a: <span>Xem <a href="https://github.com/PhamHungTien/PHTV/blob/main/CONTRIBUTING.md" className="text-brand-400 hover:underline">CONTRIBUTING.md</a> - Fork, tạo branch, commit, PR.</span>
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen mesh-gradient text-white selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <main className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          {/* New Logo & Name Lockup */}
          {/* items-center is crucial here for vertical alignment */}
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 mb-10 md:mb-20">
            
            {/* Left: Icon with glow */}
            {/* Adjusted sizes: w-28 mobile (112px), w-40 tablet (160px), w-60 desktop (240px) */}
            <div className="relative group shrink-0 w-28 h-28 sm:w-40 sm:h-40 md:w-60 md:h-60">
               <div className="absolute inset-0 bg-red-500/20 blur-[30px] md:blur-[50px] rounded-full group-hover:bg-red-500/30 transition-all duration-700 animate-pulse"></div>
               <img 
                 src="https://raw.githubusercontent.com/PhamHungTien/PHTV/main/PHTV/Resources/icon.png" 
                 alt="PHTV Icon" 
                 className="relative w-full h-full drop-shadow-2xl rounded-[1.5rem] md:rounded-[2.5rem] transform group-hover:scale-105 transition-transform duration-500 ease-out z-10 object-cover" 
               />
            </div>

            {/* Right: Vertical Typography */}
            {/* No fixed heights, justify-center allows natural centering against the icon */}
            <div className="flex flex-col justify-center">
               <AcronymRow letter="P" word="recision" />
               <AcronymRow letter="H" word="ybrid" />
               <AcronymRow letter="T" word="yping" />
               <AcronymRow letter="V" word="ietnamese" />
            </div>

          </div>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bộ gõ tiếng Việt <strong>offline</strong>, <strong>nhanh</strong>, và <strong>riêng tư</strong> cho macOS 13+. <br/>
            Được phát triển bằng Swift/SwiftUI native tối ưu cho macOS.
          </p>

          {/* Status Badges - Redesigned to be native UI components */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-4xl mx-auto">
             <StatBadge 
               icon={Icons.Tag} 
               label="Phiên bản" 
               value={version} 
               href="https://github.com/PhamHungTien/PHTV/releases/latest"
               colorClass="text-blue-400"
             />
             <StatBadge 
               icon={Icons.CloudDownload} 
               label="Lượt tải" 
               value={totalDownloads} 
               href="https://github.com/PhamHungTien/PHTV/releases"
               colorClass="text-green-400"
             />
             <StatBadge 
               icon={Icons.Heart} 
               label="Ủng hộ" 
               value="Donate" 
               onClick={() => setShowDonate(true)}
               colorClass="text-pink-400"
             />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={downloadUrl}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-slate-100 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
            >
              <Icons.Download size={20} />
              Tải xuống {version ? `(${version})` : '(.dmg)'}
            </a>
            <a 
              href="#install"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-md border border-slate-700 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all hover:border-slate-600 flex items-center justify-center gap-2"
            >
              <Icons.Terminal size={20} />
              Cài bằng Homebrew
            </a>
          </div>
        </div>
      </main>

      <Features />
      
      <Gallery />

      <Shortcuts />

      {/* Detailed Installation Section (README Content) */}
      <section id="install" className="py-24 bg-slate-900/50 border-y border-slate-800 scroll-mt-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Cài đặt</h2>
            <p className="text-slate-400 text-lg">
              Hỗ trợ macOS 13.0 (Ventura) trở lên.<br/>
              Universal Binary (Intel + Apple Silicon).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Method 1: Homebrew */}
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-8 shadow-xl">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/50">1</div>
                  <h3 className="text-xl font-bold text-white">Homebrew (Khuyên dùng)</h3>
               </div>
               <div className="mb-4">
                  <TerminalBlock command="brew install --cask phamhungtien/tap/phtv" label="Install" />
               </div>
               <p className="text-slate-400 text-sm mb-6">
                  Tự động cài đặt và cập nhật phiên bản mới nhất thông qua công cụ quản lý gói phổ biến nhất trên macOS.
               </p>
               
               {/* Redesigned Useful Commands Block */}
               <div className="bg-black/20 rounded-xl border border-slate-800/50 overflow-hidden">
                  <div className="bg-slate-800/30 px-4 py-2 border-b border-slate-800/50 flex items-center gap-2">
                     <Icons.Settings size={14} className="text-slate-400"/>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lệnh quản lý</span>
                  </div>
                  <div className="p-3 space-y-2">
                     <CommandRow 
                        icon={Icons.RefreshCw} 
                        color="text-blue-400" 
                        label="Cập nhật (Upgrade)" 
                        code="brew upgrade --cask phtv" 
                     />
                     <CommandRow 
                        icon={Icons.Trash2} 
                        color="text-red-400" 
                        label="Gỡ cài đặt (Uninstall)" 
                        code="brew uninstall --zap --cask phtv" 
                     />
                  </div>
               </div>
            </div>

            {/* Method 2: Manual */}
             <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-8 flex flex-col shadow-xl">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold border border-slate-600">2</div>
                  <h3 className="text-xl font-bold text-white">Tải trực tiếp</h3>
               </div>
               
               <div className="flex-1 flex items-center">
                 <a 
                   href={downloadUrl}
                   className="flex items-center justify-center gap-2 w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-colors font-bold shadow-lg shadow-brand-500/20"
                 >
                   <Icons.Download size={20} />
                   Tải PHTV.dmg {version}
                 </a>
               </div>

               <div className="mt-8 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                 <div className="flex items-start gap-3">
                    <div className="p-1 bg-yellow-500/10 rounded">
                      <Icons.Shield className="text-yellow-500 shrink-0" size={18} />
                    </div>
                    <div className="text-sm">
                      <strong className="text-yellow-500 block mb-1">Cảnh báo "App is damaged"?</strong>
                      <span className="text-slate-400">Nếu macOS chặn ứng dụng, hãy chạy lệnh sau trong Terminal để cấp quyền:</span>
                      <div className="mt-3">
                        <TerminalBlock command="xattr -cr /Applications/PHTV.app" label="Fix Quarantine" />
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-8 max-w-3xl mx-auto">
             <h3 className="text-xl font-bold text-white mb-6 text-center">Sau khi cài đặt</h3>
             <ol className="list-decimal list-inside space-y-4 text-slate-300">
                <li className="pl-2">
                   <strong>Cấp quyền Accessibility:</strong> Vào <em>System Settings</em> → <em>Privacy & Security</em> → <em>Accessibility</em> → Bật <strong>PHTV</strong>.
                </li>
                <li className="pl-2">
                   <strong>Kích hoạt:</strong> Click icon <strong>En</strong> trên menu bar → chọn <strong>Vi</strong>.
                </li>
                <li className="pl-2">
                   <strong>Sử dụng:</strong> Nhấn <code>Control</code> + <code>Shift</code> để chuyển đổi Việt/Anh.
                </li>
             </ol>
          </div>

        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 border-t border-slate-800 bg-slate-900/30">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Yêu cầu hệ thống</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-800">
                    <th className="py-4 text-slate-400 font-medium w-1/3">macOS</th>
                    <td className="py-4 text-white">13.0+ (Ventura trở lên)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <th className="py-4 text-slate-400 font-medium">Kiến trúc</th>
                    <td className="py-4 text-white">Universal Binary (Intel + Apple Silicon)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <th className="py-4 text-slate-400 font-medium">Quyền hạn</th>
                    <td className="py-4 text-white">Accessibility (Trợ năng)</td>
                  </tr>
                </tbody>
              </table>
            </div>
         </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
         <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-white">Câu hỏi thường gặp</h2>
         <p className="text-center text-slate-400 mb-12">Giải đáp các thắc mắc phổ biến về PHTV</p>
         
         <div className="space-y-8">
            {faqData.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-brand-400 mb-4 px-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
                      <details className="group">
                          <summary className="flex justify-between items-center cursor-pointer p-5 list-none bg-slate-900/50 hover:bg-slate-800 transition-colors">
                            <span className="font-semibold text-white pr-4">{item.q}</span>
                            <span className="transition-transform group-open:rotate-180 shrink-0 text-brand-500">
                                <Icons.ArrowRight className="rotate-90" size={18} />
                            </span>
                          </summary>
                          <div className="text-slate-300 p-5 pt-0 border-t border-slate-800/50 leading-relaxed">
                            <div className="mt-4">{item.a}</div>
                          </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            ))}
         </div>
      </section>

      <Footer onDonateClick={() => setShowDonate(true)} />
      
      {/* Render Modal */}
      <DonateModal isOpen={showDonate} onClose={() => setShowDonate(false)} />
    </div>
  );
}

export default App;