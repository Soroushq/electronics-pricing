<?php
// بررسی دسترسی
checkAuth();

// دریافت لیست قطعات
$stmt = $db->query("
    SELECT p.*, d.name as device_name, b.name as board_name
    FROM parts p
    LEFT JOIN devices d ON p.device_id = d.id
    LEFT JOIN boards b ON p.board_id = b.id
    ORDER BY p.created_at DESC
");
$parts = $stmt->fetchAll();
?>

<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">لیست قطعات</h5>
        <a href="<?php echo BASE_URL; ?>?route=parts&action=new" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i>
            افزودن قطعه جدید
        </a>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>نام</th>
                        <th>دستگاه</th>
                        <th>برد</th>
                        <th>قیمت</th>
                        <th>تاریخ ایجاد</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($parts as $part): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($part['name']); ?></td>
                        <td><?php echo htmlspecialchars($part['device_name']); ?></td>
                        <td><?php echo htmlspecialchars($part['board_name']); ?></td>
                        <td><?php echo number_format($part['price']); ?> تومان</td>
                        <td><?php echo jdate('Y/m/d', strtotime($part['created_at'])); ?></td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <a href="<?php echo BASE_URL; ?>?route=parts&action=edit&id=<?php echo $part['id']; ?>" class="btn btn-primary" data-bs-toggle="tooltip" title="ویرایش">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="<?php echo BASE_URL; ?>?route=parts&action=delete&id=<?php echo $part['id']; ?>" class="btn btn-danger delete-confirm" data-bs-toggle="tooltip" title="حذف">
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