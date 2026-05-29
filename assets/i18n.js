(function () {
  const DICTIONARY = {
    vi: {
      // Root Index
      "root.title": "Pham Hung Tien | Sản phẩm",
      "root.meta_desc": "Trang chính thức của Pham Hung Tien với các ứng dụng cho thiết bị Apple, gồm PHTV, LunarV và Pad Code AI.",
      "root.brand_subtitle": "Danh sách sản phẩm",
      "root.contact": "Liên hệ",
      "root.developer": "Nhà phát triển",
      "root.apps_products": "Ứng dụng & Sản phẩm",
      "root.hero_desc": "Những công cụ gọn, riêng tư và quen thuộc dành cho thiết bị Apple.",
      "root.phtv_desc": "Precision Hybrid Typing Vietnamese tập trung vào tốc độ, độ chính xác và quyền riêng tư, với trải nghiệm gõ tiếng Việt native, gọn và ổn định.",
      "root.phtv_subtitle": "Bộ gõ tiếng Việt hiện đại cho macOS.",
      "root.lunarv_desc": "LunarV mang lịch âm, widget, thông báo và dịp gia đình lên iPhone, iPad, Mac và Apple Vision Pro.",
      "root.lunarv_subtitle": "Lịch âm Việt Nam trên thiết bị Apple.",
      "root.padcodeai_desc": "Viết, chạy và quản lý code trên thiết bị di động với Compiler offline và Apple Intelligence tích hợp.",
      "root.padcodeai_subtitle": "Code Editor & IDE cho iPad/iPhone",
      "root.open_product": "Mở trang sản phẩm",
      "root.tag_lunar": "Lịch âm",
      "root.tag_reminders": "Nhắc nhở",
      "root.tag_offline": "Ngoại tuyến",
      "root.tag_opensource": "Mã nguồn mở",
      "root.tag_compiler": "Biên dịch offline",

      // PadCodeAI Index
      "padcodeai.title": "Pad Code AI - Code Editor",
      "padcodeai.meta_desc": "Viết, chạy và quản lý mã nguồn trong hơn 24 ngôn ngữ lập trình trực tiếp trên thiết bị của bạn. Pad Code AI tích hợp local compiler, terminal và Apple Intelligence.",
      "padcodeai.brand_subtitle": "IDE cho iPad/iPhone",
      "padcodeai.features_nav": "Tính năng",
      "padcodeai.hero_title": "Code mọi lúc, mọi nơi. Không giới hạn.",
      "padcodeai.hero_desc": "Code Editor và IDE chuyên nghiệp dành riêng cho iPad và iPhone. Viết và biên dịch code offline với sự hỗ trợ của Apple Intelligence!",
      "padcodeai.coming_soon": "Sắp có trên App Store",
      "padcodeai.coming_soon_nav": "Sắp ra mắt",
      "padcodeai.platforms": "Nền tảng",
      "padcodeai.execution": "Biên dịch",
      "padcodeai.on_device": "Trên thiết bị",
      "padcodeai.support": "Hỗ trợ",
      "padcodeai.download_btn": "Tải trên App Store",
      "padcodeai.features_kicker": "Tính năng nổi bật",
      "padcodeai.features_title": "Công cụ phát triển trong tay bạn.",
      "padcodeai.features_desc": "Tất cả mọi công cụ bạn cần để xây dựng, biên dịch và triển khai phần mềm trực tiếp từ thiết bị di động.",
      "padcodeai.feat1_title": "Local Code Runner",
      "padcodeai.feat1_desc": "Thực thi mã trực tiếp trên thiết bị mà không cần internet. Hỗ trợ đầy đủ các thuật toán phức tạp.",
      "padcodeai.feat2_title": "Apple Intelligence",
      "padcodeai.feat2_desc": "Trợ lý AI tích hợp sâu, giúp giải thích code, gỡ lỗi và tối ưu hóa mã nguồn theo thời gian thực.",
      "padcodeai.feat3_title": "24+ Ngôn ngữ",
      "padcodeai.feat3_desc": "Tô màu cú pháp và tự động hoàn thành cho Swift, Python, JS, C++, Java, Go, Rust, v.v.",
      "padcodeai.feat4_title": "Integrated Terminal",
      "padcodeai.feat4_desc": "Giao diện dòng lệnh chân thực, cho phép bạn tương tác trực tiếp với môi trường lập trình.",
      "padcodeai.feat5_title": "Git Source Control",
      "padcodeai.feat5_desc": "Hệ thống quản lý phiên bản tích hợp. Clone repo, commit và push mã nguồn trực tiếp lên GitHub.",
      "padcodeai.feat6_title": "Smart Workspaces",
      "padcodeai.feat6_desc": "Quản lý dự án, điều hướng thư mục và dễ dàng tìm kiếm/thay thế văn bản trên nhiều tệp.",
      "padcodeai.showcase_title": "Terminal ngay cạnh editor.",
      "padcodeai.showcase_desc": "Chuyển giữa viết mã và kết quả chạy mà không rời workspace.",
      "padcodeai.support_title": "Hỗ trợ & Liên hệ",
      "padcodeai.support_desc": "Bạn có câu hỏi hoặc cần hỗ trợ kỹ thuật? Vui lòng liên hệ với chúng tôi qua email:",
      "padcodeai.copyright": "&copy; 2026 Pham Hung Tien. Bảo lưu mọi quyền.",

      // LunarV Index
      "lunar.title": "LunarV - Lịch Âm Việt Nam",
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
      "lunar.terms": "Điều khoản sử dụng",

      // LunarBlock Index
      "root.lunarblock_subtitle": "Xếp hình 3D phong cách tàu vũ trụ.",
      "root.lunarblock_desc": "Lunar Block kết hợp lối chơi cổ điển với không gian SceneKit 3D động, điều khiển gamepad, phản hồi xúc giác và hiệu ứng vỡ khối Line Fracture.",
      "lunarblock.title": "Lunar Block - Teris 3D",
      "lunarblock.meta_desc": "Lunar Block là game xếp hình khối 3D native cho iOS. Trải nghiệm bối cảnh cabin tàu vũ trụ phát sáng được dựng bằng SceneKit và UIKit.",
      "lunarblock.brand_subtitle": "Game xếp hình 3D cổ điển cho iOS",
      "lunarblock.features_nav": "Tính năng",
      "lunarblock.hero_title": "Xếp hình 3D. Góc nhìn Không Gian.",
      "lunarblock.hero_desc": "Lunar Block biến đổi lưới chơi 14x20 truyền thống thành một bảng điều khiển orbital 3D phát sáng tuyệt đẹp bằng SceneKit và UIKit. Tận hưởng đồ họa mượt mà, phản hồi xúc giác và âm thanh tổng hợp tương tác.",
      "lunarblock.app_store": "Tải trên App Store",
      "lunarblock.platforms": "Nền tảng",
      "lunarblock.genre": "Thể loại",
      "lunarblock.engine": "Đồ họa",
      "lunarblock.genre_val": "Giải đố 3D",
      "lunarblock.features_kicker": "Điểm nhấn nổi bật",
      "lunarblock.features_title": "Bàn điều khiển orbital 3D.",
      "lunarblock.features_desc": "Trải nghiệm xếp hình quen thuộc được nâng tầm với đồ họa và hiệu ứng chuyển động ba chiều tuyệt đẹp.",
      "lunarblock.feat1_title": "Bàn cờ 3D SceneKit",
      "lunarblock.feat1_desc": "Bàn cờ xếp khối chiều sâu với khung viền phát sáng, các khối pha lê xếp chồng và góc nhìn camera điện ảnh linh hoạt.",
      "lunarblock.feat2_title": "Cơ chế Line Fracture",
      "lunarblock.feat2_desc": "Các khối pha lê bị phá vỡ vật lý đồng thời khi dọn hàng, giữ lại các mảnh vỡ ánh sáng tuyệt đẹp.",
      "lunarblock.feat3_title": "Gamepad Tròn Độc Đáo",
      "lunarblock.feat3_desc": "Phím D-pad dạng tròn lớn kèm phím DROP trung tâm, hỗ trợ vuốt chạm cử chỉ mượt mà và bàn phím ngoài.",
      "lunarblock.feat4_title": "Âm Thanh Tổng Hợp",
      "lunarblock.feat4_desc": "Công nghệ AVAudioEngine tạo ra các hiệu ứng âm thanh va chạm và nhạc nền retro tương tác theo thời gian thực.",
      "lunarblock.feat5_title": "Hệ Thống Rank & XP",
      "lunarblock.feat5_desc": "Tích hợp Game Center cho bảng xếp hạng toàn cầu cùng tiến trình XP, cấp độ và hồ sơ lưu trữ nội bộ.",
      "lunarblock.feat6_title": "Haptic Đa Tầng",
      "lunarblock.feat6_desc": "Cảm giác phản hồi xúc giác chân thực trên từng cú xoay khối, soft-drop và va chạm rơi tự do.",
      "lunarblock.showcase_title": "Cơ chế Line Fracture chân thực.",
      "lunarblock.showcase_desc": "Thay vì chỉ biến mất đơn điệu, các khối pha lê sẽ vỡ vụn sinh động nhờ động cơ mô phỏng vật lý 3D tiên tiến.",
      "lunarblock.copyright": "&copy; 2026 Pham Hung Tien. Bảo lưu mọi quyền."
    },
    en: {
      // Root Index
      "root.title": "Pham Hung Tien | Products",
      "root.meta_desc": "Official website of Pham Hung Tien featuring apps for Apple devices, including PHTV, LunarV, and Pad Code AI.",
      "root.brand_subtitle": "Product Index",
      "root.contact": "Contact",
      "root.developer": "Developer",
      "root.apps_products": "Apps & Products",
      "root.hero_desc": "Focused, private tools designed to feel at home on Apple devices.",
      "root.phtv_desc": "Precision Hybrid Typing Vietnamese focuses on speed, accuracy, and privacy, with a native, lightweight, and stable typing experience.",
      "root.phtv_subtitle": "Modern Vietnamese input method for macOS.",
      "root.lunarv_desc": "LunarV brings the lunar calendar, widgets, notifications, and family occasions to iPhone, iPad, Mac, and Apple Vision Pro.",
      "root.lunarv_subtitle": "Vietnamese lunar calendar on Apple devices.",
      "root.padcodeai_desc": "Write, run, and manage code on mobile devices with an offline compiler and integrated Apple Intelligence.",
      "root.padcodeai_subtitle": "Code Editor & IDE for iPad/iPhone",
      "root.open_product": "Open Product Page",
      "root.tag_lunar": "Lunar Calendar",
      "root.tag_reminders": "Reminders",
      "root.tag_offline": "Offline",
      "root.tag_opensource": "Open Source",
      "root.tag_compiler": "Offline Compiler",

      // PadCodeAI Index
      "padcodeai.title": "Pad Code AI - Code Editor",
      "padcodeai.meta_desc": "Write, run, and manage code in 24+ languages directly on your device. Pad Code AI features a local compiler, integrated terminal, and Apple Intelligence.",
      "padcodeai.brand_subtitle": "IDE for iPad/iPhone",
      "padcodeai.features_nav": "Features",
      "padcodeai.hero_title": "Code anytime, anywhere. No limits.",
      "padcodeai.hero_desc": "A professional Code Editor and IDE tailored for iPad and iPhone. Write and compile code offline with Apple Intelligence support!",
      "padcodeai.coming_soon": "Coming soon to the App Store",
      "padcodeai.coming_soon_nav": "Coming Soon",
      "padcodeai.platforms": "Platforms",
      "padcodeai.execution": "Execution",
      "padcodeai.on_device": "On device",
      "padcodeai.support": "Support",
      "padcodeai.download_btn": "Download on App Store",
      "padcodeai.features_kicker": "Key Features",
      "padcodeai.features_title": "Development tools in your hands.",
      "padcodeai.features_desc": "All the tools you need to build, compile, and deploy software directly from your mobile device.",
      "padcodeai.feat1_title": "Local Code Runner",
      "padcodeai.feat1_desc": "Execute code directly on your device without internet. Full support for complex algorithms.",
      "padcodeai.feat2_title": "Apple Intelligence",
      "padcodeai.feat2_desc": "Deeply integrated AI assistant helps explain code, debug, and optimize source code in real-time.",
      "padcodeai.feat3_title": "24+ Languages",
      "padcodeai.feat3_desc": "Syntax highlighting and autocomplete for Swift, Python, JS, C++, Java, Go, Rust, etc.",
      "padcodeai.feat4_title": "Integrated Terminal",
      "padcodeai.feat4_desc": "A realistic command-line interface, allowing you to interact directly with the development environment.",
      "padcodeai.feat5_title": "Git Source Control",
      "padcodeai.feat5_desc": "Integrated version control system. Clone repositories, commit, and push source code directly to GitHub.",
      "padcodeai.feat6_title": "Smart Workspaces",
      "padcodeai.feat6_desc": "Manage projects, navigate directories, and easily search/replace text across multiple files.",
      "padcodeai.showcase_title": "Terminal beside the editor.",
      "padcodeai.showcase_desc": "Move between writing code and running it without leaving the workspace.",
      "padcodeai.support_title": "Support & Contact",
      "padcodeai.support_desc": "Have questions or need technical support? Please reach out to us via email:",
      "padcodeai.copyright": "&copy; 2026 Pham Hung Tien. All rights reserved.",

      // LunarV Index
      "lunar.title": "LunarV - Lịch Âm Việt Nam",
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
      "lunar.terms": "Terms of Use",

      // LunarBlock Index
      "root.lunarblock_subtitle": "3D falling-block puzzle in space.",
      "root.lunarblock_desc": "Lunar Block blends classic stacking with a dynamic 3D SceneKit viewport, tactile gamepad controls, haptic impact, and line fracture clearing physics.",
      "lunarblock.title": "Lunar Block - Teris 3D",
      "lunarblock.meta_desc": "Lunar Block is a native iOS 3D falling-block puzzle game, turning an expanded playfield into a glowing orbital console built with SceneKit and UIKit.",
      "lunarblock.brand_subtitle": "Native 3D Puzzle Game for iOS",
      "lunarblock.features_nav": "Features",
      "lunarblock.hero_title": "3D Stacking. Spatial Viewport.",
      "lunarblock.hero_desc": "Lunar Block turns an expanded 14-by-20 playfield into a glowing orbital console built with SceneKit and UIKit. Experience fluid motion, outlines, responsive cameras, synthesized audio, and rich layered haptics.",
      "lunarblock.app_store": "Download on the App Store",
      "lunarblock.platforms": "Platforms",
      "lunarblock.genre": "Genre",
      "lunarblock.engine": "Graphics",
      "lunarblock.genre_val": "3D Puzzle Game",
      "lunarblock.features_kicker": "Key Features",
      "lunarblock.features_title": "An immersive orbital playfield.",
      "lunarblock.features_desc": "Classic stacking gameplay re-imagined as a high-fidelity spatial console inside a futuristic viewport.",
      "lunarblock.feat1_title": "SceneKit 3D Board",
      "lunarblock.feat1_desc": "A deep 3D stage with glowing rails, crystal blocks, light columns, and a responsive cinematic camera.",
      "lunarblock.feat2_title": "Line Fracture Physics",
      "lunarblock.feat2_desc": "Simultaneous physics-driven line fracture effects break cleared blocks into spectacular crystal shards.",
      "lunarblock.feat3_title": "Circular Gamepad",
      "lunarblock.feat3_desc": "A large circular D-pad controller with a central DROP button, gesture inputs, and hardware keyboard support.",
      "lunarblock.feat4_title": "AVAudioEngine Synth",
      "lunarblock.feat4_desc": "Synthesized gameplay sound effects and retro interactions created in real-time on-device.",
      "lunarblock.feat5_title": "Rank & XP System",
      "lunarblock.feat5_desc": "Local score keeping, rank progression, XP tracking, and Game Center support for global leaderboards.",
      "lunarblock.feat6_title": "Tactile Core Haptics",
      "lunarblock.feat6_desc": "Layered haptic impacts and localized vibrations on block rotation, drops, and line clears.",
      "lunarblock.showcase_title": "Spectacular physical clears.",
      "lunarblock.showcase_desc": "Watch crystal blocks shatter and fracture dynamically on line clears, creating satisfying spatial chain reactions.",
      "lunarblock.copyright": "&copy; 2026 Pham Hung Tien. All rights reserved."
    }
  };

  // Get active language (cached, or navigator locale)
  function getLang() {
    let lang = localStorage.getItem("preferred_lang");
    if (!lang) {
      const path = window.location.pathname;
      if (path.includes("LunarV") || path.includes("PHTV")) {
        // LunarV and PHTV default to Vietnamese
        lang = "vi";
      } else {
        // Main portfolio page and PadCodeAI default to English
        lang = "en";
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
      if (window.location.pathname.includes("PadCodeAI")) {
        pageTitleKey = "padcodeai.title";
      } else if (window.location.pathname.includes("LunarV")) {
        pageTitleKey = "lunar.title";
      } else if (window.location.pathname.includes("LunarBlock")) {
        pageTitleKey = "lunarblock.title";
      } else {
        pageTitleKey = "root.title";
      }
      document.title = DICTIONARY[lang][pageTitleKey];
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      let pageDescKey = "";
      if (window.location.pathname.includes("PadCodeAI")) {
        pageDescKey = "padcodeai.meta_desc";
      } else if (window.location.pathname.includes("LunarV")) {
        pageDescKey = "lunar.meta_desc";
      } else if (window.location.pathname.includes("LunarBlock")) {
        pageDescKey = "lunarblock.meta_desc";
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
      btn.style.minHeight = "36px";
      btn.style.border = "1px solid var(--line, rgba(29, 29, 31, 0.1))";
      btn.style.backgroundColor = "rgba(0, 113, 227, 0.04)";
      btn.style.padding = "0 14px";
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

  // Inject Dark/Light Mode toggle button
  function injectThemeToggle() {
    const nav = document.querySelector(".nav");
    if (!nav || document.getElementById("theme-toggle-btn")) return;
    
    const btn = document.createElement("button");
    btn.id = "theme-toggle-btn";
    btn.setAttribute("aria-label", "Toggle Dark Mode");
    btn.style.cursor = "pointer";
    btn.style.outline = "none";
    btn.style.background = "transparent";
    btn.style.border = "none";
    btn.style.minHeight = "36px";
    btn.style.minWidth = "36px";
    btn.style.padding = "0 8px";
    btn.style.color = "var(--text, #1d1d1f)";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.transition = "color 0.2s ease, transform 0.2s ease";

    btn.addEventListener("mouseover", () => {
      btn.style.transform = "scale(1.1)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.transform = "scale(1)";
    });
    
    // Check saved theme early
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }

    const updateIcon = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark" || 
                     (!document.documentElement.hasAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      // Sun icon for dark mode (to switch to light), Moon icon for light mode
      btn.innerHTML = isDark 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    };

    updateIcon();

    btn.addEventListener("click", () => {
      let currentTheme = document.documentElement.getAttribute("data-theme");
      if (!currentTheme) {
        currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateIcon();
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (!localStorage.getItem("theme")) {
        updateIcon();
      }
    });

    const langToggle = document.getElementById("lang-toggle-btn");
    if (langToggle) {
      nav.insertBefore(btn, langToggle);
    } else {
      nav.appendChild(btn);
    }
  }

  // Asynchronous IP Country Detection
  async function detectIPLanguage() {
    // Only check IP geolocation if preferred_lang is not stored in localStorage
    if (localStorage.getItem("preferred_lang")) return;

    // Skip IP language detection on main page and PadCodeAI so they default to English
    const path = window.location.pathname;
    if (!path.includes("LunarV") && !path.includes("PHTV")) return;

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

  // Scroll Reveal Animation Observer
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    // Auto-apply reveal class to major elements
    const elementsToReveal = document.querySelectorAll('section:not(.hero):not(.product-hero), .product-row, .feature, article, .showcase-media, .support-card, .release-band, .facts');
    elementsToReveal.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
    
    // Animate hero sections immediately
    const heroElements = document.querySelectorAll('.hero-content, .hero-media, .product-hero img');
    heroElements.forEach((el, index) => {
      el.classList.add('reveal');
      setTimeout(() => {
        el.classList.add('active');
      }, 150 + (index * 150));
    });
  }

  // Initialize i18n
  function init() {
    // Inject Theme Toggle first so it handles early render
    injectThemeToggle();
    
    const lang = getLang();
    injectToggleButton(lang);
    applyTranslations(lang);
    detectIPLanguage();
    initScrollReveal();
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
