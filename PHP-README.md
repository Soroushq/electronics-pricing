# راهنمای نصب و راه‌اندازی سیستم قیمت‌گذاری الکترونیک (نسخه PHP)

## 📦 فایل‌های مورد نیاز
- `electronics-pricing-php.zip` (حجم: ~2 مگابایت)

## 🔧 پیش‌نیازها
- PHP نسخه 7.4 یا 8.0
- MySQL نسخه 5.7 یا بالاتر
- mod_rewrite در Apache فعال باشد

## 📋 مراحل نصب

### مرحله ۱: آپلود فایل‌ها
1. وارد cPanel شوید
2. File Manager را باز کنید
3. به مسیر `/domains/aramcontrol.com/public_html/` بروید
4. فایل `electronics-pricing-php.zip` را آپلود کنید
5. روی فایل ZIP کلیک راست کرده و گزینه "Extract" را انتخاب کنید
6. نام پوشه خروجی را به `price-electronics` تغییر دهید

### مرحله ۲: تنظیم دسترسی‌ها
در File Manager، دسترسی‌های زیر را تنظیم کنید:
- پوشه‌ها: `755` (rwxr-xr-x)
- فایل‌ها: `644` (rw-r--r--)

### مرحله ۳: تنظیم دیتابیس
1. وارد phpMyAdmin شوید (https://cp52.netafraz.com/phpMyAdmin/)
2. دیتابیس `aramcont_pricedata` را انتخاب کنید
3. جداول زیر را ایجاد کنید:

```sql
-- جدول board
CREATE TABLE IF NOT EXISTS `board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- جدول device
CREATE TABLE IF NOT EXISTS `device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `board_id` int(11),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- جدول ghate
CREATE TABLE IF NOT EXISTS `ghate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT 0,
  `board_id` int(11),
  `quantity` int(11) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- جدول processes
CREATE TABLE IF NOT EXISTS `processes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `device_id` int(11),
  `order_index` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`device_id`) REFERENCES `device`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- جدول processprice
CREATE TABLE IF NOT EXISTS `processprice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `process_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `labor_cost` decimal(10,2) DEFAULT 0,
  `material_cost` decimal(10,2) DEFAULT 0,
  `overhead_cost` decimal(10,2) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`process_id`) REFERENCES `processes`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### مرحله ۴: تنظیم فایل config
1. فایل `config/database.php` را ویرایش کنید
2. اطلاعات دیتابیس را وارد کنید:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'aramcont_pricedata');
define('DB_USER', 'aramcont_moridi');
define('DB_PASS', 'OSA09155032778');
```

### مرحله ۵: تست سایت
1. آدرس اصلی: `https://aramcontrol.com/price-electronics`
2. صفحه بردها: `https://aramcontrol.com/price-electronics?route=boards`
3. صفحه دستگاه‌ها: `https://aramcontrol.com/price-electronics?route=devices`
4. صفحه قطعات: `https://aramcontrol.com/price-electronics?route=parts`
5. صفحه تنظیمات: `https://aramcontrol.com/price-electronics?route=settings`

## 🛠️ عیب‌یابی

### خطای 500
1. فایل `logs/error.log` را بررسی کنید
2. تنظیمات PHP را در `php.ini` بررسی کنید
3. مطمئن شوید که mod_rewrite فعال است

### خطای 404
1. مسیر آپلود را بررسی کنید
2. تنظیمات `.htaccess` را بررسی کنید
3. مطمئن شوید که فایل `index.php` در مسیر اصلی وجود دارد

### خطای دیتابیس
1. اطلاعات اتصال به دیتابیس را بررسی کنید
2. مطمئن شوید که جداول ایجاد شده‌اند
3. دسترسی‌های کاربر دیتابیس را بررسی کنید

## 📁 ساختار فایل‌ها
```
price-electronics/
├── config/
│   └── database.php
├── includes/
│   ├── header.php
│   ├── footer.php
│   └── functions.php
├── pages/
│   ├── boards/
│   │   ├── index.php
│   │   ├── create.php
│   │   └── edit.php
│   ├── devices/
│   │   ├── index.php
│   │   ├── create.php
│   │   └── edit.php
│   ├── parts/
│   │   ├── index.php
│   │   ├── create.php
│   │   └── edit.php
│   └── settings/
│       └── index.php
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── logs/
│   └── error.log
├── .htaccess
└── index.php
```

## 🔒 امنیت
- فایل `config/database.php` را در مسیری خارج از دسترس عموم قرار دهید
- از CSRF token برای فرم‌ها استفاده کنید
- ورودی‌های کاربر را با `escape()` پاکسازی کنید
- تنظیمات امنیتی در `.htaccess` را بررسی کنید

## 📞 پشتیبانی
در صورت بروز مشکل، لطفاً موارد زیر را بررسی کنید:
1. خطاهای `logs/error.log`
2. تنظیمات PHP در `php.ini`
3. تنظیمات Apache در `.htaccess`
4. دسترسی‌های فایل‌ها و پوشه‌ها 