import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Features } from './components/Features';
import { TerminalBlock } from './components/TerminalBlock';
import { Footer } from './components/Footer';
import { Icons } from './components/Icons';
import { useGitHubData } from './hooks/useGitHubData';
import { useI18n } from './i18n';

// Moved components
import { CopyBlock } from './components/CopyBlock';
import { DonateModal } from './components/DonateModal';
import { AcronymRow } from './components/AcronymRow';
import { QASection } from './components/QASection';

const faqData = [
  {
    category: "Cài đặt & Cấu hình",
    categoryEn: "Installation & Configuration",
    items: [
      {
        q: "PHTV có tương thích với phiên bản macOS nào?",
        qEn: "Which macOS versions are compatible with PHTV?",
        a: "PHTV hỗ trợ macOS 14.0+ (Sonoma trở lên). Từ các bản phát hành mới, PHTV tách riêng binary cho Apple Silicon và Intel để tải đúng theo từng dòng máy, đồng thời vẫn tương thích với mọi Mac chạy macOS 14.0+.",
        aEn: "PHTV supports macOS 14.0+ (Sonoma and above). Starting from new releases, PHTV splits separate binaries for Apple Silicon and Intel to download correctly depending on your machine model, while remaining compatible with all Macs running macOS 14.0+."
      },
      {
        q: "Cách nào dễ nhất để cài đặt PHTV?",
        qEn: "What is the easiest way to install PHTV?",
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
          </div>
        ),
        aEn: (
          <div>
            <p className="mb-2">Using Homebrew (recommended):</p>
            <CopyBlock code="brew install --cask phamhungtien/tap/phtv" className="mb-3" colorClass="text-brand-300" />
            
            <p className="mb-2 text-sm text-slate-300 font-semibold">Management Commands:</p>
            <div className="space-y-2 mb-3">
               <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500">Upgrade:</span>
                  <CopyBlock code="brew upgrade --cask phtv" />
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500">Uninstall:</span>
                  <CopyBlock code="brew uninstall --cask phtv" />
               </div>
            </div>

            <p className="text-sm">Or download directly from <a href="https://phamhungtien.com/PHTV/" className="text-brand-400 hover:underline">phamhungtien.com/PHTV</a> or <a href="https://github.com/PhamHungTien/PHTV/releases" className="text-brand-400 hover:underline">GitHub Releases</a>. If manually downloading, make sure to pick the right <strong>Apple Silicon</strong> or <strong>Intel</strong> build.</p>
          </div>
        )
      },
      {
        q: "Làm sao để chuyển đổi giữa tiếng Anh và tiếng Việt?",
        qEn: "How do I switch between English and Vietnamese?",
        a: "Nhấn phím tắt được cấu hình (mặc định Ctrl + Shift). Hoặc click vào Status Bar icon để chọn ngôn ngữ.",
        aEn: "Press the configured shortcut (default Ctrl + Shift). Or click the status bar icon to select language."
      },
      {
        q: "Phương pháp gõ nào phù hợp nhất?",
        qEn: "Which typing method is best?",
        a: (
           <ul className="list-disc list-inside space-y-1">
             <li><strong>Telex</strong>: Phổ biến, dễ học (ơ=ow, ư=uw, â=aa, v.v.)</li>
             <li><strong>VNI</strong>: Gõ bằng số (1-9 cho các dấu)</li>
             <li><strong>Simple Telex 1/2</strong>: Biến thể đơn giản của Telex. Hãy thử từng cái để tìm phù hợp nhất!</li>
           </ul>
        ),
        aEn: (
           <ul className="list-disc list-inside space-y-1">
             <li><strong>Telex</strong>: Popular and easy to learn (ơ=ow, ư=uw, â=aa, etc.)</li>
             <li><strong>VNI</strong>: Numbers-based input (1-9 for diacritics)</li>
             <li><strong>Simple Telex 1/2</strong>: Simple variations of Telex. Try each to find your preference!</li>
           </ul>
        )
      }
    ]
  },
  {
    category: "Bảo mật & Quyền riêng tư",
    categoryEn: "Security & Privacy",
    items: [
      {
        q: "PHTV có gửi dữ liệu lên Internet không?",
        qEn: "Does PHTV send my typing data to the Internet?",
        a: "PHTV hoàn toàn offline và không thu thập dữ liệu cá nhân. GIF picker cần Internet để tải GIF từ Klipy API.",
        aEn: "PHTV is completely offline and does not collect any personal data. The GIF picker needs an Internet connection to fetch GIFs from the Klipy API."
      },
      {
        q: "Tại sao PHTV cần quyền Accessibility?",
        qEn: "Why does PHTV require Accessibility permissions?",
        a: "Để giám sát phím gõ, chuyển ngôn ngữ, hoạt động trên mọi ứng dụng. Yêu cầu chuẩn của macOS.",
        aEn: "To monitor keypresses for composition, switch languages, and function globally across all apps. This is a standard requirement for all macOS input methods."
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
      className={`download-choice group flex items-center justify-between gap-4 px-4 py-3.5 ${
        accent ? 'download-choice-primary' : ''
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="download-choice-icon flex h-9 w-9 shrink-0 items-center justify-center">
          <Icons.Download size={18} />
        </div>
        <div className="min-w-0 text-left">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <span className="text-xs text-slate-400">{chip}</span>
          </div>
          <p className="truncate text-xs text-slate-400">{note}</p>
        </div>
      </div>
      <Icons.ArrowRight size={16} className="shrink-0 text-slate-400" />
    </a>
  );
};

function App() {
  const { lang, t } = useI18n();
  const {
    downloadUrl,
    releaseUrl,
    arm64DownloadUrl,
    intelDownloadUrl,
    universalDownloadUrl,
    hasSplitDownloads,
    version,
    loading
  } = useGitHubData();
  const [showDonate, setShowDonate] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'community'>('home');

  // Reveal Animation Logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0,
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
    <div className="phtv-page min-h-screen overflow-x-hidden bg-slate-950 text-white selection:bg-rose-500/30 selection:text-white">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 mesh-gradient pointer-events-none" />
      
      {/* Top Loading Bar */}
      <div className={`fixed top-0 left-0 right-0 h-1 z-[110] transition-transform duration-500 origin-left ${loading ? 'scale-x-100' : 'scale-x-0'}`}>
        <div className="h-full bg-[#0071e3]"></div>
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
          <main className="relative overflow-hidden px-4 pb-12 pt-24 md:px-6 md:pb-16 md:pt-28">
            <h1 className="sr-only">PHTV - Bộ gõ tiếng Việt Precision Hybrid Typing Vietnamese cho macOS</h1>

            <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 text-center lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-16 lg:text-left">
              {/* Left Column: Grouped info and download card */}
              <div className="flex flex-col space-y-6 md:space-y-8 min-w-0">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span className="text-[10px] font-black uppercase text-slate-300">
                      {t('home.tag_native')}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-row items-center justify-center gap-4 lg:justify-start">
                    <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
                      <img
                        src="/assets/phtv-icon.webp"
                        alt="PHTV Icon"
                        className="h-full w-full rounded-[1.25rem] object-cover"
                        fetchPriority="high"
                      />
                    </div>

                    <div className="flex flex-col justify-center gap-1 text-left">
                      <AcronymRow letter="P" word="recision" />
                      <AcronymRow letter="H" word="ybrid" />
                      <AcronymRow letter="T" word="yping" />
                      <AcronymRow letter="V" word="ietnamese" />
                    </div>
                  </div>

                  <p className="mx-auto mt-6 max-w-md text-base font-medium leading-relaxed text-slate-300 lg:mx-0 lg:max-w-none lg:text-lg">
                    {lang === 'vi' ? (
                      <>
                        Bộ gõ tiếng Việt <span className="font-bold text-white">offline</span>, <span className="font-bold text-white">nhanh</span> và <span className="font-bold text-white">riêng tư</span> cho macOS.
                      </>
                    ) : (
                      <>
                        An <span className="font-bold text-white">offline</span>, <span className="font-bold text-white">fast</span> and <span className="font-bold text-white">private</span> Vietnamese typing method for macOS.
                      </>
                    )}
                  </p>
                </div>

                <div className="mx-auto w-full max-w-xl px-1 lg:mx-0 min-w-0">
                  {hasSplitDownloads ? (
                    <div className="glass-panel p-4 md:p-5">
                      <div className="mb-4 flex items-center justify-between gap-3 text-left">
                        <div>
                          <h2 className="text-base font-semibold text-white">{t('home.download_title')}</h2>
                          <p className="mt-1 text-xs text-slate-400">{version} / macOS 14+</p>
                        </div>
                        <Icons.Download size={18} className="text-blue-500" />
                      </div>

                      <div className="space-y-2">
                        <DownloadChoiceCard
                          href={arm64DownloadUrl ?? releaseUrl}
                          title="Apple Silicon"
                          chip={t('nav.apple_silicon_desc')}
                          note={t('home.download_silicon_note')}
                          tone="accent"
                        />
                        <DownloadChoiceCard
                          href={intelDownloadUrl ?? releaseUrl}
                          title="Intel"
                          chip={t('nav.intel_desc')}
                          note={t('home.download_intel_note')}
                        />
                      </div>
                    </div>
                  ) : (
                    <a
                      href={universalDownloadUrl ?? downloadUrl}
                      className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-black text-slate-950 transition-colors hover:bg-slate-100 md:w-auto md:text-lg"
                    >
                      <Icons.Download size={20} />
                      {t('home.download_universal').replace('{version}', version)}
                    </a>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <a
                      href="#install"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600"
                    >
                      <Icons.Terminal size={16} />
                      {t('home.install_btn')}
                    </a>
                    <button
                      onClick={() => {
                        setActiveTab('community');
                        window.location.hash = '#community';
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600"
                    >
                      <Icons.MessageSquare size={16} />
                      {t('home.discuss_btn')}
                    </button>
                    <button
                      onClick={() => setShowDonate(true)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600"
                    >
                      <Icons.Heart size={16} />
                      {t('home.donate')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Mockup macOS Settings Window */}
              <div className="w-full flex justify-center items-center lg:justify-end min-w-0">
                <div className="relative w-full max-w-2xl group">
                  {/* Dynamic background colorful gradient glow */}
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* The Premium macOS Window Mockup container */}
                  <div className="relative w-full overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-slate-900/5 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.16)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out group-hover:scale-[1.015] group-hover:-translate-y-1">
                    {/* Screenshot Container */}
                    <div className="w-full bg-[#f5f5f7] overflow-hidden">
                      <img
                        src="/PHTV/assets/UI/settings-hero.png"
                        alt={lang === 'vi' ? 'Giao diện thiết lập bộ gõ PHTV trên macOS' : 'PHTV input method settings on macOS'}
                        className="block h-auto w-full max-w-full select-none"
                        fetchPriority="high"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <div className="reveal"><Features /></div>

          <section id="install" className="reveal scroll-mt-24 py-14 md:py-16">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
              <div className="mb-8 max-w-2xl">
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  {t('install.title')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {t('install.desc')}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="glass-panel p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-blue-600">
                      <Icons.Terminal size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{t('install.brew_title')}</h3>
                      <p className="text-sm text-slate-400">{t('install.brew_sub')}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <TerminalBlock
                      command="brew install --cask phamhungtien/tap/phtv"
                      label="Install"
                      output={t('home.brew_output')}
                    />
                  </div>

                  <div className="mt-5 border-t border-slate-200 pt-4">
                      <ul className="space-y-2 text-sm leading-6 text-slate-300">
                        <li className="flex gap-3"><Icons.ShieldCheck size={16} className="mt-1 shrink-0 text-emerald-300" />{t('install.before_rule2')}</li>
                        <li className="flex gap-3"><Icons.Keyboard size={16} className="mt-1 shrink-0 text-amber-300" />{t('install.before_rule3')}</li>
                      </ul>
                  </div>
                </div>

                <div className="glass-panel p-5 md:p-6">
                    <h3 className="text-lg font-semibold text-white">{t('install.sys_req')}</h3>
                    <div className="mt-4 space-y-3">
                      {[
                        [t('install.os'), 'macOS 14.0+'],
                        [t('install.arch'), 'Apple Silicon / Intel'],
                        [t('install.permissions'), 'Accessibility'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-start justify-between gap-4 border-b border-white/6 pb-4 last:border-b-0 last:pb-0">
                          <span className="text-sm text-slate-500">{label}</span>
                          <span className="text-right text-sm font-medium text-white">{value}</span>
                        </div>
                      ))}
                    <a href={releaseUrl} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-600">
                      {lang === 'vi' ? 'Bản phát hành và ghi chú' : 'Releases and notes'}
                      <Icons.ArrowRight size={15} />
                    </a>
                </div>
                </div>
              </div>
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
