# 🔧 Electronics Pricing API - Backend PHP

## 📋 مقدمه

این پروژه یک API Backend کامل برای سیستم مدیریت قیمت‌گذاری قطعات الکترونیکی است که با PHP نوشته شده و آماده اتصال به فرانت Next.js شما می‌باشد.

## 🗂️ ساختار پروژه

```
php-second/
├── api/                    # API Endpoints
│   ├── boards.php         # مدیریت بردها
│   ├── devices.php        # مدیریت دستگاه‌ها
│   ├── parts.php          # مدیریت قطعات (ghate)
│   ├── processes.php      # مدیریت پردازش‌ها
│   └── pricing.php        # محاسبه قیمت
├── config/                # تنظیمات
│   └── database.php       # تنظیمات دیتابیس
├── includes/              # فایل‌های کمکی
│   └── functions.php      # توابع کمکی
├── index.php             # صفحه تست API
├── .htaccess             # تنظیمات Apache
└── README.md             # راهنمای استفاده
```

## 🗄️ ساختار دیتابیس

پروژه با 5 جدول زیر کار می‌کند:

### 1. board (بردها)
- `id` - شناسه یکتا
- `bcode` - کد برد
- `bname` - نام برد
- `pcode` - کد محصول
- `pcount` - تعداد

### 2. device (دستگاه‌ها)
- `id` - شناسه یکتا
- `name` - نام دستگاه
- `description` - توضیحات
- `board_id` - شناسه برد (Foreign Key)

### 3. ghate (قطعات)
- `id` - شناسه یکتا
- `name` - نام قطعه
- `description` - توضیحات
- `price` - قیمت
- `board_id` - شناسه برد (Foreign Key)
- `quantity` - مقدار

### 4. proccess (پردازش‌ها)
- `id` - شناسه یکتا
- `name` - نام پردازش
- `description` - توضیحات
- `device_id` - شناسه دستگاه (Foreign Key)
- `order_index` - ترتیب انجام

### 5. proccessprice (قیمت‌های پردازش)
- `id` - شناسه یکتا
- `process_id` - شناسه پردازش (Foreign Key)
- `price` - قیمت پایه
- `labor_cost` - هزینه نیروی کار
- `material_cost` - هزینه مواد
- `overhead_cost` - هزینه‌های عمومی

## 🚀 راه‌اندازی

### 1. پیش‌نیازها
- PHP 7.4 یا بالاتر
- MySQL/MariaDB
- Apache با mod_rewrite فعال
- اجازه نوشتن در پوشه پروژه

### 2. نصب

1. فایل‌ها را در پوشه سرور وب کپی کنید
2. اطلاعات دیتابیس را در `config/database.php` تنظیم کنید:
   ```php
   private $host = 'localhost';
   private $db_name = 'aramcont_pricedata';
   private $username = 'aramcont_moridi';
   private $password = 'OSA09155032778';
   ```
3. مطمئن شوید که جداول دیتابیس ایجاد شده‌اند
4. مجوزهای فایل را تنظیم کنید (644 برای فایل‌ها، 755 برای پوشه‌ها)

### 3. تست

برای تست API ها، به آدرس `http://your-domain/php-second/` بروید.

## 📡 API Endpoints

### 🔲 Boards (بردها)

#### دریافت لیست بردها
```http
GET /api/boards.php
```

**پارامترها (اختیاری):**
- `search`: جستجو در نام و کد
- `page`: شماره صفحه (پیش‌فرض: 1)
- `limit`: تعداد در هر صفحه (پیش‌فرض: 20)
- `sort`: فیلد مرتب‌سازی
- `order`: جهت مرتب‌سازی (ASC/DESC)

#### ایجاد برد جدید
```http
POST /api/boards.php
Content-Type: application/json

{
  "bcode": "B001",
  "bname": "برد اصلی",
  "pcode": "P001",
  "pcount": 10
}
```

#### ویرایش برد
```http
PUT /api/boards.php
Content-Type: application/json

{
  "id": 1,
  "bcode": "B001",
  "bname": "برد اصلی ویرایش شده",
  "pcode": "P001",
  "pcount": 15
}
```

#### حذف برد
```http
DELETE /api/boards.php?id=1
```

### 📱 Devices (دستگاه‌ها)

#### دریافت لیست دستگاه‌ها
```http
GET /api/devices.php
```

**پارامترها (اختیاری):**
- `search`: جستجو در نام و توضیحات
- `board_id`: فیلتر بر اساس برد
- `page`, `limit`, `sort`, `order`

#### ایجاد دستگاه جدید
```http
POST /api/devices.php
Content-Type: application/json

{
  "name": "دستگاه کنترل دسترسی",
  "description": "دستگاه کنترل دسترسی کارتی",
  "board_id": 1
}
```

#### ویرایش دستگاه
```http
PUT /api/devices.php
Content-Type: application/json

{
  "id": 1,
  "name": "دستگاه کنترل دسترسی ویرایش شده",
  "description": "توضیحات جدید",
  "board_id": 1
}
```

#### حذف دستگاه
```http
DELETE /api/devices.php?id=1
```

### ⚙️ Parts (قطعات)

#### دریافت لیست قطعات
```http
GET /api/parts.php
```

**پارامترها (اختیاری):**
- `search`: جستجو در نام و توضیحات
- `board_id`: فیلتر بر اساس برد
- `page`, `limit`, `sort`, `order`

#### ایجاد قطعه جدید
```http
POST /api/parts.php
Content-Type: application/json

{
  "name": "مقاومت 10 کیلواهم",
  "description": "مقاومت کربنی 10K",
  "price": 500,
  "board_id": 1,
  "quantity": 5
}
```

#### ویرایش قطعه
```http
PUT /api/parts.php
Content-Type: application/json

{
  "id": 1,
  "name": "مقاومت 10 کیلواهم ویرایش شده",
  "description": "توضیحات جدید",
  "price": 600,
  "board_id": 1,
  "quantity": 3
}
```

#### حذف قطعه
```http
DELETE /api/parts.php?id=1
```

### 🔄 Processes (پردازش‌ها)

#### دریافت لیست پردازش‌ها
```http
GET /api/processes.php
```

**پارامترها (اختیاری):**
- `search`: جستجو در نام و توضیحات
- `device_id`: فیلتر بر اساس دستگاه
- `page`, `limit`, `sort`, `order`

#### ایجاد پردازش جدید
```http
POST /api/processes.php
Content-Type: application/json

{
  "name": "مونتاژ قطعات",
  "description": "مونتاژ قطعات روی برد",
  "device_id": 1,
  "order_index": 1,
  "price": 10000,
  "labor_cost": 5000,
  "material_cost": 2000,
  "overhead_cost": 1000
}
```

#### ویرایش پردازش
```http
PUT /api/processes.php
Content-Type: application/json

{
  "id": 1,
  "name": "مونتاژ قطعات ویرایش شده",
  "description": "توضیحات جدید",
  "device_id": 1,
  "order_index": 1,
  "price": 12000,
  "labor_cost": 6000,
  "material_cost": 2500,
  "overhead_cost": 1200
}
```

#### حذف پردازش
```http
DELETE /api/processes.php?id=1
```

### 💰 Pricing (قیمت‌گذاری)

#### محاسبه قیمت کل دستگاه
```http
GET /api/pricing.php?device_id=1
```

**پاسخ نمونه:**
```json
{
  "success": true,
  "data": {
    "device": {
      "id": 1,
      "name": "دستگاه کنترل دسترسی",
      "description": "..."
    },
    "board": {
      "id": 1,
      "name": "برد اصلی",
      "parts": [
        {
          "id": 1,
          "name": "مقاومت 10K",
          "unit_price": 500,
          "quantity": 5,
          "total_price": 2500
        }
      ],
      "total_price": 2500
    },
    "processes": [
      {
        "id": 1,
        "name": "مونتاژ",
        "base_price": 10000,
        "labor_cost": 5000,
        "material_cost": 2000,
        "overhead_cost": 1000,
        "total_price": 18000
      }
    ],
    "cost_breakdown": {
      "board_cost": 2500,
      "process_cost": 18000,
      "labor_cost": 5000,
      "material_cost": 2000,
      "overhead_cost": 1000
    },
    "total_price": 20500,
    "currency": "IRR"
  }
}
```

## 🔗 اتصال به Next.js Frontend

برای اتصال فرانت Next.js به این API، از کدهای زیر استفاده کنید:

### نمونه استفاده در Next.js

```javascript
// services/api.js
const API_BASE_URL = 'http://your-domain/php-second/api';

export const api = {
  // Boards
  getBoards: async (params = {}) => {
    const url = new URL(`${API_BASE_URL}/boards.php`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url);
    return response.json();
  },

  createBoard: async (data) => {
    const response = await fetch(`${API_BASE_URL}/boards.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateBoard: async (data) => {
    const response = await fetch(`${API_BASE_URL}/boards.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deleteBoard: async (id) => {
    const response = await fetch(`${API_BASE_URL}/boards.php?id=${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Devices, Parts, Processes مشابه بالا...

  // Pricing
  getDevicePricing: async (deviceId) => {
    const response = await fetch(`${API_BASE_URL}/pricing.php?device_id=${deviceId}`);
    return response.json();
  }
};
```

### استفاده در کامپوننت React

```jsx
// components/BoardsList.jsx
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function BoardsList() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const result = await api.getBoards();
      if (result.success) {
        setBoards(result.data.boards);
      }
    } catch (error) {
      console.error('Error fetching boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (boardData) => {
    try {
      const result = await api.createBoard(boardData);
      if (result.success) {
        fetchBoards(); // رفرش لیست
      }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  // بقیه کد کامپوننت...
}
```

## 🔧 تنظیمات پیشرفته

### CORS
تمامی API ها پشتیبانی کامل از CORS دارند و با کلیه Originها کار می‌کنند.

### امنیت
- تمامی ورودی‌ها Sanitize می‌شوند
- از Prepared Statements برای جلوگیری از SQL Injection استفاده شده
- Header های امنیتی تنظیم شده‌اند

### لاگ‌ها
خطاها در فایل لاگ PHP ذخیره می‌شوند. برای دیباگ، فایل error_log سرور را بررسی کنید.

### کارایی
- نتایج با Pagination ارائه می‌شوند
- از Index های دیتابیس استفاده کنید
- Gzip compression فعال است

## 🐛 عیب‌یابی

### مشکلات رایج:

1. **خطای اتصال دیتابیس**
   - اطلاعات دیتابیس در `config/database.php` را بررسی کنید
   - مطمئن شوید سرور MySQL در دسترس است

2. **خطای 404**
   - مطمئن شوید mod_rewrite فعال است
   - فایل `.htaccess` موجود باشد

3. **خطای CORS**
   - Header های CORS در `.htaccess` تنظیم شده‌اند
   - در صورت نیاز، Origin مجاز را محدود کنید

4. **خطای JSON**
   - مطمئن شوید Content-Type header صحیح است
   - JSON ورودی معتبر باشد

## 📞 پشتیبانی

در صورت بروز مشکل:
1. فایل‌های لاگ را بررسی کنید
2. تنظیمات دیتابیس را دوبار چک کنید
3. مجوزهای فایل را بررسی کنید
4. PHP error reporting را فعال کنید برای دیباگ

## 📄 لایسنس

این پروژه برای استفاده شخصی و تجاری آزاد است.

---

✅ **API Backend آماده استفاده است!** 