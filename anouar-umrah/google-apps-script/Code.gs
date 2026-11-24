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
 * Conversions API (اختياري — يرسل كل حجز إلى ميتا من الخادم بنفس حدث الموقع، حالياً Purchase):
 *   Project Settings (⚙️) ← Script Properties ← Add script property
 *      Property: META_ACCESS_TOKEN   Value: رمز الوصول من Events Manager
 *   لا تضع الرمز في هذا الملف أبداً.
 *   للتجربة: أضف أيضاً META_TEST_EVENT_CODE (من Test events) ثم احذفه بعد التأكد.
 *
 * وصل الحجز PDF: يُنشأ تلقائياً لكل حجز في مجلد «وصولات الحجز – أنوار الصباح» في Google Drive،
 * ويُضاف رابطه في عمود «وصل PDF». عند أول نشر بعد هذا التحديث سيطلب Google الإذن بالوصول
 * إلى Drive وDocs: وافق عليه. للتجربة: اختر testReceiptPdf ثم Run.
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
  let meta, sheet, row, receiptCol;
  try {
    const data = JSON.parse(e.postData.contents);
    meta = data._meta;
    delete data._meta;
    if (meta && meta.receipt) data['وصل PDF'] = '';
    sheet = getSheet();

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
    row = sheet.getLastRow();
    receiptCol = headers.indexOf('وصل PDF') + 1;
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }

  // بعد حفظ الحجز: إرسال الحدث إلى ميتا وإنشاء الوصل (أي خطأ هنا لا يؤثر على الحجز المحفوظ)
  if (meta) sendMetaLead(meta);
  if (meta && meta.receipt && receiptCol > 0) {
    try {
      const file = createReceiptPdf(meta.receipt, meta.logoUrl);
      sheet.getRange(row, receiptCol).setRichTextValue(
        SpreadsheetApp.newRichTextValue().setText('وصل ' + meta.receipt.reference).setLinkUrl(file.getUrl()).build()
      );
    } catch (err) {
      console.warn('Receipt PDF error: ' + err);
      sheet.getRange(row, receiptCol).setValue('خطأ في إنشاء الوصل');
    }
  }
  return json({ ok: true });
}

// ===== وصل الحجز PDF =====
const NAVY = '#082f5e';
const YELLOW = '#ffc20e';

function createReceiptPdf(r, logoUrl) {
  const doc = DocumentApp.create('وصل ' + r.reference);
  const body = doc.getBody();
  body.setMarginTop(30).setMarginBottom(30).setMarginLeft(40).setMarginRight(40);
  const ag = r.agency || {};

  const para = (text, opts) => {
    const p = body.appendParagraph(text || '');
    p.setLeftToRight(false).setAlignment(opts && opts.center ? DocumentApp.HorizontalAlignment.CENTER : DocumentApp.HorizontalAlignment.RIGHT);
    p.editAsText().setFontFamily('Cairo').setFontSize((opts && opts.size) || 10).setBold(Boolean(opts && opts.bold))
      .setForegroundColor((opts && opts.color) || '#0d1f38');
    p.setSpacingAfter((opts && opts.after) || 2);
    return p;
  };

  // الشعار
  if (logoUrl) {
    try {
      const blob = UrlFetchApp.fetch(logoUrl).getBlob();
      const p = body.getParagraphs()[0];
      p.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      p.appendInlineImage(blob).setWidth(80).setHeight(80);
    } catch (err) {
      console.warn('Logo: ' + err);
    }
  }
  para(ag.name, { center: true, bold: true, size: 16, color: NAVY });
  para([ag.branch, ag.address].filter(String).join(' — '), { center: true, size: 9, color: '#5b6b82' });
  para((ag.phones || []).join(' / '), { center: true, size: 9, color: '#5b6b82', after: 10 });
  body.appendHorizontalRule();
  para('وصل طلب حجز عمرة', { center: true, bold: true, size: 18, color: NAVY, after: 4 });
  para('رقم الطلب: ' + r.reference + '     التاريخ: ' + r.date, { center: true, size: 10, after: 10 });

  // جدول لكل قسم: [القيمة، البيان] حتى يظهر البيان على اليمين
  const table = (title, rows, totalRow) => {
    const data = [['', title]].concat(rows.map((x) => [String(x[1]), String(x[0])]));
    if (totalRow) data.push([totalRow[1], totalRow[0]]);
    const t = body.appendTable(data);
    t.setBorderColor('#e3e9f2');
    for (let i = 0; i < t.getNumRows(); i++) {
      const tr = t.getRow(i);
      for (let j = 0; j < tr.getNumCells(); j++) {
        const c = tr.getCell(j);
        c.setPaddingTop(3).setPaddingBottom(3);
        const p = c.getChild(0).asParagraph();
        p.setLeftToRight(false).setAlignment(j === 1 ? DocumentApp.HorizontalAlignment.RIGHT : DocumentApp.HorizontalAlignment.LEFT);
        p.editAsText().setFontFamily('Cairo').setFontSize(10).setBold(j === 0 || i === 0);
        if (i === 0) { c.setBackgroundColor(NAVY); p.editAsText().setForegroundColor('#ffffff'); }
        else if (totalRow && i === t.getNumRows() - 1) { c.setBackgroundColor('#fff6d1'); p.editAsText().setBold(true).setForegroundColor(NAVY); }
        else p.editAsText().setForegroundColor(j === 1 ? '#5b6b82' : NAVY);
      }
    }
    para('', { after: 6 });
  };

  (r.sections || []).forEach((s) => table(s.title, s.rows || []));
  if (r.lines && r.lines.length) table('المبلغ التقديري', r.lines, ['المجموع التقديري', r.total]);

  para('هذا الوصل إثبات لاستلام طلب الحجز وليس تأكيداً نهائياً له. المبلغ تقديري ويُؤكَّد من طرف الوكالة عند الاتصال.', { size: 8, color: '#5b6b82' });
  para('الوثائق المطلوبة: جواز سفر ساري المفعول (6 أشهر على الأقل)، صورة شمسية بخلفية بيضاء، نسخة من بطاقة التعريف.', { size: 8, color: '#5b6b82' });

  doc.saveAndClose();
  const pdf = doc.getAs('application/pdf').setName('وصل-' + r.reference + '.pdf');
  const file = getReceiptsFolder().createFile(pdf);
  DriveApp.getFileById(doc.getId()).setTrashed(true);
  return file;
}

function getReceiptsFolder() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('RECEIPTS_FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (err) { /* حُذف المجلد: نُنشئ واحداً جديداً */ }
  }
  const folder = DriveApp.createFolder('وصولات الحجز – أنوار الصباح');
  props.setProperty('RECEIPTS_FOLDER_ID', folder.getId());
  return folder;
}

// للتجربة من محرّر Apps Script: اختر testReceiptPdf ثم Run، وسيظهر رابط الملف في Execution log
function testReceiptPdf() {
  const file = createReceiptPdf({
    reference: 'AS-TEST01',
    date: new Date().toLocaleString(),
    agency: { name: 'أنوار الصباح للسياحة والأسفار', branch: 'فرع الرغاية', address: 'محل رقم 150 عمارة 06 قريشي 02 الرغاية، الجزائر', phones: ['0770 707 501', '0563 008 012'] },
    sections: [
      { title: 'معلومات الزبون', rows: [['الاسم واللقب', 'تجربة اختبار'], ['الهاتف', '0770707501']] },
      { title: 'تفاصيل الرحلة', rows: [['العرض', 'عمرة شعبان 1448 هـ'], ['الغرفة', 'ثلاثية']] },
    ],
    lines: [['2 × بالغ (غرفة ثلاثية)', '510.000 دج']],
    total: '510.000 دج',
  }, null);
  console.log(file.getUrl());
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
        event_name: meta.eventName || 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: meta.eventId,
        action_source: 'website',
        event_source_url: meta.url,
        user_data: userData,
        custom_data: {
          content_name: meta.content_name,
          content_ids: meta.content_ids,
          content_type: meta.content_type,
          num_items: meta.num_items,
          value: Number(meta.value) || 0,
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
  sendMetaLead({ eventName: 'Purchase', eventId: 'TEST-' + Date.now(), phone: '0770707501', fullName: 'تجربة اختبار', url: 'https://example.com', value: 223000, currency: 'DZD', content_name: 'TEST' });
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
