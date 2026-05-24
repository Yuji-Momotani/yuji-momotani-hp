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
  let targetCount = 0;
  const errors = [];

  Logger.log('Sheet: ' + sheet.getName());
  Logger.log('Last row: ' + lastRow);
  Logger.log('Output folder: ' + outputFolder.getName() + ' / ' + outputFolder.getUrl());

  values.forEach(function (row, index) {
    const rowNumber = QR_CONFIG.START_ROW + index;
    const name = String(row[0] || '').trim();
    const targetUrl = String(row[1] || '').trim();
    const iconUrl = String(row[2] || '').trim();
    const createFlag = row[3];

    if (!isCreateFlag_(createFlag)) {
      return;
    }

    targetCount += 1;

    try {
      const pathCell = sheet.getRange(rowNumber, QR_CONFIG.PATH_COLUMN);
      pathCell.setValue('生成中...').setNote('');

      if (!name) {
        throw new Error('B列の名前が空です。');
      }

      if (!isHttpUrl_(targetUrl)) {
        throw new Error('C列に http:// または https:// から始まるURLを入力してください。');
      }

      if (iconUrl && !isHttpUrl_(iconUrl)) {
        throw new Error('D列のicon URLには http:// または https:// から始まるURLを入力してください。');
      }

      if (iconUrl && !isSupportedCenterImageUrl_(iconUrl)) {
        throw new Error(
          'D列のicon URLはPNGまたはJPG画像にしてください。SVGやICOはQuickChartの中央画像として使えません。'
        );
      }

      const fileName = buildFileName_(name, rowNumber);
      const blob = createQrCodeBlob_(targetUrl, iconUrl, fileName);
      const file = outputFolder.createFile(blob);
      const drivePath = QR_CONFIG.OUTPUT_FOLDER_NAME + '/' + file.getName();

      pathCell.setValue(drivePath).setNote(file.getUrl());
      Logger.log(rowNumber + '行目: created ' + drivePath + ' / ' + file.getUrl());

      createdCount += 1;
    } catch (error) {
      const message = getErrorMessage_(error);
      sheet
        .getRange(rowNumber, QR_CONFIG.PATH_COLUMN)
        .setValue('ERROR: ' + message)
        .setNote('');
      errors.push(rowNumber + '行目: ' + message);
      Logger.log(rowNumber + '行目: ERROR ' + message);
    }
  });

  SpreadsheetApp.flush();

  if (targetCount === 0) {
    const message =
      '作成フラグが1の行が見つかりませんでした。\n\n' +
      '現在の対象シート: ' +
      sheet.getName() +
      '\n' +
      'E列に 1 が入っている行だけQRコードを生成します。';
    SpreadsheetApp.getUi().alert('QRコード生成結果', message, SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

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

  SpreadsheetApp.getUi().alert(
    'QRコード生成結果',
    createdCount + '件のQRコードを作成しました。',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
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
    throw new Error('QR生成APIでエラーが発生しました。HTTP ' + status + ': ' + getQuickChartError_(response));
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
  return safeName + '-row' + rowNumber + '-' + timeStamp + '.png';
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
  if (value === true) {
    return true;
  }

  return String(value).trim() === '1';
}

function isHttpUrl_(value) {
  return /^https?:\/\/\S+$/i.test(value);
}

function isSupportedCenterImageUrl_(value) {
  const url = String(value).split('?')[0].toLowerCase();
  return /\.(png|jpg|jpeg)$/.test(url);
}

function getQuickChartError_(response) {
  const headers = response.getAllHeaders();
  const quickChartError =
    headers['x-quickchart-error'] ||
    headers['X-Quickchart-Error'] ||
    headers['X-QuickChart-Error'];

  if (quickChartError) {
    return quickChartError;
  }

  const contentType = String(headers['Content-Type'] || headers['content-type'] || '');
  if (contentType.indexOf('image/') === 0) {
    return '画像形式のエラーレスポンスが返りました。D列のicon URLが公開PNG/JPGか確認してください。';
  }

  return response.getContentText().slice(0, 300);
}

function getErrorMessage_(error) {
  if (error && error.message) {
    return error.message;
  }

  return String(error);
}
