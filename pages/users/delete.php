<?php
// بررسی دسترسی
checkAuth();
checkPermission('manage_users');

// دریافت شناسه کاربر
$userId = $_GET['id'] ?? 0;

// بررسی عدم حذف خود کاربر
if ($userId == $_SESSION['user_id']) {
    $_SESSION['flash_message'] = 'شما نمی‌توانید حساب کاربری خود را حذف کنید';
    $_SESSION['flash_type'] = 'danger';
    header('Location: ' . BASE_URL . '?route=users');
    exit;
}

// دریافت اطلاعات کاربر
$stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch();

if (!$user) {
    $_SESSION['flash_message'] = 'کاربر مورد نظر یافت نشد';
    $_SESSION['flash_type'] = 'danger';
    header('Location: ' . BASE_URL . '?route=users');
    exit;
}

// حذف کاربر
try {
    $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    
    // ثبت فعالیت
    $stmt = $db->prepare("
        INSERT INTO activities (user_id, type, title, created_at) 
        VALUES (?, 'user_delete', ?, NOW())
    ");
    $stmt->execute([$_SESSION['user_id'], "حذف کاربر: {$user['name']}"]);
    
    $_SESSION['flash_message'] = 'کاربر با موفقیت حذف شد';
    $_SESSION['flash_type'] = 'success';
} catch (PDOException $e) {
    error_log($e->getMessage());
    $_SESSION['flash_message'] = 'خطا در حذف کاربر';
    $_SESSION['flash_type'] = 'danger';
}

header('Location: ' . BASE_URL . '?route=users');
exit; 