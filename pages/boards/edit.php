<?php
checkAuth();

// دریافت شناسه برد
$id = $_GET['id'] ?? 0;

// دریافت اطلاعات برد
$stmt = $db->prepare("SELECT * FROM boards WHERE id = ?");
$stmt->execute([$id]);
$board = $stmt->fetch();

if (!$board) {
    setFlashMessage('error', 'برد مورد نظر یافت نشد');
    redirect('boards');
}

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $description = trim($_POST['description']);

    // اعتبارسنجی
    if (empty($name)) {
        setFlashMessage('error', 'لطفا نام برد را وارد کنید');
    } else {
        try {
            // بروزرسانی برد
            $stmt = $db->prepare("
                UPDATE boards 
                SET name = ?, description = ?
                WHERE id = ?
            ");
            $stmt->execute([$name, $description, $id]);

            // ثبت فعالیت
            $stmt = $db->prepare("
                INSERT INTO activities (user_id, action, entity_type, entity_id, created_at)
                VALUES (?, 'update', 'board', ?, NOW())
            ");
            $stmt->execute([$_SESSION['user_id'], $id]);

            setFlashMessage('success', 'برد با موفقیت بروزرسانی شد');
            redirect('boards');
        } catch (PDOException $e) {
            setFlashMessage('error', 'خطا در بروزرسانی اطلاعات');
        }
    }
}
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">ویرایش برد</h5>
    </div>
    <div class="card-body">
        <form method="post" action="">
            <div class="mb-3">
                <label for="name" class="form-label">نام برد <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="name" name="name" value="<?php echo htmlspecialchars($board['name']); ?>" required>
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">توضیحات</label>
                <textarea class="form-control" id="description" name="description" rows="3"><?php echo htmlspecialchars($board['description']); ?></textarea>
            </div>

            <div class="text-end">
                <a href="<?php echo BASE_URL; ?>?route=boards" class="btn btn-secondary">انصراف</a>
                <button type="submit" class="btn btn-primary">ذخیره تغییرات</button>
            </div>
        </form>
    </div>
</div> 