# Performance Optimization Guide

## Các tối ưu hóa đã được áp dụng

### 1. ✅ Font Loading Optimization
- **Async font loading**: Fonts được tải không đồng bộ với `media="print" onload="this.media='all'"`
- **Fallback**: Có `<noscript>` tag cho trường hợp JavaScript bị tắt
- **Kết quả**: Giảm blocking time, cải thiện FCP (First Contentful Paint)

### 2. ✅ JavaScript Optimization
- **Defer attribute**: Script được defer để không block HTML parsing
- **Kết quả**: Cải thiện Time to Interactive (TTI)

### 3. ✅ Image Optimization
- **Lazy loading**: Tất cả images đã có `loading="lazy"` attribute
- **Priority hints**: Hero image có `fetchpriority="high"`
- **Kết quả**: Giảm initial page weight, cải thiện LCP (Largest Contentful Paint)

### 4. ✅ Service Worker Enhancements
Caching strategies được tối ưu cho từng loại resource:

**Strategy 1: Cache-First for Fonts**
```javascript
// Fonts là immutable, cache first để tăng tốc
if (requestURL.origin === 'https://fonts.googleapis.com' ||
    requestURL.origin === 'https://fonts.gstatic.com')
```

**Strategy 2: Network-First for GitHub API**
```javascript
// API cần fresh data, network first với fallback to cache
if (requestURL.origin === 'https://api.github.com')
```

**Strategy 3: Cache-First for Images**
```javascript
// Images ít thay đổi, cache first
if (event.request.destination === 'image')
```

**Strategy 4: Stale-While-Revalidate for HTML/CSS/JS**
```javascript
// Return cached version ngay, update cache in background
return cachedResponse || fetchPromise;
```

### 5. ✅ Resource Hints Optimization
- **DNS Prefetch**: Resolve DNS sớm cho external domains
- **Preconnect**: Thiết lập connection sớm cho critical origins
- **Preload**: Tải trước critical assets (CSS, hero image)
- **Prefetch**: Tải trước resources cho next navigation

---

## Các bước tối ưu thêm cho Production

### 1. Minification (Bắt buộc cho Production)

**CSS Minification:**
```bash
# Sử dụng cssnano hoặc clean-css
npx cssnano style.css style.min.css
# Hoặc
npx cleancss -o style.min.css style.css
```

**JavaScript Minification:**
```bash
# Sử dụng terser
npx terser script.js -o script.min.js -c -m
```

**HTML Minification:**
```bash
# Sử dụng html-minifier
npx html-minifier --collapse-whitespace --remove-comments \
  --minify-css true --minify-js true \
  -o index.min.html index.html
```

### 2. Image Optimization

**Convert to WebP:**
```bash
# Cài đặt cwebp
brew install webp

# Convert images
cwebp -q 80 Resources/UI/setting_bogo.png -o Resources/UI/setting_bogo.webp
```

**Responsive Images:**
```html
<!-- Sử dụng srcset cho responsive images -->
<img src="image.jpg"
     srcset="image-320w.jpg 320w,
             image-640w.jpg 640w,
             image-1024w.jpg 1024w"
     sizes="(max-width: 640px) 100vw, 640px"
     alt="Description"
     loading="lazy">
```

**Picture element với WebP:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### 3. Critical CSS Inline

**Tạo Critical CSS:**
```bash
# Sử dụng critical
npm install -g critical

critical index.html --base ./ --inline --minify \
  --extract --width 1300 --height 900 \
  > index-critical.html
```

**Hoặc thủ công:**
- Extract CSS cho above-the-fold content
- Inline vào `<style>` tag trong `<head>`
- Lazy load phần CSS còn lại

### 4. Enable Compression

**Gzip/Brotli trên Server:**
```nginx
# Nginx config
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript
           application/x-javascript application/xml+rss
           application/javascript application/json;

# Brotli (nếu có module)
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/javascript
             application/json image/svg+xml;
```

### 5. HTTP/2 và HTTP/3

**Nginx HTTP/2:**
```nginx
listen 443 ssl http2;
```

**Cloudflare:** Tự động enable HTTP/2 và HTTP/3

### 6. CDN Usage

**Sử dụng CDN cho static assets:**
- Cloudflare (miễn phí)
- jsDelivr cho GitHub-hosted files
- Vercel/Netlify edge network

### 7. Cache Headers

```nginx
# Nginx cache headers
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

---

## Performance Metrics Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s ✅
- **FID (First Input Delay)**: < 100ms ✅
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅

### Other Metrics
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.8s
- **Speed Index**: < 3.4s
- **Total Blocking Time**: < 200ms

---

## Testing Tools

### 1. Lighthouse
```bash
# Chrome DevTools > Lighthouse tab
# Hoặc CLI:
npm install -g lighthouse
lighthouse https://phamhungtien.com/PHTV/ --view
```

### 2. WebPageTest
https://www.webpagetest.org/

### 3. PageSpeed Insights
https://pagespeed.web.dev/

### 4. GTmetrix
https://gtmetrix.com/

---

## Monitoring

### 1. Real User Monitoring (RUM)
```javascript
// Sử dụng web-vitals library
import {getCLS, getFID, getLCP} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

### 2. Performance Observer API
```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.startTime);
  }
});

observer.observe({entryTypes: ['navigation', 'resource', 'paint']});
```

---

## Checklist Production

- [ ] Minify CSS, JS, HTML
- [ ] Convert images to WebP
- [ ] Generate responsive images với srcset
- [ ] Inline critical CSS
- [ ] Enable Gzip/Brotli compression
- [ ] Configure proper cache headers
- [ ] Enable HTTP/2 or HTTP/3
- [ ] Set up CDN
- [ ] Test với Lighthouse (score > 90)
- [ ] Test với WebPageTest
- [ ] Monitor Core Web Vitals

---

## Build Script Mẫu

```bash
#!/bin/bash
# build.sh - Production build script

echo "🚀 Building PHTV Website for Production..."

# 1. Clean dist folder
rm -rf dist
mkdir -p dist

# 2. Minify CSS
echo "📦 Minifying CSS..."
npx cssnano style.css dist/style.min.css

# 3. Minify JavaScript
echo "📦 Minifying JavaScript..."
npx terser script.js -o dist/script.min.js -c -m
npx terser sw.js -o dist/sw.min.js -c -m

# 4. Optimize images to WebP
echo "🖼️  Converting images to WebP..."
find Resources -name "*.png" -o -name "*.jpg" | while read img; do
  cwebp -q 80 "$img" -o "${img%.*}.webp"
done

# 5. Copy HTML and update references
echo "📄 Processing HTML..."
sed 's/style.css/style.min.css/g; s/script.js/script.min.js/g' index.html > dist/index.html

# 6. Copy other files
echo "📋 Copying assets..."
cp -r Resources dist/
cp manifest.json dist/
cp -r Resources/icons dist/

echo "✅ Build complete! Files are in ./dist"
echo "📊 Run Lighthouse to test performance"
```

---

## Kết quả dự kiến

### Trước tối ưu
- Page size: ~150KB (HTML + CSS + JS)
- Load time: 2-3s
- Lighthouse score: 70-80

### Sau tối ưu
- Page size: ~80KB (minified + gzipped)
- Load time: < 1.5s
- Lighthouse score: 95-100 ✅
- Core Web Vitals: All Green ✅

---

## Tài liệu tham khảo

- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Service Worker Caching Strategies](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)
