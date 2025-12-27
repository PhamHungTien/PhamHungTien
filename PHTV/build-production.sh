#!/bin/bash
# PHTV Production Build Script
# This script optimizes the website for production deployment

set -e  # Exit on error

echo "🚀 PHTV Production Build Starting..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Clean and create dist folder
echo -e "${BLUE}📁 Cleaning dist folder...${NC}"
rm -rf dist
mkdir -p dist/Resources/UI
mkdir -p dist/Resources/Setup
mkdir -p dist/Resources/icons

# 2. Check for required tools
echo -e "${BLUE}🔍 Checking for required tools...${NC}"

check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${YELLOW}⚠️  $1 not found. Install with: $2${NC}"
        return 1
    else
        echo -e "${GREEN}✓${NC} $1 found"
        return 0
    fi
}

HAS_CSSNANO=0
HAS_TERSER=0
HAS_HTMLMIN=0
HAS_CWEBP=0

check_tool "cssnano" "npm install -g cssnano-cli" && HAS_CSSNANO=1 || true
check_tool "terser" "npm install -g terser" && HAS_TERSER=1 || true
check_tool "html-minifier" "npm install -g html-minifier" && HAS_HTMLMIN=1 || true
check_tool "cwebp" "brew install webp" && HAS_CWEBP=1 || true

echo ""

# 3. Minify CSS
echo -e "${BLUE}📦 Processing CSS...${NC}"
if [ $HAS_CSSNANO -eq 1 ]; then
    cssnano style.css dist/style.min.css
    ORIGINAL_CSS=$(wc -c < style.css)
    MINIFIED_CSS=$(wc -c < dist/style.min.css)
    SAVED_CSS=$((ORIGINAL_CSS - MINIFIED_CSS))
    echo -e "${GREEN}✓${NC} CSS minified: $(numfmt --to=iec $ORIGINAL_CSS) → $(numfmt --to=iec $MINIFIED_CSS) (saved $(numfmt --to=iec $SAVED_CSS))"
else
    cp style.css dist/style.min.css
    echo -e "${YELLOW}⚠️  CSS copied without minification${NC}"
fi

# 4. Minify JavaScript
echo -e "${BLUE}📦 Processing JavaScript...${NC}"
if [ $HAS_TERSER -eq 1 ]; then
    terser script.js -o dist/script.min.js -c -m
    terser sw.js -o dist/sw.min.js -c -m
    ORIGINAL_JS=$(wc -c < script.js)
    MINIFIED_JS=$(wc -c < dist/script.min.js)
    SAVED_JS=$((ORIGINAL_JS - MINIFIED_JS))
    echo -e "${GREEN}✓${NC} JavaScript minified: $(numfmt --to=iec $ORIGINAL_JS) → $(numfmt --to=iec $MINIFIED_JS) (saved $(numfmt --to=iec $SAVED_JS))"
else
    cp script.js dist/script.min.js
    cp sw.js dist/sw.min.js
    echo -e "${YELLOW}⚠️  JavaScript copied without minification${NC}"
fi

# 5. Process HTML
echo -e "${BLUE}📄 Processing HTML...${NC}"
# Replace references to use minified versions
sed 's/style\.css/style.min.css/g; s/script\.js/script.min.js/g; s/sw\.js/sw.min.js/g' index.html > dist/index.tmp.html

if [ $HAS_HTMLMIN -eq 1 ]; then
    html-minifier --collapse-whitespace --remove-comments \
        --minify-css true --minify-js true \
        -o dist/index.html dist/index.tmp.html
    rm dist/index.tmp.html
    echo -e "${GREEN}✓${NC} HTML minified"
else
    mv dist/index.tmp.html dist/index.html
    echo -e "${YELLOW}⚠️  HTML copied without minification${NC}"
fi

# Process other HTML files
for file in 404.html donate.html privacy.html; do
    if [ -f "$file" ]; then
        if [ $HAS_HTMLMIN -eq 1 ]; then
            html-minifier --collapse-whitespace --remove-comments \
                --minify-css true --minify-js true \
                -o "dist/$file" "$file"
        else
            cp "$file" "dist/$file"
        fi
        echo -e "${GREEN}✓${NC} $file processed"
    fi
done

# 6. Optimize images to WebP (optional)
echo -e "${BLUE}🖼️  Processing images...${NC}"
if [ $HAS_CWEBP -eq 1 ]; then
    WEBP_COUNT=0
    for img in Resources/UI/*.png Resources/Setup/*.png Resources/*.png; do
        if [ -f "$img" ]; then
            cwebp -q 85 "$img" -o "${img%.*}.webp" &> /dev/null
            ((WEBP_COUNT++))
        fi
    done
    echo -e "${GREEN}✓${NC} Converted $WEBP_COUNT images to WebP"
else
    echo -e "${YELLOW}⚠️  WebP conversion skipped (cwebp not found)${NC}"
fi

# Copy all resources
cp -r Resources/* dist/Resources/ 2>/dev/null || true
echo -e "${GREEN}✓${NC} Resources copied"

# 7. Copy other necessary files
echo -e "${BLUE}📋 Copying additional files...${NC}"
[ -f manifest.json ] && cp manifest.json dist/ && echo -e "${GREEN}✓${NC} manifest.json"
[ -f robots.txt ] && cp robots.txt dist/ && echo -e "${GREEN}✓${NC} robots.txt"
[ -f sitemap.xml ] && cp sitemap.xml dist/ && echo -e "${GREEN}✓${NC} sitemap.xml"
[ -f CNAME ] && cp CNAME dist/ && echo -e "${GREEN}✓${NC} CNAME"

# 8. Calculate total savings
echo ""
echo -e "${BLUE}📊 Build Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

ORIGINAL_SIZE=$(du -sh . 2>/dev/null | cut -f1)
DIST_SIZE=$(du -sh dist 2>/dev/null | cut -f1)

echo -e "Original size:   $ORIGINAL_SIZE"
echo -e "Optimized size:  $DIST_SIZE"
echo ""

# List files in dist
echo -e "${BLUE}📦 Files in dist:${NC}"
ls -lh dist/ | tail -n +2 | awk '{printf "  %-40s %8s\n", $9, $5}'

echo ""
echo -e "${GREEN}✅ Build complete! Files are in ./dist${NC}"
echo ""
echo -e "${BLUE}📊 Next steps:${NC}"
echo "  1. Test locally: cd dist && python3 -m http.server 8000"
echo "  2. Run Lighthouse: lighthouse http://localhost:8000"
echo "  3. Deploy to production"
echo ""
echo -e "${YELLOW}💡 Tip:${NC} Review PERFORMANCE.md for more optimization tips"
