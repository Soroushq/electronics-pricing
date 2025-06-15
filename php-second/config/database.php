<?php
/**
 * Database Configuration
 * تنظیمات اتصال به دیتابیس
 */

class Database {
    private $host = 'localhost';
    private $db_name = 'aramcont_pricedata';
    private $username = 'aramcont_moridi';
    private $password = 'OSA09155032778';
    private $charset = 'utf8mb4';
    public $conn;

    /**
     * اتصال به دیتابیس
     */
    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $this->conn->exec("set names utf8mb4");
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            throw new Exception("خطا در اتصال به دیتابیس: " . $exception->getMessage());
        }
        
        return $this->conn;
    }
    
    /**
     * بستن اتصال
     */
    public function closeConnection() {
        $this->conn = null;
    }
}
?> 