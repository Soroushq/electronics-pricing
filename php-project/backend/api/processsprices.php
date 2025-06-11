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
            // دریافت لیست قیمت پردازش‌ها (proccessprice)
            $result = mysqli_query($link, "SELECT * FROM proccessprice ORDER BY id DESC");
            $processPrices = [];
            while ($row = mysqli_fetch_array($result)) {
                $processPrices[] = [
                    'id' => $row['id'],
                    'process_id' => $row['process_id'],
                    'price' => floatval($row['price']),
                    'labor_cost' => floatval($row['labor_cost']),
                    'material_cost' => floatval($row['material_cost']),
                    'overhead_cost' => floatval($row['overhead_cost']),
                    'created_at' => $row['created_at'] ?? null,
                    'updated_at' => $row['updated_at'] ?? null
                ];
            }
            echo json_encode(['success' => true, 'data' => $processPrices]);
            break;

        case 'POST':
            // افزودن قیمت پردازش جدید
            $input = json_decode(file_get_contents('php://input'), true);
            $process_id = intval($input['process_id']);
            $price = floatval($input['price']);
            $labor_cost = floatval($input['labor_cost'] ?? 0);
            $material_cost = floatval($input['material_cost'] ?? 0);
            $overhead_cost = floatval($input['overhead_cost'] ?? 0);
            
            $query = "INSERT INTO proccessprice (process_id, price, labor_cost, material_cost, overhead_cost) VALUES ($process_id, $price, $labor_cost, $material_cost, $overhead_cost)";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true, 'id' => mysqli_insert_id($link)]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'PUT':
            // ویرایش قیمت پردازش
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            $process_id = intval($input['process_id']);
            $price = floatval($input['price']);
            $labor_cost = floatval($input['labor_cost'] ?? 0);
            $material_cost = floatval($input['material_cost'] ?? 0);
            $overhead_cost = floatval($input['overhead_cost'] ?? 0);
            
            $query = "UPDATE proccessprice SET process_id=$process_id, price=$price, labor_cost=$labor_cost, material_cost=$material_cost, overhead_cost=$overhead_cost WHERE id=$id";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'DELETE':
            // حذف قیمت پردازش
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            
            $query = "DELETE FROM proccessprice WHERE id=$id";
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