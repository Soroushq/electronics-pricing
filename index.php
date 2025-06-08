<?php
// تنظیمات خطا
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/error.log');

session_start();
require_once 'config/database.php';
require_once 'includes/functions.php';

// تنظیمات پایه
define('BASE_URL', 'https://aramcontrol.com/price-electronics');
define('SITE_NAME', 'سیستم قیمت‌گذاری الکترونیک');

// مسیریابی
$route = $_GET['route'] ?? 'home';
$action = $_GET['action'] ?? 'index';

// بررسی وجود فایل صفحه
$pageFile = __DIR__ . '/pages/' . $route . '/' . $action . '.php';
if (!file_exists($pageFile)) {
    $pageFile = __DIR__ . '/pages/' . $route . '.php';
}

if (!file_exists($pageFile)) {
    header('HTTP/1.1 404 Not Found');
    include __DIR__ . '/pages/404.php';
    exit;
}

// هدر سایت
include 'includes/header.php';

// نمایش صفحه
include $pageFile;

// فوتر سایت
include 'includes/footer.php';
?> 