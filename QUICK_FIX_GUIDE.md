# 🚨 راهنمای سریع حل مشکل Forbidden Error

## مشکل شما:
```
Forbidden
You don't have permission to access this resource.
```

## ✅ راه‌حل‌های سریع:

### مرحله 1: آپلود فایل جدید
1. فایل جدید `electronics-pricing-FIXED.zip` را دانلود کنید
2. محتویات قبلی پوشه `price-electronics` را حذف کنید
3. فایل جدید را آپلود و استخراج کنید

### مرحله 2: تنظیم مجوزها (از طریق cPanel File Manager)
```
پوشه price-electronics: 755
تمام فایل‌های .php: 644
فایل .htaccess: 644
تمام پوشه‌ها: 755
```

### مرحله 3: تست سیستم
ابتدا به این آدرس مراجعه کنید:
```
https://aramcontrol.com/price-electronics/setup.php
```

این فایل:
- ✅ مجوزها را خودکار تنظیم می‌کند
- ✅ اتصال دیتابیس را تست می‌کند  
- ✅ تمام فایل‌ها را بررسی می‌کند
- ✅ مشکلات را شناسایی و حل می‌کند

### مرحله 4: دسترسی به سیستم
پس از حل مشکلات، این آدرس‌ها کار خواهند کرد:

**صفحه اصلی:**
```
https://aramcontrol.com/price-electronics/
```

**اپلیکیشن React:**
```
https://aramcontrol.com/price-electronics/public/app.html
```

**تست API ها:**
```
https://aramcontrol.com/price-electronics/api/boards.php
https://aramcontrol.com/price-electronics/api/devices.php
```

## 🔧 اگر همچنان مشکل دارید:

### گزینه A: دستی
1. فایل `index.php` را در پوشه اصلی `price-electronics` ایجاد کنید:
```php
<?php header("Location: public/index.php"); exit(); ?>
```

### گزینه B: مجوزها
از طریق SSH (اگر دسترسی دارید):
```bash
cd /home/aramcont/domains/aramcontrol.com/public_html/price-electronics
chmod 755 .
chmod 755 public backend config
chmod 644 *.php public/*.php backend/api/*.php config/*.php
chmod 644 .htaccess
```

### گزینه C: ساده‌ترین راه
فقط فایل `setup.php` را در پوشه اصلی قرار دهید و به آن مراجعه کنید.

## 📞 در صورت ادامه مشکل:
مراحل انجام شده و پیغام خطای دقیق را اعلام کنید.

---
**نکته:** فایل جدید `electronics-pricing-FIXED.zip` تمام این مشکلات را حل کرده است. 