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
import { useI18n } from './i18n';

// Moved components
import { CopyBlock } from './components/CopyBlock';
import { StatBadge } from './components/StatBadge';
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
        {localStorage.getItem('preferred_lang') === 'en' ? 'Download this build' : 'Tải bản này'}
        <Icons.ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </div>
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
                  {t('home.tag_native')}
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
                {lang === 'vi' ? (
                  <>
                    Bộ gõ tiếng Việt <span className="font-bold text-white text-glow-sm">offline</span>, <span className="font-bold text-white text-glow-sm">nhanh</span> và <span className="font-bold text-white text-glow">riêng tư</span> cho macOS.
                  </>
                ) : (
                  <>
                    An <span className="font-bold text-white text-glow-sm">offline</span>, <span className="font-bold text-white text-glow-sm">fast</span> and <span className="font-bold text-white text-glow">private</span> Vietnamese typing method for macOS.
                  </>
                )}
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-lg">
                {t('home.desc_sub')}
              </p>

              <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3 md:mt-10 md:gap-4">
                <StatBadge icon={Icons.Tag} label={t('home.version')} value={version} href="https://github.com/PhamHungTien/PHTV/releases/latest" colorClass="text-blue-300" />
                <StatBadge icon={Icons.Heart} label={t('home.donate')} value="Donate" onClick={() => setShowDonate(true)} colorClass="text-rose-300" />
              </div>

              <div className="mx-auto mt-10 w-full max-w-4xl px-1 md:mt-12">
                {hasSplitDownloads ? (
                  <div className="glass-panel rounded-[2rem] border border-white/10 p-5 md:p-7">
                    <div className="flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-300/80">{t('nav.quick_download')}</p>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-white md:text-3xl">
                          {t('home.download_title')}
                        </h2>
                      </div>
                      <p className="max-w-md text-sm leading-7 text-slate-400 md:text-base">
                        {t('home.download_subtitle')}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
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

                <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="#install"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.06]"
                  >
                    <Icons.Terminal size={16} />
                    {t('home.install_btn')}
                  </a>
                  <button
                    onClick={() => {
                      setActiveTab('community');
                      window.location.hash = '#community';
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
                  >
                    <Icons.MessageSquare size={16} />
                    {t('home.discuss_btn')}
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
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-300/80">{t('install.kicker')}</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
                  {t('install.title')}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
                  {t('install.desc')}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="glass-panel rounded-[2rem] p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-300">
                      <Icons.Terminal size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-white">{t('install.brew_title')}</h3>
                      <p className="text-sm text-slate-400">{t('install.brew_sub')}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <TerminalBlock
                      command="brew install --cask phamhungtien/tap/phtv"
                      label="Install"
                      output={t('home.brew_output')}
                    />
                  </div>

                  <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">{t('install.before_use')}</p>
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                        <li className="flex gap-3"><Icons.X size={16} className="mt-1 shrink-0 text-rose-300" />{t('install.before_rule1')}</li>
                        <li className="flex gap-3"><Icons.ShieldCheck size={16} className="mt-1 shrink-0 text-emerald-300" />{t('install.before_rule2')}</li>
                        <li className="flex gap-3"><Icons.Keyboard size={16} className="mt-1 shrink-0 text-amber-300" />{t('install.before_rule3')}</li>
                      </ul>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">{t('install.gatekeeper')}</p>
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
                        <h3 className="text-xl font-black tracking-tight text-white">{t('install.dmg_title')}</h3>
                        <p className="text-sm text-slate-400">{t('install.dmg_sub')}</p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {hasSplitDownloads ? (
                        <>
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
                        </>
                      ) : (
                        <a
                          href={universalDownloadUrl ?? downloadUrl}
                          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base font-black text-slate-950 transition-colors hover:bg-slate-100"
                        >
                          <Icons.Download size={20} />
                          {t('nav.download_now')}
                        </a>
                      )}
                    </div>

                    <a
                      href={releaseUrl}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
                    >
                      {lang === 'vi' ? 'Xem GitHub Releases' : 'View GitHub Releases'}
                      <Icons.ArrowRight size={15} />
                    </a>
                  </div>

                  <div className="glass-panel rounded-[2rem] p-6 md:p-8">
                    <h3 className="text-xl font-black tracking-tight text-white">{t('install.sys_req')}</h3>
                    <div className="mt-5 space-y-4">
                      {[
                        [t('install.os'), 'macOS 14.0+'],
                        [t('install.arch'), 'Apple Silicon / Intel'],
                        [t('install.permissions'), 'Accessibility'],
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
                {t('faq.title')}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
                {t('faq.desc')}
              </p>
            </div>

            <div className="space-y-8">
              {faqData.map((category) => (
                <div key={category.category}>
                  <h3 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-amber-200/85">
                    {lang === 'vi' ? category.category : category.categoryEn}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item, i) => (
                      <div key={i} className="glass-card overflow-hidden rounded-[1.5rem]">
                        <details className="group/details">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left md:px-6">
                            <span className="pr-2 text-sm font-black tracking-tight text-white md:text-base">
                              {lang === 'vi' ? item.q : item.qEn}
                            </span>
                            <span className="shrink-0 text-slate-500 transition-transform duration-300 group-open/details:rotate-180 group-open/details:text-amber-300">
                              <Icons.ChevronDown size={18} />
                            </span>
                          </summary>
                          <div className="border-t border-white/6 px-5 pb-5 pt-4 text-sm leading-7 text-slate-400 md:px-6 md:text-base">
                            {lang === 'vi' ? item.a : item.aEn}
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
