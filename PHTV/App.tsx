import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Features } from './components/Features';
import { TerminalBlock } from './components/TerminalBlock';
import { Shortcuts } from './components/Shortcuts';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { Icons } from './components/Icons';
import { useGitHubData } from './hooks/useGitHubData';

// Moved components
import { CopyBlock } from './components/CopyBlock';
import { CommandRow } from './components/CommandRow';
import { StatBadge } from './components/StatBadge';
import { DonateModal } from './components/DonateModal';
import { AcronymRow } from './components/AcronymRow';
import { QASection } from './components/QASection';

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

function App() {
  const { downloadUrl, version, totalDownloads, loading } = useGitHubData();
  const [showDonate, setShowDonate] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'community'>('home');

  // Reveal Animation Logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Handle URL Hash for direct linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#community' || hash === '#qa') {
        setActiveTab('community');
      } else if (hash === '#donate') {
        setShowDonate(true);
      } else if (hash === '' || hash === '#home') {
        setActiveTab('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500 selection:text-white overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 mesh-gradient pointer-events-none" />
      
      {/* Top Loading Bar */}
      <div className={`fixed top-0 left-0 right-0 h-1 z-[110] transition-transform duration-500 origin-left ${loading ? 'scale-x-100' : 'scale-x-0'}`}>
        <div className="h-full bg-gradient-to-r from-brand-500 via-purple-500 to-red-500 animate-shimmer bg-[length:200%_auto]"></div>
      </div>

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'home' ? (
        <div className="relative z-10 animate-in fade-in duration-1000">
          {/* Hero Section */}
          <main className="relative pt-32 pb-20 md:pt-56 md:pb-40 px-6 overflow-hidden">
            
            <h1 className="sr-only">PHTV - Bộ gõ tiếng Việt Precision Hybrid Typing Vietnamese cho macOS</h1>
            <div className="max-w-7xl mx-auto text-center relative z-10">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 backdrop-blur-md shadow-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Sẵn sàng cho macOS 26 Tahoe</span>
              </div>

              <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 mb-16 md:mb-28">
                <div className="relative group shrink-0 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72">
                   <img 
                     src="/PHTV/phtv-icon.webp" 
                     alt="PHTV Icon" 
                     className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] rounded-[2rem] md:rounded-[3.5rem] transform group-hover:scale-105 transition-all duration-700 ease-out z-10 object-cover" 
                     fetchPriority="high"
                   />
                </div>
                <div className="flex flex-col justify-center gap-1 md:gap-2 text-left">
                   <AcronymRow letter="P" word="recision" />
                   <AcronymRow letter="H" word="ybrid" />
                   <AcronymRow letter="T" word="yping" />
                   <AcronymRow letter="V" word="ietnamese" />
                </div>
              </div>

              <p className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto mb-16 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                Bộ gõ tiếng Việt <span className="text-white font-bold text-glow-sm">offline</span>, <span className="text-white font-bold text-glow-sm">nhanh</span>, và <span className="text-white font-bold text-glow">riêng tư</span> cho macOS.
                <span className="block text-slate-500 text-lg md:text-xl mt-4 font-semibold opacity-80 tracking-tight">Xây dựng bằng Swift & C/C++ native tối ưu hiệu năng tuyệt đối.</span>
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                 <StatBadge icon={Icons.Tag} label="Phiên bản" value={version} href="https://github.com/PhamHungTien/PHTV/releases/latest" colorClass="text-blue-400" />
                 <StatBadge icon={Icons.CloudDownload} label="Lượt tải" value={totalDownloads} href="https://github.com/PhamHungTien/PHTV/releases" colorClass="text-green-400" />
                 <StatBadge icon={Icons.Heart} label="Ủng hộ" value="Donate" onClick={() => setShowDonate(true)} colorClass="text-pink-400" />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
                <a 
                  href={downloadUrl}
                  className="w-full sm:w-auto px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 group"
                >
                  <Icons.Download size={24} className="group-hover:animate-bounce" />
                  Tải xuống {version}
                </a>
                
                <button 
                  onClick={() => {
                    setActiveTab('community');
                    window.location.hash = '#community';
                  }}
                  className="w-full sm:w-auto px-10 py-5 bg-brand-500/5 backdrop-blur-xl border border-brand-500/20 text-brand-400 rounded-2xl font-black text-lg hover:bg-brand-500/10 hover:border-brand-500/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 relative group shadow-2xl"
                >
                  <div className="absolute -top-1.5 -right-1.5 z-30">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-slate-950 shadow-lg"></span>
                    </span>
                  </div>
                  <Icons.MessageSquare size={22} className="group-hover:rotate-12 transition-transform" />
                  <span className="tracking-tight">Thảo luận & Báo lỗi</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-500 text-white font-black uppercase tracking-tighter ml-1 shadow-lg shadow-brand-500/20">New</span>
                </button>

                <a 
                  href="#install"
                  className="w-full sm:w-auto px-10 py-5 bg-slate-900/50 backdrop-blur-xl border border-white/10 text-slate-400 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  <Icons.Terminal size={22} />
                  Homebrew
                </a>
              </div>
            </div>
          </main>

          <div className="reveal"><Features /></div>
          <div className="reveal"><Gallery /></div>
          <div className="reveal"><Shortcuts /></div>

          <section id="install" className="reveal py-32 md:py-48 bg-slate-950/30 border-y border-white/5 scroll-mt-32 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 relative z-10">
              <div className="text-center mb-24">
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter italic">Cài đặt dễ dàng</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80">Hỗ trợ tuyệt vời cho macOS 13.0+ trên cả Intel và Apple Silicon.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                <div className="glass-panel rounded-[2.5rem] p-10 md:p-12 flex flex-col shadow-3xl group relative overflow-hidden transition-all duration-500 hover:border-brand-500/30">
                   <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 transform group-hover:scale-110"><Icons.Terminal size={160} /></div>
                   <div className="flex items-center gap-5 mb-16">
                      <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-transform group-hover:rotate-6"><Icons.Terminal size={28} /></div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Homebrew</h3>
                   </div>
                   <div className="mb-8">
                      <TerminalBlock command="brew install --cask phamhungtien/tap/phtv" label="Install" output={`==> Downloading PHTV...\n==> Installing Cask phtv\n🍺  phtv was successfully installed!`}/>
                   </div>
                   <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 leading-relaxed font-medium">Lựa chọn hàng đầu cho lập trình viên và những ai yêu thích sự gọn nhẹ của Terminal.</p>
                   <div className="mt-auto space-y-4 pt-8 border-t border-slate-200/50 dark:border-white/5">
                      <CommandRow icon={Icons.RefreshCw} color="text-blue-500 dark:text-blue-400" label="Cập nhật" code="brew upgrade --cask phtv" />
                      <CommandRow icon={Icons.Trash2} color="text-red-500 dark:text-red-400" label="Gỡ cài đặt" code="brew uninstall --zap --cask phtv" />
                   </div>
                </div>

                 <div className="glass-panel rounded-[2.5rem] p-10 md:p-12 flex flex-col shadow-3xl group relative overflow-hidden transition-all duration-500 hover:border-brand-500/30">
                   <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 transform group-hover:scale-110"><Icons.Download size={160} /></div>
                   <div className="flex items-center gap-5 mb-16">
                      <div className="w-14 h-14 rounded-2xl bg-slate-700 flex items-center justify-center text-white shadow-xl transition-transform group-hover:rotate-6"><Icons.Download size={28} /></div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Tải trực tiếp</h3>
                   </div>
                   <div className="flex-1 flex items-center mb-10">
                     <a href={downloadUrl} className="flex items-center justify-center gap-4 w-full py-6 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white rounded-3xl transition-all font-black text-xl shadow-2xl hover:shadow-brand-500/30 hover:-translate-y-1 active:scale-95">
                       <Icons.Download size={28} />
                       Tải PHTV.dmg
                     </a>
                   </div>
                   <div className="p-8 bg-yellow-500/10 dark:bg-yellow-500/[0.03] border border-yellow-500/20 dark:border-yellow-500/10 rounded-3xl backdrop-blur-md">
                     <div className="flex items-start gap-5">
                        <div className="p-3 bg-yellow-500/20 dark:bg-yellow-500/10 rounded-2xl"><Icons.Shield className="text-yellow-600 dark:text-yellow-500 shrink-0" size={24} /></div>
                        <div className="text-sm md:text-base">
                          <strong className="text-yellow-600 dark:text-yellow-500 font-black block mb-2 uppercase tracking-widest text-xs">Mẹo bảo mật</strong>
                          <span className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic opacity-80">Nếu macOS thông báo "App is damaged", hãy chạy lệnh này:</span>
                          <div className="mt-5"><TerminalBlock command="xattr -cr /Applications/PHTV.app" label="Fix" /></div>
                        </div>
                     </div>
                   </div>
                </div>
              </div>

              <div className="glass-panel rounded-[3rem] p-12 md:p-16 max-w-4xl mx-auto border border-white/40 dark:border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
                 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-12 text-center flex items-center justify-center gap-4 uppercase tracking-tighter italic"><Icons.CheckCircle2 className="text-green-500" /> Hoàn tất cài đặt</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[ 
                      { title: "Cấp quyền", desc: "System Settings → Accessibility → Bật PHTV", icon: Icons.ShieldCheck },
                      { title: "Kích hoạt", desc: "Chọn 'Vi' từ Menu bar hoặc dùng phím tắt", icon: Icons.Keyboard },
                      { title: "Sử dụng", desc: "Control + Shift để đổi ngôn ngữ cực nhanh", icon: Icons.Zap }
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center text-center group/step">
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 text-brand-500 dark:text-brand-400 shadow-xl transition-all duration-500 group-hover/step:bg-brand-500 group-hover/step:text-white group-hover/step:scale-110 group-hover/step:rotate-6"><step.icon size={32} /></div>
                        <h4 className="text-lg font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">{step.title}</h4>
                        <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </section>

          <section className="reveal py-32 border-t border-white/5 bg-slate-950/20 backdrop-blur-sm">
             <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center tracking-tighter uppercase italic">Cấu hình yêu cầu</h2>
                <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] shadow-2xl">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-white/5 group hover:bg-white/[0.03] transition-colors"><th className="py-6 px-8 text-slate-500 font-bold uppercase tracking-widest text-xs w-1/3">Hệ điều hành</th><td className="py-6 px-8 text-white font-black text-lg">macOS 13.0+</td></tr>
                      <tr className="border-b border-white/5 group hover:bg-white/[0.03] transition-colors"><th className="py-6 px-8 text-slate-500 font-bold uppercase tracking-widest text-xs">Kiến trúc</th><td className="py-6 px-8 text-white font-black text-lg">Universal Binary (Intel & Apple Silicon)</td></tr>
                      <tr className="group hover:bg-white/[0.03] transition-colors"><th className="py-6 px-8 text-slate-500 font-bold uppercase tracking-widest text-xs">Yêu cầu quyền</th><td className="py-6 px-8 text-white font-black text-lg inline-flex items-center gap-3"><Icons.ShieldCheck className="text-brand-400" size={20} /> Accessibility (Trợ năng)</td></tr>
                    </tbody>
                  </table>
                </div>
             </div>
          </section>

          <section id="faq" className="reveal py-32 max-w-4xl mx-auto px-6">
             <h2 className="text-4xl md:text-6xl font-black mb-6 text-center text-white tracking-tighter italic leading-none">Hỏi đáp <span className="text-brand-500">&</span> Giải đáp</h2>
             <p className="text-center text-slate-500 text-lg md:text-xl font-medium mb-20 opacity-80 uppercase tracking-widest">Những thắc mắc thường gặp về PHTV</p>
             <div className="space-y-6">
                {faqData.map((category, idx) => (
                  <div key={category.category} className="space-y-4">
                    <h3 className="text-xl font-black text-brand-400 mb-6 px-4 flex items-center gap-3 uppercase tracking-wider"><div className="w-8 h-[2px] bg-brand-500/30 rounded-full"></div>{category.category}</h3>
                    <div className="space-y-4">
                      {category.items.map((item, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-brand-500/30 transition-all duration-500 group shadow-lg">
                          <details className="group/details">
                              <summary className="flex justify-between items-center cursor-pointer p-6 list-none bg-transparent hover:bg-white/[0.02] transition-colors"><span className="font-black text-white pr-6 text-sm md:text-lg tracking-tight group-hover/details:text-brand-400 transition-colors uppercase">{item.q}</span><span className="transition-all duration-500 group-open/details:rotate-180 group-open/details:text-brand-500 shrink-0 text-slate-600"><Icons.ChevronDown size={24} /></span></summary>
                              <div className="text-slate-400 p-8 pt-2 border-t border-white/5 leading-relaxed font-medium bg-white/[0.01]"><div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-500">{item.a}</div></div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>
      ) : (
        <div className="relative z-10 pt-24 animate-in slide-in-from-right-4 fade-in duration-1000">
          <QASection />
        </div>
      )}

      <Footer onDonateClick={() => setShowDonate(true)} />
      <DonateModal isOpen={showDonate} onClose={() => setShowDonate(false)} />
    </div>
  );
}

export default App;