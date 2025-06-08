<?php
// تنظیمات دیتابیس
define('DB_HOST', 'localhost');
define('DB_NAME', 'aramcont_pricedata');
define('DB_USER', 'aramcont_moridi');
define('DB_PASS', 'OSA09155032778');

// اتصال به دیتابیس
try {
    $db = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    error_log($e->getMessage());
    die('خطا در اتصال به دیتابیس');
} 