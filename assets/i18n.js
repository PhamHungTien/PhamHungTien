(function () {
  const DICTIONARY = {
    vi: {
      // Root Index
      "root.title": "Pham Hung Tien | Sản phẩm",
      "root.meta_desc": "Trang chính thức của Pham Hung Tien với các sản phẩm dành cho macOS, gồm PHTV và LunarV.",
      "root.brand_subtitle": "Danh sách sản phẩm",
      "root.contact": "Liên hệ",
      "root.developer": "Nhà phát triển",
      "root.apps_products": "Ứng dụng & Sản phẩm",
      "root.phtv_desc": "Precision Hybrid Typing Vietnamese tập trung vào tốc độ, độ chính xác và quyền riêng tư, với trải nghiệm gõ tiếng Việt native, gọn và ổn định.",
      "root.phtv_subtitle": "Bộ gõ tiếng Việt hiện đại cho macOS.",
      "root.lunarv_desc": "LunarV hỗ trợ theo dõi lịch âm, ngày lễ và các mốc thời gian quen thuộc theo cách nhẹ nhàng, rõ ràng và phù hợp với giao diện hệ thống.",
      "root.lunarv_subtitle": "Vietnamese Lunar Calendar cho macOS.",
      "root.aipadcode_desc": "Viết, chạy và quản lý code trên thiết bị di động với Compiler offline và Apple Intelligence tích hợp.",
      "root.aipadcode_subtitle": "Code Editor & IDE cho iPad/iPhone",
      "root.open_product": "Mở trang sản phẩm",
      "root.tag_lunar": "Lịch âm",
      "root.tag_reminders": "Nhắc nhở",
      "root.tag_offline": "Ngoại tuyến",
      "root.tag_opensource": "Mã nguồn mở",
      "root.tag_compiler": "Biên dịch offline",

      // AiPadCode Index
      "aipad.title": "AiPadCode - Trình soạn thảo & Biên dịch code cho iPad & iPhone",
      "aipad.meta_desc": "Viết, chạy và quản lý mã nguồn trong hơn 24 ngôn ngữ lập trình trực tiếp trên thiết bị của bạn. AiPadCode tích hợp local compiler, terminal và Apple Intelligence.",
      "aipad.brand_subtitle": "IDE cho iPad/iPhone",
      "aipad.features_nav": "Tính năng",
      "aipad.hero_title": "Code mọi lúc, mọi nơi.<br><span class=\"gradient-text\">Không giới hạn.</span>",
      "aipad.hero_desc": "Code Editor và IDE chuyên nghiệp dành riêng cho iPad và iPhone. Viết và biên dịch code offline với sự hỗ trợ của Apple Intelligence!",
      "aipad.download_btn": "Tải trên App Store",
      "aipad.features_kicker": "Tính năng nổi bật",
      "aipad.features_title": "Dành cho <span class=\"gradient-text\">Serious Developers</span>",
      "aipad.features_desc": "Tất cả mọi công cụ bạn cần để xây dựng, biên dịch và triển khai phần mềm trực tiếp từ thiết bị di động.",
      "aipad.feat1_title": "Local Code Runner",
      "aipad.feat1_desc": "Thực thi mã trực tiếp trên thiết bị mà không cần internet. Hỗ trợ đầy đủ các thuật toán phức tạp.",
      "aipad.feat2_title": "Apple Intelligence",
      "aipad.feat2_desc": "Trợ lý AI tích hợp sâu, giúp giải thích code, gỡ lỗi và tối ưu hóa mã nguồn theo thời gian thực.",
      "aipad.feat3_title": "24+ Ngôn ngữ",
      "aipad.feat3_desc": "Tô màu cú pháp và tự động hoàn thành cho Swift, Python, JS, C++, Java, Go, Rust, v.v.",
      "aipad.feat4_title": "Integrated Terminal",
      "aipad.feat4_desc": "Giao diện dòng lệnh chân thực, cho phép bạn tương tác trực tiếp với môi trường lập trình.",
      "aipad.feat5_title": "Git Source Control",
      "aipad.feat5_desc": "Hệ thống quản lý phiên bản tích hợp. Clone repo, commit và push mã nguồn trực tiếp lên GitHub.",
      "aipad.feat6_title": "Smart Workspaces",
      "aipad.feat6_desc": "Quản lý dự án, điều hướng thư mục và dễ dàng tìm kiếm/thay thế văn bản trên nhiều tệp.",
      "aipad.copyright": "&copy; 2026 Pham Hung Tien. Bảo lưu mọi quyền.",

      // LunarV Index
      "lunar.title": "LunarV | Lịch âm Việt Nam cho macOS",
      "lunar.meta_desc": "LunarV là ứng dụng lịch âm Việt Nam cho macOS, hỗ trợ xem ngày, dịp gia đình và thông báo trong giao diện menu bar gọn gàng.",
      "lunar.brand_subtitle": "Lịch âm Việt Nam cho macOS",
      "lunar.home": "Trang chính",
      "lunar.hero_kicker": "Menu bar app cho macOS",
      "lunar.hero_title": "Theo dõi lịch âm và những dịp quan trọng theo cách gọn gàng hơn.",
      "lunar.hero_desc": "LunarV mang lịch âm Việt Nam lên macOS với giao diện rõ ràng, nhẹ mắt và phù hợp để xem nhanh trong menu bar mỗi ngày.",
      "lunar.badge_lunar_solar": "Lịch âm & dương",
      "lunar.badge_family": "Dịp gia đình",
      "lunar.badge_reminders": "Thông báo nhắc nhở",
      "lunar.preview_caption": "Giao diện menu bar được tối ưu để xem ngày, tiết khí, can chi và thông tin trong ngày một cách nhanh chóng.",
      "lunar.download": "Tải về",
      "lunar.download_title": "Tải bản `.dmg` mới nhất của LunarV",
      "lunar.download_desc": "Trang này tự lấy bản phát hành mới nhất từ GitHub để bạn không phải cập nhật link thủ công mỗi lần release mới.",
      "lunar.latest_version": "Phiên bản mới nhất",
      "lunar.panel_title": "LunarV cho macOS",
      "lunar.panel_desc": "Tải nhanh file `.dmg`, mở ra rồi kéo ứng dụng vào thư mục `Applications`. Nếu muốn xem changelog đầy đủ, bạn vẫn có thể mở GitHub Releases.",
      "lunar.download_dmg": "Tải file .dmg",
      "lunar.version": "Phiên bản",
      "lunar.sys_req": "Yêu cầu hệ thống",
      "lunar.sys_req_val": "macOS 15 trở lên",
      "lunar.release_date": "Ngày phát hành",
      "lunar.highlights": "Điểm nổi bật",
      "lunar.highlights_title": "Những gì LunarV tập trung làm tốt",
      "lunar.highlights_desc": "Giao diện và tính năng được giữ gọn để việc xem lịch hằng ngày, dịp gia đình và thông báo trở nên tự nhiên trên macOS.",
      "lunar.feat1_title": "Lịch âm và dương trong cùng một nơi",
      "lunar.feat1_desc": "Xem nhanh ngày âm, ngày dương, can chi, tiết khí và các thông tin liên quan trong cùng một panel.",
      "lunar.feat2_title": "Dịp gia đình và ngày lễ",
      "lunar.feat2_desc": "Quản lý các dịp quan trọng và theo dõi các mốc thời gian quen thuộc một cách gọn gàng hơn.",
      "lunar.feat3_title": "Thông báo nhắc nhở",
      "lunar.feat3_desc": "Giữ những dịp quan trọng luôn ở gần với các thông báo được thiết kế cho bối cảnh sử dụng hằng ngày.",
      "lunar.feat4_title": "Tối ưu cho menu bar",
      "lunar.feat4_desc": "Hiển thị nhanh, ít thao tác và phù hợp với cách người dùng macOS mở app tiện ích trong ngày.",
      "lunar.gallery": "Giao diện",
      "lunar.gallery_title": "Xem nhanh cách LunarV hoạt động",
      "lunar.gallery_desc": "Hai màn hình dưới đây cho thấy rõ cách LunarV trình bày thông tin ngày âm, gợi ý trong ngày và các khối nội dung quan trọng.",
      "lunar.gallery1_desc": "Tổng quan ngày hiện tại với ngày âm, tiết khí, can chi và các thông tin cần xem nhanh.",
      "lunar.gallery2_desc": "Phần gợi ý trong ngày giúp xem nhanh các điểm đáng chú ý mà không cần mở ứng dụng lớn.",
      "lunar.install": "Cài đặt",
      "lunar.install_title": "Cài LunarV trong vài bước ngắn",
      "lunar.install_desc": "Quy trình cài đặt giữ rất gọn: tải `.dmg`, kéo vào `Applications`, rồi mở app từ Launchpad hoặc Applications.",
      "lunar.start": "Bắt đầu",
      "lunar.step1": "Tải file `.dmg` mới nhất bằng nút phía trên.",
      "lunar.step2": "Mở file `.dmg` rồi kéo `LunarV.app` vào thư mục `Applications`.",
      "lunar.step3": "Mở LunarV và cấp quyền thông báo nếu bạn muốn nhận nhắc nhở cho các dịp quan trọng.",
      "lunar.gatekeeper": "Nếu macOS chặn app",
      "lunar.gatekeeper_desc": "Trong trường hợp Gatekeeper báo app không mở được, bạn có thể chạy lệnh dưới đây rồi mở lại LunarV.",
      "lunar.report_bug": "Báo lỗi hoặc góp ý",
      "lunar.dev_at": "LunarV được phát triển tại",
      "lunar.terms": "Điều khoản sử dụng"
    },
    en: {
      // Root Index
      "root.title": "Pham Hung Tien | Products",
      "root.meta_desc": "Official website of Pham Hung Tien featuring software products for macOS, including PHTV and LunarV.",
      "root.brand_subtitle": "Product Index",
      "root.contact": "Contact",
      "root.developer": "Developer",
      "root.apps_products": "Apps & Products",
      "root.phtv_desc": "Precision Hybrid Typing Vietnamese focuses on speed, accuracy, and privacy, with a native, lightweight, and stable typing experience.",
      "root.phtv_subtitle": "Modern Vietnamese input method for macOS.",
      "root.lunarv_desc": "LunarV helps track lunar calendars, holidays, and family milestones in a lightweight, clear, and system-integrated interface.",
      "root.lunarv_subtitle": "Vietnamese Lunar Calendar for macOS.",
      "root.aipadcode_desc": "Write, run, and manage code on mobile devices with an offline compiler and integrated Apple Intelligence.",
      "root.aipadcode_subtitle": "Code Editor & IDE for iPad/iPhone",
      "root.open_product": "Open Product Page",
      "root.tag_lunar": "Lunar Calendar",
      "root.tag_reminders": "Reminders",
      "root.tag_offline": "Offline",
      "root.tag_opensource": "Open Source",
      "root.tag_compiler": "Offline Compiler",

      // AiPadCode Index
      "aipad.title": "AiPadCode - The Ultimate Code Editor for iPad & iPhone",
      "aipad.meta_desc": "Write, run, and manage code in 24+ languages directly on your device. AiPadCode features a local compiler, integrated terminal, and Apple Intelligence.",
      "aipad.brand_subtitle": "IDE for iPad/iPhone",
      "aipad.features_nav": "Features",
      "aipad.hero_title": "Code anytime, anywhere.<br><span class=\"gradient-text\">No limits.</span>",
      "aipad.hero_desc": "A professional Code Editor and IDE tailored for iPad and iPhone. Write and compile code offline with Apple Intelligence support!",
      "aipad.download_btn": "Download on App Store",
      "aipad.features_kicker": "Key Features",
      "aipad.features_title": "For <span class=\"gradient-text\">Serious Developers</span>",
      "aipad.features_desc": "All the tools you need to build, compile, and deploy software directly from your mobile device.",
      "aipad.feat1_title": "Local Code Runner",
      "aipad.feat1_desc": "Execute code directly on your device without internet. Full support for complex algorithms.",
      "aipad.feat2_title": "Apple Intelligence",
      "aipad.feat2_desc": "Deeply integrated AI assistant helps explain code, debug, and optimize source code in real-time.",
      "aipad.feat3_title": "24+ Languages",
      "aipad.feat3_desc": "Syntax highlighting and autocomplete for Swift, Python, JS, C++, Java, Go, Rust, etc.",
      "aipad.feat4_title": "Integrated Terminal",
      "aipad.feat4_desc": "A realistic command-line interface, allowing you to interact directly with the development environment.",
      "aipad.feat5_title": "Git Source Control",
      "aipad.feat5_desc": "Integrated version control system. Clone repositories, commit, and push source code directly to GitHub.",
      "aipad.feat6_title": "Smart Workspaces",
      "aipad.feat6_desc": "Manage projects, navigate directories, and easily search/replace text across multiple files.",
      "aipad.copyright": "&copy; 2026 Pham Hung Tien. All rights reserved.",

      // LunarV Index
      "lunar.title": "LunarV | Vietnamese Lunar Calendar for macOS",
      "lunar.meta_desc": "LunarV is a Vietnamese lunar calendar app for macOS, featuring date views, family events, and smart notifications in a clean menu bar.",
      "lunar.brand_subtitle": "Vietnamese Lunar Calendar for macOS",
      "lunar.home": "Home",
      "lunar.hero_kicker": "Menu bar app for macOS",
      "lunar.hero_title": "Track lunar calendar and important events in a cleaner way.",
      "lunar.hero_desc": "LunarV brings the Vietnamese lunar calendar to macOS with a clear, eye-pleasing interface designed for quick menu bar access.",
      "lunar.badge_lunar_solar": "Lunar & Solar Calendar",
      "lunar.badge_family": "Family Occasions",
      "lunar.badge_reminders": "Smart Notifications",
      "lunar.preview_caption": "Optimized menu bar interface to quickly view dates, solar terms, sexagenary cycle, and daily information.",
      "lunar.download": "Download",
      "lunar.download_title": "Download the latest LunarV `.dmg`",
      "lunar.download_desc": "This page automatically fetches the latest release from GitHub, so you don't have to manually update the link for each release.",
      "lunar.latest_version": "Latest Version",
      "lunar.panel_title": "LunarV for macOS",
      "lunar.panel_desc": "Quickly download the `.dmg` file, open it, and drag the app into the `Applications` folder. To view the full changelog, you can open GitHub Releases.",
      "lunar.download_dmg": "Download .dmg",
      "lunar.version": "Version",
      "lunar.sys_req": "System Requirements",
      "lunar.sys_req_val": "macOS 15 or later",
      "lunar.release_date": "Release Date",
      "lunar.highlights": "Key Highlights",
      "lunar.highlights_title": "What LunarV focuses on doing well",
      "lunar.highlights_desc": "Interface and features are kept minimal to make viewing daily calendars, family occasions, and notifications natural on macOS.",
      "lunar.feat1_title": "Lunar and Solar Calendars in one place",
      "lunar.feat1_desc": "Quickly view lunar and solar dates, sexagenary cycle, solar terms, and related info in a single panel.",
      "lunar.feat2_title": "Family Occasions & Holidays",
      "lunar.feat2_desc": "Manage important events and track familiar milestones in a cleaner layout.",
      "lunar.feat3_title": "Reminders & Notifications",
      "lunar.feat3_desc": "Keep important occasions close with notifications designed for daily usage contexts.",
      "lunar.feat4_title": "Optimized for Menu Bar",
      "lunar.feat4_desc": "Quick display, minimal action, and designed for how macOS users open utility apps.",
      "lunar.gallery": "Screenshots",
      "lunar.gallery_title": "A quick look at how LunarV works",
      "lunar.gallery_desc": "These two screens show how LunarV presents lunar dates, daily suggestions, and key content blocks.",
      "lunar.gallery1_desc": "Overview of the current day with lunar date, solar term, sexagenary cycle, and quick-view info.",
      "lunar.gallery2_desc": "Daily suggestions section helps check notable items quickly without opening a large app.",
      "lunar.install": "Installation",
      "lunar.install_title": "Install LunarV in a few short steps",
      "lunar.install_desc": "The installation process is very clean: download the `.dmg`, drag it to `Applications`, and open it from Launchpad or Applications.",
      "lunar.start": "Get Started",
      "lunar.step1": "Download the latest `.dmg` file using the button above.",
      "lunar.step2": "Open the `.dmg` file and drag `LunarV.app` into the `Applications` folder.",
      "lunar.step3": "Open LunarV and grant notification permissions if you want reminders for important events.",
      "lunar.gatekeeper": "If macOS blocks the app",
      "lunar.gatekeeper_desc": "If Gatekeeper warns that the app cannot be opened, you can run the following command and re-open LunarV.",
      "lunar.report_bug": "Report issues or feedback",
      "lunar.dev_at": "LunarV is developed at",
      "lunar.terms": "Terms of Use"
    }
  };

  // Get active language (cached, or navigator locale)
  function getLang() {
    let lang = localStorage.getItem("preferred_lang");
    if (!lang) {
      const browserLang = navigator.language || navigator.userLanguage || "";
      lang = browserLang.toLowerCase().startsWith("vi") ? "vi" : "en";
    }
    return lang;
  }

  // Apply translations to the DOM
  function applyTranslations(lang) {
    document.documentElement.lang = lang;
    
    // Find all nodes with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = DICTIONARY[lang][key];
      if (translation !== undefined) {
        el.innerHTML = translation;
      }
    });

    // Translate attributes like placeholder or alt
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      const translation = DICTIONARY[lang][key];
      if (translation !== undefined) {
        el.setAttribute("alt", translation);
      }
    });

    // Translate head tags
    const titleKey = document.querySelector("title").getAttribute("data-i18n");
    if (titleKey && DICTIONARY[lang][titleKey]) {
      document.title = DICTIONARY[lang][titleKey];
    } else {
      // Fallback: detect page
      let pageTitleKey = "";
      if (window.location.pathname.includes("AiPadCode")) {
        pageTitleKey = "aipad.title";
      } else if (window.location.pathname.includes("LunarV")) {
        pageTitleKey = "lunar.title";
      } else {
        pageTitleKey = "root.title";
      }
      document.title = DICTIONARY[lang][pageTitleKey];
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      let pageDescKey = "";
      if (window.location.pathname.includes("AiPadCode")) {
        pageDescKey = "aipad.meta_desc";
      } else if (window.location.pathname.includes("LunarV")) {
        pageDescKey = "lunar.meta_desc";
      } else {
        pageDescKey = "root.meta_desc";
      }
      metaDesc.setAttribute("content", DICTIONARY[lang][pageDescKey]);
    }

    // Update custom select button toggler
    updateToggleButton(lang);
  }

  // Update visual style of the toggle button
  function updateToggleButton(lang) {
    const toggleBtn = document.getElementById("lang-toggle-btn");
    if (toggleBtn) {
      if (lang === "vi") {
        toggleBtn.innerHTML =
          '<span style="font-weight: 800; color: #ffffff;">VI</span><span style="opacity: 0.3; margin: 0 6px;">|</span><span style="opacity: 0.55; font-weight: 500;">EN</span>';
      } else {
        toggleBtn.innerHTML =
          '<span style="opacity: 0.55; font-weight: 500;">VI</span><span style="opacity: 0.3; margin: 0 6px;">|</span><span style="font-weight: 800; color: #ffffff;">EN</span>';
      }
    }
  }

  // Inject toggle button into .topbar-actions
  function injectToggleButton(lang) {
    const actions = document.querySelector(".topbar-actions");
    if (actions && !document.getElementById("lang-toggle-btn")) {
      const btn = document.createElement("button");
      btn.id = "lang-toggle-btn";
      btn.className = "pill-link lang-toggle";
      btn.style.cursor = "pointer";
      btn.style.outline = "none";
      btn.style.display = "inline-flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.minHeight = "45px";
      btn.style.border = "1px solid var(--border)";
      btn.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
      btn.style.padding = "0 16px";
      btn.style.borderRadius = "999px";
      btn.style.color = "#e2e8f0";
      btn.style.fontSize = "0.92rem";
      btn.style.transition = "background-color 180ms ease, border-color 180ms ease, transform 180ms ease";
      
      btn.addEventListener("click", () => {
        const nextLang = getLang() === "vi" ? "en" : "vi";
        localStorage.setItem("preferred_lang", nextLang);
        applyTranslations(nextLang);
        // Dispatch custom event to notify React app PHTV if active in context
        window.dispatchEvent(new CustomEvent("langchange", { detail: nextLang }));
      });

      // Insert at the beginning of actions
      actions.insertBefore(btn, actions.firstChild);
      updateToggleButton(lang);
    }
  }

  // Asynchronous IP Country Detection
  async function detectIPLanguage() {
    // Only check IP geolocation if preferred_lang is not stored in localStorage
    if (localStorage.getItem("preferred_lang")) return;

    try {
      const res = await fetch("https://freeipapi.com/api/json");
      if (res.ok) {
        const data = await res.json();
        if (data && data.countryCode) {
          const detected = data.countryCode === "VN" ? "vi" : "en";
          localStorage.setItem("preferred_lang", detected);
          
          // Switch to detected language if it differs from current rendering language
          const currentLang = document.documentElement.lang || "vi";
          if (currentLang !== detected) {
            applyTranslations(detected);
          }
        }
      }
    } catch (e) {
      console.warn("IP geolocation language check failed:", e);
    }
  }

  // Initialize i18n
  function init() {
    const lang = getLang();
    injectToggleButton(lang);
    applyTranslations(lang);
    detectIPLanguage();
  }

  // Run as soon as DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Listen to external change events (for sync with PHTV react app)
  window.addEventListener("langchange", (e) => {
    const nextLang = e.detail;
    if (nextLang && DICTIONARY[nextLang]) {
      applyTranslations(nextLang);
    }
  });
})();
