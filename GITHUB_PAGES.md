# PHTV - Bộ gõ tiếng Việt cho macOS

> Phiên bản web: https://phamhungtien.com/PHTV/

## Deployment

Website được tự động deploy lên GitHub Pages khi có push lên `main` branch.

### GitHub Pages Settings
- **Source**: GitHub Actions
- **Build**: Tự động via GitHub Actions workflow
- **Output**: `/PHTV/dist`

### Build Process
1. Node.js 20 được cài đặt
2. Dependencies được cài đặt từ `PHTV/package-lock.json`
3. Build được thực hiện bằng `npm run build` trong thư mục `PHTV`
4. Output được deploy lên GitHub Pages

## Development

```bash
cd PHTV
npm install
npm run dev    # Development server on http://localhost:3000
npm run build  # Production build
npm run preview # Preview production build
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome for Android)

## Meta Tags & SEO

✅ Open Graph tags (Facebook, Zalo)
✅ Twitter/X Card tags
✅ LinkedIn & Pinterest tags
✅ JSON-LD structured data
✅ Responsive favicon & icons

## Deploy Status

See: [Actions](../../actions)
