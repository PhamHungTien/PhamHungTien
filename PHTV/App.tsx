import React, { useState } from 'react';
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
  const { downloadUrl, version, totalDownloads } = useGitHubData();
  const [showDonate, setShowDonate] = useState(false);

  return (
    <div className="min-h-screen mesh-gradient text-white selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <main className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] -z-10"></div>

        <h1 className="sr-only">PHTV - Bộ gõ tiếng Việt Precision Hybrid Typing Vietnamese cho macOS</h1>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          {/* Version Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Sẵn sàng cho macOS 26 Tahoe</span>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 mb-12 md:mb-24">
            
            {/* Left: Icon */}
            <div className="relative group shrink-0 w-28 h-28 sm:w-44 sm:h-44 md:w-64 md:h-64">
               <img 
                 src="https://raw.githubusercontent.com/PhamHungTien/PHTV/main/PHTV/Resources/icon.png" 
                 alt="PHTV - Bộ gõ tiếng Việt cho macOS Icon" 
                 className="relative w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.4)] rounded-[1.8rem] md:rounded-[3rem] transform group-hover:scale-105 transition-transform duration-500 ease-out z-10 object-cover" 
                 fetchPriority="high"
               />
            </div>

            {/* Right: Vertical Typography */}
            <div className="flex flex-col justify-center gap-0.5 md:gap-1">
               <AcronymRow letter="P" word="recision" />
               <AcronymRow letter="H" word="ybrid" />
               <AcronymRow letter="T" word="yping" />
               <AcronymRow letter="V" word="ietnamese" />
            </div>

          </div>

          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Bộ gõ tiếng Việt <span className="text-white font-bold">offline</span>, <span className="text-white font-bold">nhanh</span>, và <span className="text-white font-bold text-glow">riêng tư</span> cho macOS.
            <span className="block text-slate-500 text-lg mt-2">Xây dựng bằng Swift native tối ưu hiệu năng tuyệt đối.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
            <a 
              href={downloadUrl}
              className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 rounded-2xl font-extrabold text-lg hover:bg-slate-100 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-[0_20px_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 group"
            >
              <Icons.Download size={22} className="group-hover:animate-bounce" />
              Tải xuống {version ? version : 'ngay'}
            </a>
            <a 
              href="#install"
              className="w-full sm:w-auto px-10 py-5 bg-slate-900/50 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all hover:border-white/20 flex items-center justify-center gap-3 group"
            >
              <Icons.Terminal size={22} className="text-slate-400 group-hover:text-white transition-colors" />
              Cài bằng Homebrew
            </a>
          </div>
        </div>
      </main>

      <Features />
      <Gallery />
      <Shortcuts />

      <section id="install" className="py-32 bg-slate-950/30 border-y border-white/5 scroll-mt-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">Cài đặt dễ dàng</h2>
            <p className="text-slate-400 text-xl">
              Hỗ trợ macOS 13.0 trở lên (Intel + Apple Silicon).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            {/* Method 1: Homebrew */}
            <div className="glass-panel rounded-[2rem] p-10 flex flex-col shadow-2xl relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icons.Terminal size={120} />
               </div>
               <div className="flex items-center gap-4 mb-14">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/40">
                    <Icons.Terminal size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Homebrew</h3>
               </div>
               <div className="mb-6">
                  <TerminalBlock 
                    command="brew install --cask phamhungtien/tap/phtv" 
                    label="Install" 
                    output={`==> Downloading PHTV...\n==> Installing Cask phtv\n🍺  phtv was successfully installed!`}
                  />
               </div>
               <p className="text-slate-400 mb-8 leading-relaxed">
                  Cách nhanh nhất để cài đặt và cập nhật PHTV thông qua Terminal.
               </p>
               
               <div className="mt-auto space-y-3 pt-6 border-t border-white/5">
                  <CommandRow 
                    icon={Icons.RefreshCw} 
                    color="text-blue-400" 
                    label="Cập nhật" 
                    code="brew upgrade --cask phtv" 
                  />
                  <CommandRow 
                    icon={Icons.Trash2} 
                    color="text-red-400" 
                    label="Gỡ cài đặt" 
                    code="brew uninstall --zap --cask phtv" 
                  />
               </div>
            </div>

            {/* Method 2: Manual */}
             <div className="glass-panel rounded-[2rem] p-10 flex flex-col shadow-2xl relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icons.Download size={120} />
               </div>
               <div className="flex items-center gap-4 mb-14">
                  <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center text-white shadow-lg shadow-slate-700/40">
                    <Icons.Download size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Tải trực tiếp</h3>
               </div>
               
               <div className="flex-1 flex items-center mb-8">
                 <a 
                   href={downloadUrl}
                   className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white rounded-2xl transition-all font-extrabold text-lg shadow-xl shadow-brand-500/25 hover:-translate-y-1"
                 >
                   <Icons.Download size={24} />
                   Tải PHTV.dmg
                 </a>
               </div>

               <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
                 <div className="flex items-start gap-4">
                    <div className="p-2 bg-yellow-500/10 rounded-xl">
                      <Icons.Shield className="text-yellow-500 shrink-0" size={20} />
                    </div>
                    <div className="text-sm">
                      <strong className="text-yellow-500 block mb-2 text-base">Mẹo bảo mật</strong>
                      <span className="text-slate-400 leading-relaxed">Nếu macOS thông báo "App is damaged", bạn chỉ cần chạy lệnh sau:</span>
                      <div className="mt-4">
                        <TerminalBlock command="xattr -cr /Applications/PHTV.app" label="Fix Quarantine" />
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-10 md:p-12 max-w-4xl mx-auto border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
             <h3 className="text-2xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3">
               <Icons.CheckCircle2 className="text-green-500" />
               Các bước cuối cùng
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Cấp quyền", desc: "System Settings → Accessibility → Bật PHTV", icon: Icons.Shield },
                  { title: "Kích hoạt", desc: "Chọn 'Vi' từ Menu bar hoặc dùng phím tắt", icon: Icons.Keyboard },
                  { title: "Sử dụng", desc: "Control + Shift để đổi ngôn ngữ nhanh", icon: Icons.Zap }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-brand-400">
                      <step.icon size={24} />
                    </div>
                    <h4 className="font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

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

      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
         <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-white">Câu hỏi thường gặp</h2>
         <p className="text-center text-slate-400 mb-12">Giải đáp các thắc mắc phổ biến về PHTV</p>
         
         <div className="space-y-8">
            {faqData.map((category, idx) => (
              <div key={category.category}>
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
      <DonateModal isOpen={showDonate} onClose={() => setShowDonate(false)} />
    </div>
  );
}

export default App;
