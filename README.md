# سیستم قیمت‌گذاری الکترونیک

سیستمی جامع برای مدیریت قطعات الکترونیکی، طراحی بردها و محاسبه قیمت دستگاه‌ها با فرانت‌اند Next.js و بک‌اند PHP

## 🔗 راهنماهای مهم

- **[راهنمای سریع شروع کار](./QUICK_START.md)** - برای شروع فوری
- **[راهنمای کامل](./COMPLETE_GUIDE.md)** - مستندات جامع
- **[صفحه مدیریت API](http://localhost:3000/api-management)** - تست اتصال بک‌اند

## 🚀 ویژگی‌ها

- **مدیریت قطعات**: افزودن، ویرایش و حذف قطعات الکترونیکی
- **طراحی برد**: کشیدن و رها کردن قطعات برای ایجاد بردهای مدار چاپی
- **ساخت دستگاه**: ترکیب بردها برای ایجاد دستگاه‌های پیچیده
- **محاسبه قیمت خودکار**: محاسبه قیمت نهایی با در نظر گیری تمام هزینه‌ها
- **پشتیبانی کامل از فارسی**: اعداد، متن و جهت نوشتار فارسی

## 🛠 تکنولوژی‌ها

### فرانت‌اند
- **Framework**: Next.js 14 + TypeScript
- **Styling**: TailwindCSS
- **UI Components**: کامپوننت‌های سفارشی
- **API Client**: Custom API Service
- **State Management**: Custom Hooks
- **Icons**: Heroicons
- **Font**: Vazirmatn (Google Fonts)

### بک‌اند  
- **Language**: PHP 8+
- **Database**: MySQL
- **API**: RESTful API
- **Security**: Prepared Statements, CORS
- **Features**: Pagination, Search, Filtering

## 📁 ساختار پروژه

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout اصلی
│   ├── page.tsx           # صفحه اصلی
│   └── globals.css        # استایل‌های سراسری
├── components/            # کامپوننت‌های React
│   ├── ui/               # کامپوننت‌های UI پایه
│   │   └── Farsisaz.tsx  # کامپوننت فارسی‌ساز
│   ├── layout/           # کامپوننت‌های Layout
│   ├── parts/            # کامپوننت‌های مربوط به قطعات
│   ├── boards/           # کامپوننت‌های مربوط به بردها
│   └── devices/          # کامپوننت‌های مربوط به دستگاه‌ها
├── types/                # تعریف Type های TypeScript
│   └── index.ts          # انواع داده‌ها
├── utils/                # توابع کمکی
│   ├── farsisaz.ts       # توابع فارسی‌سازی
│   └── cn.ts             # ترکیب کلاس‌های CSS
├── hooks/                # Custom Hooks
├── data/                 # داده‌های نمونه
└── ...
```

## 🎨 کامپوننت Farsisaz

کامپوننت قدرتمند برای مدیریت متن و اعداد فارسی:

```tsx
import { PersianText, PersianNumber, PersianPrice } from '@/components/ui/Farsisaz';

// نمایش متن فارسی
<PersianText>سلام دنیا</PersianText>

// نمایش عدد فارسی
<PersianNumber value={12345} />

// نمایش قیمت فارسی
<PersianPrice amount={1250000} currency="ریال" />
```

## 🚦 راه‌اندازی

### پیش‌نیازها

- Node.js 18+ 
- npm یا yarn

### نصب

```bash
# کلون کردن پروژه
git clone [repository-url]
cd electronics-pricing

# نصب وابستگی‌ها
npm install

# اجرای پروژه در حالت توسعه
npm run dev
```

پروژه در آدرس `http://localhost:3000` در دسترس خواهد بود.

## 📋 مراحل توسعه

### ✅ مرحله 1: راه‌اندازی پایه (تکمیل شده)
- [x] ایجاد پروژه Next.js با TypeScript
- [x] تنظیم TailwindCSS
- [x] ایجاد کامپوننت Farsisaz
- [x] تنظیم فونت فارسی (Vazirmatn)
- [x] ساختار فولدرها و فایل‌ها
- [x] تعریف Type های اصلی

### 🔄 مرحله 2: کامپوننت‌های پایه (در حال انجام)
- [ ] Layout اصلی
- [ ] Header/Navigation
- [ ] Sidebar
- [ ] Cards و Buttons
- [ ] Modals و Forms

### ⏳ مرحله 3: مدیریت قطعات
- [ ] لیست قطعات
- [ ] اضافه/ویرایش/حذف قطعات
- [ ] جستجو و فیلتر
- [ ] وارد کردن داده‌های CSV

### ⏳ مرحله 4: طراحی برد
- [ ] محیط Drag & Drop
- [ ] انتخاب قطعات از سایدبار
- [ ] نمایش برد
- [ ] محاسبه قیمت برد

### ⏳ مرحله 5: طراحی دستگاه
- [ ] محیط Drag & Drop برای بردها
- [ ] انتخاب بردها از سایدبار
- [ ] محاسبه قیمت کل دستگاه

## 🎯 ویژگی‌های کلیدی

### فارسی‌سازی کامل
- تبدیل خودکار اعداد انگلیسی به فارسی
- پشتیبانی از جهت نوشتار راست به چپ (RTL)
- فرمت‌بندی قیمت‌ها با جداکننده هزارگان فارسی
- فونت فارسی بهینه (Vazirmatn)

### طراحی واکنش‌گرا
- سازگار با تمام اندازه‌های صفحه
- رابط کاربری مدرن و زیبا
- انیمیشن‌های نرم و طبیعی

### Type Safety
- استفاده کامل از TypeScript
- تعریف دقیق انواع داده‌ها
- بررسی خطا در زمان کامپایل

## 🤝 مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. Branch جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request ایجاد کنید

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 📞 تماس

برای سوالات و پیشنهادات با ما در تماس باشید.

---

**نوت**: این پروژه در حال توسعه است و ویژگی‌های جدید به تدریج اضافه خواهند شد.
