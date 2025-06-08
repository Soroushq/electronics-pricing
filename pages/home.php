<?php
require_once __DIR__ . '/../includes/header.php';

// دریافت آمار کلی
$stats = [
    'boards' => count(getBoards()),
    'devices' => count(getDevices()),
    'parts' => count(getParts()),
    'processes' => count(getProcesses())
];

// دریافت آخرین فعالیت‌ها
$recentActivities = getRecentActivities(5);

checkAuth();
?>

<div class="row">
    <!-- آمار کلی -->
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-microchip fa-2x text-primary"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">بردها</h6>
                        <h3 class="mb-0"><?php echo showBoardsCount(); ?></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-mobile-alt fa-2x text-success"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">دستگاه‌ها</h6>
                        <h3 class="mb-0"><?php echo showDevicesCount(); ?></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-cogs fa-2x text-warning"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">قطعات</h6>
                        <h3 class="mb-0"><?php echo showPartsCount(); ?></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-users fa-2x text-info"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">کاربران</h6>
                        <h3 class="mb-0"><?php echo showUsersCount(); ?></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <!-- فعالیت‌های اخیر -->
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">فعالیت‌های اخیر</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>کاربر</th>
                                <th>عملیات</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach (showRecentActivities() as $activity): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($activity['user_name']); ?></td>
                                <td><?php echo htmlspecialchars($activity['action']); ?></td>
                                <td><?php echo jdate('Y/m/d H:i', strtotime($activity['created_at'])); ?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <!-- بردهای اخیر -->
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">بردهای اخیر</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>نام</th>
                                <th>دستگاه‌ها</th>
                                <th>قطعات</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach (showRecentBoards() as $board): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($board['name']); ?></td>
                                <td><?php echo $board['devices_count']; ?></td>
                                <td><?php echo $board['parts_count']; ?></td>
                                <td><?php echo jdate('Y/m/d', strtotime($board['created_at'])); ?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <!-- دستگاه‌های اخیر -->
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">دستگاه‌های اخیر</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>نام</th>
                                <th>برد</th>
                                <th>قطعات</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach (showRecentDevices() as $device): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($device['name']); ?></td>
                                <td><?php echo htmlspecialchars($device['board_name']); ?></td>
                                <td><?php echo $device['parts_count']; ?></td>
                                <td><?php echo jdate('Y/m/d', strtotime($device['created_at'])); ?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <!-- قطعات اخیر -->
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">قطعات اخیر</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>نام</th>
                                <th>دستگاه</th>
                                <th>برد</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach (showRecentParts() as $part): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($part['name']); ?></td>
                                <td><?php echo htmlspecialchars($part['device_name']); ?></td>
                                <td><?php echo htmlspecialchars($part['board_name']); ?></td>
                                <td><?php echo jdate('Y/m/d', strtotime($part['created_at'])); ?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?> 