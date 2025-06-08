<?php
// بررسی دسترسی
checkAuth();
checkPermission('manage_users');

// پردازش فرم
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? 'user';
    
    if (empty($name) || empty($username) || empty($password)) {
        $_SESSION['flash_message'] = 'نام، نام کاربری و رمز عبور الزامی هستند';
        $_SESSION['flash_type'] = 'danger';
    } else {
        try {
            // بررسی تکراری نبودن نام کاربری
            $stmt = $db->prepare("SELECT COUNT(*) as count FROM users WHERE username = ?");
            $stmt->execute([$username]);
            $exists = $stmt->fetch();
            
            if ($exists['count'] > 0) {
                $_SESSION['flash_message'] = 'این نام کاربری قبلاً استفاده شده است';
                $_SESSION['flash_type'] = 'danger';
            } else {
                $stmt = $db->prepare("
                    INSERT INTO users (name, username, email, password, role, created_at) 
                    VALUES (?, ?, ?, ?, ?, NOW())
                ");
                $stmt->execute([$name, $username, $email, password_hash($password, PASSWORD_DEFAULT), $role]);
                
                // ثبت فعالیت
                $stmt = $db->prepare("
                    INSERT INTO activities (user_id, type, title, created_at) 
                    VALUES (?, 'user_create', ?, NOW())
                ");
                $stmt->execute([$_SESSION['user_id'], "افزودن کاربر: $name"]);
                
                $_SESSION['flash_message'] = 'کاربر با موفقیت افزوده شد';
                $_SESSION['flash_type'] = 'success';
                header('Location: ' . BASE_URL . '?route=users');
                exit;
            }
        } catch (PDOException $e) {
            error_log($e->getMessage());
            $_SESSION['flash_message'] = 'خطا در افزودن کاربر';
            $_SESSION['flash_type'] = 'danger';
        }
    }
}
?>

<div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0">افزودن کاربر جدید</h1>
        <a href="<?= BASE_URL ?>?route=users" class="btn btn-secondary">
            <i class="fas fa-arrow-right"></i> بازگشت به لیست
        </a>
    </div>

    <div class="card">
        <div class="card-body">
            <form method="post" class="needs-validation" novalidate>
                <div class="mb-3">
                    <label for="name" class="form-label">نام</label>
                    <input type="text" class="form-control" id="name" name="name" 
                           value="<?= htmlspecialchars($_POST['name'] ?? '') ?>" required>
                    <div class="invalid-feedback">نام الزامی است</div>
                </div>

                <div class="mb-3">
                    <label for="username" class="form-label">نام کاربری</label>
                    <input type="text" class="form-control" id="username" name="username" 
                           value="<?= htmlspecialchars($_POST['username'] ?? '') ?>" required>
                    <div class="invalid-feedback">نام کاربری الزامی است</div>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">ایمیل</label>
                    <input type="email" class="form-control" id="email" name="email" 
                           value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">رمز عبور</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                    <div class="invalid-feedback">رمز عبور الزامی است</div>
                </div>

                <div class="mb-3">
                    <label for="role" class="form-label">نقش</label>
                    <select class="form-select" id="role" name="role">
                        <option value="user" <?= ($_POST['role'] ?? '') == 'user' ? 'selected' : '' ?>>کاربر</option>
                        <option value="admin" <?= ($_POST['role'] ?? '') == 'admin' ? 'selected' : '' ?>>مدیر</option>
                    </select>
                </div>

                <div class="text-end">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> ذخیره
                    </button>
                </div>
            </form>
        </div>
    </div>
</div> 