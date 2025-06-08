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
    $_SESSION['flash_message'] = 'دستگاه مورد نظر یافت نشد';
    $_SESSION['flash_type'] = 'danger';
    header('Location: ' . BASE_URL . '?route=devices');
    exit;
}

// دریافت لیست بردها
$stmt = $db->query("SELECT * FROM boards ORDER BY name");
$boards = $stmt->fetchAll();

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $board_id = (int)($_POST['board_id'] ?? 0);
    $description = trim($_POST['description'] ?? '');
    
    // بررسی فیلدهای اجباری
    if (empty($name)) {
        $_SESSION['flash_message'] = 'نام دستگاه الزامی است';
        $_SESSION['flash_type'] = 'danger';
    } elseif ($board_id === 0) {
        $_SESSION['flash_message'] = 'انتخاب برد الزامی است';
        $_SESSION['flash_type'] = 'danger';
    } else {
        try {
            // بروزرسانی دستگاه
            $stmt = $db->prepare("UPDATE devices SET board_id = ?, name = ?, description = ? WHERE id = ?");
            $stmt->execute([$board_id, $name, $description, $id]);
            
            // ثبت فعالیت
            $stmt = $db->prepare("INSERT INTO activities (user_id, action) VALUES (?, ?)");
            $stmt->execute([$_SESSION['user_id'], "ویرایش دستگاه: {$name}"]);
            
            $_SESSION['flash_message'] = 'دستگاه با موفقیت ویرایش شد';
            $_SESSION['flash_type'] = 'success';
            header('Location: ' . BASE_URL . '?route=devices');
            exit;
        } catch (PDOException $e) {
            $_SESSION['flash_message'] = 'خطا در ویرایش دستگاه';
            $_SESSION['flash_type'] = 'danger';
        }
    }
}
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">ویرایش دستگاه</h5>
    </div>
    <div class="card-body">
        <form method="post">
            <div class="mb-3">
                <label for="board_id" class="form-label">برد</label>
                <select class="form-select" id="board_id" name="board_id" required>
                    <option value="">انتخاب کنید</option>
                    <?php foreach ($boards as $board): ?>
                    <option value="<?php echo $board['id']; ?>" <?php echo $device['board_id'] == $board['id'] ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($board['name']); ?>
                    </option>
                    <?php endforeach; ?>
                </select>
            </div>
            
            <div class="mb-3">
                <label for="name" class="form-label">نام دستگاه</label>
                <input type="text" class="form-control" id="name" name="name" value="<?php echo htmlspecialchars($device['name']); ?>" required>
            </div>
            
            <div class="mb-3">
                <label for="description" class="form-label">توضیحات</label>
                <textarea class="form-control" id="description" name="description" rows="3"><?php echo htmlspecialchars($device['description']); ?></textarea>
            </div>
            
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save me-1"></i>
                    ذخیره تغییرات
                </button>
                <a href="<?php echo BASE_URL; ?>?route=devices" class="btn btn-secondary">
                    <i class="fas fa-times me-1"></i>
                    انصراف
                </a>
            </div>
        </form>
    </div>
</div> 