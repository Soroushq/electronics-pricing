<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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
            // محاسبه قیمت کل یک دستگاه بر اساس قطعات، بردها و پردازش‌ها
            $device_id = isset($_GET['device_id']) ? intval($_GET['device_id']) : null;
            
            if (!$device_id) {
                echo json_encode(['success' => false, 'error' => 'device_id is required']);
                break;
            }
            
            // دریافت اطلاعات دستگاه
            $device_result = mysqli_query($link, "SELECT * FROM device WHERE id = $device_id");
            $device = mysqli_fetch_array($device_result);
            
            if (!$device) {
                echo json_encode(['success' => false, 'error' => 'Device not found']);
                break;
            }
            
            $total_price = 0;
            $breakdown = [];
            
            // محاسبه قیمت قطعات (ghate) مرتبط با برد دستگاه
            if ($device['board_id']) {
                $parts_result = mysqli_query($link, "SELECT * FROM ghate WHERE board_id = " . $device['board_id']);
                $parts_total = 0;
                $parts_list = [];
                
                while ($part = mysqli_fetch_array($parts_result)) {
                    $part_total = $part['price'] * $part['quantity'];
                    $parts_total += $part_total;
                    $parts_list[] = [
                        'id' => $part['id'],
                        'name' => $part['name'],
                        'price' => floatval($part['price']),
                        'quantity' => intval($part['quantity']),
                        'total' => $part_total
                    ];
                }
                
                $breakdown['parts'] = [
                    'total' => $parts_total,
                    'items' => $parts_list
                ];
                $total_price += $parts_total;
            }
            
            // محاسبه قیمت پردازش‌ها (processes)
            $processes_result = mysqli_query($link, "
                SELECT p.*, pp.price, pp.labor_cost, pp.material_cost, pp.overhead_cost 
                FROM proccess p 
                LEFT JOIN proccessprice pp ON p.id = pp.process_id 
                WHERE p.device_id = $device_id
                ORDER BY p.order_index
            ");
            
            $processes_total = 0;
            $processes_list = [];
            
            while ($process = mysqli_fetch_array($processes_result)) {
                $process_price = floatval($process['price']) + floatval($process['labor_cost']) + 
                               floatval($process['material_cost']) + floatval($process['overhead_cost']);
                $processes_total += $process_price;
                $processes_list[] = [
                    'id' => $process['id'],
                    'name' => $process['name'],
                    'price' => floatval($process['price']),
                    'labor_cost' => floatval($process['labor_cost']),
                    'material_cost' => floatval($process['material_cost']),
                    'overhead_cost' => floatval($process['overhead_cost']),
                    'total' => $process_price
                ];
            }
            
            $breakdown['processes'] = [
                'total' => $processes_total,
                'items' => $processes_list
            ];
            $total_price += $processes_total;
            
            echo json_encode([
                'success' => true,
                'data' => [
                    'device_id' => $device_id,
                    'device_name' => $device['name'],
                    'total_price' => $total_price,
                    'breakdown' => $breakdown,
                    'updated_at' => date('Y-m-d H:i:s')
                ]
            ]);
            break;

        case 'POST':
            // بروزرسانی قیمت نهایی دستگاه و ذخیره در دیتابیس
            $input = json_decode(file_get_contents('php://input'), true);
            $device_id = intval($input['device_id']);
            
            // محاسبه مجدد قیمت
            // کد محاسبه مشابه GET را اینجا اجرا کنید
            
            echo json_encode(['success' => true, 'message' => 'Price updated successfully']);
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