/**
 * ============================================================================
 * كود ربط نموذج الإجازة الذهبية بـ Google Sheets تلقائياً (النسخة المحسنة 2.0)
 * Golden Vacation — Lead Capture to Google Sheets
 * ============================================================================
 */

function doPost(e) {
  try {
    // نحدد دائماً أول ورقة (Sheet 1) لضمان عدم الكتابة في ورقة مخفية أو خاطئة
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    
    // إنشاء عناوين الأعمدة وتنسيقها تلقائياً إذا كان الشيت جديداً
    if (sheet.getLastRow() === 0) {
      var headers = [
        "تاريخ ووقت الإرسال",
        "الاسم الكامل",
        "رقم الجوال",
        "الوجهة أو الباقة",
        "عدد المسافرين",
        "موعد السفر المتوقع",
        "الميزانية التقريبية",
        "مصدر الحملة الإعلانية",
        "حالة الطلب"
      ];
      sheet.appendRow(headers);
      
      // تنسيق شريط العناوين بلون كحلي فخم وخط أبيض عريض
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0E1B26");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      sheet.setRowHeight(1, 38);
      sheet.setFrozenRows(1);
    }

    // استخراج المعاملات سواء من الرابط أو من الفورم
    var p = (e && e.parameter) ? e.parameter : {};
    
    // دعم فك الترميز في حال وصول البيانات كـ JSON
    if ((!p.fullName || p.fullName === "") && e && e.postData && e.postData.contents) {
      try {
        var json = JSON.parse(e.postData.contents);
        p = json;
      } catch (jsonErr) {}
    }

    // صف البيانات الجديد
    var newRow = [
      p.submittedAt || new Date().toLocaleString("ar-SA"),
      p.fullName || "غير محدد",
      p.phoneNumber || "غير محدد",
      p.destination || "غير محدد",
      p.travelers || "غير محدد",
      p.travelDate || "غير محدد",
      p.budget || "غير محدد",
      p.campaignSource || (p.sourceTag ? ("مصدر: " + p.sourceTag) : "إعلانات جوجل {G2}"),
      "طلب جديد"
    ];

    sheet.appendRow(newRow);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", rowAdded: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // إذا جاءت بيانات عبر GET نسجلها أيضاً
  if (e && e.parameter && e.parameter.fullName) {
    return doPost(e);
  }

  // فحص وتشخيص حالة الشيت عند فتح الرابط في المتصفح
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var totalRows = sheet.getLastRow();
    var sheetName = sheet.getName();
    var ssName = ss.getName();

    return ContentService.createTextOutput(
      "✅ نظام الربط نشط ويعمل بنجاح!\n" +
      "اسم ملف الشيت: " + ssName + "\n" +
      "اسم الورقة: " + sheetName + "\n" +
      "إجمالي الصفوف المسجلة حالياً: " + totalRows + " صف\n" +
      "تاريخ السيرفر: " + new Date().toLocaleString("ar-SA")
    );
  } catch (err) {
    return ContentService.createTextOutput("Golden Vacation Form Webhook is Live! Error: " + err.toString());
  }
}
