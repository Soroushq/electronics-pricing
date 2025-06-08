<?php
// تنظیمات خطا
error_reporting(E_ALL);
ini_set('display_errors', 1);

// تنظیمات منطقه زمانی
date_default_timezone_set('Asia/Tehran');

// تنظیمات کاراکتر
mb_internal_encoding('UTF-8');

// تنظیمات سشن
session_start();

// تنظیمات پایگاه داده
require_once __DIR__ . '/../config/database.php';

// تنظیمات مسیر پایه
define('BASE_URL', 'http://localhost/electronics-pricing');

// توابع کمکی عمومی

// تبدیل تاریخ به فرمت فارسی
function jdate($format, $timestamp = null) {
    if ($timestamp === null) {
        $timestamp = time();
    }
    return date($format, $timestamp);
}

// نمایش پیام‌های خطا
function showError($message) {
    return "<div class='alert alert-danger'>{$message}</div>";
}

// نمایش پیام‌های موفقیت
function showSuccess($message) {
    return "<div class='alert alert-success'>{$message}</div>";
}

// بررسی وجود مقدار در POST
function post($key, $default = '') {
    return isset($_POST[$key]) ? $_POST[$key] : $default;
}

// بررسی وجود مقدار در GET
function get($key, $default = '') {
    return isset($_GET[$key]) ? $_GET[$key] : $default;
}

// امن‌سازی خروجی
function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// تولید توکن CSRF
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// بررسی توکن CSRF
function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// ریدایرکت
function redirect($url) {
    header("Location: " . $url);
    exit;
}

// فرمت کردن اعداد
function formatNumber($number) {
    return number_format($number, 0, ',', ',');
}

// فرمت کردن قیمت
function formatPrice($price) {
    return number_format($price, 0, ',', ',') . ' تومان';
}

// توابع دیتابیس
function getBoards() {
    global $db;
    $stmt = $db->query("SELECT * FROM boards ORDER BY created_at DESC");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getDevices() {
    global $db;
    $stmt = $db->query("SELECT * FROM devices ORDER BY created_at DESC");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getParts() {
    global $db;
    $stmt = $db->query("SELECT * FROM parts ORDER BY created_at DESC");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getProcesses() {
    global $db;
    $stmt = $db->query("SELECT * FROM processes ORDER BY created_at DESC");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getRecentActivities($limit = 5) {
    global $db;
    $stmt = $db->prepare("
        SELECT a.*, u.name as user_name 
        FROM activities a 
        LEFT JOIN users u ON a.user_id = u.id 
        ORDER BY a.created_at DESC 
        LIMIT ?
    ");
    $stmt->execute([$limit]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getActivityTypeLabel($type) {
    $types = [
        'board_create' => 'ایجاد برد',
        'board_update' => 'ویرایش برد',
        'board_delete' => 'حذف برد',
        'device_create' => 'ایجاد دستگاه',
        'device_update' => 'ویرایش دستگاه',
        'device_delete' => 'حذف دستگاه',
        'part_create' => 'ایجاد قطعه',
        'part_update' => 'ویرایش قطعه',
        'part_delete' => 'حذف قطعه'
    ];
    return $types[$type] ?? $type;
}

function getActivityTypeColor($type) {
    $colors = [
        'board_create' => 'success',
        'board_update' => 'info',
        'board_delete' => 'danger',
        'device_create' => 'success',
        'device_update' => 'info',
        'device_delete' => 'danger',
        'part_create' => 'success',
        'part_update' => 'info',
        'part_delete' => 'danger'
    ];
    return $colors[$type] ?? 'secondary';
}

// توابع امنیتی
function checkAuth() {
    if (!isset($_SESSION['user_id'])) {
        header('Location: ' . BASE_URL . '?route=login');
        exit;
    }
}

function checkPermission($permission) {
    if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
        $_SESSION['flash_message'] = 'شما دسترسی لازم برای این عملیات را ندارید';
        $_SESSION['flash_type'] = 'danger';
        header('Location: ' . BASE_URL . '?route=home');
        exit;
    }
}

// توابع API
function jsonResponse($data, $status = 200) {
    header('Content-Type: application/json');
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function errorResponse($message, $status = 400) {
    jsonResponse(['error' => $message], $status);
}

function successResponse($message, $data = null) {
    jsonResponse([
        'success' => true,
        'message' => $message,
        'data' => $data
    ]);
}

// تابع نمایش پیام
function showFlashMessage() {
    if (isset($_SESSION['flash_message'])) {
        $type = $_SESSION['flash_type'] ?? 'info';
        $message = $_SESSION['flash_message'];
        unset($_SESSION['flash_message'], $_SESSION['flash_type']);
        return "<div class='alert alert-{$type} alert-dismissible fade show' role='alert'>
                    {$message}
                    <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                </div>";
    }
    return '';
}

// تابع نمایش منو
function showMenu() {
    $menu = [
        'home' => ['title' => 'داشبورد', 'icon' => 'fas fa-home'],
        'boards' => ['title' => 'بردها', 'icon' => 'fas fa-microchip'],
        'devices' => ['title' => 'دستگاه‌ها', 'icon' => 'fas fa-mobile-alt'],
        'parts' => ['title' => 'قطعات', 'icon' => 'fas fa-cogs'],
        'activities' => ['title' => 'فعالیت‌ها', 'icon' => 'fas fa-history']
    ];
    
    if ($_SESSION['user_role'] === 'admin') {
        $menu['users'] = ['title' => 'کاربران', 'icon' => 'fas fa-users'];
        $menu['settings'] = ['title' => 'تنظیمات', 'icon' => 'fas fa-cog'];
    }
    
    $html = '';
    foreach ($menu as $route => $item) {
        $active = ($_GET['route'] ?? 'home') === $route ? 'active' : '';
        $html .= "<li class='nav-item'>
                    <a class='nav-link {$active}' href='" . BASE_URL . "?route={$route}'>
                        <i class='{$item['icon']}'></i>
                        <span>{$item['title']}</span>
                    </a>
                </li>";
    }
    return $html;
}

// تابع نمایش نام کاربر
function showUserName() {
    return $_SESSION['user_name'] ?? '';
}

// تابع نمایش نقش کاربر
function showUserRole() {
    return $_SESSION['user_role'] === 'admin' ? 'مدیر' : 'کاربر';
}

// تابع نمایش تاریخ آخرین ورود
function showLastLogin() {
    return $_SESSION['last_login'] ?? '';
}

// تابع نمایش تعداد بردها
function showBoardsCount() {
    global $db;
    $stmt = $db->query("SELECT COUNT(*) as count FROM boards");
    return $stmt->fetch()['count'];
}

// تابع نمایش تعداد دستگاه‌ها
function showDevicesCount() {
    global $db;
    $stmt = $db->query("SELECT COUNT(*) as count FROM devices");
    return $stmt->fetch()['count'];
}

// تابع نمایش تعداد قطعات
function showPartsCount() {
    global $db;
    $stmt = $db->query("SELECT COUNT(*) as count FROM parts");
    return $stmt->fetch()['count'];
}

// تابع نمایش تعداد کاربران
function showUsersCount() {
    global $db;
    $stmt = $db->query("SELECT COUNT(*) as count FROM users");
    return $stmt->fetch()['count'];
}

// تابع نمایش فعالیت‌های اخیر
function showRecentActivities($limit = 5) {
    global $db;
    $stmt = $db->prepare("
        SELECT a.*, u.name as user_name
        FROM activities a
        LEFT JOIN users u ON a.user_id = u.id
        ORDER BY a.created_at DESC
        LIMIT ?
    ");
    $stmt->execute([$limit]);
    return $stmt->fetchAll();
}

// تابع نمایش بردهای اخیر
function showRecentBoards($limit = 5) {
    global $db;
    $stmt = $db->prepare("
        SELECT b.*, 
               (SELECT COUNT(*) FROM devices WHERE board_id = b.id) as devices_count,
               (SELECT COUNT(*) FROM parts WHERE board_id = b.id) as parts_count
        FROM boards b
        ORDER BY b.created_at DESC
        LIMIT ?
    ");
    $stmt->execute([$limit]);
    return $stmt->fetchAll();
}

// تابع نمایش دستگاه‌های اخیر
function showRecentDevices($limit = 5) {
    global $db;
    $stmt = $db->prepare("
        SELECT d.*, b.name as board_name,
               (SELECT COUNT(*) FROM parts WHERE device_id = d.id) as parts_count
        FROM devices d
        LEFT JOIN boards b ON d.board_id = b.id
        ORDER BY d.created_at DESC
        LIMIT ?
    ");
    $stmt->execute([$limit]);
    return $stmt->fetchAll();
}

// تابع نمایش قطعات اخیر
function showRecentParts($limit = 5) {
    global $db;
    $stmt = $db->prepare("
        SELECT p.*, d.name as device_name, b.name as board_name
        FROM parts p
        LEFT JOIN devices d ON p.device_id = d.id
        LEFT JOIN boards b ON p.board_id = b.id
        ORDER BY p.created_at DESC
        LIMIT ?
    ");
    $stmt->execute([$limit]);
    return $stmt->fetchAll();
}
?> 