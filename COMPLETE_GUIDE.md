# راهنمای کامل سیستم قیمت‌گذاری قطعات الکترونیکی

## مقدمه

این سیستم یک راه‌حل کامل برای قیمت‌گذاری و مدیریت قطعات الکترونیکی است که شامل:

- **فرانت‌اند**: Next.js 14 با TypeScript و Tailwind CSS
- **بک‌اند**: PHP با MySQL دیتابیس
- **API**: RESTful API برای ارتباط فرانت و بک

## ساختار پروژه

```
electronics-pricing/
├── php-second/                 # بک‌اند PHP
│   ├── api/                   # فایل‌های API
│   │   ├── boards.php
│   │   ├── devices.php
│   │   ├── parts.php
│   │   ├── processes.php
│   │   └── pricing.php
│   ├── config/                # تنظیمات دیتابیس
│   │   └── database.php
│   ├── includes/             # توابع کمکی
│   │   └── functions.php
│   ├── .htaccess            # تنظیمات Apache
│   ├── index.php            # صفحه تست API
│   └── README.md            # راهنمای بک‌اند
├── src/                      # فرانت‌اند Next.js
│   ├── app/                 # صفحات Next.js
│   ├── components/          # کامپوننت‌های React
│   ├── hooks/               # Custom Hooks
│   ├── services/            # سرویس‌های API
│   └── types/               # تایپ‌های TypeScript
├── package.json
└── README.md
```

## نصب و راه‌اندازی

### مرحله 1: نصب فرانت‌اند

```bash
# نصب وابستگی‌ها
npm install

# اجرای محیط توسعه
npm run dev
```

### مرحله 2: راه‌اندازی بک‌اند PHP

#### A. تنظیم دیتابیس

1. ایجاد دیتابیس MySQL با نام `aramcont_pricedata`
2. اجرای دستورات SQL زیر:

```sql
-- جدول بردها
CREATE TABLE board (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bcode VARCHAR(100) NOT NULL UNIQUE,
    bname VARCHAR(255) NOT NULL,
    pcode VARCHAR(100),
    pcount INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول دستگاه‌ها
CREATE TABLE device (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    board_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES board(id) ON DELETE CASCADE
);

-- جدول قطعات
CREATE TABLE ghate (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    board_id INT,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES board(id) ON DELETE CASCADE
);

-- جدول پردازش‌ها
CREATE TABLE proccess (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    device_id INT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES device(id) ON DELETE CASCADE
);

-- جدول قیمت پردازش‌ها
CREATE TABLE proccessprice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_id INT,
    price DECIMAL(10,2) DEFAULT 0,
    labor_cost DECIMAL(10,2) DEFAULT 0,
    material_cost DECIMAL(10,2) DEFAULT 0,
    overhead_cost DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (process_id) REFERENCES proccess(id) ON DELETE CASCADE
);
```

#### B. تنظیم PHP

1. **کپی فایل‌های PHP**: محتویات پوشه `php-second` را در مسیر وب سرور خود (مثلاً `htdocs`) قرار دهید

2. **تنظیم اتصال دیتابیس**: فایل `php-second/config/database.php` را ویرایش کنید:

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'aramcont_pricedata');
define('DB_USER', 'aramcont_moridi');
define('DB_PASS', 'OSA09155032778');
?>
```

3. **تنظیم Apache**: مطمئن شوید که mod_rewrite فعال است و فایل `.htaccess` در محل صحیح قرار دارد

### مرحله 3: تنظیم متغیرهای محیطی

فایل `.env.local` ایجاد کنید:

```env
# URL بک‌اند PHP
NEXT_PUBLIC_API_URL=http://localhost/php-second/api
```

## ویژگی‌های سیستم

### بک‌اند PHP

#### API Endpoints

- **GET/POST/PUT/DELETE** `/api/boards.php` - مدیریت بردها
- **GET/POST/PUT/DELETE** `/api/devices.php` - مدیریت دستگاه‌ها  
- **GET/POST/PUT/DELETE** `/api/parts.php` - مدیریت قطعات
- **GET/POST/PUT/DELETE** `/api/processes.php` - مدیریت پردازش‌ها
- **GET** `/api/pricing.php?device_id=1` - محاسبه قیمت کل

#### امکانات امنیتی

- **Prepared Statements** برای جلوگیری از SQL Injection
- **Input Sanitization** و اعتبارسنجی
- **CORS Headers** برای اتصال امن فرانت‌اند
- **Error Handling** جامع

#### ویژگی‌های عملکردی

- **Pagination** برای مدیریت داده‌های بزرگ
- **Search & Filter** برای جستجوی پیشرفته
- **Sorting** بر اساس فیلدهای مختلف
- **Transaction Support** برای عملیات پیچیده

### فرانت‌اند Next.js

#### صفحات اصلی

- **Dashboard** (`/`) - صفحه اصلی با آمار کلی
- **Parts Management** (`/parts`) - مدیریت قطعات
- **API Management** (`/api-management`) - مدیریت اتصال API
- **Boards Design** (`/boards`) - طراحی و مدیریت بردها
- **Devices** (`/devices`) - مدیریت دستگاه‌ها

#### کامپوننت‌ها

- **ApiConnectionStatus** - نمایش وضعیت اتصال به API
- **Parts CRUD Components** - کامپوننت‌های مدیریت قطعات
- **Search & Filter** - جستجو و فیلتر پیشرفته
- **Responsive Design** - طراحی ریسپانسیو

## استفاده از API

### نمونه درخواست‌ها

#### دریافت لیست بردها

```javascript
import api from '@/services/api';

// دریافت تمام بردها
const response = await api.getBoards();

// دریافت با فیلتر و صفحه‌بندی
const filtered = await api.getBoards({
  search: 'Arduino',
  page: 1,
  limit: 10,
  sort: 'name',
  order: 'ASC'
});
```

#### ایجاد برد جدید

```javascript
const newBoard = await api.createBoard({
  bcode: 'ARD001',
  bname: 'آردوینو اونو',
  pcode: 'UNO-R3',
  pcount: 5
});
```

#### محاسبه قیمت دستگاه

```javascript
const pricing = await api.getDevicePricing(1);
console.log(pricing.data.total_price);
```

### استفاده از Hooks

```javascript
import { useBoards, useDevicePricing } from '@/hooks/useApiData';

function MyComponent() {
  const { boards, loading, error, createBoard } = useBoards();
  const { pricing } = useDevicePricing(1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {boards.map(board => (
        <div key={board.id}>{board.bname}</div>
      ))}
    </div>
  );
}
```

## تست سیستم

### تست بک‌اند

برای تست API می‌توانید از:

1. **Postman** یا **Insomnia** برای تست REST API
2. **صفحه تست PHP** در `http://localhost/php-second/`
3. **مرورگر** برای تست درخواست‌های GET

### تست فرانت‌اند

```bash
# اجرای تست‌ها
npm test

# اجرای تست‌ها با watch mode
npm run test:watch

# ساخت برای production
npm run build
```

## عیب‌یابی رایج

### خطاهای اتصال API

1. **CORS Error**: 
   - بررسی تنظیمات `.htaccess`
   - اطمینان از فعال بودن mod_headers در Apache

2. **Database Connection Error**:
   - بررسی اطلاعات اتصال در `config/database.php`
   - اطمینان از فعال بودن MySQL

3. **404 Error برای API**:
   - بررسی تنظیمات mod_rewrite
   - اطمینان از وجود فایل `.htaccess`

### خطاهای فرانت‌اند

1. **Module Not Found**:
   ```bash
   npm install
   ```

2. **Build Errors**:
   ```bash
   npm run build
   rm -rf .next
   npm run dev
   ```

## پیاده‌سازی در محیط Production

### بک‌اند

1. **Security Headers** اضافه کنید
2. **Rate Limiting** پیاده‌سازی کنید  
3. **Logging** فعال کنید
4. **SSL Certificate** نصب کنید

### فرانت‌اند

```bash
# ساخت برای production
npm run build

# شروع سرور production
npm start
```

## پشتیبانی و نگهداری

### بک‌آپ دیتابیس

```bash
mysqldump -u aramcont_moridi -p aramcont_pricedata > backup.sql
```

### آپدیت سیستم

```bash
# آپدیت وابستگی‌های فرانت‌اند
npm update

# بررسی آپدیت‌های امنیتی
npm audit fix
```

## منابع اضافی

- [مستندات Next.js](https://nextjs.org/docs)
- [مستندات PHP](https://www.php.net/docs.php)
- [مستندات MySQL](https://dev.mysql.com/doc/)
- [مستندات Tailwind CSS](https://tailwindcss.com/docs)

## پشتیبانی

برای پشتیبانی و سوالات:
- مراجعه به بخش Issues در پروژه
- مطالعه مستندات API
- بررسی فایل‌های نمونه

---

**نکته**: این راهنما را همراه با فایل‌های پروژه نگهداری کنید و در صورت ایجاد تغییرات، آن را به‌روزرسانی نمایید. 