import { existsSync, readFileSync } from "fs";
import path from "path";
import sharp from "sharp";

const FONTS_DIR = path.join(process.cwd(), "src", "assets", "fonts");

function loadFontAsBase64(filename: string): string {
    const fontPath = path.join(FONTS_DIR, filename);
    if (!existsSync(fontPath)) {
        console.error(`OG Renderer: Font file not found: ${fontPath}`);
        return "";
    }
    return readFileSync(fontPath).toString("base64");
}

function loadLogoAsBase64(): string {
    const logoPath = path.join(process.cwd(), "public", "logo-light.png");
    if (!existsSync(logoPath)) {
        console.error(`OG Renderer: Logo file not found: ${logoPath}`);
        return "";
    }
    return readFileSync(logoPath).toString("base64");
}

let fontsCache: string | null = null;
let logoCache: string | null = null;

function getFontFaces(): string {
    if (fontsCache) return fontsCache;

    const oswaldBoldLatin = loadFontAsBase64("oswald-bold-latin.woff2");
    const oswaldBoldLatinExt = loadFontAsBase64("oswald-bold-latin-ext.woff2");
    const interLatin = loadFontAsBase64("inter-latin.woff2");
    const interLatinExt = loadFontAsBase64("inter-latin-ext.woff2");
    const geistMonoLatin = loadFontAsBase64("geist-mono-latin.woff2");
    const geistMonoLatinExt = loadFontAsBase64("geist-mono-latin-ext.woff2");

    fontsCache = `
        @font-face {
            font-family: 'Oswald';
            font-weight: 700;
            font-style: normal;
            src: url(data:font/woff2;base64,${oswaldBoldLatinExt}) format('woff2');
            unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
            font-family: 'Oswald';
            font-weight: 700;
            font-style: normal;
            src: url(data:font/woff2;base64,${oswaldBoldLatin}) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
            font-family: 'Inter';
            font-weight: 400;
            font-style: normal;
            src: url(data:font/woff2;base64,${interLatinExt}) format('woff2');
            unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
            font-family: 'Inter';
            font-weight: 400;
            font-style: normal;
            src: url(data:font/woff2;base64,${interLatin}) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
            font-family: 'GeistMono';
            font-weight: 400;
            font-style: normal;
            src: url(data:font/woff2;base64,${geistMonoLatinExt}) format('woff2');
            unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
            font-family: 'GeistMono';
            font-weight: 400;
            font-style: normal;
            src: url(data:font/woff2;base64,${geistMonoLatin}) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
    `;
    return fontsCache;
}

function getLogoBase64(): string {
    if (logoCache) return logoCache;
    logoCache = loadLogoAsBase64();
    return logoCache;
}

function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

// Approximate text width for title line-breaking (rough: Oswald Bold ~0.55em per char at given size)
function wrapTitle(title: string, maxWidth: number, fontSize: number): string[] {
    const charWidth = fontSize * 0.52;
    const maxChars = Math.floor(maxWidth / charWidth);
    const words = title.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length > maxChars && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);

    // Max 2 lines, truncate with ellipsis
    if (lines.length > 2) {
        lines[1] = lines[1].slice(0, maxChars - 3) + "...";
        lines.length = 2;
    }

    return lines;
}

function renderBadge(
    text: string,
    x: number,
    y: number,
    bgColor: string,
    textColor: string,
): { svg: string; width: number } {
    const charWidth = 8.5; // GeistMono at ~13px
    const paddingX = 14;
    const paddingY = 6;
    const textWidth = text.length * charWidth;
    const badgeWidth = textWidth + paddingX * 2;
    const badgeHeight = 28;
    const radius = 6;

    const svg = `
        <rect x="${x}" y="${y}" width="${badgeWidth}" height="${badgeHeight}" rx="${radius}" ry="${radius}" fill="${bgColor}" />
        <text x="${x + paddingX}" y="${y + badgeHeight / 2 + 1}" font-family="GeistMono, monospace" font-size="13" font-weight="400" fill="${textColor}" dominant-baseline="middle" text-transform="uppercase" letter-spacing="0.05em">${escapeXml(text.toUpperCase())}</text>
    `;

    return { svg, width: badgeWidth };
}

export type BlogOgParams = {
    title: string;
    description: string;
    category: string;
    date: string;
    readTime: number;
    locale: string;
};

export type ProjectOgParams = {
    title: string;
    description: string;
    tags: string[];
    date: string;
    locale: string;
};

const COLORS = {
    background: "#f0f0f2",
    card: "#e8e8ec",
    border: "#c4c4ca",
    text: "#1a1a2e",
    muted: "#71717a",
    blogBadgeBg: "rgba(13, 148, 136, 0.1)",
    blogBadgeText: "#0D9488",
    projectBadgeBg: "rgba(59, 95, 204, 0.1)",
    projectBadgeText: "#3b5fcc",
};

function formatDate(dateStr: string, locale: string): string {
    // Handle both "2026-03-01" and "2025-12" formats
    const date = dateStr.length === 7 ? new Date(dateStr + "-01") : new Date(dateStr);
    if (dateStr.length === 7) {
        return date.toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
            year: "numeric",
            month: "long",
        });
    }
    return date.toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function truncateText(text: string, maxChars: number): string {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars - 3).trimEnd() + "...";
}

function wrapDescription(text: string, maxWidth: number, fontSize: number, maxLines: number): string[] {
    const charWidth = fontSize * 0.48;
    const maxChars = Math.floor(maxWidth / charWidth);
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length > maxChars && currentLine) {
            lines.push(currentLine);
            currentLine = word;
            if (lines.length >= maxLines) break;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine && lines.length < maxLines) lines.push(currentLine);

    if (lines.length >= maxLines) {
        lines.length = maxLines;
        lines[maxLines - 1] = truncateText(lines[maxLines - 1], maxChars);
    }

    return lines;
}

function buildSvg(params: {
    badges: { text: string; bgColor: string; textColor: string }[];
    title: string;
    description: string;
    metaLine: string;
}): string {
    const fontFaces = getFontFaces();
    const logoBase64 = getLogoBase64();

    // ─── Canvas ───────────────────────────────────────────────────────────────
    const W = 1200, H = 630;
    const outerPad = 48;            // space-12 — outer frame
    const innerPad = 48;            // space-12 — card inner padding (same rhythm)
    const cardX = outerPad, cardY = outerPad;
    const cardW = W - outerPad * 2; // 1104
    const cardH = H - outerPad * 2; // 534
    const cardBottom = cardY + cardH; // 582
    const contentX = cardX + innerPad; // 96
    const contentW = cardW - innerPad * 2; // 1008

    // ─── Typography metrics (SVG y = baseline) ───────────────────────────────
    // visual top  = baseline − fontSize × 0.78  (ascender)
    // visual bottom = baseline + fontSize × 0.25  (descender)
    const titleFs = 52;
    const titleAsc = titleFs * 0.78;   // ≈ 40.6
    const titleDesc = titleFs * 0.25;  // 13
    const titleLH = Math.round(titleFs * 1.1); // 57 px per extra line

    const descFs = 18;
    const descAsc = descFs * 0.78;     // ≈ 14
    const descLH = Math.round(descFs * 1.55); // 28 px per extra line

    const metaFs = 14;

    // ─── Badge row ────────────────────────────────────────────────────────────
    const badgeTopY = cardY + innerPad; // 96
    const badgeH = 28;
    let badgeSvg = "";
    let badgeX = contentX;
    for (const badge of params.badges) {
        const { svg, width: bw } = renderBadge(badge.text, badgeX, badgeTopY, badge.bgColor, badge.textColor);
        badgeSvg += svg;
        badgeX += bw + 12; // space-3 between badges
    }

    // ─── Title ────────────────────────────────────────────────────────────────
    // Visual gap badge→title = space-4 (16px), then add ascender to get baseline
    const titleBaseline = Math.round(badgeTopY + badgeH + 16 + titleAsc); // ≈ 181
    const titleLines = wrapTitle(params.title, contentW, titleFs);
    let titleSvg = "";
    for (let i = 0; i < titleLines.length; i++) {
        titleSvg += `<text x="${contentX}" y="${titleBaseline + i * titleLH}" font-family="Oswald, sans-serif" font-size="${titleFs}" font-weight="700" fill="${COLORS.text}" letter-spacing="-0.02em">${escapeXml(titleLines[i])}</text>`;
    }
    const titleVisualBottom = titleBaseline + (titleLines.length - 1) * titleLH + titleDesc;

    // ─── Description ──────────────────────────────────────────────────────────
    // Visual gap title→desc = space-4 (16px)
    const descBaseline = Math.round(titleVisualBottom + 16 + descAsc);
    const descLines = wrapDescription(params.description, contentW, descFs, 2);
    let descSvg = "";
    for (let i = 0; i < descLines.length; i++) {
        descSvg += `<text x="${contentX}" y="${descBaseline + i * descLH}" font-family="Inter, sans-serif" font-size="${descFs}" font-weight="400" fill="${COLORS.muted}">${escapeXml(descLines[i])}</text>`;
    }

    // ─── Footer (bottom-anchored) ─────────────────────────────────────────────
    // meta baseline sits innerPad above card bottom
    const metaBaseline = cardBottom - innerPad; // 534
    // meta visual top = metaBaseline − metaFs × 0.78
    // author logo bottom = metaVisualTop − space-2 (8px)
    // authorY = logo center = logo bottom − logoSize/2
    const logoSize = 36;
    const authorY = Math.round(metaBaseline - metaFs * 0.78 - 8 - logoSize / 2); // ≈ 497
    // divider sits space-5 (20px) above logo top
    const dividerY = authorY - Math.round(logoSize / 2) - 20;

    const dividerSvg = `<line x1="${contentX}" y1="${dividerY}" x2="${contentX + contentW}" y2="${dividerY}" stroke="${COLORS.border}" stroke-width="1.5" />`;

    const authorSvg = `
        <image href="data:image/png;base64,${logoBase64}" x="${contentX}" y="${authorY - logoSize / 2 - 2}" width="${logoSize}" height="${logoSize}" />
        <text x="${contentX + logoSize + 12}" y="${authorY + 2}" font-family="Inter, sans-serif" font-size="18" font-weight="400" fill="${COLORS.text}" dominant-baseline="middle">Robert Julian Kratz</text>
    `;

    const metaSvg = `<text x="${contentX}" y="${metaBaseline}" font-family="GeistMono, monospace" font-size="${metaFs}" font-weight="400" fill="${COLORS.muted}">${escapeXml(params.metaLine)}</text>`;

    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <style>
            ${fontFaces}
        </style>
    </defs>

    <!-- Background -->
    <rect width="${W}" height="${H}" fill="${COLORS.background}" />

    <!-- Card -->
    <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="16" ry="16" fill="${COLORS.card}" stroke="${COLORS.border}" stroke-width="1.5" />

    <!-- Badges -->
    ${badgeSvg}

    <!-- Title -->
    ${titleSvg}

    <!-- Description -->
    ${descSvg}

    <!-- Divider -->
    ${dividerSvg}

    <!-- Author -->
    ${authorSvg}

    <!-- Meta -->
    ${metaSvg}
</svg>`;
}

export function renderBlogOgSvg(params: BlogOgParams): string {
    const formattedDate = formatDate(params.date, params.locale);
    const readTimeLabel = params.locale === "de" ? `${params.readTime} Min. Lesezeit` : `${params.readTime} min read`;
    const metaLine = `${formattedDate}  ·  ${readTimeLabel}  ·  rjks.us`;

    return buildSvg({
        badges: [
            {
                text: params.category,
                bgColor: COLORS.blogBadgeBg,
                textColor: COLORS.blogBadgeText,
            },
        ],
        title: params.title,
        description: params.description,
        metaLine,
    });
}

export function renderProjectOgSvg(params: ProjectOgParams): string {
    const formattedDate = formatDate(params.date, params.locale);
    const metaLine = `${formattedDate}  ·  rjks.us`;

    return buildSvg({
        badges: params.tags.slice(0, 2).map((tag) => ({
            text: tag,
            bgColor: COLORS.projectBadgeBg,
            textColor: COLORS.projectBadgeText,
        })),
        title: params.title,
        description: params.description,
        metaLine,
    });
}

export async function svgToWebp(svg: string): Promise<Buffer> {
    return sharp(Buffer.from(svg))
        .webp({ quality: 90 })
        .toBuffer();
}
