<?php
// بررسی دسترسی
checkAuth();
checkPermission('manage_users');

// دریافت شناسه کاربر
$id = $_GET['id'] ?? 0;

// دریافت اطلاعات کاربر
$stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) {
    setFlashMessage('error', 'کاربر مورد نظر یافت نشد');
    redirect('users');
}

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $role = $_POST['role'];

    // اعتبارسنجی
    if (empty($name) || empty($username)) {
        setFlashMessage('error', 'لطفا تمام فیلدهای الزامی را پر کنید');
    } else {
        try {
            // بررسی تکراری نبودن نام کاربری
            $stmt = $db->prepare("SELECT COUNT(*) FROM users WHERE username = ? AND id != ?");
            $stmt->execute([$username, $id]);
            if ($stmt->fetchColumn() > 0) {
                setFlashMessage('error', 'این نام کاربری قبلا استفاده شده است');
            } else {
                // بروزرسانی کاربر
                if (!empty($password)) {
                    $stmt = $db->prepare("
                        UPDATE users 
                        SET name = ?, username = ?, email = ?, password = ?, role = ?
                        WHERE id = ?
                    ");
                    $stmt->execute([
                        $name,
                        $username,
                        $email,
                        password_hash($password, PASSWORD_DEFAULT),
                        $role,
                        $id
                    ]);
                } else {
                    $stmt = $db->prepare("
                        UPDATE users 
                        SET name = ?, username = ?, email = ?, role = ?
                        WHERE id = ?
                    ");
                    $stmt->execute([
                        $name,
                        $username,
                        $email,
                        $role,
                        $id
                    ]);
                }

                // ثبت فعالیت
                $stmt = $db->prepare("
                    INSERT INTO activities (user_id, action, entity_type, entity_id, created_at)
                    VALUES (?, 'update', 'user', ?, NOW())
                ");
                $stmt->execute([$_SESSION['user_id'], $id]);

                setFlashMessage('success', 'کاربر با موفقیت بروزرسانی شد');
                redirect('users');
            }
        } catch (PDOException $e) {
            setFlashMessage('error', 'خطا در بروزرسانی اطلاعات');
        }
    }
}
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">ویرایش کاربر</h5>
    </div>
    <div class="card-body">
        <form method="post" action="">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="name" class="form-label">نام <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="name" name="name" value="<?php echo htmlspecialchars($user['name']); ?>" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="username" class="form-label">نام کاربری <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="username" name="username" value="<?php echo htmlspecialchars($user['username']); ?>" required>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="email" class="form-label">ایمیل</label>
                        <input type="email" class="form-control" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="password" class="form-label">رمز عبور جدید</label>
                        <input type="password" class="form-control" id="password" name="password">
                        <div class="form-text">در صورت عدم نیاز به تغییر رمز عبور، این فیلد را خالی بگذارید</div>
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <label for="role" class="form-label">نقش <span class="text-danger">*</span></label>
                <select class="form-select" id="role" name="role" required>
                    <option value="user" <?php echo $user['role'] == 'user' ? 'selected' : ''; ?>>کاربر</option>
                    <option value="admin" <?php echo $user['role'] == 'admin' ? 'selected' : ''; ?>>مدیر</option>
                </select>
            </div>

            <div class="text-end">
                <a href="<?php echo BASE_URL; ?>?route=users" class="btn btn-secondary">انصراف</a>
                <button type="submit" class="btn btn-primary">ذخیره تغییرات</button>
            </div>
        </form>
    </div>
</div> 