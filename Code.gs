var SPREADSHEET_ID = '1S-sSi4VPvU2DjuQ_Ji-c8P_ZfteESvQiJ9Wne1dnA_o';
var DRIVE_FOLDER_ID = '1DvAqAkA5FzpCFXOpyO6_0mLEuuJvJrEY';
var LOGO_FILE_ID = '';

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle("Snack's Bill Generator")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ═══════════════════════════════════════
// ── Daily Midnight Cleanup (Trigger) ──
// ═══════════════════════════════════════

function ensureCleanupTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  var exists = false;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'midnightCleanup') {
      exists = true;
      break;
    }
  }
  if (!exists) {
    ScriptApp.newTrigger('midnightCleanup')
      .timeBased()
      .atHour(0)
      .everyDays(1)
      .create();
  }
}

function midnightCleanup() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName("Snack's Bill");

  if (!sheet || sheet.getLastRow() <= 1) return;

  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(2, 1, lastRow - 1, 3).getValues();

  // Delete each PDF file from Drive
  for (var i = 0; i < data.length; i++) {
    var fileUrl = String(data[i][2]);
    if (!fileUrl || fileUrl === 'undefined' || fileUrl === '') continue;
    try {
      var match = fileUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        DriveApp.getFileById(match[1]).setTrashed(true);
      }
    } catch (e) {
      // File may already be deleted — skip silently
    }
  }

  // Clear all data rows, keep header row 1
  sheet.deleteRows(2, lastRow - 1);
}

// ═══════════════════════════════════════
// ── Bengali Numeral Converter ──
// ═══════════════════════════════════════

function toBanglaNum(input) {
  var banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/[0-9]/g, function(d) {
    return banglaDigits[parseInt(d, 10)];
  });
}

// ═══════════════════════════════════════
// ── Number to Bengali Words ──
// ═══════════════════════════════════════

function numberToBanglaWords(num) {
  if (num === 0) return 'শূন্য';
  if (num < 0) return 'ঋণাত্মক ' + numberToBanglaWords(Math.abs(num));

  var ones = [
    '', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়',
    'দশ', 'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোল', 'সতেরো',
    'আঠারো', 'উনিশ', 'বিশ', 'একুশ', 'বাইশ', 'তেইশ', 'চব্বিশ', 'পঁচিশ',
    'ছাব্বিশ', 'সাতাশ', 'আটাশ', 'উনত্রিশ', 'ত্রিশ', 'একত্রিশ', 'বত্রিশ',
    'তেত্রিশ', 'চৌত্রিশ', 'পঁয়ত্রিশ', 'ছত্রিশ', 'সাতত্রিশ', 'আটত্রিশ',
    'উনচল্লিশ', 'চল্লিশ', 'একচল্লিশ', 'বিয়াল্লিশ', 'তেতাল্লিশ', 'চউচল্লিশ',
    'পয়তাল্লিশ', 'ছেচল্লিশ', 'সাতচল্লিশ', 'আটচল্লিশ', 'উনপঞ্চাশ', 'পঞ্চাশ',
    'একান্ন', 'বায়ান্ন', 'তিপান্ন', 'চুয়ান্ন', 'পঞ্চান্ন', 'ছাপান্ন',
    'সাতান্ন', 'আটান্ন', 'উনষাট', 'ষাট', 'একষট্টি', 'বাষট্টি', 'তেষট্টি',
    'চৌষট্টি', 'পয়ষট্টি', 'ছেষট্টি', 'সাতষট্টি', 'আটষট্টি', 'উনসত্তর',
    'সত্তর', 'একাত্তর', 'বাহাত্তর', 'তেহাত্তর', 'চুরাত্তর', 'পচাত্তর',
    'ছিয়াত্তর', 'সাতাত্তর', 'আটাত্তর', 'উনাশি', 'আশি', 'একাশি', 'বিরাশি',
    'তিরাশি', 'চুরাশি', 'পঁচাশি', 'ছিয়াশি', 'সাতাশি', 'আটাশি', 'উননব্বই',
    'নব্বই', 'একানব্বই', 'বিরানব্বই', 'তিরানব্বই', 'চুরানব্বই', 'পঁচানব্বই',
    'ছিয়ানব্বই', 'সাতানব্বই', 'আটানব্বই', 'নিরানব্বই'
  ];

  if (num < 100) return ones[num];

  var result = [];
  var n = Math.floor(num);

  if (n >= 10000000) {
    result.push(numberToBanglaWords(Math.floor(n / 10000000)) + ' কোটি');
    n %= 10000000;
  }
  if (n >= 100000) {
    result.push(numberToBanglaWords(Math.floor(n / 100000)) + ' লাখ');
    n %= 100000;
  }
  if (n >= 1000) {
    result.push(numberToBanglaWords(Math.floor(n / 1000)) + ' হাজার');
    n %= 1000;
  }
  if (n >= 100) {
    result.push(ones[Math.floor(n / 100)] + ' শত');
    n %= 100;
  }
  if (n > 0) {
    result.push(ones[n]);
  }

  return result.join(' ');
}

// ═══════════════════════════════════════
// ── Sections (with CacheService) ──
// ═══════════════════════════════════════

function getSections() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get('sectionsList');
  if (cached) return JSON.parse(cached);

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName("Sections Name");
  if (!sheet) return [];
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
  var sections = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i][0]) sections.push(data[i][0]);
  }

  cache.put('sectionsList', JSON.stringify(sections), 21600);
  return sections;
}

function refreshSectionsCache() {
  CacheService.getScriptCache().remove('sectionsList');
  return getSections();
}

// ── Unified init ──
function getInitialData() {
  // Ensure midnight cleanup trigger exists
  ensureCleanupTrigger();

  var sections = getSections();
  var props = PropertiesService.getUserProperties();
  var savedRate = props.getProperty('snacksRate') || '';
  return { sections: sections, snacksRate: savedRate };
}

// ═══════════════════════════════════════
// ── Today's History Only ──
// ═══════════════════════════════════════

function getTodayHistory() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName("Snack's Bill");
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var now = new Date();
  var todayStr = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();

  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(2, 1, lastRow - 1, 4).getValues();

  var bills = [];
  // Read bottom-to-top so newest appears first
  for (var i = data.length - 1; i >= 0; i--) {
    if (String(data[i][0]) === todayStr) {
      bills.push({
        section: String(data[i][1]),
        url: String(data[i][2]),
        time: String(data[i][3]) || ''
      });
    }
  }
  return bills;
}

// ── Artisans ──
function getArtisans(sectionName) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(sectionName);
  if (!sheet) return [];

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var data = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  var artisans = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i][0]) {
      artisans.push({ name: data[i][0], code: data[i][1] || '' });
    }
  }
  return artisans;
}

// ── Generate Bills ──
function generateBills(selectedData, sectionName, dateStr, snacksRate) {
  try {
    PropertiesService.getUserProperties().setProperty('snacksRate', snacksRate.toString());

    var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    var targetFolder;
    var folders = parentFolder.getFoldersByName("Snack's Bill");
    if (folders.hasNext()) {
      targetFolder = folders.next();
    } else {
      targetFolder = parentFolder.createFolder("Snack's Bill");
    }

    var now = new Date();
    var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), "dd/MM/yyyy, hh:mm a");
    var timeOnly = Utilities.formatDate(now, Session.getScriptTimeZone(), "hh:mm a");

    var html = getPdfHtmlTemplate(selectedData, sectionName, dateStr, snacksRate, timestamp);
    var fileName = "Snack's Bill - " + sectionName + " - " + dateStr.replace(/\//g, '-') + ".pdf";

    var blob = Utilities.newBlob(html, MimeType.HTML).setName(fileName);
    var pdfBlob = blob.getAs(MimeType.PDF);
    var file = targetFolder.createFile(pdfBlob);
    var fileUrl = file.getUrl();

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var historySheet = ss.getSheetByName("Snack's Bill");
    if (!historySheet) {
      historySheet = ss.insertSheet("Snack's Bill");
      historySheet.appendRow(["Date", "Section Name", "Bill", "Time"]);
      historySheet.getRange("A1:D1").setFontWeight("bold");
    }
    // Store: Date, Section, URL, Time (for today's list)
    historySheet.appendRow([dateStr, sectionName, fileUrl, timeOnly]);

    return {
      success: true,
      message: "Successfully generated your snack's bill",
      url: fileUrl
    };
  } catch (error) {
    return { success: false, message: error.toString() };
  }
}

// ═══════════════════════════════════════
// ── PDF HTML Template ──
// ═══════════════════════════════════════

function getPdfHtmlTemplate(data, sectionName, dateStr, snacksRate, timestamp) {

 // Bengali conversions
  var banglaDate = toBanglaNum(dateStr);
  var banglaRate = toBanglaNum(snacksRate);
  var totalAmount = data.length * parseFloat(snacksRate);
  var banglaTotalAmount = toBanglaNum(totalAmount);
  var amountInWords = numberToBanglaWords(totalAmount);

  var html = '<html><head>' +
    '<link href="https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap" rel="stylesheet">' +
    '<style>' +
    '@import url("https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap");\n' +
    '@page { margin-bottom: 50px; }' +
    'body {' +
    '  font-family: "Tiro Bangla", "Inter", Arial, sans-serif;' +
    '  font-size: 9px;' +
    '  margin-top: 10;' +
    '  padding: 10px;' +
    '  padding-bottom: 90px;' +
    '}' +
    'h1 { text-align: center; margin: 0; font-size: 16px; font-weight: bold; }' +
    'h2 { text-align: center; margin: 0; font-size: 14px; font-weight: bold; }' +
    'h3 { text-align: center; margin: 5px 0 10px 0; font-size: 12px; font-weight: bold; }' +
    'table { width: 100%; border-collapse: collapse; }' +
    'th, td { font-size: 14px; border: 0.5px solid #8b8b8b; padding: 1.3px; text-align: center; }' +
    'th { font-weight: bold; }' +
    '.header-table { margin-bottom: -1px; }' +
    '.header-table td { text-align: left; font-weight: bold; border-bottom: none; }' +
    '.timestamp { text-align: right; font-size: 9px; color: #666; margin-bottom: 6px; }' +
    '.footer-table {' +
    '  position: fixed;' +
    '  bottom: 0px;' +
    '  left: 10px;' +
    '  right: 10px;' +
    '  width: calc(100% - 10px);' +
    '  border: none;' +
    '}' +
    '.footer-table td {' +
    '  border: none;' +
    '  text-align: center;' +
    '  width: 33.33%;' +
    '  font-size: 12px;' +
    '  font-weight: bold;' +
    '}' +
    '.footer-table span {' +
    '  border-top: 1px dotted #000;' +
    '  padding-top: 3px;' +
    '  display: inline-block;' +
    '  width: 80%;' +
    '}' +
    '.page-break { page-break-before: always; }' +
    '</style></head><body>';

  // Fixed footer
  html += '<table class="footer-table"><tr>' +
    '<td><span>প্রস্তুতকারীর স্বাক্ষর</span></td>' +
    '<td><span>যাচাইকারীর স্বাক্ষর</span></td>' +
    '<td><span>অনুমোদনকারীর স্বাক্ষর</span></td>' +
    '</tr></table>';

  var MAX_PER_PAGE = 30;
  var numPages = Math.ceil(data.length / MAX_PER_PAGE) || 1;

  for (var page = 0; page < numPages; page++) {
    if (page > 0) {
      html += '<div class="page-break"></div>';
    }

    html += '<h1>ব্র্যাক - আড়ং</h1>' +
      '<h2>গড়পাড়া</h2>' +
      '<h3>দৈনিক নাস্তার বিল।</h3>' +
      '<div class="timestamp">Generated: ' + timestamp + '</div>' +

      '<table class="header-table"><tr>' +
      '<td style="width: 65%; border: none;">সেকশনঃ ' + sectionName + '</td>' +
      '<td style="width: 35%; border: none">তারিখঃ ' + banglaDate + '</td>' +
      '</tr></table>' +

      '<table><thead><tr>' +
      '<th style="width: 5%">ক্রঃ নং</th>' +
      '<th style="width: 25%">কর্মীর নাম</th>' +
      '<th style="width: 10%">কোড নং</th>' +
      '<th style="width: 8%">মিলের<br>সংখ্যা</th>' +
      '<th style="width: 10%">মিলের<br>হার</th>' +
      '<th style="width: 10%">মোট টাকা</th>' +
      '<th style="width: 15%">স্বাক্ষর</th>' +
      '<th style="width: 17%">মন্তব্য</th>' +
      '</tr></thead><tbody>';

    var startIdx = page * MAX_PER_PAGE;
    var endIdx = Math.min(startIdx + MAX_PER_PAGE, data.length);

    for (var i = startIdx; i < endIdx; i++) {
      var row = data[i];
      var banglaCode = toBanglaNum(row.code);
      html += '<tr>' +
        '<td>' + toBanglaNum(i + 1) + '</td>' +
        '<td style="text-align: left;">' + row.name + '</td>' +
        '<td>' + banglaCode + '</td>' +
        '<td>' + toBanglaNum(1) + '</td>' +
        '<td>' + banglaRate + '</td>' +
        '<td>' + banglaRate + '</td>' +
        '<td></td>' +
        '<td></td>' +
        '</tr>';
    }

    var pageItemCount = endIdx - startIdx;
    var pageTotalAmount = pageItemCount * parseFloat(snacksRate);
    var banglaPageTotal = toBanglaNum(pageTotalAmount);
    var pageAmountInWords = numberToBanglaWords(pageTotalAmount);

    // Page subtotal
    html += '<tr style="font-weight:bold; background-color:#f8f8f8;">' +
      '<td colspan="5">মোট টাকাঃ</td>' +
      '<td>' + banglaPageTotal + '</td>' +
      '<td></td><td></td></tr>';

    // Amount in words for the page
    html += '<tr style="background-color:#f0f0f0;">' +
      '<td colspan="8" style="text-align:center; font-weight:bold; font-size:14px; padding:4px 8px; border-left:0.5px solid #8b8b8b; border-right:0.5px solid #8b8b8b; border-bottom:0.5px solid #8b8b8b;">' +
      'কথায়ঃ ' + pageAmountInWords + ' টাকা মাত্র।' +
      '</td></tr>';

    html += '</tbody></table>';
  }

  html += '</body></html>';
  return html;
}