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

// دریافت لیست دستگاه‌ها
$stmt = $db->query("SELECT * FROM devices ORDER BY name");
$devices = $stmt->fetchAll();

// دریافت لیست بردها
$stmt = $db->query("SELECT * FROM boards ORDER BY name");
$boards = $stmt->fetchAll();

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $device_id = $_POST['device_id'];
    $board_id = $_POST['board_id'];
    $price = $_POST['price'];
    $description = trim($_POST['description']);

    // اعتبارسنجی
    if (empty($name)) {
        setFlashMessage('error', 'لطفا نام قطعه را وارد کنید');
    } else {
        try {
            // بروزرسانی قطعه
            $stmt = $db->prepare("
                UPDATE parts 
                SET name = ?, device_id = ?, board_id = ?, price = ?, description = ?
                WHERE id = ?
            ");
            $stmt->execute([$name, $device_id, $board_id, $price, $description, $id]);

            // ثبت فعالیت
            $stmt = $db->prepare("
                INSERT INTO activities (user_id, action, entity_type, entity_id, created_at)
                VALUES (?, 'update', 'part', ?, NOW())
            ");
            $stmt->execute([$_SESSION['user_id'], $id]);

            setFlashMessage('success', 'قطعه با موفقیت بروزرسانی شد');
            redirect('parts');
        } catch (PDOException $e) {
            setFlashMessage('error', 'خطا در بروزرسانی اطلاعات');
        }
    }
}
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">ویرایش قطعه</h5>
    </div>
    <div class="card-body">
        <form method="post" action="">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="name" class="form-label">نام قطعه <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="name" name="name" value="<?php echo htmlspecialchars($part['name']); ?>" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="price" class="form-label">قیمت (تومان) <span class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="price" name="price" value="<?php echo $part['price']; ?>" required>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="device_id" class="form-label">دستگاه</label>
                        <select class="form-select" id="device_id" name="device_id">
                            <option value="">انتخاب کنید</option>
                            <?php foreach ($devices as $device): ?>
                            <option value="<?php echo $device['id']; ?>" <?php echo $device['id'] == $part['device_id'] ? 'selected' : ''; ?>>
                                <?php echo htmlspecialchars($device['name']); ?>
                            </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="board_id" class="form-label">برد</label>
                        <select class="form-select" id="board_id" name="board_id">
                            <option value="">انتخاب کنید</option>
                            <?php foreach ($boards as $board): ?>
                            <option value="<?php echo $board['id']; ?>" <?php echo $board['id'] == $part['board_id'] ? 'selected' : ''; ?>>
                                <?php echo htmlspecialchars($board['name']); ?>
                            </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">توضیحات</label>
                <textarea class="form-control" id="description" name="description" rows="3"><?php echo htmlspecialchars($part['description']); ?></textarea>
            </div>

            <div class="text-end">
                <a href="<?php echo BASE_URL; ?>?route=parts" class="btn btn-secondary">انصراف</a>
                <button type="submit" class="btn btn-primary">ذخیره تغییرات</button>
            </div>
        </form>
    </div>
</div> 