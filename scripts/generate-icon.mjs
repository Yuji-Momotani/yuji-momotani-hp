// icon.svg から icon.png を書き出すスクリプト
// 実行コマンド： `pnpm generate:icon`

import sharp from "sharp";

const source = "app/icon.svg";
const output = "public/icon.png";
const size = 1024;

await sharp(source, { density: 1024 })
  .resize(size, size, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(`Generated ${output} from ${source} (${size}x${size})`);
