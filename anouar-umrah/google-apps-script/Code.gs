/**
 * استقبال طلبات الحجز من الموقع وحفظها في Google Sheets
 * ----------------------------------------------------
 * 1. افتح جدول Google Sheets جديداً ← Extensions (الإضافات) ← Apps Script
 * 2. الصق هذا الملف مكان الكود الموجود واحفظ
 * 3. Deploy ← New deployment ← Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. انسخ رابط Web app وضعه في bookingEndpoint داخل src/data/agency.js
 */

const SHEET_NAME = 'الحجوزات';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    sheet.setRightToLeft(true);

    // الأعمدة تُنشأ تلقائياً من أسماء الحقول، وتُضاف الأعمدة الجديدة في آخر الجدول
    let headers = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    const missing = Object.keys(data).filter((k) => headers.indexOf(k) === -1);
    if (missing.length) {
      sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
      headers = headers.concat(missing);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#ffc20e');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow(headers.map((h) => (h in data ? data[h] : '')));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
