import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Features } from './components/Features';
import { TerminalBlock } from './components/TerminalBlock';
import { Shortcuts } from './components/Shortcuts';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { Icons } from './components/Icons';

const CopyBlock = React.memo(({ code, className = "", colorClass = "text-slate-300" }: { code: string, className?: string, colorClass?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

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
});

const CommandRow = React.memo(({ icon: Icon, label, code, color }: { icon: any, label: string, code: string, color: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

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
});

const StatBadge = React.memo(({ icon: Icon, label, value, href, colorClass = "text-slate-300" }: { icon: any, label: string, value: string, href: string, colorClass?: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/80 transition-all duration-300 group hover:-translate-y-0.5"
  >
    <div className={`p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${colorClass}`}>
      <Icon size={18} />
    </div>
    <div className="flex flex-col items-start leading-none gap-1">
      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 group-hover:text-slate-400 transition-colors">{label}</span>
      <span className="text-base font-bold text-slate-200 group-hover:text-white transition-colors">{value}</span>
    </div>
  </a>
));

function App() {
  const [downloadUrl, setDownloadUrl] = useState("https://github.com/PhamHungTien/PHTV/releases/latest");
  const [version, setVersion] = useState("v1.0.0");
  const [totalDownloads, setTotalDownloads] = useState("0");

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
        // Fetch list to get latest version AND calculate total downloads
        const res = await fetch('https://api.github.com/repos/PhamHungTien/PHTV/releases?per_page=30');
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
          const formattedDownloads = dlCount > 1000 ? `${(dlCount / 1000).toFixed(1)}k+` : `${dlCount}`;

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
          
          <div className="flex justify-center mb-6">
             <img src="https://raw.githubusercontent.com/PhamHungTien/PHTV/main/PHTV/Resources/icon.png" alt="PHTV Icon" className="w-32 h-32 drop-shadow-2xl animate-[fadeIn_0.5s_ease-out]" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
            PHTV
          </h1>
          <p className="text-2xl md:text-4xl text-slate-300 font-light mb-8">Precision Hybrid Typing Vietnamese</p>

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
               href="#donate"
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

      {/* Donate Section */}
      <section id="donate" className="py-24 border-t border-slate-800 bg-gradient-to-br from-slate-900/50 via-slate-950 to-pink-950/20 scroll-mt-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-pink-500/10 rounded-2xl border border-pink-500/30 backdrop-blur-md">
                <Icons.Heart size={48} className="text-pink-400 fill-pink-400" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Ủng hộ dự án</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              PHTV là dự án <strong>mã nguồn mở</strong> hoàn toàn <strong>miễn phí</strong>. Nếu bạn yêu thích sản phẩm này, hãy ủng hộ để chúng tôi có thể phát triển thêm tính năng mới và duy trì chất lượng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Donate via Kofi */}
            <a 
              href="https://ko-fi.com/phamhungtien"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600 to-red-600 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-pink-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-md">
                    <Icons.Coffee size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Ko-fi</h3>
                    <p className="text-pink-100 text-sm">Cách nhanh nhất</p>
                  </div>
                </div>
                <p className="text-white/90 mb-4">Ủng hộ ngay lập tức bằng Ko-fi. Hỗ trợ tất cả phương thức thanh toán phổ biến.</p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  Ủng hộ ngay
                  <Icons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

            {/* Donate via GitHub */}
            <a 
              href="https://github.com/sponsors/PhamHungTien"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-slate-600/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-md">
                    <Icons.Github size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">GitHub Sponsors</h3>
                    <p className="text-slate-300 text-sm">Đăng ký định kỳ</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-4">Trở thành sponsor trên GitHub để nhận badge đặc biệt và hỗ trợ dự án dài hạn.</p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  Trở thành Sponsor
                  <Icons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          </div>

          {/* Other donation methods */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Icons.Globe size={20} className="text-brand-400" />
              Các phương thức khác
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://www.paypal.com/paypalme/phamhungtien1404"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-3 group"
              >
                <div className="p-2 bg-blue-500/20 rounded">
                  <Icons.DollarSign size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">PayPal</p>
                  <p className="text-xs text-slate-400">Quốc tế</p>
                </div>
              </a>

              <a 
                href="https://tuyetdepbank.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-3 group"
              >
                <div className="p-2 bg-green-500/20 rounded">
                  <Icons.Banknote size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Chuyển khoản</p>
                  <p className="text-xs text-slate-400">Ngân hàng Việt Nam</p>
                </div>
              </a>

              <a 
                href="mailto:hungtien10a7@gmail.com?subject=PHTV%20Donation"
                className="p-4 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-3 group"
              >
                <div className="p-2 bg-purple-500/20 rounded">
                  <Icons.Mail size={20} className="text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-xs text-slate-400">Liên hệ trực tiếp</p>
                </div>
              </a>
            </div>
          </div>

          {/* QR Code for Bank Transfer / MoMo */}
          <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Icons.QrCode size={20} className="text-brand-400" />
              Quét mã QR - Ngân hàng / MoMo
            </h3>
            <div className="flex flex-col items-center">
              <img 
                src="./donate.webp"
                alt="QR Code for Bank Transfer / MoMo Donation" 
                className="w-full max-w-sm h-auto rounded-lg border-2 border-slate-700 shadow-lg hover:shadow-xl transition-shadow"
                loading="lazy"
              />
              <p className="text-slate-400 text-center mt-4 text-sm">
                Quét mã QR bằng ứng dụng ngân hàng hoặc MoMo để chuyển khoản trực tiếp
              </p>
            </div>
          </div>

          {/* Gratitude message */}
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-brand-500/10 via-pink-500/10 to-brand-500/10 border border-brand-500/20 rounded-xl">
            <p className="text-slate-300 text-lg">
              ❤️ <strong className="text-white">Cảm ơn bạn</strong> đã yêu thích và ủng hộ PHTV! <br/>
              <span className="text-sm text-slate-400">Mỗi đóng góp đều giúp chúng tôi phát triển sản phẩm tốt hơn cho cộng đồng người dùng macOS Việt Nam.</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;