/**
 * Spreadsheet QR generator for Google Apps Script.
 *
 * Sheet columns:
 * B: Name
 * C: URL
 * D: Icon URL. Optional. Generates a plain QR code when empty.
 * E: Create flag. Generate when this value is 1.
 * F: QR code path. This script writes "QRコード/{fileName}.png".
 *
 * Output folder:
 * Google Drive root / QRコード
 *
 * Note:
 * GAS cannot use npm QR libraries directly. This script uses QuickChart's
 * QR endpoint and overlays the D-column icon URL when it is provided.
 */
const QR_CONFIG = {
  OUTPUT_FOLDER_NAME: 'QRコード',
  START_ROW: 2,
  NAME_COLUMN: 2,
  URL_COLUMN: 3,
  ICON_URL_COLUMN: 4,
  FLAG_COLUMN: 5,
  PATH_COLUMN: 6,
  SIZE: 1024,
  MARGIN: 3,
  DARK_COLOR: '1f2933',
  LIGHT_COLOR: 'ffffff',
  CENTER_IMAGE_SIZE_RATIO: 0.22,
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('QRコード')
    .addItem('フラグ1のQRを生成', 'generateQrCodesFromActiveSheet')
    .addToUi();
}

/**
 * Generates QR codes for rows where E column is 1.
 * Writes Drive path to F column and stores the file URL as the cell note.
 */
function generateQrCodesFromActiveSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  const outputFolder = getRootOutputFolderOrThrow_();
  const lastRow = sheet.getLastRow();

  if (lastRow < QR_CONFIG.START_ROW) {
    spreadsheet.toast('処理対象の行がありません。', 'QRコード', 5);
    return;
  }

  const rowCount = lastRow - QR_CONFIG.START_ROW + 1;
  const values = sheet
    .getRange(QR_CONFIG.START_ROW, QR_CONFIG.NAME_COLUMN, rowCount, 4)
    .getValues();

  let createdCount = 0;
  const errors = [];

  values.forEach(function (row, index) {
    const rowNumber = QR_CONFIG.START_ROW + index;
    const name = String(row[0] || '').trim();
    const targetUrl = String(row[1] || '').trim();
    const iconUrl = String(row[2] || '').trim();
    const createFlag = row[3];

    if (!isCreateFlag_(createFlag)) {
      return;
    }

    try {
      if (!name) {
        throw new Error('B列の名前が空です。');
      }

      if (!isHttpUrl_(targetUrl)) {
        throw new Error('C列に http:// または https:// から始まるURLを入力してください。');
      }

      if (iconUrl && !isHttpUrl_(iconUrl)) {
        throw new Error('D列のicon URLには http:// または https:// から始まるURLを入力してください。');
      }

      const fileName = buildFileName_(name, rowNumber);
      const blob = createQrCodeBlob_(targetUrl, iconUrl, fileName);
      const file = outputFolder.createFile(blob);
      const drivePath = QR_CONFIG.OUTPUT_FOLDER_NAME + '/' + file.getName();

      sheet.getRange(rowNumber, QR_CONFIG.PATH_COLUMN)
        .setValue(drivePath)
        .setNote(file.getUrl());

      createdCount += 1;
    } catch (error) {
      errors.push(rowNumber + '行目: ' + error.message);
    }
  });

  SpreadsheetApp.flush();

  if (errors.length > 0) {
    const message =
      createdCount +
      '件作成しました。\n' +
      errors.length +
      '件のエラーがあります。\n\n' +
      errors.join('\n');
    SpreadsheetApp.getUi().alert('QRコード生成結果', message, SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  spreadsheet.toast(createdCount + '件のQRコードを作成しました。', 'QRコード', 5);
}

function getRootOutputFolderOrThrow_() {
  const folders = DriveApp.getRootFolder().getFoldersByName(QR_CONFIG.OUTPUT_FOLDER_NAME);

  if (!folders.hasNext()) {
    const message =
      'Googleドライブ直下に「' +
      QR_CONFIG.OUTPUT_FOLDER_NAME +
      '」フォルダが見つかりません。フォルダを作成してから再実行してください。';
    SpreadsheetApp.getUi().alert('QRコード生成エラー', message, SpreadsheetApp.getUi().ButtonSet.OK);
    throw new Error(message);
  }

  return folders.next();
}

function createQrCodeBlob_(targetUrl, iconUrl, fileName) {
  const response = UrlFetchApp.fetch(buildQrCodeUrl_(targetUrl, iconUrl), {
    muteHttpExceptions: true,
  });
  const status = response.getResponseCode();

  if (status < 200 || status >= 300) {
    throw new Error(
      'QR生成APIでエラーが発生しました。HTTP ' +
        status +
        ': ' +
        response.getContentText().slice(0, 300)
    );
  }

  return response.getBlob().setName(fileName);
}

function buildQrCodeUrl_(targetUrl, iconUrl) {
  const params = {
    text: targetUrl,
    format: 'png',
    size: String(QR_CONFIG.SIZE),
    margin: String(QR_CONFIG.MARGIN),
    ecLevel: 'H',
    dark: QR_CONFIG.DARK_COLOR,
    light: QR_CONFIG.LIGHT_COLOR,
  };

  if (iconUrl) {
    params.centerImageUrl = iconUrl;
    params.centerImageSizeRatio = String(QR_CONFIG.CENTER_IMAGE_SIZE_RATIO);
  }

  return (
    'https://quickchart.io/qr?' +
    Object.keys(params)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&')
  );
}

function buildFileName_(name, rowNumber) {
  const timeStamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyyMMdd-HHmmss'
  );
  const safeName = sanitizeFileName_(name || 'row-' + rowNumber);
  return safeName + '-' + timeStamp + '.png';
}

function sanitizeFileName_(value) {
  return String(value)
    .trim()
    .replace(/[\\/:*?"<>|#%{}~&]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function isCreateFlag_(value) {
  return value === 1 || value === '1' || value === true;
}

function isHttpUrl_(value) {
  return /^https?:\/\/\S+$/i.test(value);
}
