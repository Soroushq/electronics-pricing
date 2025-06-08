<?php
// بررسی دسترسی
checkAuth();

// دریافت لیست دستگاه‌ها
$stmt = $db->query("
    SELECT d.*, b.name as board_name,
           (SELECT COUNT(*) FROM parts WHERE device_id = d.id) as part_count
    FROM devices d
    LEFT JOIN boards b ON d.board_id = b.id
    ORDER BY d.created_at DESC
");
$devices = $stmt->fetchAll();
?>

<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">لیست دستگاه‌ها</h5>
        <a href="<?php echo BASE_URL; ?>?route=devices&action=new" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i>
            افزودن دستگاه جدید
        </a>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>نام</th>
                        <th>برد</th>
                        <th>تعداد قطعات</th>
                        <th>تاریخ ایجاد</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($devices as $device): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($device['name']); ?></td>
                        <td><?php echo htmlspecialchars($device['board_name']); ?></td>
                        <td><?php echo $device['part_count']; ?></td>
                        <td><?php echo jdate('Y/m/d', strtotime($device['created_at'])); ?></td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <a href="<?php echo BASE_URL; ?>?route=devices&action=edit&id=<?php echo $device['id']; ?>" class="btn btn-primary" data-bs-toggle="tooltip" title="ویرایش">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="<?php echo BASE_URL; ?>?route=devices&action=delete&id=<?php echo $device['id']; ?>" class="btn btn-danger delete-confirm" data-bs-toggle="tooltip" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div> 