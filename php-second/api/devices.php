<?php
/**
 * Devices API
 * API مدیریت دستگاه‌ها
 */

require_once '../config/database.php';
require_once '../includes/functions.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $method = checkRequestMethod(['GET', 'POST', 'PUT', 'DELETE']);
    
    switch ($method) {
        case 'GET':
            handleGetDevices($db);
            break;
        case 'POST':
            handleCreateDevice($db);
            break;
        case 'PUT':
            handleUpdateDevice($db);
            break;
        case 'DELETE':
            handleDeleteDevice($db);
            break;
    }
    
} catch (Exception $e) {
    logError('Devices API Error: ' . $e->getMessage());
    sendErrorResponse('خطا در پردازش درخواست: ' . $e->getMessage(), 500);
}

/**
 * دریافت لیست دستگاه‌ها
 */
function handleGetDevices($db) {
    try {
        $searchTerm = isset($_GET['search']) ? sanitizeInput($_GET['search']) : '';
        $boardId = isset($_GET['board_id']) ? (int)$_GET['board_id'] : null;
        $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? max(1, min(100, (int)$_GET['limit'])) : 20;
        $offset = ($page - 1) * $limit;
        
        // ایجاد شرط جستجو
        $searchCondition = buildSearchCondition(['d.name', 'd.description'], $searchTerm);
        $boardCondition = $boardId ? ' AND d.board_id = ?' : '';
        $orderClause = buildOrderClause(['id', 'name', 'description', 'board_id'], 'id', 'ASC');
        
        // پارامترهای کوئری
        $queryParams = $searchCondition['params'];
        if ($boardId) {
            $queryParams[] = $boardId;
        }
        
        // شمارش کل رکوردها
        $countQuery = "SELECT COUNT(*) as total 
                       FROM device d 
                       WHERE 1=1" . $searchCondition['condition'] . $boardCondition;
        $countStmt = $db->prepare($countQuery);
        $countStmt->execute($queryParams);
        $totalCount = $countStmt->fetch()['total'];
        
        // دریافت داده‌ها با اطلاعات برد
        $query = "SELECT d.id, d.name, d.description, d.board_id,
                         b.bname as board_name, b.bcode as board_code
                  FROM device d 
                  LEFT JOIN board b ON d.board_id = b.id
                  WHERE 1=1" . $searchCondition['condition'] . $boardCondition . " 
                  {$orderClause} 
                  LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $db->prepare($query);
        $stmt->execute($queryParams);
        $devices = $stmt->fetchAll();
        
        // محاسبه اطلاعات صفحه‌بندی
        $totalPages = ceil($totalCount / $limit);
        
        sendSuccessResponse([
            'devices' => $devices,
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
        logError('Get Devices Error: ' . $e->getMessage());
        sendErrorResponse('خطا در دریافت دستگاه‌ها: ' . $e->getMessage());
    }
}

/**
 * ایجاد دستگاه جدید
 */
function handleCreateDevice($db) {
    try {
        $data = getJsonInput();
        validateRequiredFields($data, ['name', 'board_id']);
        
        // پاک‌کردن داده‌ها
        $name = sanitizeInput($data['name']);
        $description = isset($data['description']) ? sanitizeInput($data['description']) : null;
        $boardId = (int)$data['board_id'];
        
        // بررسی وجود برد
        $boardCheckQuery = "SELECT id FROM board WHERE id = ?";
        $boardCheckStmt = $db->prepare($boardCheckQuery);
        $boardCheckStmt->execute([$boardId]);
        
        if (!$boardCheckStmt->fetch()) {
            sendErrorResponse('برد مورد نظر یافت نشد');
        }
        
        // درج رکورد جدید
        $insertQuery = "INSERT INTO device (name, description, board_id) VALUES (?, ?, ?)";
        $insertStmt = $db->prepare($insertQuery);
        $insertStmt->execute([$name, $description, $boardId]);
        
        $newId = $db->lastInsertId();
        
        // دریافت رکورد ایجاد شده با اطلاعات برد
        $selectQuery = "SELECT d.id, d.name, d.description, d.board_id,
                               b.bname as board_name, b.bcode as board_code
                        FROM device d 
                        LEFT JOIN board b ON d.board_id = b.id
                        WHERE d.id = ?";
        $selectStmt = $db->prepare($selectQuery);
        $selectStmt->execute([$newId]);
        $newDevice = $selectStmt->fetch();
        
        sendSuccessResponse($newDevice, 'دستگاه با موفقیت ایجاد شد');
        
    } catch (Exception $e) {
        logError('Create Device Error: ' . $e->getMessage());
        sendErrorResponse('خطا در ایجاد دستگاه: ' . $e->getMessage());
    }
}

/**
 * ویرایش دستگاه
 */
function handleUpdateDevice($db) {
    try {
        $data = getJsonInput();
        validateRequiredFields($data, ['id', 'name', 'board_id']);
        
        // پاک‌کردن داده‌ها
        $id = (int)$data['id'];
        $name = sanitizeInput($data['name']);
        $description = isset($data['description']) ? sanitizeInput($data['description']) : null;
        $boardId = (int)$data['board_id'];
        
        // بررسی وجود دستگاه
        $checkQuery = "SELECT id FROM device WHERE id = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            sendErrorResponse('دستگاه مورد نظر یافت نشد', 404);
        }
        
        // بررسی وجود برد
        $boardCheckQuery = "SELECT id FROM board WHERE id = ?";
        $boardCheckStmt = $db->prepare($boardCheckQuery);
        $boardCheckStmt->execute([$boardId]);
        
        if (!$boardCheckStmt->fetch()) {
            sendErrorResponse('برد مورد نظر یافت نشد');
        }
        
        // به‌روزرسانی رکورد
        $updateQuery = "UPDATE device SET name = ?, description = ?, board_id = ? WHERE id = ?";
        $updateStmt = $db->prepare($updateQuery);
        $updateStmt->execute([$name, $description, $boardId, $id]);
        
        // دریافت رکورد به‌روزرسانی شده با اطلاعات برد
        $selectQuery = "SELECT d.id, d.name, d.description, d.board_id,
                               b.bname as board_name, b.bcode as board_code
                        FROM device d 
                        LEFT JOIN board b ON d.board_id = b.id
                        WHERE d.id = ?";
        $selectStmt = $db->prepare($selectQuery);
        $selectStmt->execute([$id]);
        $updatedDevice = $selectStmt->fetch();
        
        sendSuccessResponse($updatedDevice, 'دستگاه با موفقیت به‌روزرسانی شد');
        
    } catch (Exception $e) {
        logError('Update Device Error: ' . $e->getMessage());
        sendErrorResponse('خطا در به‌روزرسانی دستگاه: ' . $e->getMessage());
    }
}

/**
 * حذف دستگاه
 */
function handleDeleteDevice($db) {
    try {
        $id = getIdFromParam('id');
        
        // بررسی وجود رکورد
        $checkQuery = "SELECT id FROM device WHERE id = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            sendErrorResponse('دستگاه مورد نظر یافت نشد', 404);
        }
        
        // بررسی استفاده در جداول مرتبط (پردازش‌ها)
        $usedInProcessQuery = "SELECT COUNT(*) as count FROM proccess WHERE device_id = ?";
        $usedInProcessStmt = $db->prepare($usedInProcessQuery);
        $usedInProcessStmt->execute([$id]);
        $processCount = $usedInProcessStmt->fetch()['count'];
        
        if ($processCount > 0) {
            sendErrorResponse('امکان حذف این دستگاه وجود ندارد، زیرا برای آن پردازش تعریف شده است');
        }
        
        // حذف رکورد
        $deleteQuery = "DELETE FROM device WHERE id = ?";
        $deleteStmt = $db->prepare($deleteQuery);
        $deleteStmt->execute([$id]);
        
        sendSuccessResponse(['id' => $id], 'دستگاه با موفقیت حذف شد');
        
    } catch (Exception $e) {
        logError('Delete Device Error: ' . $e->getMessage());
        sendErrorResponse('خطا در حذف دستگاه: ' . $e->getMessage());
    }
}
?> 