(function () {
  const DICTIONARY = {
    vi: {
      // Root Index
      "root.title": "Pham Hung Tien | Sản phẩm",
      "root.meta_desc": "Trang chính thức của Pham Hung Tien với các ứng dụng cho thiết bị Apple, gồm PHTV, LunarV và AiPadCode.",
      "root.brand_subtitle": "Danh sách sản phẩm",
      "root.contact": "Liên hệ",
      "root.developer": "Nhà phát triển",
      "root.apps_products": "Ứng dụng & Sản phẩm",
      "root.hero_desc": "Những công cụ gọn, riêng tư và quen thuộc dành cho thiết bị Apple.",
      "root.phtv_desc": "Precision Hybrid Typing Vietnamese tập trung vào tốc độ, độ chính xác và quyền riêng tư, với trải nghiệm gõ tiếng Việt native, gọn và ổn định.",
      "root.phtv_subtitle": "Bộ gõ tiếng Việt hiện đại cho macOS.",
      "root.lunarv_desc": "LunarV mang lịch âm, widget, thông báo và dịp gia đình lên iPhone, iPad, Mac và Apple Vision Pro.",
      "root.lunarv_subtitle": "Lịch âm Việt Nam trên thiết bị Apple.",
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
      "aipad.hero_title": "Code mọi lúc, mọi nơi. Không giới hạn.",
      "aipad.hero_desc": "Code Editor và IDE chuyên nghiệp dành riêng cho iPad và iPhone. Viết và biên dịch code offline với sự hỗ trợ của Apple Intelligence!",
      "aipad.coming_soon": "Sắp có trên App Store",
      "aipad.platforms": "Nền tảng",
      "aipad.execution": "Biên dịch",
      "aipad.on_device": "Trên thiết bị",
      "aipad.support": "Hỗ trợ",
      "aipad.download_btn": "Tải trên App Store",
      "aipad.features_kicker": "Tính năng nổi bật",
      "aipad.features_title": "Công cụ phát triển trong tay bạn.",
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
      "aipad.showcase_title": "Terminal ngay cạnh editor.",
      "aipad.showcase_desc": "Chuyển giữa viết mã và kết quả chạy mà không rời workspace.",
      "aipad.copyright": "&copy; 2026 Pham Hung Tien. Bảo lưu mọi quyền.",

      // LunarV Index
      "lunar.title": "LunarV | Lịch âm Việt Nam trên thiết bị Apple",
      "lunar.meta_desc": "LunarV là ứng dụng lịch âm Việt Nam cho iPhone, iPad, Mac và Apple Vision Pro, với widget, nhắc dịp gia đình và thông báo.",
      "lunar.brand_subtitle": "Lịch âm Việt Nam cho thiết bị Apple",
      "lunar.home": "Trang chính",
      "lunar.privacy": "Quyền riêng tư",
      "lunar.app_store": "App Store",
      "lunar.app_store_cta": "Xem trên App Store",
      "lunar.hero_title": "Lịch âm Việt Nam, bên bạn mỗi ngày.",
      "lunar.hero_desc": "Xem ngày âm, can chi, tiết khí và widget đồng bộ trên iPhone, iPad, Mac và Apple Vision Pro.",
      "lunar.badge_lunar_solar": "Lịch âm & dương",
      "lunar.badge_family": "Dịp gia đình",
      "lunar.badge_reminders": "Thông báo nhắc nhở",
      "lunar.preview_caption": "Giao diện không gian giữ cùng dữ liệu lịch và nhắc nhở, được bố trí để dễ đọc trong visionOS.",
      "lunar.version": "Phiên bản",
      "lunar.platforms": "Nền tảng",
      "lunar.delivery": "Phát hành",
      "lunar.highlights": "Tính năng",
      "lunar.highlights_title": "Đủ thông tin cần thiết cho mỗi ngày.",
      "lunar.highlights_desc": "Một trải nghiệm thống nhất trên màn hình chính, menu bar và widget của các thiết bị Apple.",
      "lunar.feat1_title": "Lịch âm & dương",
      "lunar.feat1_desc": "Ngày âm, ngày dương, can chi và tiết khí trong một lượt xem.",
      "lunar.feat2_title": "Dịp gia đình",
      "lunar.feat2_desc": "Lưu và theo dõi các ngày quan trọng theo âm lịch hoặc dương lịch.",
      "lunar.feat3_title": "Thông báo",
      "lunar.feat3_desc": "Nhắc trước các dịp đã chọn vào thời gian phù hợp với bạn.",
      "lunar.feat4_title": "Widget",
      "lunar.feat4_desc": "Thông tin ngày hiện tại được trình bày gọn trên iOS, macOS và visionOS.",
      "lunar.support": "Hỗ trợ",
      "lunar.terms": "Điều khoản sử dụng"
    },
    en: {
      // Root Index
      "root.title": "Pham Hung Tien | Products",
      "root.meta_desc": "Official website of Pham Hung Tien featuring apps for Apple devices, including PHTV, LunarV, and AiPadCode.",
      "root.brand_subtitle": "Product Index",
      "root.contact": "Contact",
      "root.developer": "Developer",
      "root.apps_products": "Apps & Products",
      "root.hero_desc": "Focused, private tools designed to feel at home on Apple devices.",
      "root.phtv_desc": "Precision Hybrid Typing Vietnamese focuses on speed, accuracy, and privacy, with a native, lightweight, and stable typing experience.",
      "root.phtv_subtitle": "Modern Vietnamese input method for macOS.",
      "root.lunarv_desc": "LunarV brings the lunar calendar, widgets, notifications, and family occasions to iPhone, iPad, Mac, and Apple Vision Pro.",
      "root.lunarv_subtitle": "Vietnamese lunar calendar on Apple devices.",
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
      "aipad.hero_title": "Code anytime, anywhere. No limits.",
      "aipad.hero_desc": "A professional Code Editor and IDE tailored for iPad and iPhone. Write and compile code offline with Apple Intelligence support!",
      "aipad.coming_soon": "Coming soon to the App Store",
      "aipad.platforms": "Platforms",
      "aipad.execution": "Execution",
      "aipad.on_device": "On device",
      "aipad.support": "Support",
      "aipad.download_btn": "Download on App Store",
      "aipad.features_kicker": "Key Features",
      "aipad.features_title": "Development tools in your hands.",
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
      "aipad.showcase_title": "Terminal beside the editor.",
      "aipad.showcase_desc": "Move between writing code and running it without leaving the workspace.",
      "aipad.copyright": "&copy; 2026 Pham Hung Tien. All rights reserved.",

      // LunarV Index
      "lunar.title": "LunarV | Vietnamese Lunar Calendar on Apple Devices",
      "lunar.meta_desc": "LunarV is a Vietnamese lunar calendar app for iPhone, iPad, Mac, and Apple Vision Pro, with widgets, family occasion reminders, and notifications.",
      "lunar.brand_subtitle": "Vietnamese Lunar Calendar for Apple Devices",
      "lunar.home": "Home",
      "lunar.privacy": "Privacy",
      "lunar.app_store": "App Store",
      "lunar.app_store_cta": "View on the App Store",
      "lunar.hero_title": "Vietnamese lunar calendar, with you every day.",
      "lunar.hero_desc": "View lunar dates, sexagenary cycles, solar terms, and synced widgets on iPhone, iPad, Mac, and Apple Vision Pro.",
      "lunar.badge_lunar_solar": "Lunar & Solar Calendar",
      "lunar.badge_family": "Family Occasions",
      "lunar.badge_reminders": "Smart Notifications",
      "lunar.preview_caption": "The spatial interface keeps the same calendar and reminder information arranged for comfortable viewing in visionOS.",
      "lunar.version": "Version",
      "lunar.platforms": "Platforms",
      "lunar.delivery": "Available through",
      "lunar.highlights": "Features",
      "lunar.highlights_title": "Everything needed for each day.",
      "lunar.highlights_desc": "A consistent experience across the main view, the Mac menu bar, and widgets on Apple devices.",
      "lunar.feat1_title": "Lunar & Solar",
      "lunar.feat1_desc": "Lunar date, solar date, sexagenary cycle, and solar term in one glance.",
      "lunar.feat2_title": "Family Occasions",
      "lunar.feat2_desc": "Save and follow important occasions using lunar or solar dates.",
      "lunar.feat3_title": "Notifications",
      "lunar.feat3_desc": "Get reminders for selected occasions at the time that suits you.",
      "lunar.feat4_title": "Widgets",
      "lunar.feat4_desc": "Today's date is presented neatly on iOS, macOS, and visionOS.",
      "lunar.support": "Support",
      "lunar.terms": "Terms of Use"
    }
  };

  // Get active language (cached, or navigator locale)
  function getLang() {
    let lang = localStorage.getItem("preferred_lang");
    if (!lang) {
      if (window.location.pathname.includes("AiPadCode")) {
        lang = "en";
      } else {
        const browserLang = navigator.language || navigator.userLanguage || "";
        lang = browserLang.toLowerCase().startsWith("vi") ? "vi" : "en";
      }
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
          '<span style="font-weight: 800; color: var(--text, #1d1d1f);">VI</span><span style="opacity: 0.3; margin: 0 4px; color: var(--text, #1d1d1f);">|</span><span style="opacity: 0.55; font-weight: 500; color: var(--text, #1d1d1f);">EN</span>';
      } else {
        toggleBtn.innerHTML =
          '<span style="opacity: 0.55; font-weight: 500; color: var(--text, #1d1d1f);">VI</span><span style="opacity: 0.3; margin: 0 4px; color: var(--text, #1d1d1f);">|</span><span style="font-weight: 800; color: var(--text, #1d1d1f);">EN</span>';
      }
    }
  }

  // Inject toggle button into .nav
  function injectToggleButton(lang) {
    const nav = document.querySelector(".nav");
    if (nav && !document.getElementById("lang-toggle-btn")) {
      const btn = document.createElement("button");
      btn.id = "lang-toggle-btn";
      btn.className = "lang-toggle";
      btn.style.cursor = "pointer";
      btn.style.outline = "none";
      btn.style.display = "inline-flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.height = "32px";
      btn.style.border = "1px solid var(--line, rgba(29, 29, 31, 0.1))";
      btn.style.backgroundColor = "rgba(0, 113, 227, 0.04)";
      btn.style.padding = "0 12px";
      btn.style.borderRadius = "999px";
      btn.style.color = "var(--text, #1d1d1f)";
      btn.style.fontFamily = "inherit";
      btn.style.fontSize = "12px";
      btn.style.fontWeight = "500";
      btn.style.transition = "background-color 180ms ease, border-color 180ms ease";
      
      btn.addEventListener("mouseover", () => {
        btn.style.backgroundColor = "rgba(0, 113, 227, 0.08)";
        btn.style.borderColor = "var(--text, #1d1d1f)";
      });
      btn.addEventListener("mouseout", () => {
        btn.style.backgroundColor = "rgba(0, 113, 227, 0.04)";
        btn.style.borderColor = "var(--line, rgba(29, 29, 31, 0.1))";
      });

      btn.addEventListener("click", () => {
        const nextLang = getLang() === "vi" ? "en" : "vi";
        localStorage.setItem("preferred_lang", nextLang);
        applyTranslations(nextLang);
        // Dispatch custom event to notify other scripts/apps
        window.dispatchEvent(new CustomEvent("langchange", { detail: nextLang }));
      });

      // Look for the App Store button/badge or main button in nav to insert before it
      const storeButton = nav.querySelector(".store-link, .button-primary");
      if (storeButton) {
        nav.insertBefore(btn, storeButton);
      } else {
        nav.appendChild(btn);
      }
      updateToggleButton(lang);
    }
  }

  // Asynchronous IP Country Detection
  async function detectIPLanguage() {
    // Only check IP geolocation if preferred_lang is not stored in localStorage
    if (localStorage.getItem("preferred_lang")) return;

    // Skip IP language detection on AiPadCode so it defaults to English
    if (window.location.pathname.includes("AiPadCode")) return;

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
