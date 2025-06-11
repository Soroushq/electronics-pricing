<?php
// تنظیمات اتصال به دیتابیس MySQL - اطلاعات واقعی سرور

$host = 'localhost';
$db   = 'aramcont_pricedata';
$user = 'aramcont_moridi';
$pass = 'OSA09155032778';
$charset = 'utf8mb4';

// اتصال با MySQLi
$link = mysqli_connect($host, $user, $pass, $db);

if (!$link) {
    die('خطا در اتصال به دیتابیس: ' . mysqli_error());
}

// تنظیم charset
mysqli_set_charset($link, $charset);

// اتصال با PDO (برای استفاده در برخی APIها)
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
} 