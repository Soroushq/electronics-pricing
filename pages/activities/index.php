<?php
// بررسی دسترسی
checkAuth();

// دریافت لیست فعالیت‌ها
$stmt = $db->query("
    SELECT a.*, u.name as user_name
    FROM activities a
    LEFT JOIN users u ON a.user_id = u.id
    ORDER BY a.created_at DESC
    LIMIT 100
");
$activities = $stmt->fetchAll();
?>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">لیست فعالیت‌ها</h5>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>کاربر</th>
                        <th>عملیات</th>
                        <th>نوع</th>
                        <th>شناسه</th>
                        <th>تاریخ</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($activities as $activity): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($activity['user_name']); ?></td>
                        <td>
                            <?php
                            switch ($activity['action']) {
                                case 'create':
                                    echo '<span class="badge bg-success">ایجاد</span>';
                                    break;
                                case 'update':
                                    echo '<span class="badge bg-primary">ویرایش</span>';
                                    break;
                                case 'delete':
                                    echo '<span class="badge bg-danger">حذف</span>';
                                    break;
                                default:
                                    echo '<span class="badge bg-secondary">' . htmlspecialchars($activity['action']) . '</span>';
                            }
                            ?>
                        </td>
                        <td>
                            <?php
                            switch ($activity['entity_type']) {
                                case 'user':
                                    echo 'کاربر';
                                    break;
                                case 'board':
                                    echo 'برد';
                                    break;
                                case 'device':
                                    echo 'دستگاه';
                                    break;
                                case 'part':
                                    echo 'قطعه';
                                    break;
                                default:
                                    echo htmlspecialchars($activity['entity_type']);
                            }
                            ?>
                        </td>
                        <td><?php echo $activity['entity_id']; ?></td>
                        <td><?php echo jdate('Y/m/d H:i', strtotime($activity['created_at'])); ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div> 