<?php
// بررسی دسترسی
checkAuth();

// دریافت لیست بردها
$stmt = $db->query("
    SELECT b.*, 
           COUNT(DISTINCT d.id) as device_count,
           COUNT(DISTINCT p.id) as part_count
    FROM boards b
    LEFT JOIN devices d ON b.id = d.board_id
    LEFT JOIN parts p ON b.id = p.board_id
    GROUP BY b.id
    ORDER BY b.created_at DESC
");
$boards = $stmt->fetchAll();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3 mb-0">لیست بردها</h1>
    <a href="<?php echo BASE_URL; ?>?route=boards&action=new" class="btn btn-primary">
        <i class="fas fa-plus"></i> افزودن برد جدید
    </a>
</div>

<div class="card">
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>نام</th>
                        <th>تعداد دستگاه</th>
                        <th>تعداد قطعه</th>
                        <th>تاریخ ایجاد</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($boards as $board): ?>
                    <tr>
                        <td><?php echo escape($board['name']); ?></td>
                        <td><?php echo $board['device_count']; ?></td>
                        <td><?php echo $board['part_count']; ?></td>
                        <td><?php echo jdate($board['created_at']); ?></td>
                        <td>
                            <a href="<?php echo BASE_URL; ?>?route=boards&action=edit&id=<?php echo $board['id']; ?>" 
                               class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="<?php echo BASE_URL; ?>?route=boards&action=delete&id=<?php echo $board['id']; ?>" 
                               class="btn btn-sm btn-danger" 
                               onclick="return confirm('آیا از حذف این برد اطمینان دارید؟')">
                                <i class="fas fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div> 