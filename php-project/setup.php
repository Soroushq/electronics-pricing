<?php
// فایل تنظیم مجوزها و حل مشکلات سرور
header('Content-Type: text/html; charset=utf-8');

echo "<html dir='rtl'><head><meta charset='UTF-8'><title>تنظیم سیستم</title></head><body>";
echo "<h1>🔧 تنظیم سیستم قیمت‌گذاری الکترونیک</h1>";

$errors = [];
$success = [];

// 1. بررسی مجوزها
echo "<h2>📋 بررسی مجوزها:</h2>";

$files_to_check = [
    '.',
    './public',
    './backend',
    './backend/api',
    './config',
    './.htaccess',
    './public/index.php',
    './config/db.php'
];

foreach ($files_to_check as $file) {
    if (file_exists($file)) {
        $perms = substr(sprintf('%o', fileperms($file)), -4);
        echo "<p>✅ $file - مجوز: $perms</p>";
        
        // تنظیم مجوز صحیح
        if (is_dir($file)) {
            chmod($file, 0755);
        } else {
            chmod($file, 0644);
        }
    } else {
        echo "<p>❌ $file - یافت نشد</p>";
        $errors[] = "فایل $file یافت نشد";
    }
}

// 2. تست اتصال دیتابیس
echo "<h2>🗄️ تست اتصال دیتابیس:</h2>";

try {
    require_once 'config/db.php';
    echo "<p>✅ اتصال به دیتابیس موفقیت‌آمیز</p>";
    
    // تست جداول
    $tables = ['board', 'device', 'ghate', 'proccess', 'proccessprice'];
    foreach ($tables as $table) {
        $result = mysqli_query($link, "SELECT COUNT(*) as count FROM $table");
        if ($result) {
            $row = mysqli_fetch_array($result);
            echo "<p>📊 جدول $table: {$row['count']} رکورد</p>";
        } else {
            echo "<p>❌ خطا در جدول $table: " . mysqli_error($link) . "</p>";
            $errors[] = "مشکل در جدول $table";
        }
    }
    mysqli_close($link);
    $success[] = "اتصال دیتابیس تایید شد";
    
} catch (Exception $e) {
    echo "<p>❌ خطا در اتصال دیتابیس: " . $e->getMessage() . "</p>";
    $errors[] = "مشکل اتصال دیتابیس: " . $e->getMessage();
}

// 3. تست فایل‌های مهم
echo "<h2>📁 بررسی فایل‌های مهم:</h2>";

$important_files = [
    './public/index.php' => 'صفحه اصلی',
    './public/app.html' => 'اپلیکیشن React',
    './.htaccess' => 'تنظیمات سرور',
    './config/db.php' => 'تنظیمات دیتابیس',
    './backend/api/boards.php' => 'API بردها',
    './backend/api/devices.php' => 'API دستگاه‌ها'
];

foreach ($important_files as $file => $description) {
    if (file_exists($file)) {
        echo "<p>✅ $description ($file)</p>";
    } else {
        echo "<p>❌ $description ($file) - یافت نشد</p>";
        $errors[] = "$description یافت نشد";
    }
}

// 4. ایجاد فایل index.php اضافی در صورت نیاز
if (!file_exists('./index.php')) {
    $index_content = '<?php header("Location: public/index.php"); exit(); ?>';
    file_put_contents('./index.php', $index_content);
    echo "<p>✅ فایل index.php اصلی ایجاد شد</p>";
    $success[] = "فایل index.php اضافی ایجاد شد";
}

// 5. بررسی .htaccess
echo "<h2>⚙️ بررسی تنظیمات سرور:</h2>";

if (function_exists('apache_get_modules')) {
    $modules = apache_get_modules();
    if (in_array('mod_rewrite', $modules)) {
        echo "<p>✅ ماژول mod_rewrite فعال است</p>";
        $success[] = "mod_rewrite فعال است";
    } else {
        echo "<p>❌ ماژول mod_rewrite غیرفعال است</p>";
        $errors[] = "mod_rewrite غیرفعال است";
    }
} else {
    echo "<p>⚠️ نمی‌توان وضعیت ماژول‌ها را بررسی کرد</p>";
}

// 6. نمایش خلاصه
echo "<h2>📊 خلاصه وضعیت:</h2>";

if (count($errors) == 0) {
    echo "<div style='color: green; background: #d4edda; padding: 15px; border-radius: 5px;'>";
    echo "<h3>🎉 سیستم آماده است!</h3>";
    echo "<p>تمام بررسی‌ها موفقیت‌آمیز بود. اکنون می‌توانید از سیستم استفاده کنید.</p>";
    foreach ($success as $msg) {
        echo "<p>✅ $msg</p>";
    }
    echo "<p><strong>لینک‌های مفید:</strong></p>";
    echo "<a href='public/index.php' style='margin: 5px; padding: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;'>صفحه اصلی</a>";
    echo "<a href='public/app.html' style='margin: 5px; padding: 10px; background: #28a745; color: white; text-decoration: none; border-radius: 5px;'>اپلیکیشن React</a>";
    echo "</div>";
} else {
    echo "<div style='color: red; background: #f8d7da; padding: 15px; border-radius: 5px;'>";
    echo "<h3>⚠️ مشکلات یافت شد:</h3>";
    foreach ($errors as $error) {
        echo "<p>❌ $error</p>";
    }
    echo "</div>";
}

// 7. اطلاعات سرور
echo "<h2>🖥️ اطلاعات سرور:</h2>";
echo "<p>نسخه PHP: " . phpversion() . "</p>";
echo "<p>سرور: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p>مسیر فعلی: " . __DIR__ . "</p>";
echo "<p>دامنه: " . $_SERVER['HTTP_HOST'] . "</p>";

echo "</body></html>";
?> 