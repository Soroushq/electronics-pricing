<?php
// بررسی دسترسی
checkAuth();

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $description = trim($_POST['description']);

    // اعتبارسنجی
    if (empty($name)) {
        setFlashMessage('error', 'لطفا نام برد را وارد کنید');
    } else {
        try {
            // درج برد جدید
            $stmt = $db->prepare("
                INSERT INTO boards (name, description, created_at)
                VALUES (?, ?, NOW())
            ");
            $stmt->execute([$name, $description]);

            // ثبت فعالیت
            $stmt = $db->prepare("
                INSERT INTO activities (user_id, action, entity_type, entity_id, created_at)
                VALUES (?, 'create', 'board', ?, NOW())
            ");
            $stmt->execute([$_SESSION['user_id'], $db->lastInsertId()]);

            setFlashMessage('success', 'برد با موفقیت اضافه شد');
            redirect('boards');
        } catch (PDOException $e) {
            setFlashMessage('error', 'خطا در ثبت اطلاعات');
        }
    }
}
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">افزودن برد جدید</h5>
    </div>
    <div class="card-body">
        <form method="post" action="">
            <div class="mb-3">
                <label for="name" class="form-label">نام برد <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="name" name="name" required>
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">توضیحات</label>
                <textarea class="form-control" id="description" name="description" rows="3"></textarea>
            </div>

            <div class="text-end">
                <a href="<?php echo BASE_URL; ?>?route=boards" class="btn btn-secondary">انصراف</a>
                <button type="submit" class="btn btn-primary">ذخیره</button>
            </div>
<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">افزودن برد جدید</h5>
            </div>
            <div class="card-body">
                <form method="post" action="">
                    <div class="mb-3">
                        <label for="name" class="form-label">نام برد</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">توضیحات</label>
                        <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                    </div>
                    <div class="d-flex justify-content-between">
                        <a href="<?php echo BASE_URL; ?>?route=boards" class="btn btn-secondary">
                            <i class="fas fa-arrow-right"></i> بازگشت
                        </a>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> ذخیره
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 