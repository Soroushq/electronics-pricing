<?php
// بررسی دسترسی
checkAuth();

// دریافت شناسه برد
$id = $_GET['id'] ?? 0;

// دریافت اطلاعات برد
$stmt = $db->prepare("SELECT * FROM boards WHERE id = ?");
$stmt->execute([$id]);
$board = $stmt->fetch();

// بررسی وجود برد
if (!$board) {
    setFlashMessage('error', 'برد مورد نظر یافت نشد');
    redirect('boards');
}

// بررسی وجود دستگاه یا قطعه مرتبط
$stmt = $db->prepare("
    SELECT COUNT(*) as count 
    FROM (
        SELECT id FROM devices WHERE board_id = ?
        UNION
        SELECT id FROM parts WHERE board_id = ?
    ) as related
");
$stmt->execute([$id, $id]);
$related = $stmt->fetch();

if ($related['count'] > 0) {
    $_SESSION['flash_message'] = 'این برد دارای دستگاه یا قطعه مرتبط است و قابل حذف نیست';
    $_SESSION['flash_type'] = 'danger';
    header('Location: ' . BASE_URL . '?route=boards');
    exit;
}

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // حذف برد
        $stmt = $db->prepare("DELETE FROM boards WHERE id = ?");
        $stmt->execute([$id]);

        // ثبت فعالیت
        $stmt = $db->prepare("
            INSERT INTO activities (user_id, action, entity_type, entity_id, created_at)
            VALUES (?, 'delete', 'board', ?, NOW())
        ");
        $stmt->execute([$_SESSION['user_id'], $id]);

        setFlashMessage('success', 'برد با موفقیت حذف شد');
        redirect('boards');
    } catch (PDOException $e) {
        setFlashMessage('error', 'خطا در حذف برد');
    }
}
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">حذف برد</h5>
    </div>
    <div class="card-body">
        <div class="alert alert-warning">
            <h5 class="alert-heading">هشدار!</h5>
            <p>آیا از حذف برد "<?php echo htmlspecialchars($board['name']); ?>" اطمینان دارید؟</p>
            <p>این عملیات غیرقابل بازگشت است.</p>
        </div>

        <form method="post" action="">
            <div class="text-end">
                <a href="<?php echo BASE_URL; ?>?route=boards" class="btn btn-secondary">انصراف</a>
                <button type="submit" class="btn btn-danger">حذف برد</button>
            </div>
        </form>
    </div>
</div> 