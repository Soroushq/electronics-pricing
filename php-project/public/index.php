<?php
/**
 * Electronics Pricing System - Main Entry Point
 */

// Include Composer autoloader
require_once '../vendor/autoload.php';

// Display PHP info
echo "<h1>سیستم قیمت‌گذاری لوازم الکترونیکی</h1>";
echo "<h2>وضعیت PHP</h2>";
echo "<p><strong>نسخه PHP:</strong> " . PHP_VERSION . "</p>";

// Check loaded extensions
$required_extensions = ['json', 'pdo', 'mbstring', 'curl', 'zip'];
echo "<h3>ماژول‌های مورد نیاز:</h3>";
echo "<ul>";
foreach ($required_extensions as $ext) {
    $loaded = extension_loaded($ext);
    $status = $loaded ? '✅ نصب شده' : '❌ نصب نشده';
    echo "<li>{$ext}: {$status}</li>";
}
echo "</ul>";

// Display memory info
echo "<h3>اطلاعات سیستم:</h3>";
echo "<ul>";
echo "<li><strong>حافظه محدود:</strong> " . ini_get('memory_limit') . "</li>";
echo "<li><strong>حداکثر زمان اجرا:</strong> " . ini_get('max_execution_time') . " ثانیه</li>";
echo "<li><strong>حداکثر اندازه فایل آپلود:</strong> " . ini_get('upload_max_filesize') . "</li>";
echo "</ul>";

// Test database connection (if available)
try {
    $pdo = new PDO('sqlite::memory:');
    echo "<p>✅ اتصال به پایگاه داده SQLite موفق بود</p>";
} catch (PDOException $e) {
    echo "<p>❌ خطا در اتصال به پایگاه داده: " . $e->getMessage() . "</p>";
}

// Show current date/time
echo "<p><strong>تاریخ و زمان فعلی:</strong> " . date('Y-m-d H:i:s') . "</p>";

?>

<style>
body {
    font-family: 'Tahoma', Arial, sans-serif;
    direction: rtl;
    text-align: right;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
}
h1, h2, h3 {
    color: #333;
}
ul {
    background: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
li {
    padding: 5px 0;
}
</style> 