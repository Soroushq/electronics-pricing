<?php
session_start();
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/functions.php';

// تنظیمات پایه
define('BASE_URL', 'https://aramcontrol.com/price-electronics');
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سیستم قیمت‌گذاری قطعات الکترونیکی</title>
    
    <!-- Bootstrap RTL -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Custom CSS -->
    <style>
        body {
            font-family: 'Vazirmatn', sans-serif;
            background-color: #f8f9fa;
        }
        
        .sidebar {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 250px;
            background-color: #343a40;
            padding: 1rem;
            color: #fff;
            overflow-y: auto;
        }
        
        .sidebar .nav-link {
            color: rgba(255, 255, 255, 0.8);
            padding: 0.5rem 1rem;
            margin-bottom: 0.5rem;
            border-radius: 0.25rem;
        }
        
        .sidebar .nav-link:hover,
        .sidebar .nav-link.active {
            color: #fff;
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .sidebar .nav-link i {
            width: 1.5rem;
            text-align: center;
            margin-left: 0.5rem;
        }
        
        .main-content {
            margin-right: 250px;
            padding: 2rem;
        }
        
        .card {
            border: none;
            border-radius: 0.5rem;
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
            margin-bottom: 1.5rem;
        }
        
        .card-header {
            background-color: #fff;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            padding: 1rem;
        }
        
        .card-body {
            padding: 1.5rem;
        }
        
        .btn {
            border-radius: 0.25rem;
            padding: 0.5rem 1rem;
        }
        
        .table th {
            font-weight: 600;
            background-color: #f8f9fa;
        }
        
        .alert {
            border-radius: 0.25rem;
            margin-bottom: 1rem;
        }
        
        .user-info {
            padding: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 1rem;
        }
        
        .user-info .user-name {
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        
        .user-info .user-role {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.6);
        }
        
        .user-info .last-login {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.4);
            margin-top: 0.5rem;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="d-flex align-items-center mb-4">
            <i class="fas fa-microchip fa-2x me-2"></i>
            <h4 class="mb-0">سیستم قیمت‌گذاری</h4>
        </div>
        
        <ul class="nav flex-column">
            <?php echo showMenu(); ?>
        </ul>
        
        <div class="user-info">
            <div class="user-name"><?php echo showUserName(); ?></div>
            <div class="user-role"><?php echo showUserRole(); ?></div>
            <div class="last-login">آخرین ورود: <?php echo showLastLogin(); ?></div>
            <a href="<?php echo BASE_URL; ?>?route=logout" class="btn btn-danger btn-sm w-100 mt-3">
                <i class="fas fa-sign-out-alt me-1"></i>
                خروج
            </a>
        </div>
    </div>
    
    <!-- Main Content -->
    <div class="main-content">
        <?php echo showFlashMessage(); ?>
    </div>
</body>
</html> 