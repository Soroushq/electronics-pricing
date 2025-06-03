# راهنمای آپلود پروژه روی سرور

## مرحله ۱: آماده‌سازی فایل‌های محیط

### ایجاد فایل .env.local
در ریشه پروژه `electronics-pricing` فایل `.env.local` ایجاد کنید:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=aramcont_pricedata
DB_USER=aramcont_pricedata
DB_PASSWORD=YOUR_DATABASE_PASSWORD

# Next.js Configuration
NEXTAUTH_URL=https://aramcontrol.com/price-electronics
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# Application Settings
NODE_ENV=production
```

**نکته مهم**: `YOUR_DATABASE_PASSWORD` را با پسورد واقعی دیتابیس خود جایگزین کنید.

## مرحله ۲: نصب Dependencies

در پوشه پروژه دستور زیر را اجرا کنید:

```bash
npm install
```

## مرحله ۳: Build کردن پروژه

```bash
npm run build
```

## مرحله ۴: آپلود فایل‌ها روی سرور

### روش ۱: استفاده از FTP/SFTP
1. با استفاده از FileZilla یا هر FTP client دیگری وارد سرور شوید
2. تمام فایل‌های پوشه `electronics-pricing` را در مسیر `/domains/aramcontrol.com/public_html/price-electronics` آپلود کنید

### روش ۲: استفاده از cPanel File Manager
1. وارد cPanel سرور شوید
2. File Manager را باز کنید
3. به مسیر `/domains/aramcontrol.com/public_html/` بروید
4. پوشه‌ای با نام `price-electronics` ایجاد کنید
5. تمام فایل‌های پروژه را آپلود کنید

## مرحله ۵: تنظیم دیتابیس

### اتصال به phpMyAdmin
آدرس: https://cp52.netafraz.com/phpMyAdmin/

### ساختار جداول (در صورت نیاز به بازسازی)

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

## مرحله ۶: تنظیم سرور Node.js

اگر سرور از Node.js پشتیبانی می‌کند:

### تنظیم package.json برای production
```json
{
  "scripts": {
    "start": "next start -p 3000"
  }
}
```

### اجرای پروژه
```bash
cd /domains/aramcontrol.com/public_html/price-electronics
npm install --production
npm run build
npm start
```

## مرحله ۷: تنظیم وب سرور (Apache/Nginx)

### برای Apache (.htaccess)
```apache
RewriteEngine On
RewriteRule ^$ /price-electronics/ [R=301,L]
RewriteRule ^(.*)$ /price-electronics/$1 [R=301,L]
```

### برای Nginx
```nginx
location /price-electronics {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## مرحله ۸: تست سایت

پس از آپلود موفق، سایت باید در آدرس زیر در دسترس باشد:
`https://aramcontrol.com/price-electronics`

## عیب‌یابی رایج

### خطای دیتابیس
- مطمئن شوید credentials دیتابیس صحیح است
- بررسی کنید که دیتابیس و جداول وجود دارند
- logs سرور را بررسی کنید

### خطای 500
- فایل .env.local را بررسی کنید
- مطمئن شوید تمام dependencies نصب شده‌اند
- permissions فایل‌ها را بررسی کنید (755 برای پوشه‌ها، 644 برای فایل‌ها)

### خطای 404
- مسیر آپلود را بررسی کنید
- تنظیمات وب سرور را بررسی کنید

## پشتیبانی

در صورت بروز مشکل، logs سرور و خطاهای console مرورگر را بررسی کنید.

## فایل‌های مهم برای آپلود

✅ تمام پوشه src/
✅ package.json
✅ package-lock.json
✅ next.config.ts
✅ tsconfig.json
✅ .env.local (با اطلاعات واقعی)
✅ public/
✅ .next/ (پس از build)

❌ node_modules/ (در صورت آپلود از طریق npm install نصب خواهد شد)
❌ .git/ 