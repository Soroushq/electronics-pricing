<?php
/**
 * Processes API (Proccess)
 * API مدیریت پردازش‌ها
 */

require_once '../config/database.php';
require_once '../includes/functions.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $method = checkRequestMethod(['GET', 'POST', 'PUT', 'DELETE']);
    
    switch ($method) {
        case 'GET':
            handleGetProcesses($db);
            break;
        case 'POST':
            handleCreateProcess($db);
            break;
        case 'PUT':
            handleUpdateProcess($db);
            break;
        case 'DELETE':
            handleDeleteProcess($db);
            break;
    }
    
} catch (Exception $e) {
    logError('Processes API Error: ' . $e->getMessage());
    sendErrorResponse('خطا در پردازش درخواست: ' . $e->getMessage(), 500);
}

/**
 * دریافت لیست پردازش‌ها
 */
function handleGetProcesses($db) {
    try {
        $searchTerm = isset($_GET['search']) ? sanitizeInput($_GET['search']) : '';
        $deviceId = isset($_GET['device_id']) ? (int)$_GET['device_id'] : null;
        $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? max(1, min(100, (int)$_GET['limit'])) : 20;
        $offset = ($page - 1) * $limit;
        
        // ایجاد شرط جستجو
        $searchCondition = buildSearchCondition(['p.name', 'p.description'], $searchTerm);
        $deviceCondition = $deviceId ? ' AND p.device_id = ?' : '';
        $orderClause = buildOrderClause(['id', 'name', 'description', 'order_index'], 'order_index', 'ASC');
        
        // pارامترهای کوئری
        $queryParams = $searchCondition['params'];
        if ($deviceId) {
            $queryParams[] = $deviceId;
        }
        
        // شمارش کل رکوردها
        $countQuery = "SELECT COUNT(*) as total 
                       FROM proccess p 
                       WHERE 1=1" . $searchCondition['condition'] . $deviceCondition;
        $countStmt = $db->prepare($countQuery);
        $countStmt->execute($queryParams);
        $totalCount = $countStmt->fetch()['total'];
        
        // دریافت داده‌ها با اطلاعات دستگاه و قیمت‌ها
        $query = "SELECT p.id, p.name, p.description, p.device_id, p.order_index as order_index,
                         d.name as device_name,
                         pp.price, pp.labor_cost, pp.material_cost, pp.overhead_cost
                  FROM proccess p 
                  LEFT JOIN device d ON p.device_id = d.id
                  LEFT JOIN proccessprice pp ON p.id = pp.process_id
                  WHERE 1=1" . $searchCondition['condition'] . $deviceCondition . " 
                  {$orderClause} 
                  LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $db->prepare($query);
        $stmt->execute($queryParams);
        $processes = $stmt->fetchAll();
        
        // تبدیل اعداد به نوع مناسب
        foreach ($processes as &$process) {
            $process['order_index'] = (int)$process['order_index'];
            $process['price'] = $process['price'] ? (float)$process['price'] : 0;
            $process['labor_cost'] = $process['labor_cost'] ? (float)$process['labor_cost'] : 0;
            $process['material_cost'] = $process['material_cost'] ? (float)$process['material_cost'] : 0;
            $process['overhead_cost'] = $process['overhead_cost'] ? (float)$process['overhead_cost'] : 0;
        }
        
        // محاسبه اطلاعات صفحه‌بندی
        $totalPages = ceil($totalCount / $limit);
        
        sendSuccessResponse([
            'processes' => $processes,
            'pagination' => [
                'current_page' => $page,
                'total_pages' => $totalPages,
                'total_count' => (int)$totalCount,
                'limit' => $limit,
                'has_next' => $page < $totalPages,
                'has_prev' => $page > 1
            ]
        ]);
        
    } catch (Exception $e) {
        logError('Get Processes Error: ' . $e->getMessage());
        sendErrorResponse('خطا در دریافت پردازش‌ها: ' . $e->getMessage());
    }
}

/**
 * ایجاد پردازش جدید
 */
function handleCreateProcess($db) {
    try {
        $data = getJsonInput();
        validateRequiredFields($data, ['name', 'device_id', 'order_index']);
        
        // پاک‌کردن داده‌ها
        $name = sanitizeInput($data['name']);
        $description = isset($data['description']) ? sanitizeInput($data['description']) : null;
        $deviceId = (int)$data['device_id'];
        $orderIndex = (int)$data['order_index'];
        
        // اعتبارسنجی order_index
        if ($orderIndex < 0) {
            sendErrorResponse('ترتیب نمی‌تواند منفی باشد');
        }
        
        // بررسی وجود دستگاه
        $deviceCheckQuery = "SELECT id FROM device WHERE id = ?";
        $deviceCheckStmt = $db->prepare($deviceCheckQuery);
        $deviceCheckStmt->execute([$deviceId]);
        
        if (!$deviceCheckStmt->fetch()) {
            sendErrorResponse('دستگاه مورد نظر یافت نشد');
        }
        
        // شروع تراکنش
        $db->beginTransaction();
        
        try {
            // درج رکورد جدید
            $insertQuery = "INSERT INTO proccess (name, description, device_id, order_index) VALUES (?, ?, ?, ?)";
            $insertStmt = $db->prepare($insertQuery);
            $insertStmt->execute([$name, $description, $deviceId, $orderIndex]);
            
            $newId = $db->lastInsertId();
            
            // اگر قیمت‌ها ارائه شده باشد، آن‌ها را نیز ذخیره کن
            if (isset($data['price']) || isset($data['labor_cost']) || isset($data['material_cost']) || isset($data['overhead_cost'])) {
                $price = isset($data['price']) ? (float)$data['price'] : 0;
                $laborCost = isset($data['labor_cost']) ? (float)$data['labor_cost'] : 0;
                $materialCost = isset($data['material_cost']) ? (float)$data['material_cost'] : 0;
                $overheadCost = isset($data['overhead_cost']) ? (float)$data['overhead_cost'] : 0;
                
                $priceInsertQuery = "INSERT INTO proccessprice (process_id, price, labor_cost, material_cost, overhead_cost) VALUES (?, ?, ?, ?, ?)";
                $priceInsertStmt = $db->prepare($priceInsertQuery);
                $priceInsertStmt->execute([$newId, $price, $laborCost, $materialCost, $overheadCost]);
            }
            
            // تایید تراکنش
            $db->commit();
            
            // دریافت رکورد ایجاد شده با اطلاعات دستگاه
            $selectQuery = "SELECT p.id, p.name, p.description, p.device_id, p.order_index,
                                   d.name as device_name,
                                   pp.price, pp.labor_cost, pp.material_cost, pp.overhead_cost
                            FROM proccess p 
                            LEFT JOIN device d ON p.device_id = d.id
                            LEFT JOIN proccessprice pp ON p.id = pp.process_id
                            WHERE p.id = ?";
            $selectStmt = $db->prepare($selectQuery);
            $selectStmt->execute([$newId]);
            $newProcess = $selectStmt->fetch();
            
            // تبدیل اعداد به نوع مناسب
            $newProcess['order_index'] = (int)$newProcess['order_index'];
            $newProcess['price'] = $newProcess['price'] ? (float)$newProcess['price'] : 0;
            $newProcess['labor_cost'] = $newProcess['labor_cost'] ? (float)$newProcess['labor_cost'] : 0;
            $newProcess['material_cost'] = $newProcess['material_cost'] ? (float)$newProcess['material_cost'] : 0;
            $newProcess['overhead_cost'] = $newProcess['overhead_cost'] ? (float)$newProcess['overhead_cost'] : 0;
            
            sendSuccessResponse($newProcess, 'پردازش با موفقیت ایجاد شد');
            
        } catch (Exception $e) {
            $db->rollback();
            throw $e;
        }
        
    } catch (Exception $e) {
        logError('Create Process Error: ' . $e->getMessage());
        sendErrorResponse('خطا در ایجاد پردازش: ' . $e->getMessage());
    }
}

/**
 * ویرایش پردازش
 */
function handleUpdateProcess($db) {
    try {
        $data = getJsonInput();
        validateRequiredFields($data, ['id', 'name', 'device_id', 'order_index']);
        
        // پاک‌کردن داده‌ها
        $id = (int)$data['id'];
        $name = sanitizeInput($data['name']);
        $description = isset($data['description']) ? sanitizeInput($data['description']) : null;
        $deviceId = (int)$data['device_id'];
        $orderIndex = (int)$data['order_index'];
        
        // اعتبارسنجی order_index
        if ($orderIndex < 0) {
            sendErrorResponse('ترتیب نمی‌تواند منفی باشد');
        }
        
        // بررسی وجود پردازش
        $checkQuery = "SELECT id FROM proccess WHERE id = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            sendErrorResponse('پردازش مورد نظر یافت نشد', 404);
        }
        
        // بررسی وجود دستگاه
        $deviceCheckQuery = "SELECT id FROM device WHERE id = ?";
        $deviceCheckStmt = $db->prepare($deviceCheckQuery);
        $deviceCheckStmt->execute([$deviceId]);
        
        if (!$deviceCheckStmt->fetch()) {
            sendErrorResponse('دستگاه مورد نظر یافت نشد');
        }
        
        // شروع تراکنش
        $db->beginTransaction();
        
        try {
            // به‌روزرسانی رکورد
            $updateQuery = "UPDATE proccess SET name = ?, description = ?, device_id = ?, order_index = ? WHERE id = ?";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->execute([$name, $description, $deviceId, $orderIndex, $id]);
            
            // اگر قیمت‌ها ارائه شده باشد، آن‌ها را نیز به‌روزرسانی کن
            if (isset($data['price']) || isset($data['labor_cost']) || isset($data['material_cost']) || isset($data['overhead_cost'])) {
                $price = isset($data['price']) ? (float)$data['price'] : 0;
                $laborCost = isset($data['labor_cost']) ? (float)$data['labor_cost'] : 0;
                $materialCost = isset($data['material_cost']) ? (float)$data['material_cost'] : 0;
                $overheadCost = isset($data['overhead_cost']) ? (float)$data['overhead_cost'] : 0;
                
                // بررسی وجود رکورد قیمت
                $priceCheckQuery = "SELECT id FROM proccessprice WHERE process_id = ?";
                $priceCheckStmt = $db->prepare($priceCheckQuery);
                $priceCheckStmt->execute([$id]);
                
                if ($priceCheckStmt->fetch()) {
                    // به‌روزرسانی قیمت موجود
                    $priceUpdateQuery = "UPDATE proccessprice SET price = ?, labor_cost = ?, material_cost = ?, overhead_cost = ? WHERE process_id = ?";
                    $priceUpdateStmt = $db->prepare($priceUpdateQuery);
                    $priceUpdateStmt->execute([$price, $laborCost, $materialCost, $overheadCost, $id]);
                } else {
                    // درج قیمت جدید
                    $priceInsertQuery = "INSERT INTO proccessprice (process_id, price, labor_cost, material_cost, overhead_cost) VALUES (?, ?, ?, ?, ?)";
                    $priceInsertStmt = $db->prepare($priceInsertQuery);
                    $priceInsertStmt->execute([$id, $price, $laborCost, $materialCost, $overheadCost]);
                }
            }
            
            // تایید تراکنش
            $db->commit();
            
            // دریافت رکورد به‌روزرسانی شده
            $selectQuery = "SELECT p.id, p.name, p.description, p.device_id, p.order_index,
                                   d.name as device_name,
                                   pp.price, pp.labor_cost, pp.material_cost, pp.overhead_cost
                            FROM proccess p 
                            LEFT JOIN device d ON p.device_id = d.id
                            LEFT JOIN proccessprice pp ON p.id = pp.process_id
                            WHERE p.id = ?";
            $selectStmt = $db->prepare($selectQuery);
            $selectStmt->execute([$id]);
            $updatedProcess = $selectStmt->fetch();
            
            // تبدیل اعداد به نوع مناسب
            $updatedProcess['order_index'] = (int)$updatedProcess['order_index'];
            $updatedProcess['price'] = $updatedProcess['price'] ? (float)$updatedProcess['price'] : 0;
            $updatedProcess['labor_cost'] = $updatedProcess['labor_cost'] ? (float)$updatedProcess['labor_cost'] : 0;
            $updatedProcess['material_cost'] = $updatedProcess['material_cost'] ? (float)$updatedProcess['material_cost'] : 0;
            $updatedProcess['overhead_cost'] = $updatedProcess['overhead_cost'] ? (float)$updatedProcess['overhead_cost'] : 0;
            
            sendSuccessResponse($updatedProcess, 'پردازش با موفقیت به‌روزرسانی شد');
            
        } catch (Exception $e) {
            $db->rollback();
            throw $e;
        }
        
    } catch (Exception $e) {
        logError('Update Process Error: ' . $e->getMessage());
        sendErrorResponse('خطا در به‌روزرسانی پردازش: ' . $e->getMessage());
    }
}

/**
 * حذف پردازش
 */
function handleDeleteProcess($db) {
    try {
        $id = getIdFromParam('id');
        
        // بررسی وجود رکورد
        $checkQuery = "SELECT id FROM proccess WHERE id = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            sendErrorResponse('پردازش مورد نظر یافت نشد', 404);
        }
        
        // شروع تراکنش
        $db->beginTransaction();
        
        try {
            // حذف قیمت‌های مرتبط
            $deletePriceQuery = "DELETE FROM proccessprice WHERE process_id = ?";
            $deletePriceStmt = $db->prepare($deletePriceQuery);
            $deletePriceStmt->execute([$id]);
            
            // حذف رکورد
            $deleteQuery = "DELETE FROM proccess WHERE id = ?";
            $deleteStmt = $db->prepare($deleteQuery);
            $deleteStmt->execute([$id]);
            
            // تایید تراکنش
            $db->commit();
            
            sendSuccessResponse(['id' => $id], 'پردازش با موفقیت حذف شد');
            
        } catch (Exception $e) {
            $db->rollback();
            throw $e;
        }
        
    } catch (Exception $e) {
        logError('Delete Process Error: ' . $e->getMessage());
        sendErrorResponse('خطا در حذف پردازش: ' . $e->getMessage());
    }
}
?> 