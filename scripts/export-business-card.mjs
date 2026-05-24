// business-cardの名刺イメージをpngに抽出
// 実行コマンド：`pnpm export:business-card`

import fs from "node:fs/promises";
import sharp from "sharp";

const cardWidth = 1075;
const cardHeight = 650;
const radius = 24;
const fontFamily =
  "Hiragino Sans, Hiragino Kaku Gothic ProN, Meiryo, Arial, sans-serif";

const iconSvg = await fs.readFile("app/icon.svg", "utf8");
const iconData = `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`;
const qrData = `data:image/png;base64,${(
  await fs.readFile("public/business-card-qr.png")
).toString("base64")}`;

function pawPrint(x, y, scale, rotate, opacity) {
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})" fill="#fff" opacity="${opacity}">
      <ellipse cx="2" cy="17" rx="4" ry="5.5" transform="rotate(-27 2 17)"/>
      <ellipse cx="10" cy="9" rx="4" ry="5.5" transform="rotate(-7 10 9)"/>
      <ellipse cx="20" cy="9" rx="4" ry="5.5" transform="rotate(7 20 9)"/>
      <ellipse cx="28" cy="17" rx="4" ry="5.5" transform="rotate(27 28 17)"/>
      <path d="M7 25c0-7 4-12 8-12s8 5 8 12c0 5-3 8-8 8s-8-3-8-8Z"/>
    </g>`;
}

const frontSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${cardWidth}" height="${cardHeight}" viewBox="0 0 ${cardWidth} ${cardHeight}">
  <defs>
    <linearGradient id="frontBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff4f88"/>
      <stop offset="0.46" stop-color="#e72f71"/>
      <stop offset="1" stop-color="#be1456"/>
    </linearGradient>
    <clipPath id="cardClip"><rect width="${cardWidth}" height="${cardHeight}" rx="${radius}"/></clipPath>
  </defs>
  <g clip-path="url(#cardClip)">
    <rect width="${cardWidth}" height="${cardHeight}" fill="url(#frontBg)"/>
    ${pawPrint(860, 92, 2.25, -17, 0.34)}
    ${pawPrint(950, 142, 1.9, 12, 0.24)}
    <circle cx="170" cy="532" r="6" fill="#fff" opacity=".22"/>
    <text x="610" y="720" font-size="520" font-weight="900" font-family="${fontFamily}" fill="#fff" opacity=".10">桃</text>
    <image href="${iconData}" x="78" y="78" width="126" height="126"/>
    <text x="78" y="280" font-size="32" font-weight="800" font-family="${fontFamily}" fill="#fff" opacity=".82">FREELANCE ENGINEER</text>
    <text x="78" y="390" font-size="92" font-weight="800" font-family="${fontFamily}" fill="#fff">桃谷優寿</text>
    <text x="82" y="454" font-size="40" font-family="${fontFamily}" fill="#fff" opacity=".86">Yuji Momotani</text>
    <text x="82" y="578" font-size="30" font-family="${fontFamily}" fill="#fff" opacity=".78">Designing calm, reliable web systems.</text>
  </g>
</svg>`;

const backSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${cardWidth}" height="${cardHeight}" viewBox="0 0 ${cardWidth} ${cardHeight}">
  <defs>
    <linearGradient id="backBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#fff7f9"/>
    </linearGradient>
    <clipPath id="cardClip"><rect width="${cardWidth}" height="${cardHeight}" rx="${radius}"/></clipPath>
  </defs>
  <g clip-path="url(#cardClip)">
    <rect width="${cardWidth}" height="${cardHeight}" fill="url(#backBg)"/>
    <rect width="28" height="${cardHeight}" fill="#e72f71"/>
    <path d="M884 104c35-22 70-20 98 6-11 34-38 56-78 63-18 3-35 1-50-5 6-26 16-48 30-64Z" fill="#6aa57a"/>
    <text x="108" y="130" font-size="32" font-weight="800" font-family="${fontFamily}" fill="#e72f71">Yuji Momotani</text>
    <text x="108" y="212" font-size="62" font-weight="700" font-family="${fontFamily}" fill="#20242b">Freelance Engineer</text>

    <text x="108" y="338" font-size="28" font-weight="800" font-family="${fontFamily}" fill="#e72f71">PHONE</text>
    <text x="300" y="338" font-size="30" font-family="${fontFamily}" fill="#29313d">080-4268-5557</text>
    <text x="108" y="404" font-size="28" font-weight="800" font-family="${fontFamily}" fill="#e72f71">MAIL</text>
    <text x="300" y="404" font-size="28" font-family="${fontFamily}" fill="#29313d">yuji.momotani256@gmail.com</text>
    <text x="108" y="470" font-size="28" font-weight="800" font-family="${fontFamily}" fill="#e72f71">ADDRESS</text>
    <text x="300" y="470" font-size="25" font-family="${fontFamily}" fill="#29313d">712-8007</text>
    <text x="300" y="510" font-size="25" font-family="${fontFamily}" fill="#29313d">岡山県倉敷市鶴の浦2-5-6</text>

    <image href="${qrData}" x="824" y="328" width="190" height="190"/>
    <circle cx="110" cy="580" r="14" fill="#e72f71"/>
    <circle cx="132" cy="580" r="14" fill="#ff8fb1"/>
    <text x="170" y="590" font-size="30" font-weight="700" font-family="${fontFamily}" fill="#69717d">Momotani Yuji</text>
  </g>
</svg>`;

const previewSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="2500" height="980" viewBox="0 0 2500 980">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#271f26" flood-opacity=".18"/>
    </filter>
  </defs>
  <rect width="2500" height="980" fill="#fff7f9"/>
  <g transform="translate(120 165)" filter="url(#shadow)">${frontSvg}</g>
  <g transform="translate(1305 165)" filter="url(#shadow)">${backSvg}</g>
</svg>`;

await sharp(Buffer.from(frontSvg))
  .png({ compressionLevel: 9 })
  .toFile("public/business-card-front.png");
await sharp(Buffer.from(backSvg))
  .png({ compressionLevel: 9 })
  .toFile("public/business-card-back.png");
await sharp(Buffer.from(previewSvg))
  .png({ compressionLevel: 9 })
  .toFile("public/business-card-preview.png");

console.log("Generated public/business-card-front.png");
console.log("Generated public/business-card-back.png");
console.log("Generated public/business-card-preview.png");
