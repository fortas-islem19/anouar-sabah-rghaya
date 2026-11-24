/**
 * استقبال طلبات الحجز من الموقع وحفظها في Google Sheets
 * ----------------------------------------------------
 * 1. افتح الجدول ← Extensions (الإضافات) ← Apps Script
 * 2. الصق هذا الملف مكان الكود الموجود واحفظ
 * 3. Deploy ← Manage deployments ← ✏️ Edit ← Version: New version ← Deploy
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. افتح رابط Web app في المتصفح: يجب أن تظهر رسالة OK
 *
 * Conversions API (اختياري — يرسل كل حجز إلى ميتا من الخادم كحدث Lead):
 *   Project Settings (⚙️) ← Script Properties ← Add script property
 *      Property: META_ACCESS_TOKEN   Value: رمز الوصول من Events Manager
 *   لا تضع الرمز في هذا الملف أبداً.
 *   للتجربة: أضف أيضاً META_TEST_EVENT_CODE (من Test events) ثم احذفه بعد التأكد.
 */

// معرّف الجدول (من رابطه: docs.google.com/spreadsheets/d/<ID>/edit)
const SPREADSHEET_ID = '17QjGIhv053Qxbk-J1KF4rkH60RsvE6fPZIXN3m9jCZg';
const SHEET_NAME = 'الحجوزات';
const META_PIXEL_ID = '2176585779919271';

function doGet() {
  const sheet = getSheet();
  return ContentService.createTextOutput('OK – متصل بالجدول: ' + sheet.getParent().getName() + ' / ' + sheet.getName());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const meta = data._meta;
    delete data._meta;
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
    if (meta) sendMetaLead(meta);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// ===== Conversions API =====
function sendMetaLead(meta) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('META_ACCESS_TOKEN');
  if (!token) return;
  try {
    const names = String(meta.fullName || '').toLowerCase().split(/\s+/).filter(String);
    const digits = String(meta.phone || '').replace(/\D/g, '');
    const phone = digits.startsWith('0') ? '213' + digits.slice(1) : digits;
    const userData = {
      ph: phone ? [sha256(phone)] : undefined,
      fn: names[0] ? [sha256(names[0])] : undefined,
      ln: names.length > 1 ? [sha256(names[names.length - 1])] : undefined,
      country: [sha256('dz')],
      fbp: meta.fbp || undefined,
      fbc: meta.fbc || undefined,
      client_user_agent: meta.userAgent || undefined,
    };
    const payload = {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: meta.eventId,
        action_source: 'website',
        event_source_url: meta.url,
        user_data: userData,
        custom_data: {
          content_name: meta.content_name,
          content_ids: meta.content_ids,
          value: meta.value,
          currency: meta.currency || 'DZD',
        },
      }],
    };
    const testCode = props.getProperty('META_TEST_EVENT_CODE');
    if (testCode) payload.test_event_code = testCode;
    const res = UrlFetchApp.fetch('https://graph.facebook.com/v21.0/' + META_PIXEL_ID + '/events?access_token=' + encodeURIComponent(token), {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });
    if (res.getResponseCode() !== 200) console.warn('Meta CAPI: ' + res.getContentText());
  } catch (err) {
    console.warn('Meta CAPI error: ' + err); // لا يؤثر على حفظ الحجز
  }
}

function sha256(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value).trim(), Utilities.Charset.UTF_8)
    .map((b) => ('0' + (b & 0xff).toString(16)).slice(-2)).join('');
}

// للتجربة من محرّر Apps Script: اختر testMetaLead ثم Run، وتابع النتيجة في Test events
function testMetaLead() {
  sendMetaLead({ eventId: 'TEST-' + Date.now(), phone: '0770707501', fullName: 'تجربة اختبار', url: 'https://example.com', value: 223000, currency: 'DZD', content_name: 'TEST' });
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
