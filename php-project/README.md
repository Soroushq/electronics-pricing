# سیستم مدیریت قیمت‌گذاری الکترونیک

## 📋 توضیحات پروژه

این سیستم برای مدیریت قیمت‌گذاری دستگاه‌ها و قطعات الکترونیکی طراحی شده است. شامل:

- 📱 مدیریت دستگاه‌ها (Devices)
- 📋 مدیریت بردها (Boards) 
- 🔧 مدیریت قطعات (Parts/Ghate)
- ⚙️ مدیریت پردازش‌ها (Processes)
- 💰 محاسبه قیمت‌گذاری دینامیک

## 🏗️ ساختار پروژه

```
php-project/
├── config/
│   └── db.php                 # تنظیمات دیتابیس
├── backend/
│   └── api/
│       ├── boards.php         # API مدیریت بردها
│       ├── devices.php        # API مدیریت دستگاه‌ها
│       ├── parts.php          # API مدیریت قطعات
│       ├── processes.php      # API مدیریت پردازش‌ها
│       ├── processsprices.php # API قیمت پردازش‌ها
│       └── pricing.php        # API محاسبه قیمت کل
├── public/
│   └── index.php              # صفحه اصلی و تست سیستم
├── src/                       # فایل‌های React (کپی شده)
├── .htaccess                  # تنظیمات سرور
└── README.md                  # این فایل
```

## 🗄️ اطلاعات دیتابیس

**سرور:** localhost  
**دیتابیس:** aramcont_pricedata  
**کاربر:** aramcont_moridi  
**رمز عبور:** OSA09155032778  

### جداول موجود:

1. **board** - اطلاعات بردها
   - `id`, `bcode`, `bname`, `pcode`, `pcount`

2. **device** - اطلاعات دستگاه‌ها
   - `id`, `name`, `description`, `board_id`

3. **ghate** - اطلاعات قطعات
   - `id`, `name`, `description`, `price`, `board_id`, `quantity`

4. **proccess** - اطلاعات پردازش‌ها
   - `id`, `name`, `description`, `device_id`, `order_index`

5. **proccessprice** - قیمت‌های پردازش
   - `id`, `process_id`, `price`, `labor_cost`, `material_cost`, `overhead_cost`

## 🚀 نحوه نصب و اجرا

### 1. آپلود فایل‌ها
فایل‌های پروژه را در پوشه مورد نظر روی سرور آپلود کنید.

### 2. تنظیمات مجوزها
```bash
chmod 755 -R php-project/
chmod 644 php-project/.htaccess
```

### 3. تست اتصال
پس از آپلود، برای تست اتصال دیتابیس به آدرس زیر مراجعه کنید:
```
https://aramcontrol.com/price-electronics/
```

## 🔗 API Endpoints

### Boards (بردها)
- `GET /api/boards.php` - دریافت لیست بردها
- `POST /api/boards.php` - افزودن برد جدید
- `PUT /api/boards.php` - ویرایش برد
- `DELETE /api/boards.php` - حذف برد

### Devices (دستگاه‌ها)
- `GET /api/devices.php` - دریافت لیست دستگاه‌ها
- `POST /api/devices.php` - افزودن دستگاه جدید
- `PUT /api/devices.php` - ویرایش دستگاه
- `DELETE /api/devices.php` - حذف دستگاه

### Parts (قطعات)
- `GET /api/parts.php` - دریافت لیست قطعات
- `POST /api/parts.php` - افزودن قطعه جدید
- `PUT /api/parts.php` - ویرایش قطعه
- `DELETE /api/parts.php` - حذف قطعه

### Processes (پردازش‌ها)
- `GET /api/processes.php` - دریافت لیست پردازش‌ها
- `POST /api/processes.php` - افزودن پردازش جدید
- `PUT /api/processes.php` - ویرایش پردازش
- `DELETE /api/processes.php` - حذف پردازش

### Pricing (قیمت‌گذاری)
- `GET /api/pricing.php?device_id=1` - محاسبه قیمت کل دستگاه

## 🔧 نمونه استفاده API

### افزودن برد جدید:
```javascript
fetch('/api/boards.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        bcode: 'B001',
        bname: 'برد اصلی',
        pcode: 'P001',
        pcount: 10
    })
})
```

### دریافت قیمت کل دستگاه:
```javascript
fetch('/api/pricing.php?device_id=1')
    .then(response => response.json())
    .then(data => console.log(data))
```

## 🛠️ ویژگی‌های سیستم

- ✅ اتصال مستقیم به دیتابیس MySQL
- ✅ API های RESTful کامل
- ✅ محاسبه قیمت‌گذاری دینامیک
- ✅ پشتیبانی از CORS
- ✅ مدیریت خطاها
- ✅ رابط کاربری React
- ✅ طراحی ریسپانسیو

## 📞 پشتیبانی

در صورت بروز مشکل یا نیاز به راهنمایی، با تیم توسعه در تماس باشید.

**تاریخ ایجاد:** 2024  
**نسخه:** 1.0  
**توسعه‌دهنده:** سیستم مدیریت آرام کنترل 