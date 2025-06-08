<?php
// بررسی دسترسی
checkAuth();

// دریافت لیست بردها
$stmt = $db->query("SELECT * FROM boards ORDER BY name");
$boards = $stmt->fetchAll();

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $board_id = $_POST['board_id'];
    $description = trim($_POST['description']);

    // اعتبارسنجی
    if (empty($name)) {
        setFlashMessage('error', 'لطفا نام دستگاه را وارد کنید');
    } else {
        try {
            // درج دستگاه جدید
            $stmt = $db->prepare("
                INSERT INTO devices (name, board_id, description, created_at)
                VALUES (?, ?, ?, NOW())
            ");
            $stmt->execute([$name, $board_id, $description]);

            // ثبت فعالیت
            $stmt = $db->prepare("
                INSERT INTO activities (user_id, action, entity_type, entity_id, created_at)
                VALUES (?, 'create', 'device', ?, NOW())
            ");
            $stmt->execute([$_SESSION['user_id'], $db->lastInsertId()]);

            setFlashMessage('success', 'دستگاه با موفقیت اضافه شد');
            redirect('devices');
        } catch (PDOException $e) {
            setFlashMessage('error', 'خطا در ثبت اطلاعات');
        }
    }
}
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">افزودن دستگاه جدید</h5>
    </div>
    <div class="card-body">
        <form method="post" action="">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="name" class="form-label">نام دستگاه <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="board_id" class="form-label">برد</label>
                        <select class="form-select" id="board_id" name="board_id">
                            <option value="">انتخاب کنید</option>
                            <?php foreach ($boards as $board): ?>
                            <option value="<?php echo $board['id']; ?>">
                                <?php echo htmlspecialchars($board['name']); ?>
                            </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">توضیحات</label>
                <textarea class="form-control" id="description" name="description" rows="3"></textarea>
            </div>

            <div class="text-end">
                <a href="<?php echo BASE_URL; ?>?route=devices" class="btn btn-secondary">انصراف</a>
                <button type="submit" class="btn btn-primary">ذخیره</button>
            </div>
        </form>
    </div>
</div> 