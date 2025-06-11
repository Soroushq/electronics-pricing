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
            // دریافت لیست دستگاه‌ها
            $result = mysqli_query($link, "SELECT * FROM device ORDER BY id DESC");
            $devices = [];
            while ($row = mysqli_fetch_array($result)) {
                $devices[] = [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'board_id' => $row['board_id'],
                    'created_at' => $row['created_at'] ?? null,
                    'updated_at' => $row['updated_at'] ?? null
                ];
            }
            echo json_encode(['success' => true, 'data' => $devices]);
            break;

        case 'POST':
            // افزودن دستگاه جدید
            $input = json_decode(file_get_contents('php://input'), true);
            $name = mysqli_real_escape_string($link, $input['name']);
            $description = mysqli_real_escape_string($link, $input['description'] ?? '');
            $board_id = isset($input['board_id']) ? intval($input['board_id']) : 'NULL';
            
            $query = "INSERT INTO device (name, description, board_id) VALUES ('$name', '$description', $board_id)";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true, 'id' => mysqli_insert_id($link)]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'PUT':
            // ویرایش دستگاه
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            $name = mysqli_real_escape_string($link, $input['name']);
            $description = mysqli_real_escape_string($link, $input['description'] ?? '');
            $board_id = isset($input['board_id']) ? intval($input['board_id']) : 'NULL';
            
            $query = "UPDATE device SET name='$name', description='$description', board_id=$board_id WHERE id=$id";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'DELETE':
            // حذف دستگاه
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            
            $query = "DELETE FROM device WHERE id=$id";
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