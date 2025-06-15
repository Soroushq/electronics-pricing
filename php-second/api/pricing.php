<?php
/**
 * Pricing API
 * API محاسبه قیمت کل دستگاه
 */

require_once '../config/database.php';
require_once '../includes/functions.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $method = checkRequestMethod(['GET']);
    
    if ($method === 'GET') {
        handleGetDevicePricing($db);
    }
    
} catch (Exception $e) {
    logError('Pricing API Error: ' . $e->getMessage());
    sendErrorResponse('خطا در پردازش درخواست: ' . $e->getMessage(), 500);
}

/**
 * محاسبه قیمت کل دستگاه
 */
function handleGetDevicePricing($db) {
    try {
        $deviceId = getIdFromParam('device_id');
        
        // بررسی وجود دستگاه
        $deviceQuery = "SELECT d.id, d.name, d.description, d.board_id,
                              b.bname as board_name, b.bcode as board_code, 
                              b.pcode as board_pcode, b.pcount as board_pcount
                       FROM device d 
                       LEFT JOIN board b ON d.board_id = b.id
                       WHERE d.id = ?";
        $deviceStmt = $db->prepare($deviceQuery);
        $deviceStmt->execute([$deviceId]);
        $device = $deviceStmt->fetch();
        
        if (!$device) {
            sendErrorResponse('دستگاه مورد نظر یافت نشد', 404);
        }
        
        // دریافت اطلاعات برد و قطعات آن
        $boardId = $device['board_id'];
        $boardParts = [];
        $boardTotalPrice = 0;
        
        if ($boardId) {
            $partsQuery = "SELECT g.id, g.name, g.description, g.price, g.quantity
                          FROM ghate g 
                          WHERE g.board_id = ?";
            $partsStmt = $db->prepare($partsQuery);
            $partsStmt->execute([$boardId]);
            $parts = $partsStmt->fetchAll();
            
            foreach ($parts as $part) {
                $partPrice = (float)$part['price'];
                $partQuantity = (int)$part['quantity'];
                $partTotalPrice = $partPrice * $partQuantity;
                $boardTotalPrice += $partTotalPrice;
                
                $boardParts[] = [
                    'id' => (int)$part['id'],
                    'name' => $part['name'],
                    'description' => $part['description'],
                    'unit_price' => $partPrice,
                    'quantity' => $partQuantity,
                    'total_price' => $partTotalPrice
                ];
            }
        }
        
        // دریافت پردازش‌های دستگاه
        $processQuery = "SELECT p.id, p.name, p.description, p.order_index,
                               pp.price, pp.labor_cost, pp.material_cost, pp.overhead_cost
                        FROM proccess p 
                        LEFT JOIN proccessprice pp ON p.id = pp.process_id
                        WHERE p.device_id = ?
                        ORDER BY p.order_index ASC";
        $processStmt = $db->prepare($processQuery);
        $processStmt->execute([$deviceId]);
        $processes = $processStmt->fetchAll();
        
        $processTotalPrice = 0;
        $totalLaborCost = 0;
        $totalMaterialCost = 0;
        $totalOverheadCost = 0;
        $processDetails = [];
        
        foreach ($processes as $process) {
            $processPrice = (float)($process['price'] ?? 0);
            $laborCost = (float)($process['labor_cost'] ?? 0);
            $materialCost = (float)($process['material_cost'] ?? 0);
            $overheadCost = (float)($process['overhead_cost'] ?? 0);
            
            $processTotal = $processPrice + $laborCost + $materialCost + $overheadCost;
            $processTotalPrice += $processTotal;
            $totalLaborCost += $laborCost;
            $totalMaterialCost += $materialCost;
            $totalOverheadCost += $overheadCost;
            
            $processDetails[] = [
                'id' => (int)$process['id'],
                'name' => $process['name'],
                'description' => $process['description'],
                'order_index' => (int)$process['order_index'],
                'base_price' => $processPrice,
                'labor_cost' => $laborCost,
                'material_cost' => $materialCost,
                'overhead_cost' => $overheadCost,
                'total_price' => $processTotal
            ];
        }
        
        // محاسبه قیمت کل
        $totalDevicePrice = $boardTotalPrice + $processTotalPrice;
        
        // ساخت پاسخ جامع
        $response = [
            'device' => [
                'id' => (int)$device['id'],
                'name' => $device['name'],
                'description' => $device['description']
            ],
            'board' => [
                'id' => (int)$boardId,
                'name' => $device['board_name'],
                'code' => $device['board_code'],
                'pcode' => $device['board_pcode'],
                'pcount' => (int)$device['board_pcount'],
                'parts' => $boardParts,
                'total_price' => $boardTotalPrice
            ],
            'processes' => $processDetails,
            'cost_breakdown' => [
                'board_cost' => $boardTotalPrice,
                'process_cost' => $processTotalPrice,
                'labor_cost' => $totalLaborCost,
                'material_cost' => $totalMaterialCost,
                'overhead_cost' => $totalOverheadCost
            ],
            'total_price' => $totalDevicePrice,
            'currency' => 'IRR',
            'calculated_at' => date('Y-m-d H:i:s')
        ];
        
        sendSuccessResponse($response, 'قیمت دستگاه با موفقیت محاسبه شد');
        
    } catch (Exception $e) {
        logError('Get Device Pricing Error: ' . $e->getMessage());
        sendErrorResponse('خطا در محاسبه قیمت دستگاه: ' . $e->getMessage());
    }
}

/**
 * API اضافی برای گزارش قیمت‌گذاری کلی
 */
function handleGetPricingReport($db) {
    try {
        // دریافت آمار کلی
        $stats = [];
        
        // تعداد کل دستگاه‌ها
        $deviceCountQuery = "SELECT COUNT(*) as count FROM device";
        $deviceCountStmt = $db->prepare($deviceCountQuery);
        $deviceCountStmt->execute();
        $stats['total_devices'] = (int)$deviceCountStmt->fetch()['count'];
        
        // تعداد کل بردها
        $boardCountQuery = "SELECT COUNT(*) as count FROM board";
        $boardCountStmt = $db->prepare($boardCountQuery);
        $boardCountStmt->execute();
        $stats['total_boards'] = (int)$boardCountStmt->fetch()['count'];
        
        // تعداد کل قطعات
        $partCountQuery = "SELECT COUNT(*) as count FROM ghate";
        $partCountStmt = $db->prepare($partCountQuery);
        $partCountStmt->execute();
        $stats['total_parts'] = (int)$partCountStmt->fetch()['count'];
        
        // تعداد کل پردازش‌ها
        $processCountQuery = "SELECT COUNT(*) as count FROM proccess";
        $processCountStmt = $db->prepare($processCountQuery);
        $processCountStmt->execute();
        $stats['total_processes'] = (int)$processCountStmt->fetch()['count'];
        
        // میانگین قیمت قطعات
        $avgPartPriceQuery = "SELECT AVG(price) as avg_price FROM ghate WHERE price > 0";
        $avgPartPriceStmt = $db->prepare($avgPartPriceQuery);
        $avgPartPriceStmt->execute();
        $avgPartPrice = $avgPartPriceStmt->fetch()['avg_price'];
        $stats['average_part_price'] = $avgPartPrice ? (float)$avgPartPrice : 0;
        
        // مجموع ارزش کل قطعات
        $totalPartsValueQuery = "SELECT SUM(price * quantity) as total_value FROM ghate";
        $totalPartsValueStmt = $db->prepare($totalPartsValueQuery);
        $totalPartsValueStmt->execute();
        $totalPartsValue = $totalPartsValueStmt->fetch()['total_value'];
        $stats['total_parts_value'] = $totalPartsValue ? (float)$totalPartsValue : 0;
        
        sendSuccessResponse([
            'statistics' => $stats,
            'generated_at' => date('Y-m-d H:i:s')
        ], 'گزارش آماری با موفقیت تولید شد');
        
    } catch (Exception $e) {
        logError('Get Pricing Report Error: ' . $e->getMessage());
        sendErrorResponse('خطا در تولید گزارش آماری: ' . $e->getMessage());
    }
}
?> 