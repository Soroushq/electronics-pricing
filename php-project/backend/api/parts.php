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
            // دریافت لیست قطعات (ghate)
            $result = mysqli_query($link, "SELECT * FROM ghate ORDER BY id DESC");
            $parts = [];
            while ($row = mysqli_fetch_array($result)) {
                $parts[] = [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'price' => floatval($row['price']),
                    'board_id' => $row['board_id'],
                    'quantity' => intval($row['quantity']),
                    'created_at' => $row['created_at'] ?? null,
                    'updated_at' => $row['updated_at'] ?? null
                ];
            }
            echo json_encode(['success' => true, 'data' => $parts]);
            break;

        case 'POST':
            // افزودن قطعه جدید
            $input = json_decode(file_get_contents('php://input'), true);
            $name = mysqli_real_escape_string($link, $input['name']);
            $description = mysqli_real_escape_string($link, $input['description'] ?? '');
            $price = floatval($input['price'] ?? 0);
            $board_id = isset($input['board_id']) ? intval($input['board_id']) : 'NULL';
            $quantity = intval($input['quantity'] ?? 1);
            
            $query = "INSERT INTO ghate (name, description, price, board_id, quantity) VALUES ('$name', '$description', $price, $board_id, $quantity)";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true, 'id' => mysqli_insert_id($link)]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'PUT':
            // ویرایش قطعه
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            $name = mysqli_real_escape_string($link, $input['name']);
            $description = mysqli_real_escape_string($link, $input['description'] ?? '');
            $price = floatval($input['price'] ?? 0);
            $board_id = isset($input['board_id']) ? intval($input['board_id']) : 'NULL';
            $quantity = intval($input['quantity'] ?? 1);
            
            $query = "UPDATE ghate SET name='$name', description='$description', price=$price, board_id=$board_id, quantity=$quantity WHERE id=$id";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'DELETE':
            // حذف قطعه
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            
            $query = "DELETE FROM ghate WHERE id=$id";
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