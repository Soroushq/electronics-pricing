# 🚀 راهنمای آپلود سریع

## ✅ پروژه آماده است!

### 📦 فایل آماده شده:
- `electronics-pricing-READY.zip` (حجم: ~19 مگابایت)

### 🔧 اطلاعات دیتابیس (تایید شده):
- **Host**: localhost
- **Database**: aramcont_pricedata  
- **User**: aramcont_moridi
- **Password**: OSA09155032778

### 📋 مراحل آپلود:

#### مرحله ۱: دانلود فایل
فایل `electronics-pricing-READY.zip` را دانلود کنید

#### مرحله ۲: آپلود روی سرور
1. وارد cPanel شوید
2. File Manager را باز کنید
3. به مسیر `/domains/aramcontrol.com/public_html/` بروید
4. فایل ZIP را آپلود کنید
5. فایل را Extract کنید
6. نام پوشه خروجی را به `price-electronics` تغییر دهید

#### مرحله ۳: نصب Dependencies (در صورت پشتیبانی Node.js)
```bash
cd /domains/aramcontrol.com/public_html/price-electronics
npm install --production
npm start
```

#### مرحله ۴: تست
- **سایت**: https://aramcontrol.com/price-electronics
- **تست دیتابیس**: https://aramcontrol.com/price-electronics/api/test-db

### 🎯 ویژگی‌های اضافه شده:
- ✅ اتصال کامل به دیتابیس MySQL
- ✅ API برای مدیریت boards
- ✅ API برای مدیریت devices  
- ✅ سازگار با ساختار جداول موجود
- ✅ API تست دیتابیس
- ✅ مدیریت خطاها
- ✅ Type safety کامل

### 📊 API Endpoints:
- `GET /api/boards` - دریافت لیست بردها
- `POST /api/boards` - ایجاد برد جدید
- `GET /api/devices` - دریافت لیست دستگاه‌ها
- `POST /api/devices` - ایجاد دستگاه جدید
- `GET /api/test-db` - تست اتصال دیتابیس

### 🔍 نکات مهم:
- تمام credentials دیتابیس از کد PHP شما استخراج شده
- ساختار Board مطابق با جدول واقعی (bcode, bname, pcode, pcount)
- پشتیبانی از جداول اختیاری (device, ghate, processes, processprice)
- مدیریت خطا در صورت عدم وجود جداول

**همه چیز آماده است! 🎉** 