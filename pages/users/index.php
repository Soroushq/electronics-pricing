<?php
// بررسی دسترسی
checkAuth();
checkPermission('manage_users');

// دریافت لیست کاربران
$stmt = $db->query("
    SELECT u.*, 
           (SELECT COUNT(*) FROM activities WHERE user_id = u.id) as activity_count
    FROM users u
    ORDER BY u.created_at DESC
");
$users = $stmt->fetchAll();
?>

<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">لیست کاربران</h5>
        <a href="<?php echo BASE_URL; ?>?route=users&action=new" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i>
            افزودن کاربر جدید
        </a>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>نام</th>
                        <th>نام کاربری</th>
                        <th>ایمیل</th>
                        <th>نقش</th>
                        <th>تعداد فعالیت‌ها</th>
                        <th>تاریخ ایجاد</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($user['name']); ?></td>
                        <td><?php echo htmlspecialchars($user['username']); ?></td>
                        <td><?php echo htmlspecialchars($user['email']); ?></td>
                        <td>
                            <?php
                            switch ($user['role']) {
                                case 'admin':
                                    echo '<span class="badge bg-danger">مدیر</span>';
                                    break;
                                case 'user':
                                    echo '<span class="badge bg-primary">کاربر</span>';
                                    break;
                                default:
                                    echo '<span class="badge bg-secondary">' . htmlspecialchars($user['role']) . '</span>';
                            }
                            ?>
                        </td>
                        <td><?php echo $user['activity_count']; ?></td>
                        <td><?php echo jdate('Y/m/d', strtotime($user['created_at'])); ?></td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <a href="<?php echo BASE_URL; ?>?route=users&action=edit&id=<?php echo $user['id']; ?>" class="btn btn-primary" data-bs-toggle="tooltip" title="ویرایش">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <?php if ($user['id'] != $_SESSION['user_id']): ?>
                                <a href="<?php echo BASE_URL; ?>?route=users&action=delete&id=<?php echo $user['id']; ?>" class="btn btn-danger delete-confirm" data-bs-toggle="tooltip" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </a>
                                <?php endif; ?>
                            </div>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div> 