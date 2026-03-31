import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Features } from './components/Features';
import { TerminalBlock } from './components/TerminalBlock';
import { Shortcuts } from './components/Shortcuts';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { Icons } from './components/Icons';
import { VideoTutorial } from './components/VideoTutorial';
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
        a: "PHTV hỗ trợ macOS 13.0+ (Ventura trở lên). Từ các bản phát hành mới, PHTV tách riêng binary cho Apple Silicon và Intel để tải đúng theo từng dòng máy, đồng thời vẫn tương thích với mọi Mac chạy macOS 13.0+."
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

            <p className="text-sm">Hoặc tải trực tiếp từ <a href="https://phamhungtien.com/PHTV/" className="text-brand-400 hover:underline">phamhungtien.com/PHTV</a> hoặc <a href="https://github.com/PhamHungTien/PHTV/releases" className="text-brand-400 hover:underline">GitHub Releases</a>. Nếu tải tay, hãy chọn đúng bản <strong>Apple Silicon</strong> hoặc <strong>Intel</strong>.</p>
            <p className="mt-2 text-sm italic text-slate-500">Xem thêm: <a href="#tutorial" className="text-brand-400 hover:underline font-bold">Video hướng dẫn cài đặt chi tiết</a></p>
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
             <li>Tạo issue trên <a href="https://github.com/PhamHungTien/PHTV/issues" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">GitHub</a> hoặc báo lỗi qua <a href="https://discord.gg/hm2C4tbaDz" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">Discord</a></li>
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

interface DownloadChoiceCardProps {
  href: string;
  title: string;
  chip: string;
  note: string;
  tone?: 'accent' | 'neutral';
}

const DownloadChoiceCard: React.FC<DownloadChoiceCardProps> = ({
  href,
  title,
  chip,
  note,
  tone = 'neutral',
}) => {
  const accent = tone === 'accent';

  return (
    <a
      href={href}
      className={`glass-card group block rounded-[1.5rem] px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 md:px-6 md:py-6 ${
        accent
          ? 'border-amber-300/15 bg-gradient-to-br from-amber-400/10 to-orange-500/8'
          : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
            accent
              ? 'border-amber-200/20 bg-amber-300/10 text-amber-200'
              : 'border-white/10 bg-white/[0.05] text-slate-200'
          }`}
        >
          <Icons.Download size={18} />
        </div>
        <span
          className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
            accent
              ? 'border-amber-200/15 bg-amber-300/10 text-amber-100/90'
              : 'border-white/10 bg-white/[0.04] text-slate-400'
          }`}
        >
          {chip}
        </span>
      </div>

      <div className="mt-5 text-left">
        <h3 className="text-lg font-black tracking-tight text-white md:text-xl">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-400">{note}</p>
      </div>

      <div className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${accent ? 'text-amber-200' : 'text-slate-300'}`}>
        Tải bản này
        <Icons.ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </a>
  );
};

function App() {
  const {
    downloadUrl,
    releaseUrl,
    arm64DownloadUrl,
    intelDownloadUrl,
    universalDownloadUrl,
    hasSplitDownloads,
    version,
    totalDownloads,
    loading
  } = useGitHubData();
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

      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        downloadUrl={downloadUrl}
        releaseUrl={releaseUrl}
        arm64DownloadUrl={arm64DownloadUrl}
        intelDownloadUrl={intelDownloadUrl}
        hasSplitDownloads={hasSplitDownloads}
      />

      {activeTab === 'home' ? (
        <div className="relative z-10 animate-in fade-in duration-1000">
          <main className="relative overflow-hidden px-4 pb-14 pt-28 md:px-6 md:pb-20 md:pt-40">
            <h1 className="sr-only">PHTV - Bộ gõ tiếng Việt Precision Hybrid Typing Vietnamese cho macOS</h1>

            <div className="mx-auto max-w-6xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-300">
                  Native cho macOS 13+
                </span>
              </div>

              <div className="mt-10 flex flex-row items-center justify-center gap-4 sm:gap-8 md:mt-14 md:gap-12">
                <div className="relative h-24 w-24 shrink-0 sm:h-48 sm:w-48 md:h-72 md:w-72">
                  <img
                    src="/PHTV/phtv-icon.webp"
                    alt="PHTV Icon"
                    className="h-full w-full rounded-[1.6rem] object-cover drop-shadow-[0_16px_36px_rgba(0,0,0,0.34)] md:rounded-[3.5rem] md:drop-shadow-[0_28px_55px_rgba(0,0,0,0.38)]"
                    fetchPriority="high"
                  />
                </div>

                <div className="flex flex-col justify-center gap-1 text-left md:gap-2">
                  <AcronymRow letter="P" word="recision" />
                  <AcronymRow letter="H" word="ybrid" />
                  <AcronymRow letter="T" word="yping" />
                  <AcronymRow letter="V" word="ietnamese" />
                </div>
              </div>

              <p className="mx-auto mt-10 max-w-3xl px-2 text-lg font-medium leading-relaxed text-slate-300 md:mt-14 md:text-2xl">
                Bộ gõ tiếng Việt <span className="font-bold text-white text-glow-sm">offline</span>, <span className="font-bold text-white text-glow-sm">nhanh</span> và <span className="font-bold text-white text-glow">riêng tư</span> cho macOS.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-lg">
                Thiết kế tập trung vào phần cốt lõi: thao tác nhanh, bố cục rõ ràng và khả năng hiển thị ổn định trên nhiều kích thước màn hình.
              </p>

              <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3 md:mt-10 md:gap-4">
                <StatBadge icon={Icons.Tag} label="Phiên bản" value={version} href="https://github.com/PhamHungTien/PHTV/releases/latest" colorClass="text-blue-300" />
                <StatBadge icon={Icons.CloudDownload} label="Lượt tải" value={totalDownloads} href="https://github.com/PhamHungTien/PHTV/releases" colorClass="text-emerald-300" />
                <StatBadge icon={Icons.Heart} label="Ủng hộ" value="Donate" onClick={() => setShowDonate(true)} colorClass="text-rose-300" />
              </div>

              <div className="mx-auto mt-10 w-full max-w-4xl px-1 md:mt-12">
                {hasSplitDownloads ? (
                  <div className="glass-panel rounded-[2rem] border border-white/10 p-5 md:p-7">
                    <div className="flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-300/80">Tải về</p>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-white md:text-3xl">
                          Chọn đúng bản cho máy Mac của bạn
                        </h2>
                      </div>
                      <p className="max-w-md text-sm leading-7 text-slate-400 md:text-base">
                        Chọn theo kiến trúc máy: Apple Silicon cho các Mac dùng chip Apple, Intel cho các máy Mac đời cũ hơn.
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <DownloadChoiceCard
                        href={arm64DownloadUrl ?? releaseUrl}
                        title="Apple Silicon"
                        chip="Mac dùng chip Apple"
                        note="Phù hợp cho hầu hết máy Mac hiện nay."
                        tone="accent"
                      />
                      <DownloadChoiceCard
                        href={intelDownloadUrl ?? releaseUrl}
                        title="Intel"
                        chip="Mac dùng chip Intel"
                        note="Dành cho các máy Mac chạy Intel."
                      />
                    </div>
                  </div>
                ) : (
                  <a
                    href={universalDownloadUrl ?? downloadUrl}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-black text-slate-950 transition-colors hover:bg-slate-100 md:w-auto md:text-lg"
                  >
                    <Icons.Download size={20} />
                    {`Tải xuống ${version}`}
                  </a>
                )}

                <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="#install"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.06]"
                  >
                    <Icons.Terminal size={16} />
                    Xem cách cài đặt
                  </a>
                  <button
                    onClick={() => {
                      setActiveTab('community');
                      window.location.hash = '#community';
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
                  >
                    <Icons.MessageSquare size={16} />
                    Thảo luận hoặc báo lỗi
                  </button>
                </div>
              </div>
            </div>
          </main>

          <div className="reveal"><Features /></div>
          <div className="reveal"><Gallery /></div>

          <section id="install" className="reveal border-y border-white/6 bg-black/10 py-20 scroll-mt-24 md:py-24 md:scroll-mt-28">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <div className="mb-12 max-w-3xl">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-300/80">Cài đặt</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
                  Cài nhanh, cấu hình gọn và đúng ngay từ đầu
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
                  Ba bước quan trọng nhất để cài đúng, mở được app và bắt đầu gõ ngay trên macOS.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="glass-panel rounded-[2rem] p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-300">
                      <Icons.Terminal size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-white">Homebrew</h3>
                      <p className="text-sm text-slate-400">Nhanh nhất và tự chọn đúng binary.</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <TerminalBlock
                      command="brew install --cask phamhungtien/tap/phtv"
                      label="Install"
                      output={`==> Downloading PHTV...\n==> Installing Cask phtv\n🍺  phtv was successfully installed!`}
                    />
                  </div>

                  <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">Trước khi dùng</p>
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                        <li className="flex gap-3"><Icons.X size={16} className="mt-1 shrink-0 text-rose-300" />Tắt các tính năng auto-correct của macOS.</li>
                        <li className="flex gap-3"><Icons.ShieldCheck size={16} className="mt-1 shrink-0 text-emerald-300" />Bật quyền Accessibility cho PHTV.</li>
                        <li className="flex gap-3"><Icons.Keyboard size={16} className="mt-1 shrink-0 text-amber-300" />Dùng `Control + Shift` để chuyển Việt/Anh.</li>
                      </ul>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">Nếu Gatekeeper chặn</p>
                      <div className="mt-4">
                        <TerminalBlock command="xattr -cr /Applications/PHTV.app" label="Fix" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="glass-panel rounded-[2rem] p-6 md:p-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-rose-300">
                        <Icons.Download size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black tracking-tight text-white">Tải file .dmg</h3>
                        <p className="text-sm text-slate-400">Rõ ràng, đúng bản, ít bước.</p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {hasSplitDownloads ? (
                        <>
                          <DownloadChoiceCard
                            href={arm64DownloadUrl ?? releaseUrl}
                            title="Apple Silicon"
                            chip="Mac dùng chip Apple"
                            note="Phù hợp cho hầu hết máy Mac hiện nay."
                            tone="accent"
                          />
                          <DownloadChoiceCard
                            href={intelDownloadUrl ?? releaseUrl}
                            title="Intel"
                            chip="Mac dùng chip Intel"
                            note="Dành cho các máy chạy Intel."
                          />
                        </>
                      ) : (
                        <a
                          href={universalDownloadUrl ?? downloadUrl}
                          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base font-black text-slate-950 transition-colors hover:bg-slate-100"
                        >
                          <Icons.Download size={20} />
                          Tải PHTV
                        </a>
                      )}
                    </div>

                    <a
                      href={releaseUrl}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
                    >
                      Xem GitHub Releases
                      <Icons.ArrowRight size={15} />
                    </a>
                  </div>

                  <div className="glass-panel rounded-[2rem] p-6 md:p-8">
                    <h3 className="text-xl font-black tracking-tight text-white">Yêu cầu hệ thống</h3>
                    <div className="mt-5 space-y-4">
                      {[
                        ['Hệ điều hành', 'macOS 13.0+'],
                        ['Kiến trúc', 'Apple Silicon hoặc Intel'],
                        ['Quyền cần cấp', 'Accessibility'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-start justify-between gap-4 border-b border-white/6 pb-4 last:border-b-0 last:pb-0">
                          <span className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">{label}</span>
                          <span className="text-right text-sm font-semibold text-white md:text-base">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="reveal"><Shortcuts /></div>
          <div className="reveal"><VideoTutorial /></div>

          <section id="faq" className="reveal mx-auto max-w-5xl px-4 py-20 md:px-6 md:py-24">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-300/80">FAQ</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
                Những câu hỏi phổ biến nhất
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
                Câu trả lời ngắn gọn, rõ ràng và dễ tìm khi cần cài đặt hoặc xử lý sự cố.
              </p>
            </div>

            <div className="space-y-8">
              {faqData.map((category) => (
                <div key={category.category}>
                  <h3 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-amber-200/85">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item, i) => (
                      <div key={i} className="glass-card overflow-hidden rounded-[1.5rem]">
                        <details className="group/details">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left md:px-6">
                            <span className="pr-2 text-sm font-black tracking-tight text-white md:text-base">
                              {item.q}
                            </span>
                            <span className="shrink-0 text-slate-500 transition-transform duration-300 group-open/details:rotate-180 group-open/details:text-amber-300">
                              <Icons.ChevronDown size={18} />
                            </span>
                          </summary>
                          <div className="border-t border-white/6 px-5 pb-5 pt-4 text-sm leading-7 text-slate-400 md:px-6 md:text-base">
                            {item.a}
                          </div>
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
