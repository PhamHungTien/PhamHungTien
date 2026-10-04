import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ExternalLink, Github, Heart, Mail, Store, X } from "lucide-react";
import type { CSSProperties } from "react";
import type { Lang, Product } from "../types";
import { Header } from "../components/Header";
import { PhtvWordmark } from "../components/PhtvWordmark";
import { ContactSection } from "../components/ContactSection";
import { DonateDialog } from "../components/DonateDialog";

interface ProductPageProps {
  product: Product;
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  t: (key: string) => string;
}

export function ProductPage({ product, lang, onLanguageChange, t }: ProductPageProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const heroImage = product.localizedHeroImages?.[lang] ?? product.heroImage;
  const heroAlt = lang === "vi" ? `${product.name} trên thiết bị` : `${product.name} on device`;
  const videoUrl = product.localizedVideoUrls?.[lang] ?? product.videoUrl;
  const primaryHref = product.appStoreUrl ?? product.route;
  const secondaryHref = product.githubUrl ?? `${product.route}privacy.html`;
  const secondaryLabel = product.secondaryCtaLabel?.[lang] ?? (product.githubUrl ? t("common.github") : t("product.privacy"));

  useEffect(() => {
    if (!zoomImage) return;
    const dialog = lightboxRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [zoomImage]);

  return (
    <div className={`site-shell product-page product-page--${product.slug}`} style={{ "--accent": product.accent } as CSSProperties}>
      <Header lang={lang} onLanguageChange={onLanguageChange} t={t} productName={product.name} />

      <main id="main-content">
        <section className="detail-hero">
          <div className="detail-hero__copy">
            {product.slug === "phtv" ? (
              <PhtvWordmark />
            ) : (
              <div className="detail-lockup">
                <img src={product.icon} alt="" width={42} height={42} decoding="async" />
                <span>
                  <strong>{product.name}</strong>
                  <small>{product.category[lang]}</small>
                </span>
              </div>
            )}

            <h1>{product.title[lang]}</h1>
            <p className="detail-subtitle">{product.subtitle[lang]}</p>
            <div className="hero-actions">
              <a className="button button--primary" href={primaryHref} target={product.appStoreUrl ? "_blank" : undefined} rel={product.appStoreUrl ? "noopener" : undefined}>
                {product.appStoreUrl ? <Store size={18} /> : <ArrowRight size={18} />}
                {product.ctaLabel[lang]}
              </a>
              <a className="button button--secondary" href={secondaryHref} target={product.githubUrl ? "_blank" : undefined} rel={product.githubUrl ? "noopener" : undefined}>
                {product.githubUrl ? <Github size={18} /> : <ExternalLink size={18} />}
                {secondaryLabel}
              </a>
              <button
                className="button button--secondary donate-trigger"
                type="button"
                onClick={() => setDonateOpen(true)}
                aria-haspopup="dialog"
              >
                <Heart size={18} aria-hidden="true" />
                {t("common.donate")}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="detail-hero__media"
            onClick={() => setZoomImage({ src: heroImage, alt: heroAlt })}
            aria-label={`${lang === "vi" ? "Phóng to ảnh" : "Zoom image"}: ${product.name}`}
          >
            <img src={heroImage} alt={heroAlt} fetchPriority="high" decoding="async" />
          </button>
        </section>

        <section className="facts-band" aria-label={t("common.platforms")}>
          {product.facts.map((fact) => (
            <div className="fact-item" key={fact.label.en}>
              <span>{fact.label[lang]}</span>
              <strong>{fact.value[lang]}</strong>
            </div>
          ))}
        </section>

        {videoUrl && (
          <section className={`product-video-section${product.videoPortrait ? " product-video-section--portrait" : ""}`} id="demo" aria-label={lang === "vi" ? "Video trải nghiệm thực tế" : "Product Demo Video"}>
            <div className="section-copy">
              <h2>{lang === "vi" ? "Video trải nghiệm thực tế" : "Experience in Action"}</h2>
              <p className="section-subtitle">
                {product.videoDescription
                  ? product.videoDescription[lang]
                  : lang === "vi"
                  ? "Xem video thực tế trải nghiệm ứng dụng."
                  : "Watch demo video in action."}
              </p>
            </div>
            <div className="product-video-card">
              <video
                className="product-video-player"
                key={videoUrl}
                src={videoUrl}
                poster={product.videoPosters?.[lang] ?? heroImage}
                controls
                playsInline
                preload="none"
              >
                {lang === "vi" ? "Trình duyệt của bạn không hỗ trợ phát video." : "Your browser does not support the video tag."}
              </video>
            </div>
          </section>
        )}

        <section className="detail-grid" id="features">
          <div className="install-panel">
            <h2>{product.slug === "phtv" ? (lang === "vi" ? "Cài đặt nhanh" : "Quick install") : t("product.support")}</h2>
            <p>
              {product.slug === "phtv"
                ? (lang === "vi" ? "Cài bằng Homebrew hoặc tải đúng bản máy Mac từ trang PHTV." : "Install with Homebrew or download the correct Mac build from PHTV.")
                : product.support[lang]}
            </p>
            {product.slug === "phtv" && <code>brew install --cask phamhungtien/tap/phtv</code>}
            <a href={product.slug === "phtv" ? primaryHref : "mailto:contact@phamhungtien.com"}>
              {product.slug !== "phtv" && <Mail size={16} aria-hidden="true" />}
              {product.slug === "phtv" ? product.ctaLabel[lang] : t("product.supportCta")}
              <ArrowRight size={16} />
            </a>
            {product.communityUrl && <a href={product.communityUrl} target="_blank" rel="noopener noreferrer">
              {lang === "vi" ? "Fanpage vTTS" : "vTTS on Facebook"}<ExternalLink size={16} />
            </a>}
          </div>

          <div className="feature-panel">
            <h2>{t("product.features")}</h2>
            <div className="feature-list">
              {product.features.map((feature) => (
                <article key={feature.title.en}>
                  <span className="feature-dot" />
                  <div className="feature-content">
                    <h3>{feature.title[lang]}</h3>
                    {feature.description && (
                      <p className="feature-desc">{feature.description[lang]}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="section-copy">
            <h2>{t("product.gallery")}</h2>
          </div>
          <div className="gallery-strip">
            {product.gallery.map((image) => (
              <figure key={image.src}>
                <button
                  type="button"
                  className="gallery-preview"
                  onClick={() => setZoomImage({ src: image.localizedSrc?.[lang] ?? image.src, alt: image.alt[lang] })}
                  aria-label={`${lang === "vi" ? "Xem ảnh phóng to" : "Zoom image"}: ${image.alt[lang]}`}
                >
                  <img src={image.localizedSrc?.[lang] ?? image.src} alt={image.alt[lang]} loading="lazy" decoding="async" />
                </button>
                <figcaption>{image.alt[lang]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <ContactSection t={t} />

        <nav className="product-legal" aria-label={t("product.support")}>
          <a href={`${product.route}privacy.html`}>{t("product.privacy")}</a>
          <a href={`${product.route}terms.html`}>{t("product.terms")}</a>
        </nav>
      </main>

      <DonateDialog isOpen={donateOpen} onClose={() => setDonateOpen(false)} lang={lang} />

      {zoomImage && typeof document !== "undefined" && createPortal(
        <dialog
          ref={lightboxRef}
          className="image-lightbox"
          aria-label={zoomImage.alt}
          onCancel={() => setZoomImage(null)}
          onClose={() => setZoomImage(null)}
          onClick={(event) => { if (event.target === event.currentTarget) setZoomImage(null); }}
        >
          <button
            type="button"
            className="image-lightbox__close"
            onClick={() => setZoomImage(null)}
            aria-label={lang === "vi" ? "Đóng" : "Close"}
            autoFocus
          >
            <X size={24} aria-hidden="true" />
          </button>
          <div className="image-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={zoomImage.src}
              alt={zoomImage.alt}
              className="image-lightbox__img"
            />
            {zoomImage.alt && (
              <p className="image-lightbox__caption">{zoomImage.alt}</p>
            )}
          </div>
        </dialog>,
        document.body
      )}
    </div>
  );
}
