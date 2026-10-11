/**
 * استقبال طلبات الحجز من الموقع وحفظها في Google Sheets
 * ----------------------------------------------------
 * 1. افتح الجدول ← Extensions (الإضافات) ← Apps Script
 * 2. الصق هذا الملف مكان الكود الموجود واحفظ
 * 3. Deploy ← Manage deployments ← ✏️ Edit ← Version: New version ← Deploy
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. افتح رابط Web app في المتصفح: يجب أن تظهر رسالة OK
 */

// معرّف الجدول (من رابطه: docs.google.com/spreadsheets/d/<ID>/edit)
const SPREADSHEET_ID = '17QjGIhv053Qxbk-J1KF4rkH60RsvE6fPZIXN3m9jCZg';
const SHEET_NAME = 'الحجوزات';

function doGet() {
  const sheet = getSheet();
  return ContentService.createTextOutput('OK – متصل بالجدول: ' + sheet.getParent().getName() + ' / ' + sheet.getName());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet();

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

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  sheet.setRightToLeft(true);
  return sheet;
}

// للتجربة من محرّر Apps Script: اختر testInsert ثم Run
function testInsert() {
  doPost({ postData: { contents: JSON.stringify({ 'التاريخ': new Date().toLocaleString(), 'رقم الطلب': 'TEST', 'الاسم واللقب': 'تجربة' }) } });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
