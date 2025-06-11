<?php
// تست اتصال به دیتابیس و نمایش React App
require_once __DIR__ . '/../config/db.php';
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سیستم قیمت‌گذاری الکترونیک</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
            width: 100%;
        }
        .status {
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: bold;
        }
        .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .btn {
            display: inline-block;
            padding: 12px 25px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 10px;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #5a6fd8;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        .info {
            background: #e2e3f3;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 سیستم مدیریت قیمت‌گذاری الکترونیک</h1>
        
        <?php
        // تست اتصال دیتابیس
        $db_status = "";
        $test_data = "";
        
        try {
            // تست اتصال MySQL
            $result = mysqli_query($link, "SELECT COUNT(*) as total FROM board");
            $board_count = mysqli_fetch_array($result)['total'];
            
            $result = mysqli_query($link, "SELECT COUNT(*) as total FROM device");
            $device_count = mysqli_fetch_array($result)['total'];
            
            $result = mysqli_query($link, "SELECT COUNT(*) as total FROM ghate");
            $parts_count = mysqli_fetch_array($result)['total'];
            
            $result = mysqli_query($link, "SELECT COUNT(*) as total FROM proccess");
            $process_count = mysqli_fetch_array($result)['total'];
            
            $result = mysqli_query($link, "SELECT COUNT(*) as total FROM proccessprice");
            $price_count = mysqli_fetch_array($result)['total'];
            
            echo '<div class="status success">✅ اتصال به دیتابیس موفقیت‌آمیز بود!</div>';
            
            echo '<div class="info">';
            echo '<h3>📊 آمار دیتابیس:</h3>';
            echo "<p>📋 تعداد بردها: $board_count</p>";
            echo "<p>📱 تعداد دستگاه‌ها: $device_count</p>";
            echo "<p>🔧 تعداد قطعات: $parts_count</p>";
            echo "<p>⚙️ تعداد پردازش‌ها: $process_count</p>";
            echo "<p>💰 تعداد قیمت‌ها: $price_count</p>";
            echo '</div>';
            
            // نمایش نمونه داده از جدول board
            $result = mysqli_query($link, "SELECT * FROM board LIMIT 3");
            if (mysqli_num_rows($result) > 0) {
                echo '<div class="info">';
                echo '<h3>📋 نمونه داده‌های بردها:</h3>';
                while ($row = mysqli_fetch_array($result)) {
                    echo "<p>کد برد: {$row['bcode']} - نام: {$row['bname']}</p>";
                }
                echo '</div>';
            }
            
        } catch (Exception $e) {
            echo '<div class="status error">❌ خطا در اتصال به دیتابیس: ' . $e->getMessage() . '</div>';
        }
        ?>
        
        <div style="margin-top: 30px;">
            <a href="backend/api/boards.php" class="btn">🔗 تست API بردها</a>
            <a href="backend/api/devices.php" class="btn">🔗 تست API دستگاه‌ها</a>
            <a href="backend/api/parts.php" class="btn">🔗 تست API قطعات</a>
        </div>
        
        <div class="info" style="margin-top: 30px;">
            <h3>🚀 مراحل بعدی:</h3>
            <p>1. فایل‌های React را در پوشه public کپی کنید</p>
            <p>2. تنظیمات URL های API را در React به درستی انجام دهید</p>
            <p>3. سیستم آماده استفاده است!</p>
        </div>
        
        <div style="margin-top: 20px; font-size: 12px; color: #666;">
            <p>📅 آخرین بروزرسانی: <?php echo date('Y-m-d H:i:s'); ?></p>
            <p>🌐 سرور: aramcontrol.com</p>
        </div>
    </div>
</body>
</html> 