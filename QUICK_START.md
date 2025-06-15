# راهنمای سریع - سیستم قیمت‌گذاری الکترونیک

## شروع سریع ⚡

### مرحله 1: دانلود و استخراج
1. فایل `electronics-pricing-complete.zip` را استخراج کنید
2. به پوشه پروژه بروید: `cd electronics-pricing`

### مرحله 2: راه‌اندازی فرانت‌اند (Next.js)
```bash
npm install
npm run dev
```
✅ فرانت‌اند در `http://localhost:3000` اجرا می‌شود

### مرحله 3: راه‌اندازی بک‌اند (PHP)
1. پوشه `php-second` را در `htdocs` یا `www` کپی کنید
2. دیتابیس MySQL ایجاد کنید: `aramcont_pricedata`
3. اسکریپت SQL را در فایل `COMPLETE_GUIDE.md` اجرا کنید
4. تنظیمات دیتابیس در `php-second/config/database.php` را بررسی کنید

✅ بک‌اند در `http://localhost/php-second` اجرا می‌شود

### مرحله 4: تست اتصال
1. در فرانت‌اند به `/api-management` بروید
2. وضعیت اتصال API را بررسی کنید
3. در صورت خطا، فایل `COMPLETE_GUIDE.md` را مطالعه کنید

## URL های مهم 🔗

- **فرانت‌اند**: http://localhost:3000
- **بک‌اند**: http://localhost/php-second
- **تست API**: http://localhost/php-second/api/boards.php
- **مدیریت API**: http://localhost:3000/api-management

## اطلاعات دیتابیس 🗄️

```
Host: localhost
Database: aramcont_pricedata
User: aramcont_moridi
Password: OSA09155032778
```

## ساختار فایل‌ها 📁

```
electronics-pricing/
├── php-second/          # بک‌اند PHP + API
├── src/                 # فرانت‌اند Next.js
├── COMPLETE_GUIDE.md    # راهنمای کامل
└── QUICK_START.md       # این فایل
```

## مشکلات رایج 🔧

**خطای CORS**: فایل `.htaccess` موجود باشد
**خطای 404**: mod_rewrite فعال باشد  
**خطای دیتابیس**: اطلاعات اتصال صحیح باشد

## راهنمای کامل 📖

برای جزئیات بیشتر فایل `COMPLETE_GUIDE.md` را مطالعه کنید.

---
**آماده شده توسط**: سیستم قیمت‌گذاری قطعات الکترونیکی  
**تاریخ**: ۱۴۰۳ 