import { useState, useEffect } from 'react';

const DICTIONARY = {
  vi: {
    // Navbar
    "nav.home": "Trang chính",
    "nav.features": "Tính năng",
    "nav.gallery": "Giao diện",
    "nav.install": "Cài đặt",
    "nav.faq": "FAQ",
    "nav.community": "Thảo luận",
    "nav.download_label": "Tải cho Mac",
    "nav.download_now": "Tải ngay",
    "nav.quick_download": "Tải nhanh",
    "nav.download_desc": "Chọn theo kiến trúc máy, không cần quan tâm đời chip cụ thể.",
    "nav.apple_silicon_desc": "Mac dùng chip Apple",
    "nav.intel_desc": "Mac dùng chip Intel",
    "nav.homebrew_desc": "Tự chọn đúng binary",
    "nav.close_menu": "Đóng menu",
    "nav.open_menu": "Mở menu",
    "nav.discuss_report": "Thảo luận hoặc báo lỗi",

    // Home
    "home.tag_native": "Native cho macOS 14+",
    "home.desc_bold": "offline, nhanh và riêng tư cho macOS.",
    "home.desc_sub": "Thiết kế tập trung vào phần cốt lõi: thao tác nhanh, bố cục rõ ràng và khả năng hiển thị ổn định trên nhiều kích thước màn hình.",
    "home.version": "Phiên bản",
    "home.donate": "Ủng hộ",
    "home.download_title": "Chọn đúng bản cho máy Mac của bạn",
    "home.download_subtitle": "Chọn theo kiến trúc máy: Apple Silicon cho các Mac dùng chip Apple, Intel cho các máy Mac đời cũ hơn.",
    "home.download_silicon_note": "Phù hợp cho hầu hết máy Mac hiện nay.",
    "home.download_intel_note": "Dành cho các máy Mac chạy Intel.",
    "home.download_universal": "Tải xuống {version}",
    "home.install_btn": "Xem cách cài đặt",
    "home.discuss_btn": "Thảo luận hoặc báo lỗi",
    "home.brew_output": "==> Downloading PHTV...\n==> Installing Cask phtv\n🍺  phtv was successfully installed!",

    // Installation Section
    "install.kicker": "Cài đặt",
    "install.title": "Cài nhanh, cấu hình gọn và đúng ngay từ đầu",
    "install.desc": "Ba bước quan trọng nhất để cài đúng, mở được app và bắt đầu gõ ngay trên macOS.",
    "install.brew_title": "Homebrew",
    "install.brew_sub": "Nhanh nhất và tự chọn đúng binary.",
    "install.before_use": "Trước khi dùng",
    "install.before_rule1": "Tắt các tính năng auto-correct của macOS.",
    "install.before_rule2": "Bật quyền Accessibility cho PHTV.",
    "install.before_rule3": "Dùng `Control + Shift` để chuyển Việt/Anh.",
    "install.gatekeeper": "Nếu Gatekeeper chặn",
    "install.dmg_title": "Tải file .dmg",
    "install.dmg_sub": "Rõ ràng, đúng bản, ít bước.",
    "install.sys_req": "Yêu cầu hệ thống",
    "install.os": "Hệ điều hành",
    "install.arch": "Kiến trúc",
    "install.permissions": "Quyền cần cấp",
    
    // Shortcuts
    "shortcuts.title": "Tối ưu hóa phím tắt, tăng tốc làm việc",
    
    // Video
    "video.title": "Video Hướng Dẫn Cài Đặt Chi Tiết",
    "video.desc": "Xem cách tải, mở và phân quyền cho PHTV chỉ trong 1 phút.",

    // FAQ
    "faq.title": "Những câu hỏi phổ biến nhất",
    "faq.desc": "Câu trả lời ngắn gọn, rõ ràng và dễ tìm khi cần cài đặt hoặc xử lý sự cố.",

    // Donate
    "donate.title": "Đồng hành cùng PHTV",
    "donate.desc": "PHTV là dự án mã nguồn mở phi lợi nhuận. Sự ủng hộ của bạn giúp duy trì và phát triển dự án tốt hơn.",

    // Footer
    "footer.desc": "Bộ gõ tiếng Việt hiện đại cho macOS, tập trung vào hiệu năng, độ ổn định và quyền riêng tư.",
    "footer.links": "Liên kết",
    "footer.support": "Hỗ trợ",
    "footer.support_desc": "Nếu PHTV hữu ích với bạn, mình rất trân trọng mọi phản hồi, issue hoặc một ly cà phê ủng hộ.",
    "footer.donate_btn": "Ủng hộ dự án"
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.gallery": "Interface",
    "nav.install": "Installation",
    "nav.faq": "FAQ",
    "nav.community": "Discuss",
    "nav.download_label": "Download for Mac",
    "nav.download_now": "Download Now",
    "nav.quick_download": "Quick Download",
    "nav.download_desc": "Select according to machine architecture, no need to worry about specific chip generations.",
    "nav.apple_silicon_desc": "Mac with Apple chip",
    "nav.intel_desc": "Mac with Intel chip",
    "nav.homebrew_desc": "Automatically selects binary",
    "nav.close_menu": "Close menu",
    "nav.open_menu": "Open menu",
    "nav.discuss_report": "Discuss or report bugs",

    // Home
    "home.tag_native": "Native for macOS 14+",
    "home.desc_bold": "offline, fast and private for macOS.",
    "home.desc_sub": "Tailored focus on the core values: quick action, clean layout and stable presentation across all screen sizes.",
    "home.version": "Version",
    "home.donate": "Donate",
    "home.download_title": "Choose the right version for your Mac",
    "home.download_subtitle": "Select by architecture: Apple Silicon for Macs using Apple chips, Intel for older Mac systems.",
    "home.download_silicon_note": "Recommended for most current Macs.",
    "home.download_intel_note": "For Macs running on Intel processors.",
    "home.download_universal": "Download {version}",
    "home.install_btn": "Installation guide",
    "home.discuss_btn": "Discuss or report bugs",
    "home.brew_output": "==> Downloading PHTV...\n==> Installing Cask phtv\n🍺  phtv was successfully installed!",

    // Installation Section
    "install.kicker": "Installation",
    "install.title": "Install quickly, configure cleanly, and work right out of the box",
    "install.desc": "Three key steps to install properly, open the app, and start typing immediately on macOS.",
    "install.brew_title": "Homebrew",
    "install.brew_sub": "Fastest way, auto-selects the right binary.",
    "install.before_use": "Before you begin",
    "install.before_rule1": "Turn off macOS auto-correct features.",
    "install.before_rule2": "Grant Accessibility permissions to PHTV.",
    "install.before_rule3": "Use `Control + Shift` to switch Vietnamese/English.",
    "install.gatekeeper": "If Gatekeeper blocks it",
    "install.dmg_title": "Download .dmg",
    "install.dmg_sub": "Clear, correct binary, minimal steps.",
    "install.sys_req": "System Requirements",
    "install.os": "Operating System",
    "install.arch": "Architecture",
    "install.permissions": "Permissions required",

    // Shortcuts
    "shortcuts.title": "Optimize keyboard shortcuts, accelerate work",
    
    // Video
    "video.title": "Detailed Installation Video Guide",
    "video.desc": "Watch how to download, open, and grant permissions for PHTV in just 1 minute.",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.desc": "Short, clear and easy to find answers when you need to install or troubleshoot.",

    // Donate
    "donate.title": "Support PHTV Development",
    "donate.desc": "PHTV is a non-profit open source project. Your support helps maintain and develop the project better.",

    // Footer
    "footer.desc": "Modern Vietnamese input method for macOS, focusing on performance, stability, and privacy.",
    "footer.links": "Links",
    "footer.support": "Support",
    "footer.support_desc": "If PHTV is helpful to you, I really appreciate any feedback, issues, or a supportive coffee.",
    "footer.donate_btn": "Donate to the project"
  }
};

type Lang = 'vi' | 'en';

export function useI18n() {
  const [lang, setLang] = useState<Lang>(() => {
    const cached = localStorage.getItem('preferred_lang');
    if (cached === 'vi' || cached === 'en') return cached as Lang;
    
    const browserLang = navigator.language || '';
    return browserLang.toLowerCase().startsWith('vi') ? 'vi' : 'en';
  });

  useEffect(() => {
    // Listen to changes from static page script if navigated inside same tab
    const handleLangChange = (e: Event) => {
      const nextLang = (e as CustomEvent).detail;
      if (nextLang === 'vi' || nextLang === 'en') {
        setLang(nextLang);
      }
    };

    window.addEventListener('langchange', handleLangChange);

    // Dynamic IP Geolocation Detection for React app first visit
    if (!localStorage.getItem('preferred_lang')) {
      fetch('https://freeipapi.com/api/json')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.countryCode) {
            const detected = data.countryCode === 'VN' ? 'vi' : 'en';
            localStorage.setItem('preferred_lang', detected);
            setLang(detected);
            window.dispatchEvent(new CustomEvent('langchange', { detail: detected }));
          }
        })
        .catch((err) => console.warn('PHTV Geo-IP language detection failed:', err));
    }

    return () => {
      window.removeEventListener('langchange', handleLangChange);
    };
  }, []);

  const changeLanguage = (nextLang: Lang) => {
    localStorage.setItem('preferred_lang', nextLang);
    setLang(nextLang);
    // Dispatch custom event to let other parts know (e.g. index script)
    window.dispatchEvent(new CustomEvent('langchange', { detail: nextLang }));
  };

  const t = (key: keyof typeof DICTIONARY['vi']): string => {
    return DICTIONARY[lang][key] || DICTIONARY['en'][key] || key;
  };

  return { lang, t, changeLanguage };
}
