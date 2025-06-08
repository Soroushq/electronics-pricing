<?php
// بررسی دسترسی
checkAuth();

// دریافت شناسه قطعه
$id = $_GET['id'] ?? 0;

// دریافت اطلاعات قطعه
$stmt = $db->prepare("SELECT * FROM parts WHERE id = ?");
$stmt->execute([$id]);
$part = $stmt->fetch();

if (!$part) {
    setFlashMessage('error', 'قطعه مورد نظر یافت نشد');
    redirect('parts');
}

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // حذف قطعه
        $stmt = $db->prepare("DELETE FROM parts WHERE id = ?");
        $stmt->execute([$id]);

        // ثبت فعالیت
        $stmt = $db->prepare("
            INSERT INTO activities (user_id, action, entity_type, entity_id, created_at)
            VALUES (?, 'delete', 'part', ?, NOW())
        ");
        $stmt->execute([$_SESSION['user_id'], $id]);

        setFlashMessage('success', 'قطعه با موفقیت حذف شد');
        redirect('parts');
    } catch (PDOException $e) {
        setFlashMessage('error', 'خطا در حذف قطعه');
    }
}
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">حذف قطعه</h5>
    </div>
    <div class="card-body">
        <div class="alert alert-warning">
            <h5 class="alert-heading">هشدار!</h5>
            <p>آیا از حذف قطعه "<?php echo htmlspecialchars($part['name']); ?>" اطمینان دارید؟</p>
            <p>این عملیات غیرقابل بازگشت است.</p>
        </div>

        <form method="post" action="">
            <div class="text-end">
                <a href="<?php echo BASE_URL; ?>?route=parts" class="btn btn-secondary">انصراف</a>
                <button type="submit" class="btn btn-danger">حذف قطعه</button>
            </div>
        </form>
    </div>
</div> 