# Google Apps Script QR Generator

`Code.gs` creates QR code PNG files from a spreadsheet and saves them under the Google Drive root folder `QRコード`.

## Spreadsheet Columns

- B: 名前
- C: URL
- D: icon URL。任意。空なら中央アイコンなしで生成。指定する場合はPNG/JPG
- E: 作成フラグ。`1` の行だけ生成対象
- F: QRコードパス。生成後に `QRコード/{fileName}.png` を書き込み

The generated Drive file URL is also written to the F-cell note.
If generation fails for a row, the F column receives an `ERROR: ...` message.

## Setup

1. Open the target spreadsheet.
2. Open Apps Script from the spreadsheet.
3. Paste `Code.gs`.
4. Make sure Google Drive root contains a folder named `QRコード`.
5. Reload the spreadsheet and use the `QRコード > フラグ1のQRを生成` menu.

## Notes

- GAS cannot use npm QR libraries directly, so this script uses QuickChart's QR API.
- The QR code uses error correction level `H` so it remains robust when an icon URL is provided.
- Put a public PNG/JPG icon URL in D column only when you want a center icon.
- SVG and ICO URLs are not supported by QuickChart as center images.
- For the peach icon, use the PNG asset after deploy: `https://your-domain.vercel.app/icon-qr.png`.
- If the `QRコード` folder does not exist in Drive root, the script shows an error and stops.
- If no rows are generated, confirm that the active sheet is correct and E column contains `1`.
- Always scan-test generated QR codes before printing.
