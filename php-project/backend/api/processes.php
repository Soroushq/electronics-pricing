<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            // دریافت لیست پردازش‌ها (proccess)
            $result = mysqli_query($link, "SELECT * FROM proccess ORDER BY id DESC");
            $processes = [];
            while ($row = mysqli_fetch_array($result)) {
                $processes[] = [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'device_id' => $row['device_id'],
                    'order_index' => intval($row['order_index']),
                    'created_at' => $row['created_at'] ?? null,
                    'updated_at' => $row['updated_at'] ?? null
                ];
            }
            echo json_encode(['success' => true, 'data' => $processes]);
            break;

        case 'POST':
            // افزودن پردازش جدید
            $input = json_decode(file_get_contents('php://input'), true);
            $name = mysqli_real_escape_string($link, $input['name']);
            $description = mysqli_real_escape_string($link, $input['description'] ?? '');
            $device_id = isset($input['device_id']) ? intval($input['device_id']) : 'NULL';
            $order_index = intval($input['order_index'] ?? 0);
            
            $query = "INSERT INTO proccess (name, description, device_id, order_index) VALUES ('$name', '$description', $device_id, $order_index)";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true, 'id' => mysqli_insert_id($link)]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'PUT':
            // ویرایش پردازش
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            $name = mysqli_real_escape_string($link, $input['name']);
            $description = mysqli_real_escape_string($link, $input['description'] ?? '');
            $device_id = isset($input['device_id']) ? intval($input['device_id']) : 'NULL';
            $order_index = intval($input['order_index'] ?? 0);
            
            $query = "UPDATE proccess SET name='$name', description='$description', device_id=$device_id, order_index=$order_index WHERE id=$id";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'DELETE':
            // حذف پردازش
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            
            $query = "DELETE FROM proccess WHERE id=$id";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
} finally {
    mysqli_close($link);
} 