<?php
// بررسی دسترسی
checkAuth();

// دریافت شناسه دستگاه
$id = $_GET['id'] ?? 0;

// دریافت اطلاعات دستگاه
$stmt = $db->prepare("SELECT * FROM devices WHERE id = ?");
$stmt->execute([$id]);
$device = $stmt->fetch();

// بررسی وجود دستگاه
if (!$device) {
    setFlashMessage('error', 'دستگاه مورد نظر یافت نشد');
    redirect('devices');
}

// بررسی وجود قطعه مرتبط
$stmt = $db->prepare("SELECT COUNT(*) as count FROM parts WHERE device_id = ?");
$stmt->execute([$id]);
$related = $stmt->fetch();

if ($related['count'] > 0) {
    $_SESSION['flash_message'] = 'این دستگاه دارای قطعه مرتبط است و قابل حذف نیست';
    $_SESSION['flash_type'] = 'danger';
    header('Location: ' . BASE_URL . '?route=devices');
    exit;
}

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // حذف دستگاه
        $stmt = $db->prepare("DELETE FROM devices WHERE id = ?");
        $stmt->execute([$id]);

        // ثبت فعالیت
        $stmt = $db->prepare("
            INSERT INTO activities (user_id, action, entity_type, entity_id, created_at)
            VALUES (?, 'delete', 'device', ?, NOW())
        ");
        $stmt->execute([$_SESSION['user_id'], $id]);

        setFlashMessage('success', 'دستگاه با موفقیت حذف شد');
        redirect('devices');
    } catch (PDOException $e) {
        error_log($e->getMessage());
        setFlashMessage('error', 'خطا در حذف دستگاه');
    }
}
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">حذف دستگاه</h5>
    </div>
    <div class="card-body">
        <div class="alert alert-warning">
            <h5 class="alert-heading">هشدار!</h5>
            <p>آیا از حذف دستگاه "<?php echo htmlspecialchars($device['name']); ?>" اطمینان دارید؟</p>
            <p class="mb-0">این عملیات غیرقابل بازگشت است.</p>
        </div>

        <form method="post" action="">
            <div class="text-end">
                <a href="<?php echo BASE_URL; ?>?route=devices" class="btn btn-secondary">انصراف</a>
                <button type="submit" class="btn btn-danger">حذف دستگاه</button>
            </div>
        </form>
    </div>
</div> 